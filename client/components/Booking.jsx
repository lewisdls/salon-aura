"use client";
import { useEffect, useState } from "react";
import { MdAccessTime } from "react-icons/md";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
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
import { format, parse } from "date-fns";

const Booking = ({ button }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedService, setSelectedService] = useState();
  const [date, setDate] = useState();
  const [timeSlot, setTimeSlot] = useState();
  const [selectedTimeSlot, setSelectedTimeSlot] = useState();
  const [services, setServices] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [open, setOpen] = useState(false);

  const resetForm = () => {
    setName("");
    setPhone("");
    setSelectedService(undefined);
    setDate(undefined);
    setSelectedTimeSlot(undefined);
  };

  const handlePhoneChange = (e) => {
    let input = e.target.value.replace(/\D/g, "");

    let formatted;
    
    if (input.length > 6) {
      formatted = `(${input.slice(0, 3)}) ${input.slice(3, 6)}-${input.slice(
        6
      )}`;
    } else if (input.length > 3) {
      formatted = `(${input.slice(0, 3)}) ${input.slice(3)}`;
    } else if (input.length > 0) {
      formatted = `(${input}`;
    }

    setPhone(formatted);
  };

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

  // Opening hours per weekday (0 = Sunday). null means closed.
  const businessHours = {
    0: { start: 9, end: 12 },
    1: { start: 9, end: 18 },
    2: null,
    3: { start: 9, end: 18 },
    4: { start: 9, end: 18 },
    5: { start: 9, end: 18 },
    6: { start: 9, end: 18 },
  };

  const isOpenDay = (day) => businessHours[day.getDay()] !== null;

  const getTime = (selectedDate) => {
    const timeList = [];
    const hours = selectedDate
      ? businessHours[selectedDate.getDay()]
      : { start: 9, end: 18 };

    if (hours) {
      for (let i = hours.start; i <= hours.end; i++) {
        const period = i < 12 ? "AM" : "PM";
        const hour = i > 12 ? i - 12 : i;
        timeList.push({
          time: hour + ":00 " + period,
        });
      }
    }

    return timeList;
  };

  useEffect(() => {
    setTimeSlot(getTime(date));
  }, [date]);

  const handleDateChange = (e) => {
    const newDate = e.target.value
      ? parse(e.target.value, "yyyy-MM-dd", new Date())
      : undefined;

    // The native date input can't disable weekdays, so reject closed days here
    if (newDate && !isOpenDay(newDate)) {
      toast.error("Los martes estamos cerrados. Por favor elige otro día.");
      setDate(undefined);
      setSelectedTimeSlot(undefined);
      return;
    }

    setDate(newDate);
    // Drop the selected time if it's outside the new day's hours
    if (
      newDate &&
      !getTime(newDate).some((slot) => slot.time === selectedTimeSlot)
    ) {
      setSelectedTimeSlot(undefined);
    }
  };

  const regularTime = (time) => {
    const [hour, minutePeriod] = time.split(":");
    const minute = minutePeriod.slice(0, 2);
    const period = minutePeriod.slice(3); // AM or PM

    let hours = parseInt(hour, 10);

    return `${String(hours).padStart(2, "0")}:${minute} ${period}`;
  };

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  const saveBooking = () => {
    if (isSubmitting) return;

    if (!name || !phone || !selectedService || !date || !selectedTimeSlot) {
      toast.error("Favor de llenar todos los campos requeridos.");
    } else {
      const formattedDate = format(date, "yyyy-MM-dd");
      const regulatedTime = regularTime(selectedTimeSlot);

      const data = {
        client_name: name,
        client_phone: phone,
        service: selectedService,
        date: formattedDate,
        time: regulatedTime,
      };

      const bookAppointment = async () => {
        setIsSubmitting(true);
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

          resetForm();
          setOpen(false);
        } catch (error) {
          console.log(error);
          if (error.message.includes("elige")) {
            toast.error(error.message);
          } else {
            toast.error(
              "No se pudo programar la cita. Inténtalo de nuevo más tarde."
            );
          }
        } finally {
          setIsSubmitting(false);
        }
      };

      bookAppointment();
    }
  };

  const isSlotDisabled = (time) => {
    if (date) {
      const isBooked = appointments.some(
        (appointment) =>
          regularTime(time.time) === appointment.time &&
          appointment.date === format(date, "yyyy-MM-dd")
      );

      return isBooked;
    }
    return false;
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
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
              onChange={handlePhoneChange}
              maxLength={14}
              placeholder="Ingresa tu número de celular"
              className="text-base md:text-sm"
            />
            <Input
              id="date"
              type="date"
              value={date ? format(date, "yyyy-MM-dd") : ""}
              onChange={handleDateChange}
              min={format(tomorrow, "yyyy-MM-dd")}
              aria-label="Selecciona la fecha"
              className="text-base md:text-sm"
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
          <Button
            type="submit"
            onClick={() => saveBooking()}
            disabled={isSubmitting}
            className="bg-oxblood text-white hover:bg-oxblood-deep rounded-full px-8"
          >
            {isSubmitting ? (
              <>
                <AiOutlineLoading3Quarters className="mr-2 h-4 w-4 animate-spin" />
                Confirmando...
              </>
            ) : (
              "Confirmar"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Booking;
