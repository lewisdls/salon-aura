"use client";

import React, { useEffect, useState } from "react";
import Booking from "@/components/Booking";
import { motion } from "framer-motion";

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch("/api/services");
        const data = await response.json();
        setServices(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };
    fetchServices();
  }, []);

  return (
    <div className="p-6 md:p-16 flex items-center bg-[#FAF5F1] w-full">
      <motion.div
        initial={{ opacity: -1 }}
        whileInView={{ opacity: 1 }}
        transition={{
          duration: 1,
          ease: [0, 0.71, 0.2, 1.01],
        }}
        className="flex flex-col gap-10 md:gap-20 w-full min-h-screen"
      >
        <h1 className="text-5xl md:text-6xl leading-tight md:leading-snug font-semibold text-center">
          Servicios
        </h1>
        <div className="flex flex-col gap-20 w-full">
          {loading
            ? "Loading..."
            : services.map((service) => (
                <div
                  key={service.id}
                  className="flex flex-col lg:flex-row items-center w-full gap-10"
                >
                  <div className="w-full h-[400px] md:h-[500px]">
                    <img
                      src={service.image}
                      className="object-cover w-full h-full rounded-xl"
                      alt=""
                    />
                  </div>
                  <div className="w-full flex flex-col gap-6 items-center text-center md:items-start md:text-left">
                    <h2 className="text-3xl md:text-4xl font-medium">
                      {service.name}
                    </h2>
                    <p className="text-xl leading-relaxed">
                      {service.description}
                    </p>
                    <p className="text-xl font-medium">RD${service.price}</p>
                    <Booking
                      button={
                        <button className="md:self-start bg-[#9E2B2A] text-white text-lg py-3 px-6 rounded-full mt-4 w-full md:w-auto">
                          Agenda tu cita
                        </button>
                      }
                    />
                  </div>
                </div>
              ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Services;
