"use client";
import { useEffect, useState } from "react";
import { MdAccessTime } from "react-icons/md";
import globalApi from "@/api/globalApi";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { Calendar } from "@/components/ui/calendar";
import { Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
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

const Booking = ({ button }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedService, setSelectedService] = useState();
  const [date, setDate] = useState();
  const [timeSlot, setTimeSlot] = useState();
  const [selectedTimeSlot, setSelectedTimeSlot] = useState();
  const [services, setServices] = useState([]);

  const getServices = () => {
    globalApi.getServices().then((res) => {
      setServices(res.data.data);
    });
  };

  useEffect(() => {
    getServices();
  }, []);

  const getTime = () => {
    const timeList = [];
    for (let i = 9; i <= 11; i++) {
      timeList.push({
        time: i + ":00 AM",
      });
      timeList.push({
        time: i + ":30 AM",
      });
    }
    timeList.push({
      time: "12:00 PM",
    });
    timeList.push({
      time: "12:30 PM",
    });
    for (let i = 1; i <= 6; i++) {
      timeList.push({
        time: i + ":00 PM",
      });
      timeList.push({
        time: i + ":30 PM",
      });
    }

    setTimeSlot(timeList);
  };

  useEffect(() => {
    getTime();
  }, []);

  const saveBooking = () => {
    if (!name || !phone || !selectedService || !date || !selectedTimeSlot) {
      toast.error("Favor de llenar todos los campos requeridos.");
    } else {
      // Convert time to 'HH:mm:ss.SSS' format
      const formatTime = (time) => {
        const [hour, minutePeriod] = time.split(":");
        const minute = minutePeriod.slice(0, 2);
        const period = minutePeriod.slice(3); // AM or PM

        let hours24 = parseInt(hour, 10);

        // Convert to 24-hour format
        if (period === "PM" && hours24 < 12) {
          hours24 += 12;
        } else if (period === "AM" && hours24 === 12) {
          hours24 = 0;
        }

        return `${String(hours24).padStart(2, "0")}:${minute}:00.000`;
      };

      const formattedTime = formatTime(selectedTimeSlot); // Convert selected time slot

      const formattedDate = format(date, "yyyy-MM-dd");

      // Fetch existing appointments for the selected date
      globalApi
        .getAppointments(date)
        .then((res) => {
          const existingAppointments = res.data.data;

          console.log(existingAppointments);

          // Check if the selected time is already booked
          const isTimeBooked = existingAppointments.some(
            (appointment) =>
              appointment.time === formattedTime &&
              appointment.date === formattedDate
          );

          if (isTimeBooked) {
            // Trigger toast if time is already booked
            toast.error(
              "La hora seleccionada ya está reservada, por favor elige otra hora."
            );
          } else {
            // If the time is not booked, proceed to save the booking
            const data = {
              data: {
                client_name: name,
                phone: phone,
                service: selectedService,
                date: date,
                time: formattedTime,
              },
            };

            globalApi
              .bookAppointment(data)
              .then((res) => {
                console.log(res);
                res &&
                  toast.success("La cita fue programada exitosamente!", {
                    description: `${format(
                      date,
                      "PPP"
                    )} a las ${selectedTimeSlot}`,
                  });
              })
              .catch((error) => {
                console.error("Error:", error); // Log any errors from the API
              });
          }
        })
        .catch((error) => {
          console.error("Error fetching appointments:", error);
        });
    }
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
              className="col-span-3"
            />
            <Input
              id="phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Ingresa tu número de celular"
              className="col-span-3"
            />
            <div className="flex lg:flex-col gap-4">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-[280px] justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? (
                      format(date, "PPP")
                    ) : (
                      <span>Selecciona la fecha</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    disabled={(d) => d < new Date().setHours(0, 0, 0, 0)}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
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
                      <SelectItem value={service.id} key={service.id}>
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
              {timeSlot?.map((time, index) => (
                <span
                  key={index}
                  onClick={() => setSelectedTimeSlot(time.time)}
                  className={`text-sm self-center text-center p-2 border rounded-full cursor-pointer transition-all hover:bg-[#9E2B2A] hover:text-white ${
                    time.time === selectedTimeSlot && "bg-[#9E2B2A] text-white"
                  }`}
                >
                  {time.time}
                </span>
              ))}
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
