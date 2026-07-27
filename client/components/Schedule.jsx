import Link from "next/link";
import { FiMapPin, FiPhone, FiArrowUpRight } from "react-icons/fi";
import Booking from "./Booking";

const hours = [
  { day: "Lunes a Sábado", time: "9 AM – 9 PM" },
  { day: "Domingo", time: "9 AM – 1 PM" },
  { day: "Martes", time: "Cerrado", closed: true },
];

const Schedule = () => {
  return (
    <section id="visitanos" className="bg-cream-deep py-[var(--section-y)]">
      <div className="container-x">
        <div className="max-w-2xl">
          <span className="kicker">Visítanos</span>
          <h2 className="mt-4 text-headline font-semibold text-ink">
            Estamos listas para recibirte
          </h2>
          <p className="mt-5 max-w-[50ch] text-lg leading-relaxed text-ink-soft">
            Pasa por el salón o reserva con anticipación. Elige el día y la hora
            que mejor te queden y déjanos el resto.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {/* Hours + booking */}
          <div className="flex flex-col rounded-4xl bg-white p-8 shadow-soft md:p-10">
            <h3 className="text-title font-semibold text-ink">
              Horas laborables
            </h3>
            <ul className="mt-6 flex flex-col">
              {hours.map((h) => (
                <li
                  key={h.day}
                  className="flex items-center justify-between border-b border-ink/10 py-4 text-lg last:border-b-0"
                >
                  <span className="text-ink">{h.day}</span>
                  <span
                    className={
                      h.closed
                        ? "font-medium text-oxblood"
                        : "font-medium text-ink-soft"
                    }
                  >
                    {h.time}
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <Booking
                button={
                  <button className="w-full rounded-full bg-oxblood px-8 py-4 text-lg font-medium text-white transition-transform hover:-translate-y-0.5 hover:bg-oxblood-deep sm:w-auto">
                    Programar cita
                  </button>
                }
              />
            </div>
          </div>

          {/* Location */}
          <div className="flex flex-col overflow-hidden rounded-4xl bg-white shadow-soft">
            <Link
              href="https://maps.app.goo.gl/FVqNF2viganCoi3D7"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Ver ubicación en el mapa"
              className="group relative block h-56 overflow-hidden md:h-64"
            >
              <img
                src="/map.png"
                alt="Mapa de la ubicación de Salon Aura"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <span className="absolute bottom-4 right-4 inline-flex items-center gap-2 rounded-full bg-ink/85 px-4 py-2 text-sm font-medium text-cream backdrop-blur-sm">
                Cómo llegar <FiArrowUpRight />
              </span>
            </Link>
            <div className="flex flex-1 flex-col gap-5 p-8 md:p-10">
              <div className="flex items-start gap-3">
                <FiMapPin className="mt-1 shrink-0 text-xl text-oxblood" />
                <p className="text-lg leading-relaxed text-ink">
                  Club de Leones 9<br />
                  Santo Domingo Este, R.D.
                </p>
              </div>
              <a
                href="tel:+18094674141"
                className="flex items-center gap-3 text-lg text-ink transition-colors hover:text-oxblood"
              >
                <FiPhone className="shrink-0 text-xl text-oxblood" />
                +1 809 467 4141
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Schedule;
