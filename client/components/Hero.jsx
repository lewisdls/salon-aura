"use client";

import { motion, useReducedMotion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";
import { FiClock, FiMapPin, FiHeart } from "react-icons/fi";
import Booking from "./Booking";

const Hero = () => {
  const reduce = useReducedMotion();

  const rise = (delay = 0) => ({
    initial: reduce ? { opacity: 0 } : { opacity: 0, y: 22 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] },
  });

  return (
    <section className="relative flex min-h-[92vh] w-full flex-col overflow-hidden text-white">
      {/* Photograph */}
      <div className="absolute inset-0 bg-[url('/hero-img.jpg')] bg-cover bg-center" />
      {/* Warm scrim: darker toward the bottom-left where the copy sits */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, rgba(18,18,18,0.86) 0%, rgba(124,31,30,0.42) 42%, rgba(18,18,18,0.18) 100%)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to right, rgba(18,18,18,0.55) 0%, rgba(18,18,18,0.05) 55%, transparent 100%)",
        }}
      />

      {/* Content */}
      <div className="container-x relative z-10 flex flex-1 flex-col justify-end pb-14 pt-28 md:pb-16">

        <motion.h1
          {...rise(0.12)}
          className="mt-5 max-w-[16ch] text-display font-semibold"
        >
          Date el look que te mereces
        </motion.h1>

        <motion.p
          {...rise(0.2)}
          className="mt-6 max-w-[46ch] text-lg font-light leading-relaxed text-white/90 md:text-xl"
        >
          Más que un lugar para cortarte el pelo, un refugio cálido donde tu
          estilo único es el centro de atención.
        </motion.p>

        <motion.div
          {...rise(0.28)}
          className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
        >
          <Booking
            button={
              <button className="rounded-full bg-oxblood px-8 py-4 text-lg font-medium text-white shadow-lift transition-transform hover:-translate-y-0.5 hover:bg-oxblood-deep">
                Agenda tu cita
              </button>
            }
          />
          <a
            href="https://wa.me/18094674141"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 rounded-full border border-white/40 bg-white/5 px-8 py-4 text-lg font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/15"
          >
            <FaWhatsapp className="text-xl" /> Escríbenos
          </a>
        </motion.div>
      </div>

      {/* Info bar */}
      <motion.div
        {...rise(0.4)}
        className="relative z-10 border-t border-white/15 bg-charcoal/40 backdrop-blur-md"
      >
        <dl className="container-x grid grid-cols-1 divide-y divide-white/10 py-4 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          <div className="flex items-center gap-3 py-3 sm:py-1 sm:pr-6">
            <FiClock className="shrink-0 text-xl text-clay" />
            <div>
              <dt className="text-xs uppercase tracking-wide text-white/75">
                Horario
              </dt>
              <dd className="text-sm font-medium">Lun–Sáb · 9 AM–9 PM</dd>
            </div>
          </div>
          <div className="flex items-center gap-3 py-3 sm:py-1 sm:px-6">
            <FiMapPin className="shrink-0 text-xl text-clay" />
            <div>
              <dt className="text-xs uppercase tracking-wide text-white/75">
                Ubicación
              </dt>
              <dd className="text-sm font-medium">
                Club de Leones 9, Santo Domingo Este
              </dd>
            </div>
          </div>
          <div className="flex items-center gap-3 py-3 sm:py-1 sm:pl-6">
            <FiHeart className="shrink-0 text-xl text-clay" />
            <div>
              <dt className="text-xs uppercase tracking-wide text-white/75">
                Clientes felices
              </dt>
              <dd className="text-sm font-medium">+100 y contando</dd>
            </div>
          </div>
        </dl>
      </motion.div>
    </section>
  );
};

export default Hero;
