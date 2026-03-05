"use client";

import { Playfair_Display, Lato } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-playfair",
  display: "swap",
});

const lato = Lato({
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
  variable: "--font-lato",
  display: "swap",
});

export default function Footer() {
  return (
    <footer
      className={`w-full ${lato.className} border-t border-black bg-gray-50/80 backdrop-blur-md`}
    >
      <div className="mx-auto max-w-7xl px-6 py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
          <p
            className={`${playfair.className} text-2xl font-semibold tracking-wide text-black`}
          >
            SITA
          </p>

          <p className="text-[15px] tracking-[0.2px] text-black/70 text-center sm:text-right">
            System for Ingredient Transparency Analysis. Know what you consume.
          </p>
        </div>

        <div className="mt-4 text-center text-[13px] text-black/60">
          © {new Date().getFullYear()} SITA. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
