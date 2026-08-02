import Link from "next/link";
import { FaInstagram } from "react-icons/fa6";
import { FaWhatsapp } from "react-icons/fa";
import { FiMail, FiPhone, FiMapPin } from "react-icons/fi";
import Booking from "./Booking";

const socials = [
  {
    href: "https://www.instagram.com/salonaura_/",
    label: "Instagram",
    icon: FaInstagram,
    external: true,
  },
  {
    href: "https://wa.me/18094674141",
    label: "WhatsApp",
    icon: FaWhatsapp,
    external: true,
  },
  {
    href: "mailto:aurafdls19@hotmail.com",
    label: "Correo",
    icon: FiMail,
    external: false,
  },
];

const Footer = () => {
  return (
    <footer className="bg-charcoal text-white">
      <div className="container-x grid gap-12 py-[var(--section-y)] md:grid-cols-2 lg:grid-cols-4">
        {/* Brand */}
        <div className="lg:pr-6">
          <p className="text-3xl font-semibold tracking-tight">
            Salon <span className="text-oxblood-light">Aura</span>
          </p>
          <p className="mt-4 max-w-[30ch] leading-relaxed text-white/60">
            Tu refugio de belleza en Santo Domingo Este. Estilo, cuidado y buena
            energía.
          </p>
          <div className="mt-6 flex gap-3">
            {socials.map((s) => {
              const Icon = s.icon;
              return (
                <Link
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  {...(s.external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="grid h-11 w-11 place-items-center rounded-full border border-white/15 text-lg transition-colors hover:border-oxblood-light hover:bg-oxblood-light"
                >
                  <Icon />
                </Link>
              );
            })}
          </div>
        </div>

        {/* Explore */}
        <nav aria-label="Enlaces del pie de página">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-white/50">
            Explorar
          </h3>
          <ul className="mt-5 flex flex-col gap-3 text-white/80">
            <li>
              <Link href="/" className="transition-colors hover:text-white">
                Inicio
              </Link>
            </li>
            <li>
              <Link
                href="/servicios"
                className="transition-colors hover:text-white"
              >
                Servicios
              </Link>
            </li>
            <li>
              <Link href="/bar" className="transition-colors hover:text-white">
                Bar
              </Link>
            </li>
            <li>
              <Link
                href="/#visitanos"
                className="transition-colors hover:text-white"
              >
                Visítanos
              </Link>
            </li>
            <li>
              <Link
                href="/#resenas"
                className="transition-colors hover:text-white"
              >
                Reseñas
              </Link>
            </li>
            <li>
              <Link
                href="/#team"
                className="transition-colors hover:text-white"
              >
                Equipo
              </Link>
            </li>
          </ul>
        </nav>

        {/* Contact */}
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-white/50">
            Contacto
          </h3>
          <ul className="mt-5 flex flex-col gap-3 text-white/80">
            <li>
              <a
                href="tel:+18094674141"
                className="flex items-center gap-3 transition-colors hover:text-white"
              >
                <FiPhone className="shrink-0 text-oxblood-light" />
                +1 809 467 4141
              </a>
            </li>
            <li>
              <a
                href="mailto:aurafdls19@hotmail.com"
                className="flex items-center gap-3 break-all transition-colors hover:text-white"
              >
                <FiMail className="shrink-0 text-oxblood-light" />
                aurafdls19@hotmail.com
              </a>
            </li>
            <li>
              <a
                href="https://wa.me/18094674141"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 transition-colors hover:text-white"
              >
                <FaWhatsapp className="shrink-0 text-oxblood-light" />
                Escríbenos por WhatsApp
              </a>
            </li>
          </ul>
        </div>

        {/* Visit */}
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-white/50">
            Visítanos
          </h3>
          <Link
            href="https://maps.app.goo.gl/FVqNF2viganCoi3D7"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 flex items-start gap-3 text-white/80 transition-colors hover:text-white"
          >
            <FiMapPin className="mt-1 shrink-0 text-oxblood-light" />
            <span>
              Club de Leones 9<br />
              Santo Domingo Este, R.D.
            </span>
          </Link>
          <div className="mt-5 text-white/60">
            <p>Lun–Sáb · 9 AM–9 PM</p>
            <p>Domingo · 9 AM–1 PM</p>
          </div>
          <div className="mt-6">
            <Booking
              button={
                <button className="rounded-full bg-oxblood px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-oxblood-light">
                  Haz tu cita
                </button>
              }
            />
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-x flex flex-col items-center justify-between gap-2 py-6 text-sm text-white/50 sm:flex-row">
          <p>© {new Date().getFullYear()} Salon Aura. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
