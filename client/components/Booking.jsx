"use client";
import { useEffect, useState } from "react";
import { MdAccessTime } from "react-icons/md";
import { toast } from "sonner";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";

const Booking = ({ button }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedService, setSelectedService] = useState();
  const [date, setDate] = useState();
  const [timeSlot, setTimeSlot] = useState();
  const [selectedTimeSlot, setSelectedTimeSlot] = useState();
  const [services, setServices] = useState([]);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchApps = async () => {
      try {
        const response = await fetch("/api/appointments");
        const data = await response.json();
        setAppointments(data);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };
    const fetchServices = async () => {
      try {
        const response = await fetch("/api/services");
        const data = await response.json();
        setServices(data);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };
    fetchApps();
    fetchServices();
  }, []);

  const getTime = () => {
    const timeList = [];
    for (let i = 9; i <= 11; i++) {
      timeList.push({
        time: i + ":00 AM",
      });
    }
    timeList.push({
      time: "12:00 PM",
    });
    for (let i = 1; i <= 8; i++) {
      timeList.push({
        time: i + ":00 PM",
      });
    }

    setTimeSlot(timeList);
  };

  useEffect(() => {
    getTime();
  }, []);

  // Convert time to 'HH:mm:ss.SSS' format
  const formatTime = (time) => {
    const [hour, minutePeriod] = time.split(":");
    const minute = minutePeriod.slice(0, 2);
    const period = minutePeriod.slice(3); // AM or PM

    let hours24 = parseInt(hour, 10);
    if (period === "PM" && hours24 !== 12) {
      hours24 += 12;
    } else if (period === "AM" && hours24 === 12) {
      hours24 = 0;
    }

    return `${String(hours24).padStart(2, "0")}:${minute}`;
  };

  const regularTime = (time) => {
    const [hour, minutePeriod] = time.split(":");
    const minute = minutePeriod.slice(0, 2);
    const period = minutePeriod.slice(3); // AM or PM

    let hours = parseInt(hour, 10);

    return `${String(hours).padStart(2, "0")}:${minute} ${period}`;
  };

  const saveBooking = () => {
    if (!name || !phone || !selectedService || !date || !selectedTimeSlot) {
      toast.error("Favor de llenar todos los campos requeridos.");
    } else {
      const formattedDate = format(date, "yyyy-MM-dd");
      const regulatedTime = regularTime(selectedTimeSlot);

      const existingAppointments = appointments;

      // Check if client has already booked for the selected date
      const isPersonBooked = existingAppointments.some(
        (appointment) =>
          appointment.client_name === name && appointment.date === formattedDate
      );

      if (isPersonBooked) {
        toast.error(
          "Ya has agendado una cita para este día, por favor selecciona otra fecha."
        );
      } else {
        // If the time is not booked, proceed to save the booking
        const data = {
          client_name: name,
          client_phone: phone,
          service: selectedService,
          date: formattedDate,
          time: regulatedTime,
        };

        const bookAppointment = async () => {
          try {
            const res = await fetch("/api/appointments", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(data),
            });

            if (!res.ok) {
              const errorData = await res.json();
              if (res.status === 400 && errorData.error.includes("reservada")) {
                throw new Error(errorData.error);
              }
              throw new Error(errorData.error || "Something went wrong");
            }

            const newAppointment = await res.json();
            setAppointments((prevAppointments) => [
              ...prevAppointments,
              newAppointment,
            ]);

            toast.success("La cita fue programada exitosamente!", {
              description: `${formattedDate} a las ${regulatedTime}`,
            });

            setSelectedTimeSlot();
          } catch (error) {
            console.log(error);
            if (error.message.includes("reservada")) {
              toast.error(error.message);
            } else {
              toast.error(
                "No se pudo programar la cita. Inténtalo de nuevo más tarde."
              );
            }
          }
        };

        bookAppointment();
      }
    }
  };

  // Convert a 12-hour time (with AM/PM) to 24-hour time (HH:mm)
  const convertTo24HourFormat = (time) => {
    const [timeStr, period] = time.split(" ");
    let [hours, minutes] = timeStr.split(":").map(Number);

    if (period === "PM" && hours !== 12) {
      hours += 12; // Convert PM hour to 24-hour format (except for 12 PM)
    }
    if (period === "AM" && hours === 12) {
      hours = 0; // Convert 12 AM to 00:00
    }

    return (
      String(hours).padStart(2, "0") + ":" + String(minutes).padStart(2, "0")
    );
  };

  // Convert time to local time zone based on the device's local time
  const getLocalTime = () => {
    const now = new Date();
    return now.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      timeZoneName: "short",
    });
  };

  // Get the current local time in 'HH:mm' format
  const currentTime = convertTo24HourFormat(getLocalTime());

  // Get the current local date in 'yyyy-MM-dd' format
  const today = new Date().toLocaleDateString();

  console.log("Current Time (Local):", currentTime);
  console.log("Today (Local):", today);

  const isSlotDisabled = (time) => {
    if (date) {
      // Format the provided time for comparison
      const formattedTime = convertTo24HourFormat(time.time);
      if (!formattedTime) return false; // If time is invalid, don't disable the slot

      console.log("Formatted Slot Time:", formattedTime);

      // Compare times to see if the slot is in the past
      const isPastTime =
        formattedTime <= currentTime &&
        format(date, "yyyy-MM-dd") === format(today, "yyyy-MM-dd");

      console.log("Is Slot Past Time:", isPastTime);

      // Check if the slot is already booked
      const isBooked = appointments.some(
        (appointment) =>
          convertTo24HourFormat(appointment.time) === formattedTime &&
          format(date, "yyyy-MM-dd") === format(today, "yyyy-MM-dd")
      );

      console.log("Is Slot Booked:", isBooked);

      // Return true if the slot is disabled (either past or already booked)
      return isPastTime || isBooked;
    }
    return false;
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{button}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Agenda tu cita</DialogTitle>
          <DialogDescription>
            Selecciona una fecha y hora para tu cita. Haz clic en confirmar
            cuando estés listo/a.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col lg:flex-row gap-4 py-4 justify-between w-full ">
          <div className="flex flex-col gap-4">
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ingresa tu nombre"
              className="text-base md:text-sm"
            />
            <Input
              id="phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Ingresa tu número de celular"
              className="text-base md:text-sm"
            />
            <div className="flex lg:flex-col gap-4">
              <DatePicker
                selected={date}
                onChange={(date) => setDate(date)}
                minDate={new Date()}
                placeholderText="Selecciona la fecha"
                className="w-[175px] md:w-full border rounded-md text-base md:text-sm px-3 py-2 placeholder:text-gray-500"
              />
              <Select
                value={selectedService}
                onValueChange={setSelectedService}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona el servicio a realizar" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Servicios</SelectLabel>
                    {services?.map((service) => (
                      <SelectItem value={service.name} key={service.id}>
                        {service.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <p className="text-sm flex gap-2 items-center text-[#9CA3A3]">
              <MdAccessTime /> Seleccione la hora
            </p>
            <div className="grid grid-cols-4 gap-2 rounded-md border p-3">
              {timeSlot?.map((time, index) => {
                return (
                  <span
                    key={index}
                    onClick={() => setSelectedTimeSlot(time.time)}
                    className={`text-sm self-center text-center p-2 border rounded-full cursor-pointer transition-all hover:bg-[#9E2B2A] hover:text-white ${
                      isSlotDisabled(time)
                        ? "bg-slate-200 text-gray-400 cursor-not-allowed pointer-events-none"
                        : time.time === selectedTimeSlot &&
                          "bg-[#9E2B2A] text-white"
                    } `}
                  >
                    {time.time}
                  </span>
                );
              })}
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={() => saveBooking()}>
            Confirmar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Booking;
