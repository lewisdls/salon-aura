import Link from "next/link";
import { FaInstagram } from "react-icons/fa6";
import { FaWhatsapp } from "react-icons/fa";
import { FiMail } from "react-icons/fi";
import Booking from "./Booking";

const Footer = () => {
  return (
    <div className="bg-[#121212] py-12 px-6 md:p-16 flex flex-col md:grid md:grid-cols-3 items-center gap-10 text-center md:text-left text-white">
      <Link aria-label="Find our location" href="https://maps.app.goo.gl/FVqNF2viganCoi3D7" target="_blank">
        <img src="/map.png" alt="" className="rounded-3xl" />
      </Link>
      <div className="flex flex-col gap-10 items-center">
        <div className="flex flex-col gap-4">
          <h3 className="text-2xl">Contáctanos</h3>
          <p className="text-gray-400 font-light">+1 809 467 4141</p>
          <a
            className="text-gray-400 font-light"
            href="mailto:aurafdls19@hotmail.com"
          >
            aurafdls19@hotmail.com
          </a>
        </div>
        <div className="flex flex-col gap-4">
          <h3 className="text-2xl">Visítanos</h3>
          <p className="text-gray-400 font-light leading-relaxed">
            Club de Leones 9 <br /> Santo Domingo Este, R.D.
          </p>
        </div>
        <div className="flex gap-6 text-2xl">
          <Link aria-label="Visit our Instagram" href="https://www.instagram.com/salonaura_/" target="_blank">
            <FaInstagram />
          </Link>
          <Link aria-label="Text us" href="https://wa.me/18094674141" target="_blank">
            <FaWhatsapp />
          </Link>
          <Link aria-label="Email us" href="mailto:aurafdls19@hotmail.com">
            <FiMail />
          </Link>
        </div>
      </div>
      <div className="flex flex-col lg:items-end gap-6">
        <Link
          href="/"
          className="playfair text-[2.3rem] md:text-5xl font-medium"
        >
          Salon Aura
        </Link>
        <Booking
          button={
            <button className="bg-white text-black text-lg font-medium py-2 px-6 rounded-full md:w-max">
              Haz tu cita
            </button>
          }
        />
      </div>
    </div>
  );
};

export default Footer;
