"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";

const Team = () => {
  const [current, setCurrent] = useState(0);
  const [members, setMembers] = useState([]);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const res = await fetch("/api/members");
        const data = await res.json();
        setMembers(data);
      } catch (error) {
        console.error("Error fetching members:", error);
      }
    };
    fetchMembers();
  }, []);

  const prevSlide = () => {
    current !== 0 && setCurrent(current - 1);
  };

  const nextSlide = () => {
    current === members.length - 1 ? setCurrent(0) : setCurrent(current + 1);
  };
  return (
    <div
      id="team"
      className="bg-[#FAF5F1] py-12 px-6 md:py-24 md:px-16 flex flex-col md:flex-row md:justify-between gap-20 text-center md:text-left overflow-hidden"
    >
      <motion.div
        initial={{ opacity: -1, translateX: -100 }}
        whileInView={{ opacity: 1, translateX: 0 }}
        transition={{
          duration: 1,
          delay: 0.2,
          ease: [0, 0.71, 0.2, 1.01],
        }}
        className="flex flex-col items-center gap-6 lg:gap-0 md:items-start justify-between"
      >
        <div className="flex flex-col gap-6">
          <h1 className="text-5xl md:text-6xl">Nuestro Equipo</h1>
          <p className="text-xl font-light leading-relaxed">
            Deja tu look en las manos de nuestro equipo de talentosas y
            creativas estilistas.
          </p>
        </div>
        <div className="hidden md:flex items-center gap-6">
          <a className="md:flex" href="mailto:aurafdls19@hotmail.com">
            <button className="bg-[#9E2B2A] text-white text-lg font-normal py-4 px-6 rounded-full md:w-max">
              Unete al equipo
            </button>
          </a>
          <div className="flex items-center gap-2">
            <button
              onClick={prevSlide}
              className="p-4 rounded-full bg-black text-white"
              aria-label="Previous"
            >
              <FaArrowLeft />
            </button>
            <button
              onClick={nextSlide}
              className="p-4 rounded-full text-gray-500 border-gray-400 border-[1px]"
              aria-label="Next"
            >
              <FaArrowRight />
            </button>
          </div>
        </div>
      </motion.div>
      <motion.div
        className="overflow-hidden"
        initial={{ opacity: -1, translateX: 100 }}
        whileInView={{ opacity: 1, translateX: 0 }}
        transition={{
          duration: 0.8,
          delay: 0.4,
          ease: [0, 0.71, 0.2, 1.01],
        }}
      >
        <motion.div
          className={`flex flex-col md:flex-row gap-10 lg:gap-6 transition-all duration-300`}
          style={{ transform: `translateX(-${current * 349}px)` }}
        >
          {members?.map((member) => {
            return (
              <div key={member.id} className="flex flex-col w-full">
                <div
                  className={`h-[375px] lg:w-[325px] bg-[#DAD1C9] rounded-3xl flex items-end justify-center`}
                >
                  <img
                    src={member.image}
                    alt=""
                    className="object-cover pointer-events-none h-[350px]"
                  />
                </div>
                <div className="flex flex-col mt-4">
                  <h2 className="text-2xl">{member.name}</h2>
                  <p className="text-base font-light">{member.role}</p>
                </div>
              </div>
            );
          })}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Team;
