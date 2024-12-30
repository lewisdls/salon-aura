"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";
import Booking from "./Booking";

const Hero = () => {
  return (
    <motion.div
      initial={{ opacity: -1 }}
      whileInView={{ opacity: 1 }}
      transition={{
        duration: 1,
        ease: [0, 0.71, 0.2, 1.01],
      }}
      className="bg-cover bg-center h-[90vh] text-white bg-[url('/hero-img.jpg')]"
    >
      <div className="h-full flex flex-col items-center md:items-start text-center md:text-left justify-center gap-10 mx-16">
        <div>
          <h1 className="text-5xl md:text-6xl leading-tight md:leading-snug font-semibold">
            Date El Look Que Te Mereces
          </h1>
          <Booking
            button={
              <button className="bg-[#9E2B2A] px-6 py-2 rounded-full mt-6 text-xl">
                Agenda tu cita
              </button>
            }
          />
        </div>
        <p className="text-xl font-light leading-relaxed md:w-[55%]">
          Descubra un mundo de sofisticación y belleza personalizada en Salon
          Aura. Nuestro salón es más que un lugar para cortarse el pelo, es un
          refugio donde su estilo único es el centro de atención.
        </p>
      </div>
    </motion.div>
  );
};

export default Hero;
