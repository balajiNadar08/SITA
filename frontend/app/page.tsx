import { Playfair_Display, Cormorant_Garamond } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

export default function Home() {
  return (
    <div
      className={`${playfair.variable} ${cormorant.variable} antialiased min-h-screen bg-cover bg-center relative overflow-hidden flex items-center`}
      style={{ backgroundImage: "url('/bg-img-2.webp')" }}
    >
      <div className="absolute inset-0 bg-linear-to-r from-black/70 via-black/40 to-black/10 pointer-events-none" />
      <div className="absolute inset-0 bg-linear-to-b from-black/30 via-transparent to-black/50 pointer-events-none" />

      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "128px 128px",
        }}
      />

      <div className="absolute left-8 top-0 bottom-0 flex flex-col items-center pointer-events-none">
        <div className="w-px flex-1 bg-linear-to-b from-transparent via-white/20 to-transparent" />
      </div>

      <div
        className="absolute bottom-24 right-6 text-white/[0.07] select-none pointer-events-none"
        style={{
          fontFamily: "var(--font-playfair)",
          fontSize: "clamp(80px, 12vw, 160px)",
          fontWeight: 700,
          fontStyle: "italic",
          lineHeight: 1,
          letterSpacing: "-0.01em",
          writingMode: "vertical-rl",
          transform: "rotate(180deg)",
        }}
      >
        SITA
      </div>

      <main className="relative z-10 px-12 md:px-20 lg:px-32 max-w-3xl w-full">

        <div className="flex items-center gap-3 mb-10">
          <div className="w-8 h-px bg-white/50" />
          <span
            className="text-white/50 tracking-[0.35em] uppercase text-xs"
            style={{ fontFamily: "var(--font-cormorant)", fontWeight: 500 }}
          >
            Ingredient Analysis Platform
          </span>
        </div>

        <h1
          className="text-white leading-[0.9] tracking-[-0.02em]"
          style={{
            fontFamily: "var(--font-playfair)",
            fontSize: "clamp(54px, 7vw, 96px)",
            fontWeight: 600,
          }}
        >
          Know What
        </h1>

        <h2
          className="text-white/85 leading-[0.9] tracking-[-0.01em]"
          style={{
            fontFamily: "var(--font-playfair)",
            fontSize: "clamp(52px, 6.8vw, 92px)",
            fontWeight: 400,
            fontStyle: "italic",
          }}
        >
          You Consume.
        </h2>

        <p
          className="text-white/90 mt-7 mb-12 leading-[1.75] max-w-115"
          style={{
            fontFamily: "var(--font-cormorant)",
            fontSize: "clamp(18px, 1.8vw, 22px)",
            fontWeight: 400,
          }}
        >
          Instant ingredient analysis. Decode food labels in seconds —
          understand risks, allergens and what truly enters your body.
        </p>

        <div className="flex flex-wrap gap-3 mb-12">
          {[
            { num: "100+", label: "Ingredients tracked" },
            { num: "Real-time", label: "OCR analysis" },
            { num: "Free", label: "No account needed" },
          ].map(({ num, label }) => (
            <div
              key={label}
              className="flex items-center gap-2 border border-white/15 bg-white/8 backdrop-blur-sm rounded-full px-4 py-1.5"
            >
              <span
                className="text-white font-semibold text-[15px]"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                {num}
              </span>

              <span
                className="text-white/45 text-[11px] tracking-[0.08em]"
                style={{
                  fontFamily: "var(--font-cormorant)",
                  fontWeight: 400,
                }}
              >
                {label}
              </span>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-5">
          <button
            className="group relative overflow-hidden px-8 py-4 bg-white text-black rounded-full cursor-pointer
            hover:scale-[1.03] active:scale-[0.97] transition-all duration-300 shadow-lg shadow-black/30"
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "15px",
              fontWeight: 600,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
            }}
          >
            <span className="relative z-10">Analyze Now</span>

            <div className="absolute inset-0 bg-linear-to-r from-white to-zinc-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>

          <button
            className="flex items-center gap-2 text-white/70 hover:text-white transition-colors duration-300 text-sm tracking-wide"
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "15px",
              fontWeight: 400,
            }}
          >
            <span className="w-8 h-8 rounded-full border border-white/25 flex items-center justify-center hover:border-white/50 transition-colors">
              <svg className="w-3 h-3 ml-0.5" fill="white" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
            See how it works
          </button>
        </div>
      </main>

      <div className="absolute bottom-6 left-12 md:left-20 lg:left-32">
        <p
          className="text-white/20 text-xs tracking-widest uppercase"
          style={{ fontFamily: "var(--font-cormorant)" }}
        >
          System for Ingredient Transparency Analysis
        </p>
      </div>
    </div>
  );
}