"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const Services = () => {
  return (
    <div
      id="services"
      className="bg-[#FAF5F1] py-12 px-6 md:py-24 md:px-16 flex flex-col md:flex-row md:justify-between gap-10 text-center md:text-left overflow-hidden"
    >
      <motion.div
        className="box flex flex-col gap-6"
        initial={{ opacity: 0, translateX: -100 }}
        whileInView={{ opacity: 1, translateX: 0 }}
        transition={{
          duration: 0.8,
          delay: 0.2,
          ease: [0, 0.71, 0.2, 1.01],
        }}
      >
        <h1 className="text-5xl md:text-6xl">Nuestros Servicios</h1>
        <p className="text-xl font-light leading-relaxed">
          Más allá de los cortes de pelo, descubra una amplia gama de servicios,
          desde la coloración hasta las extensiones.
        </p>
        <Link
          href="/servicios"
          onClick={() => {
            window.scrollTo(0, 0);
          }}
          className="md:self-start mt-6 bg-[#9E2B2A] text-white text-lg font-normal py-4 px-6 rounded-full md:w-max"
        >
          Ver todos los servicios
        </Link>
      </motion.div>
      <motion.div
        className="grid md:grid-cols-2 lg:grid-cols-3 w-full gap-6"
        initial={{ opacity: -1, translateX: 100 }}
        whileInView={{ opacity: 1, translateX: 0 }}
        transition={{
          duration: 0.8,
          delay: 0.4,
          ease: [0, 0.71, 0.2, 1.01],
        }}
      >
        <div className="h-[300px] md:hover:h-[400px] transition-all duration-300 bg-[#9E2B2A] bg-[url('/short-hair.png')] bg-[length:250px_275px] bg-bottom bg-no-repeat rounded-3xl p-4">
          <button className="bg-[#FAF5F1] px-3 rounded-full text-xl font-medium">
            Cortes
          </button>
        </div>
        <div className="h-[300px] lg:h-[400px] bg-[#E8DAD2] bg-[url('/dyed-hair.png')] bg-[length:250px_250px] bg-bottom bg-no-repeat rounded-3xl p-4">
          <button className="bg-[#FAF5F1] px-3 rounded-full text-xl font-medium">
            Coloraciones
          </button>
        </div>
        <div className="h-[300px] md:hover:h-[400px] transition-all duration-300 bg-[#CFB0A6] bg-[url('/blonde-hair.png')] bg-[length:250px_250px] bg-bottom bg-no-repeat rounded-3xl p-4">
          <button className="bg-[#FAF5F1] px-3 rounded-full text-xl font-medium">
            Extensiones
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Services;
