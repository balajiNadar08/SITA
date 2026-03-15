"use client";

import { useState } from "react";
import { Playfair_Display, Lato } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const lato = Lato({
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
  display: "swap",
});

const Page = () => {
  const [form, setForm] = useState({
    title: "",
    category: "",
    description: "",
    email: "",
  });

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.title || !form.category || !form.description) {
      alert("Please fill all required fields.");
      return;
    }

    console.log("Submitted:", form);
  };

  return (
    <main
      className={`min-h-[calc(100vh-80px)] bg-gray-50 flex justify-center pt-20 pb-20 px-4 ${lato.className}`}
    >
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-xl p-10">
        {/* Heading */}
        <h1
          className={`${playfair.className} text-3xl font-semibold text-gray-900 mb-2`}
        >
          Submit a Report
        </h1>

        <p className="text-gray-500 mb-8 text-sm">
          Help us improve by reporting issues or requesting features.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="text-sm font-semibold text-gray-700 block mb-1">
              Title <span className="text-red-500">*</span>
            </label>

            <input
              type="text"
              required
              maxLength={100}
              value={form.title}
              onChange={(e) => handleChange("title", e.target.value)}
              placeholder="Example: Login button not responding"
              className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-700 block mb-2">
              Category <span className="text-red-500">*</span>
            </label>

            <div className="flex flex-wrap gap-2">
              {[
                "Bug Report",
                "Feature Request",
                "Performance",
                "Security",
                "Other",
              ].map((cat) => (
                <button
                  type="button"
                  key={cat}
                  onClick={() => handleChange("category", cat)}
                  className={`px-4 py-1.5 rounded-full text-sm border transition cursor-pointer ${
                    form.category === cat
                      ? "bg-gray-900 text-white border-gray-900"
                      : "bg-white text-gray-500 border-gray-200 hover:border-gray-400"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-700 block mb-1">
              Description <span className="text-red-500">*</span>
            </label>

            <textarea
              rows={5}
              required
              value={form.description}
              onChange={(e) => handleChange("description", e.target.value)}
              placeholder="Describe the issue or request in detail..."
              className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-700 block mb-1">
              Email{" "}
              <span className="text-gray-400 font-normal">(optional)</span>
            </label>

            <input
              type="email"
              value={form.email}
              onChange={(e) => handleChange("email", e.target.value)}
              placeholder="you@gmail.com"
              className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-black hover:bg-gray-900 text-white font-semibold py-3 rounded-lg cursor-pointer transition text-sm"
          >
            Submit Report →
          </button>
        </form>
      </div>
    </main>
  );
};

export default Page;