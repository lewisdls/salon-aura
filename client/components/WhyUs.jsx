"use client";

import { motion, useReducedMotion } from "framer-motion";
import { FaPeopleGroup, FaStar, FaScissors, FaLeaf } from "react-icons/fa6";

const reasons = [
  {
    icon: FaScissors,
    title: "Equipo experto",
    text: "Estilistas con años de experiencia, siempre a la vanguardia de las últimas tendencias.",
  },
  {
    icon: FaLeaf,
    title: "Productos premium",
    text: "Trabajamos con las mejores marcas del mercado: resultados efectivos y seguros para tu salud.",
  },
  {
    icon: FaStar,
    title: "Ambiente que relaja",
    text: "Un espacio cómodo, moderno y acogedor, diseñado para que desconectes y te consientas.",
  },
  {
    icon: FaPeopleGroup,
    title: "Trato personal",
    text: "Escuchamos tus necesidades y adaptamos cada servicio para que salgas sintiéndote increíble.",
  },
];

const WhyUs = () => {
  const reduce = useReducedMotion();

  return (
    <section id="about" className="bg-oxblood py-[var(--section-y)] text-white">
      <div className="container-x grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        {/* Left: statement + stats */}
        <div className="flex flex-col justify-between gap-12">
          <div>
            <span className="kicker text-white/80">Por qué nosotros</span>
            <h2 className="mt-4 text-headline font-semibold">
              Tu belleza y bienestar, nuestra prioridad
            </h2>
            <p className="mt-5 max-w-[42ch] text-lg leading-relaxed text-white/85">
              Calidad y profesionalismo en cada servicio. Cada visita a Salon
              Aura está pensada para que te sientas cuidada de principio a fin.
            </p>
          </div>
          <div className="flex gap-12">
            <div>
              <p className="text-5xl font-semibold tracking-tight md:text-6xl">
                +100
              </p>
              <p className="mt-1 text-sm text-white/70">Clientes satisfechos</p>
            </div>
            <div className="border-l border-white/20 pl-12">
              <p className="text-5xl font-semibold tracking-tight md:text-6xl">
                100%
              </p>
              <p className="mt-1 text-sm text-white/70">Estilo personalizado</p>
            </div>
          </div>
        </div>

        {/* Right: reasons as a divided list */}
        <ul className="divide-y divide-white/15 border-y border-white/15">
          {reasons.map((r, i) => {
            const Icon = r.icon;
            return (
              <motion.li
                key={r.title}
                initial={reduce ? { opacity: 0 } : { opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.6,
                  delay: i * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="flex items-start gap-5 py-6"
              >
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-oxblood-light text-xl">
                  <Icon />
                </span>
                <div>
                  <h3 className="text-xl font-semibold">{r.title}</h3>
                  <p className="mt-1.5 max-w-[52ch] leading-relaxed text-white/80">
                    {r.text}
                  </p>
                </div>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default WhyUs;
