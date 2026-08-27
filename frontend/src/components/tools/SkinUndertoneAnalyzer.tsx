"use client";

import { useState } from "react";
import Link from "next/link";

type Undertone = "warm" | "cool" | "neutral";

interface Question {
  question: string;
  hint: string;
  options: { label: string; value: Undertone }[];
}

const questions: Question[] = [
  {
    question: "Look at the veins on the inside of your wrist. What colour do they appear?",
    hint: "Hold your arm in natural daylight and look closely at the veins.",
    options: [
      { label: "Blue or purple", value: "cool" },
      { label: "Green or olive", value: "warm" },
      { label: "Mix of blue and green", value: "neutral" },
    ],
  },
  {
    question: "How does your skin react to sun exposure?",
    hint: "Think about what happens when you're in the sun for the first time in summer.",
    options: [
      { label: "Burns easily, rarely tans", value: "cool" },
      { label: "Tans easily, rarely burns", value: "warm" },
      { label: "Burns first, then tans", value: "neutral" },
    ],
  },
  {
    question: "What jewellery looks best on you?",
    hint: "Which metal makes your skin look brighter and more alive?",
    options: [
      { label: "Silver and platinum", value: "cool" },
      { label: "Gold and rose gold", value: "warm" },
      { label: "Both look equally good", value: "neutral" },
    ],
  },
  {
    question: "Which clothing colours flatter you most?",
    hint: "Which palette makes your skin glow and your eyes pop?",
    options: [
      { label: "Jewel tones (emerald, sapphire, purple)", value: "cool" },
      { label: "Earth tones (olive, coral, warm red)", value: "warm" },
      { label: "Both palettes work well", value: "neutral" },
    ],
  },
  {
    question: "What is the natural undertone of your bare skin?",
    hint: "Look at your face in natural light without any makeup.",
    options: [
      { label: "Pink, red or bluish", value: "cool" },
      { label: "Yellow, golden or peachy", value: "warm" },
      { label: "Mix of pink and golden", value: "neutral" },
    ],
  },
  {
    question: "How would you describe your eye and hair colour?",
    hint: "Your natural (untreated) colours, not dyed.",
    options: [
      { label: "Dark brown/black hair, dark eyes", value: "cool" },
      { label: "Brown/auburn hair, hazel/brown/green eyes", value: "warm" },
      { label: "Light to medium brown, mixed tones", value: "neutral" },
    ],
  },
  {
    question: "How does your skin look after being in the sun?",
    hint: "After a week of moderate sun exposure.",
    options: [
      { label: "Still pale, maybe peeling", value: "cool" },
      { label: "Golden, bronzed glow", value: "warm" },
      { label: "Slightly tanned, then levels out", value: "neutral" },
    ],
  },
  {
    question: "Does your skin oxidise (turn orange) when wearing certain foundations?",
    hint: "If you've noticed foundations turning orangey after a few hours.",
    options: [
      { label: "Yes, yellow-based foundations go orange", value: "cool" },
      { label: "No, yellow-based foundations look natural", value: "warm" },
      { label: "Sometimes — depends on the brand", value: "neutral" },
    ],
  },
];

interface UndertoneResult {
  type: Undertone;
  label: string;
  description: string;
  makeup: { product: string; recommendation: string }[];
  hairColours: { name: string; why: string }[];
  clothingColours: { name: string; hex: string }[];
  metals: string[];
  foundationBrands: string[];
  blushColours: string[];
  lipstickShades: string[];
  eyeshadowPalettes: string[];
  nailColours: string[];
}

