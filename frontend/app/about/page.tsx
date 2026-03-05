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
      className={`relative min-h-screen bg-[#faf9fc] ${playfair.variable} ${lato.variable}`}
    >
      <div
        className="absolute top-0 right-0 h-full w-1/2 opacity-10"
        style={{
          backgroundImage: `url("food.svg");`,
          backgroundRepeat: "repeat",
        }}
      />


      <div className="relative z-10 flex min-h-screen items-center px-10 md:px-20 py-20">
        <div className="max-w-2xl w-full">
          <div className="mb-14">
            <h1
              className={`text-5xl md:text-6xl font-semibold ${playfair.className} text-black mb-5`}
            >
              About SITA
            </h1>
            <p
              className={`text-xl text-gray-700 leading-relaxed ${lato.className}`}
            >
              SITA - the System for Ingredient Transparency Analysis exists to
              make food labels understandable again. Not dramatic. Not alarmist.
              Just clear.
            </p>
          </div>

          <div className="divide-y divide-gray-200">
            <div className="py-10">
              <h2
                className={`text-2xl md:text-3xl mb-4 ${playfair.className} text-black`}
              >
                Why?
              </h2>
              <p
                className={`text-base text-gray-700 leading-relaxed ${lato.className}`}
              >
                Modern food labels are filled with chemical terminology that
                most people were never meant to interpret. Words like "ascorbic
                acid" or "sodium benzoate" sound intimidating, even when they
                aren't inherently harmful.
              </p>
              <p
                className={`mt-3 text-base text-gray-500 leading-relaxed ${lato.className}`}
              >
                This gap between scientific language and everyday understanding
                creates confusion, fear and misinformation. We believe
                transparency should not require a chemistry degree.
              </p>
            </div>

            <div className="py-10">
              <h2
                className={`text-2xl md:text-3xl mb-4 ${playfair.className} text-black`}
              >
                How?
              </h2>
              <p
                className={`text-base text-gray-700 leading-relaxed ${lato.className}`}
              >
                Upload a photo of any ingredient label. Our system analyzes each
                ingredient, translates technical names into plain language and
                explains their function whether it's a preservative, stabilizer,
                flavoring agent or nutrient.
              </p>
              <p
                className={`mt-3 text-base text-gray-500 leading-relaxed ${lato.className}`}
              >
                Every explanation is evidence-based. We focus on scientific
                consensus, regulatory classifications and real dosage context,
                not viral fear.
              </p>
            </div>

            <div className="py-10">
              <h2
                className={`text-2xl md:text-3xl mb-4 ${playfair.className} text-black`}
              >
                What We Believe
              </h2>
              <p
                className={`text-base text-gray-700 leading-relaxed ${lato.className}`}
              >
                Chemicals are not the enemy. Everything is chemistry including
                water, salt and vitamin C. What matters is dosage, evidence and
                context.
              </p>
              <p
                className={`mt-3 text-base text-gray-500 leading-relaxed ${lato.className}`}
              >
                We reject both blind trust and blind fear. Instead, we support
                informed decision-making grounded in research.
              </p>
            </div>

            <div className="py-10">
              <h2
                className={`text-2xl md:text-3xl mb-4 ${playfair.className} text-black`}
              >
                Our Vision
              </h2>
              <p
                className={`text-base text-gray-700 leading-relaxed ${lato.className}`}
              >
                A world where food transparency is standard. Where people
                understand what they consume. Where science is accessible and
                clarity replaces anxiety.
              </p>
              <p
                className={`mt-3 text-base text-gray-500 leading-relaxed ${lato.className}`}
              >
                SITA is not here to tell you what to eat. It is here to help you
                understand it.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
