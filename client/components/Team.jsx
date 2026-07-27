"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { FiArrowUpRight } from "react-icons/fi";

const panels = ["bg-rose", "bg-stone", "bg-sand", "bg-clay"];

const Team = () => {
  const [members, setMembers] = useState([]);
  const reduce = useReducedMotion();

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const res = await fetch("/api/members");
        const data = await res.json();
        setMembers(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching members:", error);
      }
    };
    fetchMembers();
  }, []);

  return (
    <section id="team" className="bg-cream py-[var(--section-y)]">
      <div className="container-x">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <span className="kicker">Nuestro equipo</span>
            <h2 className="mt-4 text-headline font-semibold text-ink">
              Manos talentosas y creativas
            </h2>
            <p className="mt-5 max-w-[48ch] text-lg leading-relaxed text-ink-soft">
              Deja tu look en manos de un equipo que ama lo que hace y cuida
              cada detalle como si fuera propio.
            </p>
          </div>
          <a href="mailto:aurafdls19@hotmail.com" className="w-max">
            <button className="group inline-flex items-center gap-2 rounded-full border border-ink/20 px-7 py-4 text-base font-medium text-ink transition-colors hover:border-oxblood hover:text-oxblood">
              Únete al equipo
              <FiArrowUpRight className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </a>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {members.map((member, i) => (
            <motion.figure
              key={member.id}
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 0.7,
                delay: i * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="group"
            >
              <div
                className={`relative flex h-[26rem] items-end justify-center overflow-hidden rounded-4xl ${
                  panels[i % panels.length]
                }`}
              >
                <img
                  src={member.image}
                  alt={`${member.name}, ${member.role} en Salon Aura`}
                  className="pointer-events-none h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </div>
              <figcaption className="mt-4">
                <h3 className="text-xl font-semibold text-ink">
                  {member.name}
                </h3>
                <p className="text-ink-soft">{member.role}</p>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
