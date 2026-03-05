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

export default function Home() {
  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center"
      style={{
        backgroundImage: "url('/bg-img-2.webp')",
      }}
    >
      <div className="pl-16 md:pl-24 lg:pl-32 max-w-xl">
        <div className={`${lato.className} text-white`}>
          <div
            className="bg-black/25 backdrop-blur-md border border-white/40 rounded-xl 
              shadow-[inset_0_1px_0px_rgba(255,255,255,0.6),0_10px_30px_rgba(0,0,0,0.35)] 
              p-8 relative overflow-hidden"
          >
            <div className="absolute inset-0 rounded-xl bg-linear-to-br from-white/20 via-transparent to-transparent pointer-events-none" />
            <div className="absolute inset-0 rounded-xl bg-linear-to-tl from-white/10 via-transparent to-transparent pointer-events-none" />

            <div className="relative z-10">
              <h1
                className={`${playfair.className} text-3xl md:text-4xl font-semibold leading-tight mb-4 tracking-tight`}
              >
                System for Ingredient
                <span className="block font-medium opacity-90">
                  Transparency Analysis
                </span>
              </h1>

              <p className="text-base md:text-lg font-light leading-relaxed opacity-90 mb-6 max-w-md">
                Make informed decisions. Instantly analyze food ingredients and
                understand what truly goes into your body.
              </p>

              <button
                className="px-6 py-3 rounded-lg bg-white/20 border border-white/30 backdrop-blur-sm cursor-pointer hover:bg-white/30 hover:scale-[1.02]
                  active:scale-[0.98] transition-all duration-300 font-medium tracking-wide"
              >
                Try Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
