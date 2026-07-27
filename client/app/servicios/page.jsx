"use client";

import React, { useEffect, useState } from "react";
import Booking from "@/components/Booking";
import { motion, useReducedMotion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const reduce = useReducedMotion();

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch("/api/services");
        const data = await response.json();
        setServices(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching services:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  return (
    <main className="bg-cream">
      {/* Header */}
      <header className="warm-grain bg-cream-deep pb-14 pt-32 md:pb-20 md:pt-40">
        <div className="container-x max-w-3xl">
          <span className="kicker">Carta de servicios</span>
          <h1 className="mt-4 text-display font-semibold text-ink">
            Servicios
          </h1>
          <p className="mt-5 max-w-[52ch] text-lg leading-relaxed text-ink-soft">
            Desde un corte hasta una transformación completa. Elige el servicio
            que buscas y agenda en segundos.
          </p>
        </div>
      </header>

      {/* List */}
      <div className="container-x py-[var(--section-y)]">
        {loading ? (
          <div className="flex flex-col gap-24">
            {[0, 1, 2].map((n) => (
              <div
                key={n}
                className="flex animate-pulse flex-col gap-8 lg:flex-row lg:items-center"
              >
                <div className="h-[360px] w-full rounded-4xl bg-stone/60 md:h-[440px]" />
                <div className="flex w-full flex-col gap-4">
                  <div className="h-8 w-2/3 rounded-full bg-stone/60" />
                  <div className="h-4 w-full rounded-full bg-stone/50" />
                  <div className="h-4 w-5/6 rounded-full bg-stone/50" />
                  <div className="mt-2 h-10 w-32 rounded-full bg-stone/60" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-20 md:gap-28">
            {services.map((service, i) => (
              <motion.article
                key={service.id}
                initial={reduce ? { opacity: 0 } : { opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className={`flex flex-col items-center gap-8 lg:gap-16 ${
                  i % 2 === 1 ? "lg:flex-row-reverse" : "lg:flex-row"
                }`}
              >
                <div className="w-full lg:w-[55%]">
                  <div className="overflow-hidden rounded-4xl shadow-soft">
                    <img
                      src={service.image}
                      alt={service.name}
                      className="h-[340px] w-full object-cover md:h-[460px]"
                    />
                  </div>
                </div>
                <div className="flex w-full flex-col items-start gap-5 lg:w-[45%]">
                  <span className="text-sm font-medium text-oxblood">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h2 className="text-headline font-semibold text-ink">
                    {service.name}
                  </h2>
                  <p className="text-lg leading-relaxed text-ink-soft">
                    {service.description}
                  </p>
                  <p className="flex items-baseline gap-2">
                    {service.isVariable && (
                      <span className="text-base text-ink-soft">Desde</span>
                    )}
                    <span className="text-3xl font-semibold text-ink">
                      RD${service.price}
                    </span>
                  </p>
                  <Booking
                    button={
                      <button className="mt-2 w-full rounded-full bg-oxblood px-8 py-4 text-lg font-medium text-white transition-transform hover:-translate-y-0.5 hover:bg-oxblood-deep sm:w-auto">
                        Agenda tu cita
                      </button>
                    }
                  />
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </div>

      {/* Closing CTA */}
      <section className="bg-oxblood py-[var(--section-y)] text-center text-white">
        <div className="container-x flex flex-col items-center">
          <h2 className="text-headline font-semibold">
            ¿No sabes cuál elegir?
          </h2>
          <p className="mt-4 max-w-[46ch] text-lg leading-relaxed text-white/85">
            Cuéntanos qué buscas y te ayudamos a encontrar el servicio ideal
            para ti.
          </p>
          <a
            href="https://wa.me/18094674141"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-lg font-medium text-oxblood transition-transform hover:-translate-y-0.5"
          >
            <FaWhatsapp className="text-xl" /> Escríbenos por WhatsApp
          </a>
        </div>
      </section>
    </main>
  );
};

export default Services;
