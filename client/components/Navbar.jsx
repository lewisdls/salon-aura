"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AiOutlineMenu } from "react-icons/ai";

const NavLinks = () => {
  return (
    <>
      <Link href="/" onClick={() => window.scrollTo(0, 0)}>
        Inicio
      </Link>
      <Link href="/servicios" onClick={() => window.scrollTo(0, 0)}>
        Servicios
      </Link>
      <p>Sobre Nosotros</p>
    </>
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [navbar, setNavBar] = useState(false);
  const pathname = usePathname();

  const handleMenu = () => {
    setIsOpen(!isOpen);
  };

  const changeBg = () => {
    if (window.scrollY >= 80) {
      setNavBar(true);
    } else {
      setNavBar(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", changeBg);
  }, []);

  return (
    <div
      className={`flex items-center justify-between px-8 md:px-12 py-4 text-lg bg-transparent fixed top-0 w-full text-white z-50 transition-all
          ${navbar ? " active-navbar" : ""} ${
        pathname !== "/" ? " active-navbar" : ""
      }`}
    >
      <div className="hidden md:bg-transparent md:static md:flex flex-col md:flex-row justify-center md:justify-start items-center gap-6">
        <NavLinks />
      </div>
      <Link href="/" className="playfair text-[2.3rem] md:text-5xl font-medium">
        Salon Aura
      </Link>
      <div className="flex items-center gap-6">
        <Link
          href="/#booking"
          className="bg-white py-3 px-4 text-black rounded-full hidden md:block"
        >
          Contáctanos
        </Link>
        <button
          onClick={handleMenu}
          className="md:hidden rounded-full z-10 text-3xl"
        >
          {isOpen ? "X" : <AiOutlineMenu />}
        </button>
      </div>
      {isOpen && (
        <div className="absolute h-[100vh] bg-black top-0 left-0 right-0 md:h-auto md:bg-transparent md:static flex md:hidden flex-col md:flex-row justify-center md:justify-start items-center gap-6">
          <NavLinks />
        </div>
      )}
    </div>
  );
};

export default Navbar;
