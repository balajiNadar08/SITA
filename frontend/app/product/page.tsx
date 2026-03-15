"use client";

import { useState } from "react";
import ingredientsData from "@/ingredients.json";
import { Playfair_Display, DM_Mono } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  style: ["normal", "italic"],
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
});

const RISK_CONFIG: Record<
  string,
  { label: string; dot: string; border: string; bg: string }
> = {
  high: {
    label: "High Risk",
    dot: "bg-black",
    border: "border-black",
    bg: "bg-black text-white",
  },
  moderate: {
    label: "Moderate",
    dot: "bg-zinc-500",
    border: "border-zinc-400",
    bg: "bg-zinc-100 text-zinc-800",
  },
  low: {
    label: "Low Risk",
    dot: "bg-zinc-300",
    border: "border-zinc-200",
    bg: "bg-white text-zinc-500",
  },
};

function getRiskConfig(level: string) {
  return RISK_CONFIG[level] ?? RISK_CONFIG["low"];
}

function generateReportHTML(report: any, timestamp: string): string {
  const alerts = report.detectedIngredients.filter(
    (i: any) => i.risk_level === "high" || i.risk_level === "moderate",
  );
  const safe = report.detectedIngredients.filter(
    (i: any) => i.risk_level !== "high" && i.risk_level !== "moderate",
  );

  const ingredientRow = (item: any) => `
    <tr>
      <td style="padding:10px 14px;border-bottom:1px solid #e5e5e5;font-weight:600;text-transform:capitalize;">${item.name}</td>
      <td style="padding:10px 14px;border-bottom:1px solid #e5e5e5;">
        <span style="display:inline-block;padding:2px 10px;border-radius:999px;font-size:11px;font-weight:700;letter-spacing:.05em;
          background:${item.risk_level === "high" ? "#000" : item.risk_level === "moderate" ? "#f4f4f5" : "#fafafa"};
          color:${item.risk_level === "high" ? "#fff" : "#333"};
          border:1px solid ${item.risk_level === "high" ? "#000" : "#d4d4d8"};">
          ${item.risk_level?.toUpperCase() ?? "UNKNOWN"}
        </span>
      </td>
      <td style="padding:10px 14px;border-bottom:1px solid #e5e5e5;color:#555;font-size:13px;">${item.description ?? "—"}</td>
      <td style="padding:10px 14px;border-bottom:1px solid #e5e5e5;color:#c00;font-size:13px;">${item.avoid_for?.length ? item.avoid_for.join(", ") : "—"}</td>
    </tr>`;

  return `<!DOCTYPE html>
            <html>
            <head>
              <meta charset="UTF-8"/>
              <title>Ingredient Analysis Report</title>
              <style>
                @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=DM+Mono:wght@400;500&display=swap');
                * { box-sizing: border-box; margin: 0; padding: 0; }
                body { font-family: 'DM Mono', monospace; color: #111; background: #fff; }
                .page { max-width: 800px; margin: 0 auto; padding: 60px 48px; }
                .header { border-bottom: 3px solid #000; padding-bottom: 28px; margin-bottom: 36px; display: flex; justify-content: space-between; align-items: flex-end; }
                .brand { font-family: 'Playfair Display', serif; font-size: 28px; font-weight: 700; letter-spacing: -0.5px; }
                .meta { font-size: 11px; color: #888; text-align: right; line-height: 1.8; }
                .section-title { font-family: 'Playfair Display', serif; font-size: 18px; font-weight: 700; margin: 36px 0 14px; letter-spacing: -0.3px; }
                .summary-box { background: #f9f9f9; border: 1px solid #e5e5e5; border-radius: 8px; padding: 18px 22px; font-size: 13px; line-height: 1.7; margin-bottom: 8px; }
                .alert-box { background: #000; color: #fff; border-radius: 8px; padding: 18px 22px; font-size: 13px; line-height: 1.7; margin-bottom: 8px; }
                table { width: 100%; border-collapse: collapse; font-size: 13px; }
                th { text-align: left; padding: 10px 14px; background: #000; color: #fff; font-size: 11px; letter-spacing: .08em; text-transform: uppercase; }
                tr:hover td { background: #fafafa; }
                .footer { margin-top: 60px; padding-top: 20px; border-top: 1px solid #e5e5e5; font-size: 11px; color: #aaa; display: flex; justify-content: space-between; }
                @media print { body { -webkit-print-color-adjust: exact; print-color-adjust: exact; } }
              </style>
            </head>
            <body>
            <div class="page">
              <div class="header">
                <div class="brand">Transparency Analysis<br/><span style="font-style:italic;font-weight:400;font-size:15px;">Ingredient Report</span></div>
                <div class="meta">Generated: ${timestamp}<br/>Total ingredients: ${report.detectedIngredients.length}</div>
              </div>

              <div class="section-title">Overall Assessment</div>
              ${
                alerts.length > 0
                  ? `<div class="alert-box">⚠ ${alerts.length} ingredient${alerts.length > 1 ? "s" : ""} flagged — ${report.overallSafety}</div>`
                  : `<div class="summary-box">✓ ${report.overallSafety}</div>`
              }

              ${
                alerts.length > 0
                  ? `
              <div class="section-title">⚠ Flagged Ingredients</div>
              <table>
                <thead><tr><th>Ingredient</th><th>Risk</th><th>Description</th><th>Avoid For</th></tr></thead>
                <tbody>${alerts.map(ingredientRow).join("")}</tbody>
              </table>`
                  : ""
              }

              ${
                safe.length > 0
                  ? `
              <div class="section-title">Other Detected Ingredients</div>
              <table>
                <thead><tr><th>Ingredient</th><th>Risk</th><th>Description</th><th>Avoid For</th></tr></thead>
                <tbody>${safe.map(ingredientRow).join("")}</tbody>
              </table>`
      : ""
  }

  ${
    report.warnings.length > 0
      ? `
  <div class="section-title">Warnings</div>
  <ul style="padding-left:20px;font-size:13px;line-height:2;color:#444;">
    ${report.warnings.map((w: string) => `<li>${w}</li>`).join("")}
  </ul>`
      : ""
  }

  <div class="footer">
    <span>Transparency Analysis — Automated Report</span>
    <span>For informational purposes only</span>
  </div>
</div>
</body>
</html>`;
}

