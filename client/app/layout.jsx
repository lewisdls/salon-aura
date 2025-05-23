import "./globals.css";
import { Outfit } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "sonner";
import { Analytics } from "@vercel/analytics/react"

export const metadata = {
  title: "Salon Aura",
  description: "Relájate y deja tu belleza en nuestras manos",
};

const outfit = Outfit({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={outfit.className}>
        <Navbar />
        {children}
        <Toaster />
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
