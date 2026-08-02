"use client";

import Booking from "@/components/Booking";
import React, { useEffect, useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";

const BarPage = () => {
    const [drinks, setDrinks] = useState([]);
    const [loading, setLoading] = useState(true);
    const reduce = useReducedMotion();

    useEffect(() => {
      const fetchDrinks = async () => {
        try {
          const response = await fetch("/api/drinks");
          const data = await response.json();
          setDrinks(Array.isArray(data) ? data : []);
        } catch (error) {
          console.error("Error fetching drinks:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchDrinks();
    }, []);

    // Group the flat drinks list into one entry per category, preserving the
    // API's price ordering within each group and the first-seen order of the
    // categories themselves.
    const categories = useMemo(() => {
      const groups = new Map();
      for (const drink of drinks) {
        if (!groups.has(drink.category)) groups.set(drink.category, []);
        groups.get(drink.category).push(drink);
      }
      return Array.from(groups, ([name, items]) => ({ name, items }));
    }, [drinks]);

  return (
    <main className="bg-cream">
      {/* Header */}
      <header className="warm-grain bg-cream-deep pb-14 pt-32 md:pb-20 md:pt-40">
        <div className="container-x max-w-3xl">
          <span className="kicker">Carta del bar</span>
          <h1 className="mt-4 text-display font-semibold text-ink">Bar</h1>
          <p className="mt-5 max-w-[52ch] text-lg leading-relaxed text-ink-soft">
            Cócteles, vinos y tragos de especialidad para acompañar tu visita.
            Relájate y disfruta mientras te consentimos.
          </p>
        </div>
      </header>

      {/* Menu */}
      <div className="container-x flex flex-col gap-16 py-[var(--section-y)] md:gap-24">
        {loading &&
          [3, 4].map((rows, gi) => (
            <div
              key={gi}
              className="animate-pulse motion-reduce:animate-none"
              aria-hidden="true"
            >
              <div className="flex items-baseline gap-4">
                <div className="h-4 w-6 rounded bg-stone/70" />
                <div className="h-9 w-56 rounded-lg bg-stone/70" />
              </div>
              <ul className="mt-8 grid gap-x-14 gap-y-7 md:grid-cols-2">
                {Array.from({ length: rows }).map((_, i) => (
                  <li key={i} className="flex flex-col gap-2.5 pb-5">
                    <div className="flex items-baseline gap-3">
                      <div className="h-5 w-32 rounded bg-stone/70" />
                      <div className="flex-1 border-b border-dashed border-ink/10" />
                      <div className="h-5 w-14 rounded bg-stone/70" />
                    </div>
                    <div className="h-3 w-3/4 rounded bg-stone/50" />
                  </li>
                ))}
              </ul>
            </div>
          ))}

        {loading && (
          <span className="sr-only" role="status">
            Cargando la carta del bar…
          </span>
        )}

        {categories.map((group, gi) => (
          <motion.section
            key={group.name}
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-baseline gap-4">
              <span className="text-sm font-medium text-oxblood">
                {String(gi + 1).padStart(2, "0")}
              </span>
              <h2 className="text-headline font-semibold text-ink">
                {group.name}
              </h2>
            </div>

            <ul className="mt-8 grid gap-x-14 gap-y-7 md:grid-cols-2">
              {group.items.map((item) => (
                <li
                  key={item.id}
                  className={`flex flex-col gap-1 ${item.description ? "border-b border-ink/10" : ""} pb-5`}
                >
                  <div className="flex items-baseline gap-3">
                    <span className="text-xl font-semibold text-ink">
                      {item.name}
                    </span>
                    <span className="flex-1 border-b border-dashed border-ink/20" />
                    <span className="text-lg font-semibold text-ink">
                      RD${item.price}
                    </span>
                  </div>
                  {item.description && (
                    <p className="max-w-[42ch] text-sm leading-relaxed text-ink-soft">
                      {item.description}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          </motion.section>
        ))}

        {!loading && (
          <p className="text-sm text-ink-soft">
            Los precios están en pesos dominicanos (RD$) e incluyen impuestos.
            Consulta con nuestro equipo por la disponibilidad del día.
          </p>
        )}
      </div>

      {/* Closing CTA */}
      <section className="bg-oxblood py-[var(--section-y)] text-center text-white">
        <div className="container-x flex flex-col items-center">
          <h2 className="text-headline font-semibold">
            Reserva tu cita y disfruta una copa
          </h2>
          <p className="mt-4 max-w-[46ch] text-lg leading-relaxed text-white/85">
            Agenda tu servicio y déjanos consentirte de principio a fin, con una
            bebida de cortesía en nuestro bar.
          </p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row">
            <Booking
              button={
                <button className="rounded-full bg-white px-8 py-4 text-lg font-medium text-oxblood transition-transform hover:-translate-y-0.5">
                  Agenda tu cita
                </button>
              }
            />
            <a
              href="https://wa.me/18094674141"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/40 px-8 py-4 text-lg font-medium text-white transition-colors hover:bg-white/10"
            >
              <FaWhatsapp className="text-xl" /> Escríbenos
            </a>
          </div>
        </div>
      </section>
    </main>
  );
};

export default BarPage;