const results: Record<Undertone, UndertoneResult> = {
  warm: {
    type: "warm",
    label: "Warm Undertone",
    description: "Your skin has golden, peachy or olive undertones. You probably tan easily in the sun and gold jewellery makes your skin glow. Warm-toned skin looks best with earth-inspired colours, warm metallics and golden-based makeup.",
    makeup: [
      { product: "Foundation", recommendation: "Look for shades labelled 'golden', 'warm beige', 'honey' or 'caramel'. Avoid pink-based foundations — they'll look ashy on you." },
      { product: "Concealer", recommendation: "Choose one with yellow/peach undertones to correct dark circles naturally." },
      { product: "Bronzer", recommendation: "Warm bronze and terracotta shades — they'll look like a natural tan, not mud." },
      { product: "Highlighter", recommendation: "Gold, champagne and peachy highlighters — avoid silver-toned highlighters." },
    ],
    hairColours: [
      { name: "Golden Brown", why: "Enhances your natural warmth with rich, dimensional colour" },
      { name: "Honey Blonde", why: "Warm golden tones that complement olive and golden skin" },
      { name: "Caramel Highlights", why: "Adds dimension while staying within your warm palette" },
      { name: "Auburn", why: "Warm red-copper tones that make green and hazel eyes pop" },
      { name: "Chestnut", why: "Natural-looking warmth that adds depth without stark contrast" },
      { name: "Warm Copper", why: "Vibrant and eye-catching while harmonising with warm skin" },
    ],
    clothingColours: [
      { name: "Olive Green", hex: "#556B2F" },
      { name: "Coral", hex: "#FF7F50" },
      { name: "Warm Red", hex: "#C41E3A" },
      { name: "Mustard Yellow", hex: "#FFDB58" },
      { name: "Cream", hex: "#FFFDD0" },
      { name: "Terracotta", hex: "#E2725B" },
      { name: "Warm Brown", hex: "#8B4513" },
      { name: "Peach", hex: "#FFCBA4" },
    ],
    metals: ["Gold", "Rose gold", "Copper", "Brass", "Warm-toned mixed metals"],
    foundationBrands: ["MAC (NC shades)", "Fenty Beauty (warm ranges)", "NARS (Barcelona, Syracuse)", "Estée Lauder Double Wear (warm tones)"],
    blushColours: ["Coral", "Peach", "Warm pink", "Apricot", "Terracotta"],
    lipstickShades: ["Coral", "Warm nude", "Peach", "Warm red (orange-based)", "Bronze", "Terracotta"],
    eyeshadowPalettes: ["Warm neutrals", "Gold and bronze", "Copper and rust", "Earth tones", "Olive and sage"],
    nailColours: ["Coral", "Warm red", "Peach", "Gold shimmer", "Terracotta", "Warm nude"],
  },
  cool: {
    type: "cool",
    label: "Cool Undertone",
    description: "Your skin has pink, red or bluish undertones. You probably burn easily in the sun and silver jewellery makes your skin look bright and clear. Cool-toned skin looks stunning with jewel tones, silver metallics and berry-based makeup.",
    makeup: [
      { product: "Foundation", recommendation: "Look for shades labelled 'cool', 'rose', 'porcelain' or 'ivory'. Avoid yellow-based foundations — they'll look sallow on you." },
      { product: "Concealer", recommendation: "Pink-toned concealers correct under-eye circles on cool skin without looking orange." },
      { product: "Bronzer", recommendation: "Avoid traditional bronzers — they can look muddy. Use a cool-toned contour instead." },
      { product: "Highlighter", recommendation: "Silver, icy pink and pearl highlighters — they'll look like natural light on your skin." },
    ],
    hairColours: [
      { name: "Platinum Blonde", why: "Cool-toned blonde that looks sleek and modern on cool skin" },
      { name: "Ash Blonde", why: "Muted, cool blonde that avoids any brassiness" },
      { name: "Cool Brown", why: "Ashy, cool-toned brown that's sophisticated and low-maintenance" },
      { name: "Burgundy", why: "Deep red-wine tones that complement pink-based skin beautifully" },
      { name: "Silver Grey", why: "Edgy, modern shade that harmonises perfectly with cool undertones" },
      { name: "Black", why: "Classic, dramatic contrast that makes cool skin look luminous" },
    ],
    clothingColours: [
      { name: "Royal Blue", hex: "#4169E1" },
      { name: "Emerald Green", hex: "#50C878" },
      { name: "Lavender", hex: "#E6E6FA" },
      { name: "Blush Pink", hex: "#DE5D83" },
      { name: "Navy", hex: "#000080" },
      { name: "Pure White", hex: "#FFFFFF" },
      { name: "Deep Purple", hex: "#6A0DAD" },
      { name: "Burgundy", hex: "#800020" },
    ],
    metals: ["Silver", "Platinum", "White gold", "Pewter", "Chrome"],
    foundationBrands: ["MAC (NC/cool shades)", "Fenty Beauty (cool ranges)", "NARS (Deauville, Mont Blanc)", "IT Cosmetics (cool tones)"],
    blushColours: ["Berry", "Mauve", "Rose", "Pink", "Plum"],
    lipstickShades: ["Berry", "Mauve", "Blue-red", "Plum", "Rose", "Cool nude"],
    eyeshadowPalettes: ["Cool neutrals", "Silver and grey", "Plum and berry", "Cool taupes", "Blue and purple"],
    nailColours: ["Berry", "Mauve", "Cool pink", "Plum", "Burgundy", "Silver shimmer"],
  },
  neutral: {
    type: "neutral",
    label: "Neutral Undertone",
    description: "Your skin has a balanced mix of warm and cool tones. You're the most versatile — both gold and silver jewellery suit you, and most colour palettes work well. Neutral undertones can wear almost any shade, making colour choices easy and fun.",
    makeup: [
      { product: "Foundation", recommendation: "Look for 'neutral' or 'natural' shades. Most brands' middle-range shades will match you perfectly." },
      { product: "Concealer", recommendation: "A balanced, neither-pink-nor-yellow concealer will blend seamlessly." },
      { product: "Bronzer", recommendation: "Both warm and cool bronzers work — choose based on the look you want." },
      { product: "Highlighter", recommendation: "Champagne, soft gold or pearlescent — you can wear both warm and cool highlights." },
    ],
    hairColours: [
      { name: "Natural Brown", why: "Your most harmonious shade — enhances without overwhelming" },
      { name: "Caramel", why: "Warm enough to add glow, cool enough to stay sophisticated" },
      { name: "Soft Highlights", why: "Dimensional colour that adds interest while looking natural" },
      { name: "Honey Blonde", why: "A warm-leaning blonde that doesn't go too golden on neutral skin" },
      { name: "Chestnut", why: "Rich, balanced brown that suits virtually everyone" },
      { name: "Beige Blonde", why: "Neutral-toned blonde that's neither too warm nor too cool" },
    ],
    clothingColours: [
      { name: "Sage Green", hex: "#8FBC8F" },
      { name: "Dusty Rose", hex: "#DCAE96" },
      { name: "Soft Teal", hex: "#008080" },
      { name: "Lavender", hex: "#E6E6FA" },
      { name: "Warm Grey", hex: "#808080" },
      { name: "Off-White", hex: "#FAF0E6" },
      { name: "Soft Coral", hex: "#F88379" },
      { name: "Muted Blue", hex: "#6699CC" },
    ],
    metals: ["Both gold and silver", "Rose gold", "Mixed metals", "Champagne gold"],
    foundationBrands: ["MAC (NC/NW middle shades)", "Fenty Beauty (neutral ranges)", "NARS (Barcelona, Ceylan)", "Too Faced (neutral shades)"],
    blushColours: ["Dusty rose", "Soft pink", "Mauve", "Soft peach", "Nude pink"],
    lipstickShades: ["Dusty rose", "Nude", "Soft berry", "Mauve", "Warm pink", "Classic red"],
    eyeshadowPalettes: ["Neutral taupes", "Soft browns", "Rose gold", "Muted greens", "Dusty pinks"],
    nailColours: ["Dusty rose", "Nude pink", "Soft mauve", "Classic red", "Taupe", "Soft coral"],
  },
};

