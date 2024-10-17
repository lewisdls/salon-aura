"use client";

import { motion } from "framer-motion";
import globalApi from "@/api/globalApi";
import Link from "next/link";
import { useState, useEffect } from "react";
import Booking from "./Booking";

const Hero = () => {
  const [header, setHeader] = useState();

  useEffect(() => {
    getHeader();
  }, []);

  const getHeader = () => {
    globalApi.getHeader().then((res) => {
      setHeader(res.data.data);
    });
  };
  return (
    <motion.div
      initial={{ opacity: -1 }}
      whileInView={{ opacity: 1 }}
      transition={{
        duration: 1,
        ease: [0, 0.71, 0.2, 1.01],
      }}
      style={{
        backgroundImage: `url(http://localhost:1337${header?.image.url})`,
      }}
      className="bg-cover bg-center h-[90vh] text-white"
    >
      <div className="h-full flex flex-col items-center md:items-start text-center md:text-left justify-center gap-10 mx-16">
        <div>
          <h1 className="text-5xl md:text-6xl leading-tight md:leading-snug font-semibold">
            {header?.heading}
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
          {header?.subtitle}
        </p>
      </div>
    </motion.div>
  );
};

export default Hero;
