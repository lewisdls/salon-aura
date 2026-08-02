"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";
import { FaMartiniGlassCitrus, FaWineGlass, FaBottleWater } from "react-icons/fa6";

const highlights = [
  { icon: FaMartiniGlassCitrus, label: "Cócteles de autor" },
  { icon: FaWineGlass, label: "Vinos & espumosos" },
  { icon: FaBottleWater, label: "Bebidas refrescantes" },
];

const Bar = () => {
  const reduce = useReducedMotion();

  return (
    <section id="bar" className="bg-charcoal py-[var(--section-y)] text-white">
      <div className="container-x grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        {/* Copy */}
        <div>
          <span className="kicker text-white/70">El bar</span>
          <h2 className="mt-4 text-headline font-semibold">
            Una copa mientras te consientes
          </h2>
          <p className="mt-5 max-w-[46ch] text-lg leading-relaxed text-white/80">
            Nuestro bar es parte de la experiencia Aura: relájate con un cóctel,
            una copa de vino o una bebida refrescante mientras nuestro equipo se encarga de
            ti. Un espacio pensado para disfrutar sin prisa.
          </p>

          <ul className="mt-8 flex flex-wrap gap-x-8 gap-y-4">
            {highlights.map((h) => {
              const Icon = h.icon;
              return (
                <li key={h.label} className="flex items-center gap-3 text-white/85">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white/10 text-lg text-oxblood-light">
                    <Icon />
                  </span>
                  <span className="text-sm font-medium">{h.label}</span>
                </li>
              );
            })}
          </ul>

          <Link
            href="/bar"
            onClick={() => window.scrollTo(0, 0)}
            className="group mt-10 inline-flex w-max items-center gap-2 rounded-full bg-white px-7 py-4 text-base font-medium text-charcoal transition-colors hover:bg-oxblood-light hover:text-white"
          >
            Ver la carta del bar
            <FiArrowUpRight className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        {/* Visual — swap this block for a real photo:
            <img src="/bar.jpg" alt="El bar de Salon Aura" className="h-full w-full rounded-4xl object-cover" /> */}
        <motion.div
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative grid h-[24rem] place-items-center overflow-hidden rounded-4xl bg-gradient-to-br from-oxblood-deep via-oxblood to-charcoal shadow-lift md:h-[30rem]"
        >
          <FaMartiniGlassCitrus className="text-7xl text-white/25" />
          <span className="absolute bottom-6 left-6 text-sm font-medium uppercase tracking-wide text-white/50">
            Foto próximamente
          </span>
        </motion.div>
      </div>
    </section>
  );
};

export default Bar;
