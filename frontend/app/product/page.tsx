"use client";

import { useState } from "react";
import ingredientsData from "@/ingredients.json";
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

export default function OCRTestPage() {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState<any>(null);

  const generateReport = (extractedText: string) => {
    const normalizedText = extractedText.toLowerCase();

    const detected = ingredientsData.ingredients.filter((item) =>
      normalizedText.includes(item.name),
    );

    let overall = "Safe for general consumption.";
    let warnings: string[] = [];

    detected.forEach((item) => {
      if (item.risk_level === "moderate") {
        overall = "Consume with moderation.";
      }
      if (item.avoid_for.length > 0) {
        warnings.push(
          `${item.name} may not be suitable for: ${item.avoid_for.join(", ")}`,
        );
      }
    });

    setReport({
      detectedIngredients: detected,
      overallSafety: overall,
      warnings,
    });
  };

  const handleUpload = async () => {
    if (!imageFile) return;

    setLoading(true);

    const reader = new FileReader();
    reader.readAsDataURL(imageFile);

    reader.onloadend = async () => {
      const base64 = reader.result?.toString().split(",")[1];

      const res = await fetch("http://localhost:8000/api/ocr", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: base64 }),
      });

      const data = await res.json();
      setText(data.text);

      generateReport(data.text);

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
        <h1 className={`text-3xl font-bold text-center ${playfair.className}`}>
          Transparency Analysis
        </h1>

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

        <button
          onClick={handleUpload}
          disabled={!imageFile || loading}
          className="w-full bg-black text-white py-3 rounded-lg transition hover:opacity-80 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {loading ? "Analyzing..." : "Analyze Ingredients"}
        </button>

        {report && (
          <div className="border rounded-lg p-5 bg-gray-50 space-y-4">
            <h2 className="text-xl font-semibold">Report</h2>

            <div>
              <p className="font-medium">Detected Ingredients:</p>
              <ul className="list-disc list-inside text-sm">
                {report.detectedIngredients.map((item: any, index: number) => (
                  <li key={index}>{item.name}</li>
                ))}
              </ul>
            </div>

            <div>
              <p className="font-medium">Overall Assessment:</p>
              <p>{report.overallSafety}</p>
            </div>

            {report.warnings.length > 0 && (
              <div>
                <p className="font-medium text-red-600">Warnings:</p>
                <ul className="space-y-3 text-sm">
                  {report.detectedIngredients.map(
                    (item: any, index: number) => (
                      <li
                        key={index}
                        className="border rounded-md p-3 bg-white"
                      >
                        <p className="font-semibold capitalize">{item.name}</p>
                        <p className="text-gray-600 mt-1">{item.description}</p>
                        {item.avoid_for.length > 0 && (
                          <p className="text-red-600 mt-1">
                            Avoid for: {item.avoid_for.join(", ")}
                          </p>
                        )}
                      </li>
                    ),
                  )}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
