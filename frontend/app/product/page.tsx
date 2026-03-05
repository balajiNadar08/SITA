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

export default function OCRTestPage() {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!imageFile) return;

    setLoading(true);

    const reader = new FileReader();
    reader.readAsDataURL(imageFile);

    reader.onloadend = async () => {
      const base64 = reader.result?.toString().split(",")[1];

      const res = await fetch("http://localhost:8000/api/ocr", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ image: base64 }),
      });

      const data = await res.json();
      setText(data.text);
      setLoading(false);
    };
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setImageFile(file);

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

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6">
      <div className="w-full max-w-2xl border rounded-xl shadow-sm p-8 space-y-6">
        <h1 className={`text-3xl font-bold text-center ${playfair.className}`}>Transparency Analysis</h1>

        <div className="space-y-3">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full border rounded-lg p-2 cursor-pointer"
          />

          {preview && (
            <div className="border rounded-lg overflow-hidden">
              <img
                src={preview}
                alt="Uploaded preview"
                className="w-full max-h-80 object-contain bg-gray-50"
              />
            </div>
          )}
        </div>

        <button
          onClick={handleUpload}
          disabled={!imageFile || loading}
          className="w-full bg-black text-white py-3 rounded-lg transition hover:opacity-80 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {loading ? "Extracting..." : "Extract Text"}
        </button>

        {text && (
          <div className="border rounded-lg p-4 bg-gray-50 whitespace-pre-wrap">
            {text}
          </div>
        )}
      </div>
    </div>
  );
}