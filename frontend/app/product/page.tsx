"use client";

import { useState } from "react";

export default function OCRTestPage() {
  const [imageFile, setImageFile] = useState<File | null>(null);
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

  return (
    <div className="p-10 space-y-4">
      <h1 className="text-2xl font-bold">OCR Test</h1>

      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImageFile(e.target.files?.[0] || null)}
      />

      <button
        onClick={handleUpload}
        className="bg-black text-white px-4 py-2 rounded"
      >
        {loading ? "Extracting..." : "Extract Text"}
      </button>

      <div className="mt-6 whitespace-pre-wrap border p-4">{text}</div>
    </div>
  );
}
