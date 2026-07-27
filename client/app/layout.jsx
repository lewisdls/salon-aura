import "./globals.css";
import { Outfit } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "sonner";
import { Analytics } from "@vercel/analytics/react"

export const metadata = {
  title: "Salon Aura — Peluquería y Belleza en Santo Domingo Este",
  description:
    "Cortes, color, extensiones y tratamientos en un salón cálido y personal. Agenda tu cita en Salon Aura, Santo Domingo Este.",
};

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-outfit",
  display: "swap",
});

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={outfit.variable}>
      <body className={outfit.className}>
        <Navbar />
        {children}
        <Toaster position="top-center" richColors />
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
