"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";

const categories = [
  {
    name: "Cortes",
    copy: "Cortes y peinados pensados para tu estilo propio.",
    image: "/short-hair.png",
    bg: "bg-oxblood",
    text: "text-white",
  },
  {
    name: "Coloraciones",
    copy: "Color, mechas y diseños hechos a tu medida.",
    image: "/dyed-hair.png",
    bg: "bg-clay",
    text: "text-ink",
  },
  {
    name: "Extensiones",
    copy: "Volumen y largo con acabado natural.",
    image: "/blonde-hair.png",
    bg: "bg-sand",
    text: "text-ink",
  },
];

const Services = () => {
  const reduce = useReducedMotion();

  return (
    <section
      id="services"
      className="warm-grain bg-cream py-[var(--section-y)]"
    >
      <div className="container-x">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <span className="kicker">Nuestros servicios</span>
            <h2 className="mt-4 text-headline font-semibold text-ink">
              Todo lo que tu estilo necesita
            </h2>
            <p className="mt-5 max-w-[48ch] text-lg leading-relaxed text-ink-soft">
              Más allá del corte, cuidamos cada detalle: coloración,
              extensiones, tratamientos, uñas y más. Descubre la gama completa.
            </p>
          </div>
          <Link
            href="/servicios"
            onClick={() => window.scrollTo(0, 0)}
            className="group inline-flex w-max items-center gap-2 rounded-full bg-ink px-7 py-4 text-base font-medium text-cream transition-colors hover:bg-oxblood"
          >
            Ver todos los servicios
            <FiArrowUpRight className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.name}
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 0.7,
                delay: i * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className={i === 1 ? "md:mt-10" : ""}
            >
              <Link
                href="/servicios"
                onClick={() => window.scrollTo(0, 0)}
                className={`group relative flex h-[24rem] flex-col overflow-hidden rounded-4xl p-7 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift ${cat.bg} ${cat.text}`}
              >
                <div className="relative z-10 flex items-start justify-between">
                  <h3 className="text-title font-semibold">{cat.name}</h3>
                  <span
                    className={`grid h-10 w-10 place-items-center rounded-full transition-colors ${
                      cat.text === "text-white"
                        ? "bg-white/15 group-hover:bg-white/25"
                        : "bg-ink/10 group-hover:bg-ink/20"
                    }`}
                  >
                    <FiArrowUpRight className="text-lg" />
                  </span>
                </div>
                <p
                  className={`relative z-10 mt-3 max-w-[22ch] text-sm leading-relaxed ${
                    cat.text === "text-white" ? "text-white/85" : "text-ink/75"
                  }`}
                >
                  {cat.copy}
                </p>
                <img
                  src={cat.image}
                  alt=""
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 bottom-0 mx-auto h-[75%] w-auto object-contain object-bottom drop-shadow-2xl transition-transform duration-500 group-hover:scale-[1.04]"
                />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