export default function OCRTestPage() {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState<any>(null);
  const [input, setInput] = useState<string | null>(null);

  const generateReport = (extractedText: string) => {
    const normalized = extractedText.toLowerCase();
    const detected = ingredientsData.ingredients.filter((item) =>
      normalized.includes(item.name),
    );

    let overall = "Safe for general consumption.";
    const warnings: string[] = [];

    detected.forEach((item) => {
      if (item.risk_level === "high")
        overall = "Contains high-risk ingredients. Review carefully.";
      else if (
        item.risk_level === "moderate" &&
        overall !== "Contains high-risk ingredients. Review carefully."
      )
        overall = "Consume with moderation.";
      if (item.avoid_for?.length > 0)
        warnings.push(
          `${item.name} may not be suitable for: ${item.avoid_for.join(", ")}`,
        );
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
      reader.onloadend = () => setPreview(reader.result as string);
    } else {
      setPreview(null);
    }
  };

  const handleCreateReport = () => {
    if (!report) return;
    const timestamp = new Date().toLocaleString("en-IN", {
      dateStyle: "long",
      timeStyle: "short",
    });
    const html = generateReportHTML(report, timestamp);
    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const win = window.open(url, "_blank");
    if (win) {
      win.onload = () => {
        setTimeout(() => win.print(), 300);
      };
    }
  };

  const alerts =
    report?.detectedIngredients.filter(
      (i: any) => i.risk_level === "high" || i.risk_level === "moderate",
    ) ?? [];
  const safe =
    report?.detectedIngredients.filter(
      (i: any) => i.risk_level !== "high" && i.risk_level !== "moderate",
    ) ?? [];
  const hasAlerts = alerts.length > 0;

    const handleSearch = () => {
      return "Ingredients";
    }

  return (
    <div className={`min-h-screen bg-white ${dmMono.className}`}>
      <header className="border-b border-zinc-200 px-8 py-5 flex items-center justify-between">
        <span
          className={`text-lg font-bold tracking-tight ${playfair.className}`}
        >
          Transparency Analysis
        </span>
        <span className="text-xs text-zinc-400 tracking-widest uppercase">
          Ingredient Scanner
        </span>
      </header>

      <main className="max-w-2xl mx-auto px-6 py-12 space-y-10">
        <section className="space-y-4">
          <label className="block text-xs tracking-widest text-zinc-400 uppercase mb-2">
            Upload Label Image
          </label>
          <label
            htmlFor="file-upload"
            className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-zinc-300 rounded-xl cursor-pointer hover:border-black transition-colors duration-200 group bg-zinc-50 hover:bg-white"
          >
            <div className="text-center">
              <svg
                className="w-7 h-7 mx-auto mb-2 text-zinc-400 group-hover:text-black transition-colors"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                />
              </svg>
              <p className="text-sm text-zinc-500 group-hover:text-black transition-colors">
                {imageFile
                  ? imageFile.name
                  : "Click to upload or drag and drop"}
              </p>
              <p className="text-xs text-zinc-400 mt-1">
                PNG, JPG, WEBP supported
              </p>
            </div>
            <input
              id="file-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </label>
        </section>

        {preview && (
          <section className="rounded-xl overflow-hidden border border-zinc-200 shadow-sm">
            <div className="px-4 py-2.5 border-b border-zinc-100 flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-zinc-300" />
              <span className="text-xs text-zinc-400">Preview</span>
            </div>
            <img
              src={preview}
              alt="Uploaded preview"
              className="w-full max-h-72 object-contain bg-zinc-50 p-4"
            />
          </section>
        )}

        <button
          onClick={handleUpload}
          disabled={!imageFile || loading}
          className="w-full bg-black text-white text-sm tracking-widest uppercase py-4 rounded-xl hover:bg-zinc-800 active:scale-[.99] transition-all disabled:opacity-30 disabled:cursor-not-allowed"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-3">
              <svg
                className="animate-spin w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z"
                />
              </svg>
              Analyzing…
            </span>
          ) : (
            "Analyze Ingredients"
          )}
        </button>

        {/* <div>
          <input type="text" onChange={(e) => setInput(e.target.value)} />
          <button onClick={}>Search Ingredient</button>
        </div> */}

        {report && (
          <section className="space-y-6 animate-in fade-in duration-500">
            <div
              className={`rounded-xl px-5 py-4 flex items-start gap-4 ${hasAlerts ? "bg-black text-white" : "bg-zinc-50 border border-zinc-200"}`}
            >
              <span className="text-xl mt-0.5">{hasAlerts ? "⚠" : "✓"}</span>
              <div>
                <p
                  className={`text-xs tracking-widest uppercase mb-1 ${hasAlerts ? "text-zinc-400" : "text-zinc-500"}`}
                >
                  Overall Assessment
                </p>
                <p
                  className={`text-sm font-medium ${hasAlerts ? "text-white" : "text-zinc-800"}`}
                >
                  {report.overallSafety}
                </p>
              </div>
            </div>

            {alerts.length > 0 && (
              <div>
                <p className="text-xs tracking-widest uppercase text-zinc-400 mb-3">
                  ⚠ Flagged — {alerts.length} Ingredient
                  {alerts.length > 1 ? "s" : ""}
                </p>
                <div className="space-y-2">
                  {alerts.map((item: any, i: number) => {
                    const cfg = getRiskConfig(item.risk_level);
                    return (
                      <div
                        key={i}
                        className={`rounded-xl border ${cfg.border} overflow-hidden`}
                      >
                        <div
                          className={`flex items-center justify-between px-4 py-3 ${cfg.bg}`}
                        >
                          <span className="text-sm font-semibold capitalize">
                            {item.name}
                          </span>
                          <span className="text-xs tracking-widest uppercase opacity-70">
                            {cfg.label}
                          </span>
                        </div>
                        {(item.description || item.avoid_for?.length > 0) && (
                          <div className="px-4 py-3 bg-white space-y-1">
                            {item.description && (
                              <p className="text-xs text-zinc-500">
                                {item.description}
                              </p>
                            )}
                            {item.avoid_for?.length > 0 && (
                              <p className="text-xs text-red-600 font-medium">
                                Avoid for: {item.avoid_for.join(", ")}
                              </p>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {safe.length > 0 && (
              <div>
                <p className="text-xs tracking-widest uppercase text-zinc-400 mb-3">
                  Other Detected Ingredients
                </p>
                <div className="border border-zinc-100 rounded-xl overflow-hidden divide-y divide-zinc-100">
                  {safe.map((item: any, i: number) => (
                    <div
                      key={i}
                      className="px-4 py-3 hover:bg-zinc-50 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm capitalize text-zinc-700 font-medium">
                          {item.name}
                        </span>
                        <span className="text-xs text-zinc-400">
                          {item.risk_level ?? "unknown"}
                        </span>
                      </div>
                      {item.description && (
                        <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                          {item.description}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="border-t border-zinc-100 pt-6">
              <button
                onClick={handleCreateReport}
                className="w-full border-2 border-black text-black text-sm tracking-widest uppercase py-4 rounded-xl hover:bg-black hover:text-white active:scale-[.99] transition-all flex items-center justify-center gap-3"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                  />
                </svg>
                Create Report
              </button>
              <p className="text-center text-xs text-zinc-400 mt-3">
                Opens a print-ready report in a new tab
              </p>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
