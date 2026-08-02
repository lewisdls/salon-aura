"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import Booking from "./Booking";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY >= 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Transparent (over hero) only on the home page, at the top, menu closed.
  const solid = !isHome || scrolled || isOpen;

  const links = [
    { href: "/", label: "Inicio" },
    { href: "/servicios", label: "Servicios" },
    { href: "/bar", label: "Bar" },
    { href: "/#visitanos", label: "Visítanos" },
  ];

  const close = () => setIsOpen(false);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-[var(--z-nav)] transition-colors duration-300 ${
        solid
          ? "bg-cream/85 backdrop-blur-md border-b border-ink/10 text-ink"
          : "bg-transparent text-white"
      }`}
    >
      <nav className="container-x flex items-center justify-between py-4">
        {/* Left: desktop links */}
        <div className="hidden md:flex items-center gap-8 text-[0.95rem] font-medium flex-1">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => {
                if (l.href === "/") window.scrollTo(0, 0);
                close();
              }}
              className="relative py-1 transition-opacity hover:opacity-70 after:absolute after:left-0 after:-bottom-0.5 after:h-px after:w-0 after:bg-current after:transition-all hover:after:w-full"
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* Center: wordmark */}
        <Link
          href="/"
          onClick={() => {
            window.scrollTo(0, 0);
            close();
          }}
          className="text-2xl md:text-[1.75rem] font-semibold tracking-tight md:flex-1 md:text-center"
        >
          Salon <span className={solid ? "text-oxblood" : ""}>Aura</span>
        </Link>

        {/* Right: CTA + mobile toggle */}
        <div className="flex items-center justify-end gap-3 md:flex-1">
          <div className="hidden md:block">
            <Booking
              button={
                <button className="rounded-full bg-oxblood px-5 py-2.5 text-sm font-medium text-white shadow-soft transition-transform hover:-translate-y-0.5 hover:bg-oxblood-deep">
                  Agenda tu cita
                </button>
              }
            />
          </div>
          <button
            onClick={() => setIsOpen((v) => !v)}
            className="md:hidden text-2xl p-1"
            aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={isOpen}
          >
            {isOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-cream text-ink border-t border-ink/10">
          <div className="container-x flex flex-col gap-1 py-6">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => {
                  if (l.href === "/") window.scrollTo(0, 0);
                  close();
                }}
                className="py-3 text-xl font-medium border-b border-ink/5"
              >
                {l.label}
              </Link>
            ))}
            <div className="pt-5">
              <Booking
                button={
                  <button className="w-full rounded-full bg-oxblood px-6 py-3.5 text-base font-medium text-white">
                    Agenda tu cita
                  </button>
                }
              />
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
