"use client";

import { useState } from "react";
import Link from "next/link";
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

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav
      className={`w-full ${lato.className} border-b border-black bg-gray-50/80 backdrop-blur-md`}
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="relative flex h-20 items-center">
          <div className="flex items-center space-x-10">
            <div className="hidden md:flex space-x-10 text-md font-medium tracking-[0.2px]">
              <Link
                href="/"
                className="text-black border-b-2 border-transparent hover:border-black transition-all duration-200"
              >
                Home
              </Link>

              <Link
                href="/"
                className="text-black border-b-2 border-transparent hover:border-black transition-all duration-200"
              >
                Product
              </Link>

              <Link
                href="/"
                className="text-black border-b-2 border-transparent hover:border-black transition-all duration-200"
              >
                About
              </Link>

              <Link
                href="/"
                className="text-black border-b-2 border-transparent hover:border-black transition-all duration-200"
              >
                Report
              </Link>
            </div>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden inline-flex items-center rounded-md p-2 text-gray-700 hover:bg-gray-200 transition"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.8}
                viewBox="0 0 24 24"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>

          <div className="absolute left-1/2 -translate-x-1/2">
            <Link
              href="/"
              className={`${playfair.className} text-2xl md:text-3xl font-semibold tracking-wide text-black hover:opacity-80 transition`}
            >
              SITA
            </Link>
          </div>

          <div className="ml-auto hidden md:flex items-center">
            <Link href="/">
              <button className="px-5 py-2 text-[15px]  tracking-[0.2px] text-black border border-black rounded-md cursor-pointer hover:bg-black hover:text-white transition-all duration-200">
                Login
              </button>
            </Link>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden border-t border-gray-200 bg-gray-50">
          <div className="space-y-4 px-6 py-5 text-base font-medium">
            <Link
              href="/"
              className="block text-black hover:text-gray-500 transition-colors duration-200"
            >
              Home
            </Link>

            <Link
              href="/"
              className="block text-black hover:text-gray-500 transition-colors duration-200"
            >
              Product
            </Link>

            <Link
              href="/"
              className="block text-black hover:text-gray-500 transition-colors duration-200"
            >
              About
            </Link>

            <Link
              href="/"
              className="block text-black hover:text-gray-500 transition-colors duration-200"
            >
              Report
            </Link>

            <div className="pt-3">
              <Link href="/">
                <button className="w-full px-4 py-2 text-md font-medium text-black border border-black rounded-md hover:bg-black hover:text-white transition">
                  Login
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
