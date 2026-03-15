"use client";

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

const Page = () => {
  
  return (
    <div
      className={`min-h-[calc(100vh-80px)] flex flex-col items-center justify-center bg-gray-100 px-4 ${lato.className}`}
    >
      <div className="text-center mb-8">
        <h1
          className={`${playfair.className} text-3xl md:text-4xl font-semibold text-black mb-3`}
        >
          Take Your First Step Toward Transparency
        </h1>
        <p className="text-gray-600 text-base md:text-lg">
          Create your account and start exploring meaningful insights.
        </p>
      </div>
  
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md">
        <h2
          className={`${playfair.className} text-2xl font-semibold text-center mb-6`}
        >
          Sign Up
        </h2>
  
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium">
            Email
          </label>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>
  
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium">
            Password
          </label>
          <input
            type="password"
            placeholder="Enter your password"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>
  
        <button className="w-full py-2 bg-black text-white rounded-md hover:bg-gray-800 transition duration-200">
          Sign Up
        </button>
  
        <p className="mt-4 text-sm text-center text-gray-600">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-black font-medium hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Page;
