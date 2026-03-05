"use client";

import { useState } from "react";
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

export default function ReportsPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Road");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setImage(file);

    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
    } else {
      setPreview(null);
    }
  };

  const handleSubmit = async () => {
    if (!title || !description || !location) return;

    setLoading(true);
    setSuccess(false);

    await fetch("http://localhost:8000/api/reports", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        description,
        category,
        location,
      }),
    });

    setLoading(false);
    setSuccess(true);

    setTitle("");
    setDescription("");
    setCategory("Road");
    setLocation("");
    setImage(null);
    setPreview(null);
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6">
      <div className="w-full max-w-2xl border rounded-xl shadow-sm p-8 space-y-6">
        <h1 className={`text-3xl font-bold text-center ${playfair.className}`}>Report an Issue</h1>

        <div className="space-y-4">

          <input
            type="text"
            placeholder="Issue Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border rounded-lg p-3"
          />

          <textarea
            placeholder="Describe the issue..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className="w-full border rounded-lg p-3 resize-none"
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border rounded-lg p-3"
          >
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
            <option value="D">D</option>
            <option value="E">E</option>
          </select>

          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full border rounded-lg p-3"
          />

          <div className="space-y-2">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full border rounded-lg p-2"
            />

            {preview && (
              <div className="border rounded-lg overflow-hidden">
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full max-h-64 object-contain bg-gray-50"
                />
              </div>
            )}
          </div>
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-black text-white py-3 rounded-lg transition hover:opacity-80 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {loading ? "Submitting..." : "Submit Report"}
        </button>

        {success && (
          <p className="text-center text-sm">
            Report submitted successfully.
          </p>
        )}
      </div>
    </div>
  );
}