export function SkinUndertoneAnalyzer() {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Undertone[]>([]);
  const [result, setResult] = useState<UndertoneResult | null>(null);

  const handleAnswer = (value: Undertone) => {
    const updated = [...answers, value];
    setAnswers(updated);
    if (current < questions.length - 1) {
      setCurrent(current + 1);
    } else {
      const counts: Record<Undertone, number> = { warm: 0, cool: 0, neutral: 0 };
      updated.forEach((a) => { counts[a]++; });
      const winner = (Object.entries(counts) as [Undertone, number][]).sort((a, b) => b[1] - a[1])[0][0];
      setResult(results[winner]);
    }
  };

  const restart = () => { setCurrent(0); setAnswers([]); setResult(null); };

  if (result) {
    return (
      <div className="space-y-8">
        {/* Result header */}
        <div className="rounded-3xl border border-brown/10 bg-cream p-6 text-center shadow-soft sm:p-8">
          <span className="text-xs font-medium uppercase tracking-[0.25em] text-brown">Your Result</span>
          <h2 className="mt-3 font-serif text-2xl font-semibold text-luxury-black sm:text-3xl">{result.label}</h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-charcoal/70 sm:text-base">{result.description}</p>
        </div>

        {/* Foundation guide */}
        <div className="rounded-3xl border border-brown/10 bg-white p-6 shadow-soft sm:p-8">
          <h3 className="font-serif text-lg font-semibold text-luxury-black">Foundation & Base Products</h3>
          <div className="mt-3 space-y-3">
            {result.makeup.map((m) => (
              <div key={m.product} className="rounded-xl bg-cream/50 p-3">
                <p className="text-sm font-semibold text-luxury-black">{m.product}</p>
                <p className="mt-0.5 text-xs text-charcoal/70">{m.recommendation}</p>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <p className="text-xs font-medium uppercase tracking-wider text-brown">Recommended Brands & Shades</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {result.foundationBrands.map((b) => (
                <span key={b} className="rounded-full bg-cream px-3 py-1 text-xs font-medium text-charcoal">{b}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Results grid */}
        <div className="grid gap-6 sm:grid-cols-2">
          {/* Hair colours */}
          <div className="rounded-3xl border border-brown/10 bg-white p-6 shadow-soft">
            <h3 className="font-serif text-lg font-semibold text-luxury-black">Best Hair Colours</h3>
            <p className="mt-1 text-xs text-charcoal/50">With explanations of why they suit you</p>
            <ul className="mt-4 space-y-3">
              {result.hairColours.map((h) => (
                <li key={h.name} className="rounded-xl bg-cream/50 p-3">
                  <p className="text-sm font-semibold text-luxury-black">{h.name}</p>
                  <p className="mt-0.5 text-xs text-charcoal/60">{h.why}</p>
                </li>
              ))}
            </ul>
            <Link href="/services/hair" className="mt-4 inline-flex text-sm font-medium text-brown hover:underline">
              Book hair colour consultation →
            </Link>
          </div>

          {/* Clothing colours */}
          <div className="rounded-3xl border border-brown/10 bg-white p-6 shadow-soft">
            <h3 className="font-serif text-lg font-semibold text-luxury-black">Best Clothing Colours</h3>
            <p className="mt-1 text-xs text-charcoal/50">Click any colour to see the shade</p>
            <div className="mt-4 grid grid-cols-4 gap-2">
              {result.clothingColours.map((c) => (
                <div key={c.name} className="flex flex-col items-center gap-1.5">
                  <div className="h-10 w-10 rounded-full shadow-inner border border-black/5" style={{ backgroundColor: c.hex }} />
                  <span className="text-[0.6rem] text-center text-charcoal/60">{c.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Makeup */}
          <div className="rounded-3xl border border-brown/10 bg-white p-6 shadow-soft">
            <h3 className="font-serif text-lg font-semibold text-luxury-black">Makeup Colours</h3>
            <div className="mt-4 space-y-3">
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-brown">Blush</p>
                <div className="mt-1.5 flex flex-wrap gap-1.5">
                  {result.blushColours.map((b) => (
                    <span key={b} className="rounded-full bg-cream px-3 py-1 text-xs font-medium text-charcoal">{b}</span>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-brown">Lipstick</p>
                <div className="mt-1.5 flex flex-wrap gap-1.5">
                  {result.lipstickShades.map((l) => (
                    <span key={l} className="rounded-full bg-cream px-3 py-1 text-xs font-medium text-charcoal">{l}</span>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-brown">Eyeshadow Palettes</p>
                <div className="mt-1.5 flex flex-wrap gap-1.5">
                  {result.eyeshadowPalettes.map((e) => (
                    <span key={e} className="rounded-full bg-cream px-3 py-1 text-xs font-medium text-charcoal">{e}</span>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-brown">Nail Colours</p>
                <div className="mt-1.5 flex flex-wrap gap-1.5">
                  {result.nailColours.map((n) => (
                    <span key={n} className="rounded-full bg-cream px-3 py-1 text-xs font-medium text-charcoal">{n}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Metals & jewellery */}
          <div className="rounded-3xl border border-brown/10 bg-white p-6 shadow-soft">
            <h3 className="font-serif text-lg font-semibold text-luxury-black">Best Metals & Jewellery</h3>
            <div className="mt-4 space-y-3">
              {result.metals.map((m) => (
                <div key={m} className="flex items-center gap-3 rounded-xl bg-cream/50 p-3">
                  <span className="h-3 w-3 rounded-full bg-gradient-to-br from-yellow-300 to-yellow-600" />
                  <span className="text-sm font-medium text-charcoal/70">{m}</span>
                </div>
              ))}
            </div>
            <Link href="/services/threading" className="mt-4 inline-flex text-sm font-medium text-brown hover:underline">
              Book brow shaping →
            </Link>
          </div>
        </div>

        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link href="/services/makeup" className="rounded-full bg-brown px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-brown-600">
            Book Makeup Consultation
          </Link>
          <button onClick={restart} className="rounded-full border border-brown/20 px-8 py-3 text-sm font-semibold text-charcoal transition-colors hover:bg-cream">
            Start Over
          </button>
        </div>
      </div>
    );
  }

  const q = questions[current];
  const progress = ((current) / questions.length) * 100;

  return (
    <div className="space-y-6">
      {/* Progress */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs text-charcoal/50">
          <span>Question {current + 1} of {questions.length}</span>
          <span>{Math.round(progress)}% complete</span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-cream">
          <div className="h-full rounded-full bg-brown transition-all duration-500" style={{ width: `${progress}%` }} />
        </div>
      </div>

      {/* Question */}
      <div className="rounded-3xl border border-brown/10 bg-white p-6 text-center shadow-soft sm:p-8">
        <h2 className="font-serif text-xl font-semibold text-luxury-black sm:text-2xl">{q.question}</h2>
        {q.hint && <p className="mt-2 text-xs text-charcoal/50">{q.hint}</p>}
      </div>

      {/* Options */}
      <div className="grid gap-3">
        {q.options.map((opt) => (
          <button
            key={opt.value}
            onClick={() => handleAnswer(opt.value)}
            className="rounded-2xl border border-brown/10 bg-white p-4 text-left text-sm font-medium text-charcoal shadow-soft transition-all hover:-translate-y-0.5 hover:border-brown/30 hover:shadow-luxury sm:p-5"
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}
