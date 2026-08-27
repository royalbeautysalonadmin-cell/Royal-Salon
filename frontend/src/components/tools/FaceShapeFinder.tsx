"use client";

import { useState } from "react";
import Link from "next/link";

type FaceShape = "oval" | "round" | "square" | "heart" | "oblong" | "diamond";

interface FaceShapeResult {
  shape: FaceShape;
  label: string;
  description: string;
  characteristics: string[];
  celebrities: string[];
  hairstyles: { name: string; why: string }[];
  avoid: { name: string; why: string }[];
  brows: { name: string; why: string }[];
  lipColors: string[];
  earrings: string[];
  necklines: string[];
}

const questions = [
  {
    id: "jawline",
    question: "How would you describe your jawline?",
    hint: "Look in the mirror and trace the line from your ear to your chin.",
    options: [
      { label: "Rounded and soft — no sharp angles", value: "round" },
      { label: "Angular and defined — strong jaw", value: "square" },
      { label: "Pointed chin, wider forehead above", value: "heart" },
      { label: "Slightly rounded but noticeably long", value: "oblong" },
      { label: "Narrow and pointed — chin is very defined", value: "diamond" },
      { label: "Balanced and gently curved — neither wide nor narrow", value: "oval" },
    ],
  },
  {
    id: "forehead",
    question: "How does your forehead compare to your jawline?",
    hint: "Measure or estimate the width of your forehead vs your jaw.",
    options: [
      { label: "About the same width — balanced proportions", value: "oval" },
      { label: "Noticeably wider than the jawline", value: "heart" },
      { label: "Narrower than the jaw — jaw is the widest part", value: "diamond" },
      { label: "Tall and long — takes up more of the face", value: "oblong" },
      { label: "Wide and rounded — full at the temples", value: "round" },
      { label: "Broad and angular — straight across the top", value: "square" },
    ],
  },
  {
    id: "cheeks",
    question: "What do your cheekbones look like?",
    hint: "Feel the bony part under your eyes — are they high, wide, or subtle?",
    options: [
      { label: "Full and rounded — soft cheeks", value: "round" },
      { label: "High and prominent — the widest part of face", value: "diamond" },
      { label: "Balanced — not too high, not too low", value: "oval" },
      { label: "Angular or slightly hollow", value: "square" },
      { label: "Full with volume in the apples", value: "heart" },
      { label: "Slim — not very prominent", value: "oblong" },
    ],
  },
  {
    id: "length",
    question: "Is your face longer than it is wide?",
    hint: "Hold a ruler — measure height from hairline to chin, and width at cheeks.",
    options: [
      { label: "Yes, noticeably longer — about 1.5x the width", value: "oblong" },
      { label: "Slightly longer — classic balanced ratio", value: "oval" },
      { label: "About equal — face is as wide as it is long", value: "round" },
      { label: "About equal but angular — strong bone structure", value: "square" },
      { label: "Wider at cheeks, narrow at forehead and chin", value: "diamond" },
      { label: "Wider at forehead, narrows to a point at chin", value: "heart" },
    ],
  },
  {
    id: "hairline",
    question: "What is your hairline shape?",
    hint: "Pull your hair back and look at where your hair starts at the forehead.",
    options: [
      { label: "Rounded or has a widow's peak", value: "heart" },
      { label: "Straight across — like a horizontal line", value: "square" },
      { label: "Rounded and soft — gentle curve", value: "round" },
      { label: "High and rounded — forehead appears long", value: "oblong" },
      { label: "Narrow or pointed at the temples", value: "diamond" },
      { label: "Oval and balanced — smooth forehead", value: "oval" },
    ],
  },
];

const results: Record<FaceShape, FaceShapeResult> = {
  oval: {
    shape: "oval",
    label: "Oval Face Shape",
    description: "Your face is slightly longer than it is wide, with a gently rounded jawline and balanced proportions. The oval shape is considered the most versatile — almost every hairstyle, brow shape and accessory flatters you because your features are naturally proportioned.",
    characteristics: [
      "Forehead is slightly wider than the jawline",
      "Face is about 1.5 times longer than it is wide",
      "Jawline is gently rounded, not angular",
      "Cheekbones are the widest point of the face",
      "No single feature dominates — everything is balanced",
    ],
    celebrities: ["Beyoncé", "Zendaya", "Emma Watson", "Viola Davis", "Julia Roberts"],
    hairstyles: [
      { name: "Long layers", why: "Accentuates your balanced proportions without adding bulk" },
      { name: "Side-swept bangs", why: "Adds softness and dimension without hiding your face shape" },
      { name: "Textured bob (chin to shoulder)", why: "Frames the face beautifully at any length" },
      { name: "Sleek ponytail or bun", why: "Shows off your balanced bone structure" },
      { name: "Soft waves", why: "Adds movement while maintaining your natural symmetry" },
      { name: "Pixie cut", why: "Bold but works — your proportions can handle a short style" },
    ],
    avoid: [
      { name: "Heavy, blunt bangs", why: "Can hide your best feature — balanced proportions" },
      { name: "Excessive volume at the sides", why: "Can make a balanced face appear wider than it is" },
    ],
    brows: [
      { name: "Soft angled arch", why: "Complements your natural curves without overwhelming" },
      { name: "Natural feathery shape", why: "Enhances without looking overdone" },
      { name: "Slightly curved brow", why: "Follows the natural balance of your features" },
    ],
    lipColors: ["Nude pink", "Rose", "Soft berry", "Classic red", "Mauve"],
    earrings: ["Drop earrings", "Hoops (any size)", "Studs", "Chandelier earrings"],
    necklines: ["V-neck", "Scoop neck", "Off-shoulder", "High neck"],
  },
  round: {
    shape: "round",
    label: "Round Face Shape",
    description: "Your face is about as wide as it is long, with soft curves and a rounded jawline. Round faces have a youthful, approachable appearance. The key styling goal is to add length and definition — creating the illusion of a more elongated face.",
    characteristics: [
      "Face width and length are approximately equal",
      "Full cheeks are the widest part of the face",
      "Jawline is soft and rounded — no sharp angles",
      "Chin is rounded, not pointed",
      "Forehead is typically wide and rounded",
    ],
    celebrities: ["Selena Gomez", "Gigi Hadid", "Mila Kunis", "Adele", "Pixie Lott"],
    hairstyles: [
      { name: "Long layers with a side part", why: "Adds vertical length and narrows the face visually" },
      { name: "High ponytail or top knot", why: "Draws the eye upward, elongating the face" },
      { name: "Asymmetrical bob", why: "Creates angles that break up the roundness" },
      { name: "Textured pixie with height on top", why: "Adds height and shows off cheekbones" },
      { name: "Volume at the crown", why: "Makes the face appear longer and more oval" },
    ],
    avoid: [
      { name: "Chin-length bobs with no texture", why: "Emphasise the roundness by cutting at the widest point" },
      { name: "Heavy, round bangs", why: "Make the face appear shorter and rounder" },
      { name: "Styles with volume at the sides", why: "Add width where you don't want it" },
    ],
    brows: [
      { name: "High angled arch", why: "Creates the illusion of length and angles" },
      { name: "Angular brow shape", why: "Adds definition to soften roundness" },
      { name: "Tall, thin brow", why: "Draws the eye upward, elongating the face" },
    ],
    lipColors: ["Berry", "Deep rose", "Warm red", "Plum", "Coral"],
    earrings: ["Long dangle earrings", "Vertical drop earrings", "Angular geometric shapes"],
    necklines: ["V-neck", "Plunging neckline", "Asymmetric neckline"],
  },
  square: {
    shape: "square",
    label: "Square Face Shape",
    description: "You have a strong, angular jawline with a forehead and jaw that are roughly the same width. Square faces project strength and confidence. The styling goal is to soften the angular features while celebrating that beautiful bone structure.",
    characteristics: [
      "Jawline is strong and angular — the defining feature",
      "Forehead, cheekbones and jaw are approximately equal width",
      "Face length and width are similar",
      "Cheekbones are angular, not rounded",
      "Hairline tends to be straight across",
    ],
    celebrities: ["Keira Knightley", "Angelina Jolie", "Olivia Wilde", "Sandra Bullock", "Diane Kruger"],
    hairstyles: [
      { name: "Soft layers and waves", why: "Curves soften angular bone structure beautifully" },
      { name: "Side-swept bangs", why: "Breaks up the straight lines of the forehead" },
      { name: "Long bob with texture", why: "Adds movement that softens the jawline" },
      { name: "Pixie with a soft, side-swept fringe", why: "Shows off strong bone structure while softening angles" },
      { name: "Beach waves", why: "Loose curls add softness and femininity" },
      { name: "Shoulder-length with face-framing layers", why: "Draws attention away from the jawline" },
    ],
    avoid: [
      { name: "Blunt, straight-across bobs", why: "Mirror and emphasise the angular jawline" },
      { name: "Slicked-back tight styles", why: "Showcase the strongest angles without softening" },
      { name: "Centre parts with straight hair", why: "Create a boxy effect that highlights squareness" },
    ],
    brows: [
      { name: "Softly curved arch", why: "Softens the angular features without competing" },
      { name: "Rounded brow shape", why: "Adds curves to balance strong bone structure" },
      { name: "Medium-thick natural brow", why: "Complements without overpowering" },
    ],
    lipColors: ["Soft pink", "Nude", "Warm coral", "Berry", "Rose gold"],
    earrings: ["Round hoops", "Circular studs", "Soft curved drops"],
    necklines: ["V-neck", "Wrap necklines", "Soft cowl neck"],
  },
  heart: {
    shape: "heart",
    label: "Heart Face Shape",
    description: "Your face is wider at the forehead and temples, narrowing to a pointed chin. Heart faces have a feminine, romantic quality. The goal is to balance the wider forehead by adding volume and width at the jawline.",
    characteristics: [
      "Forehead is the widest part of the face",
      "Chin is pointed or narrow — the smallest point",
      "Cheekbones are high and often prominent",
      "Hairline may have a widow's peak",
      "Face tapers from wide forehead to narrow chin",
    ],
    celebrities: ["Reese Witherspoon", "Kourtney Kardashian", "Halle Berry", "Nicole Kidman", "Zendaya"],
    hairstyles: [
      { name: "Chin-length bob", why: "Adds volume exactly where you need it — at the jawline" },
      { name: "Side-parted waves", why: "Reduces the appearance of a wide forehead" },
      { name: "Long layers with texture at the ends", why: "Balances proportions by adding weight lower down" },
      { name: "Pixie with side fringe", why: "Softens the forehead while showing the chin" },
      { name: "Low ponytail", why: "Keeps volume at the bottom, balancing the forehead" },
    ],
    avoid: [
      { name: "Heavy volume at the crown", why: "Makes the forehead appear even wider" },
      { name: "Slicked-back styles", why: "Fully exposes the wider forehead" },
      { name: "Short bobs that end at the chin point", why: "Accentuates the narrowest part of your face" },
    ],
    brows: [
      { name: "Soft, low arch", why: "Doesn't draw attention to the wide forehead" },
      { name: "Gentle rounded shape", why: "Complements without creating competition with the forehead" },
      { name: "Slightly longer brow tail", why: "Balances the narrower lower face" },
    ],
    lipColors: ["Classic red", "Pink nude", "Berry", "Soft mauve", "Warm peach"],
    earrings: ["Chandelier earrings", "Teardrop shapes", "Bottom-heavy earrings"],
    necklines: ["Boat neck", "Off-shoulder", "Square neckline"],
  },
  oblong: {
    shape: "oblong",
    label: "Oblong Face Shape",
    description: "Your face is noticeably longer than it is wide, with a straight cheek line and similar forehead, cheek and jaw widths. Oblong faces have elegant proportions. The goal is to create the illusion of width and break up the vertical length.",
    characteristics: [
      "Face is noticeably longer than it is wide",
      "Forehead, cheeks and jaw are roughly the same width",
      "Cheek line is straight — no significant curves",
      "Chin may be slightly rounded or elongated",
      "Overall impression is of length rather than width",
    ],
    celebrities: ["Sarah Jessica Parker", "Katie Holmes", "Lucy Liu", "Gwyneth Paltrow", "Alexa Chung"],
    hairstyles: [
      { name: "Bob cuts and lobs", why: "Cut at chin or jaw level to add horizontal width" },
      { name: "Waves and curls", why: "Volume at the sides creates the illusion of width" },
      { name: "Full fringe or bangs", why: "Shortens the face by covering the forehead" },
      { name: "Side parts with volume", why: "Breaks up the vertical line and adds width" },
      { name: "Shoulder-length layers", why: "Adds body and movement that widens the face" },
    ],
    avoid: [
      { name: "Very long straight hair", why: "Extends the vertical line, making the face appear longer" },
      { name: "Centre parts with no volume", why: "Creates a straight line that emphasises length" },
      { name: "Sleek, pulled-back styles", why: "Fully exposes the elongated proportions" },
      { name: "Pixie cuts with height on top", why: "Adds unwanted height to an already long face" },
    ],
    brows: [
      { name: "Flat, horizontal brow", why: "Creates a horizontal line that widens the face" },
      { name: "Low arch", why: "Doesn't add height — keeps focus on width" },
      { name: "Straight brow shape", why: "Balances the vertical length with horizontal emphasis" },
    ],
    lipColors: ["Bold red", "Bright coral", "Deep berry", "Vibrant pink"],
    earrings: ["Round studs", "Button earrings", "Wide hoops", "Horizontal shapes"],
    necklines: ["Wide necklines", "Boat neck", "Off-shoulder", "Crew neck"],
  },
  diamond: {
    shape: "diamond",
    label: "Diamond Face Shape",
    description: "You have narrow forehead and jawline with wide, prominent cheekbones — the rarest face shape. Diamond faces have striking, sculptural bone structure. The goal is to add width at the forehead and jawline while softening the cheekbone prominence.",
    characteristics: [
      "Cheekbones are the widest and most prominent feature",
      "Forehead is narrow — narrows from cheeks upward",
      "Jawline is narrow and often pointed",
      "Chin is typically narrow and defined",
      "Face has dramatic, angular contours",
    ],
    celebrities: ["Megan Fox", "Victoria Beckham", "Rihanna", "Taylor Swift", "JLo"],
    hairstyles: [
      { name: "Textured bob with fringe", why: "Adds width at the forehead with the fringe" },
      { name: "Side-swept bangs", why: "Creates the illusion of a wider forehead" },
      { name: "Chin-length styles with volume", why: "Adds width at the jawline to balance the cheeks" },
      { name: "Layered cuts with soft waves", why: "Softens the angular bone structure" },
      { name: "Full-fringe styles", why: "Visually widens the narrow forehead" },
      { name: "Medium-length with face-framing layers", why: "Softens the cheekbone prominence" },
    ],
    avoid: [
      { name: "Sleek, tight styles", why: "Exaggerate the narrow forehead and jaw" },
      { name: "Centre parts that narrow the forehead", why: "Make the forehead appear even narrower" },
      { name: "Volume only at the crown", why: "Highlights the narrowness of the upper face" },
    ],
    brows: [
      { name: "Curved, soft arch", why: "Softens the angular cheekbone structure" },
      { name: "Gentle rounded brows", why: "Adds curves to balance the sharp angles" },
      { name: "Slightly thicker brow", why: "Draws attention to the forehead area" },
    ],
    lipColors: ["Soft pink", "Nude rose", "Warm peach", "Light berry"],
    earrings: ["Stud earrings", "Top-heavy earrings", "Wide hoops", "Chandelier earrings"],
    necklines: ["V-neck", " scoop neck", "Off-shoulder"],
  },
};

export function FaceShapeFinder() {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [result, setResult] = useState<FaceShapeResult | null>(null);

  const handleAnswer = (value: string) => {
    const updated = [...answers, value];
    setAnswers(updated);
    if (current < questions.length - 1) {
      setCurrent(current + 1);
    } else {
      const counts: Record<string, number> = {};
      updated.forEach((a) => { counts[a] = (counts[a] || 0) + 1; });
      const winner = Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0] as FaceShape;
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

        {/* Characteristics */}
        <div className="rounded-3xl border border-brown/10 bg-white p-6 shadow-soft sm:p-8">
          <h3 className="font-serif text-lg font-semibold text-luxury-black">Key Characteristics</h3>
          <ul className="mt-3 space-y-2">
            {result.characteristics.map((c) => (
              <li key={c} className="flex items-start gap-2.5 text-sm text-charcoal/70">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                {c}
              </li>
            ))}
          </ul>
        </div>

        {/* Celebrity examples */}
        <div className="rounded-3xl border border-brown/10 bg-cream p-6 shadow-soft sm:p-8">
          <h3 className="font-serif text-lg font-semibold text-luxury-black">Celebrity Examples</h3>
          <p className="mt-1 text-sm text-charcoal/60">Famous people who share your face shape:</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {result.celebrities.map((c) => (
              <span key={c} className="rounded-full bg-white px-4 py-1.5 text-sm font-medium text-charcoal shadow-sm">{c}</span>
            ))}
          </div>
        </div>

        {/* Results grid */}
        <div className="grid gap-6 sm:grid-cols-2">
          {/* Best hairstyles */}
          <div className="rounded-3xl border border-brown/10 bg-white p-6 shadow-soft">
            <h3 className="font-serif text-lg font-semibold text-luxury-black">Best Hairstyles</h3>
            <p className="mt-1 text-xs text-charcoal/50">With explanations of why they work</p>
            <ul className="mt-4 space-y-3">
              {result.hairstyles.map((h) => (
                <li key={h.name} className="rounded-xl bg-cream/50 p-3">
                  <p className="text-sm font-semibold text-luxury-black">{h.name}</p>
                  <p className="mt-0.5 text-xs text-charcoal/60">{h.why}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* Avoid */}
          <div className="rounded-3xl border border-brown/10 bg-white p-6 shadow-soft">
            <h3 className="font-serif text-lg font-semibold text-luxury-black">Styles to Avoid</h3>
            <p className="mt-1 text-xs text-charcoal/50">And why they don&apos;t flatter your shape</p>
            <ul className="mt-4 space-y-3">
              {result.avoid.map((a) => (
                <li key={a.name} className="rounded-xl bg-red-50 p-3">
                  <p className="text-sm font-semibold text-charcoal">{a.name}</p>
                  <p className="mt-0.5 text-xs text-charcoal/60">{a.why}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* Brows */}
          <div className="rounded-3xl border border-brown/10 bg-white p-6 shadow-soft">
            <h3 className="font-serif text-lg font-semibold text-luxury-black">Best Brow Shapes</h3>
            <p className="mt-1 text-xs text-charcoal/50">Threading & shaping recommendations</p>
            <ul className="mt-4 space-y-3">
              {result.brows.map((b) => (
                <li key={b.name} className="rounded-xl bg-cream/50 p-3">
                  <p className="text-sm font-semibold text-luxury-black">{b.name}</p>
                  <p className="mt-0.5 text-xs text-charcoal/60">{b.why}</p>
                </li>
              ))}
            </ul>
            <Link href="/services/threading" className="mt-4 inline-flex text-sm font-medium text-brown hover:underline">
              Book brow threading →
            </Link>
          </div>

          {/* Accessories */}
          <div className="rounded-3xl border border-brown/10 bg-white p-6 shadow-soft">
            <h3 className="font-serif text-lg font-semibold text-luxury-black">Best Accessories</h3>
            <div className="mt-4 space-y-4">
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-brown">Lip Colours</p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {result.lipColors.map((l) => (
                    <span key={l} className="rounded-full bg-cream px-3 py-1 text-xs font-medium text-charcoal">{l}</span>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-brown">Earrings</p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {result.earrings.map((e) => (
                    <span key={e} className="rounded-full bg-cream px-3 py-1 text-xs font-medium text-charcoal">{e}</span>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-brown">Necklines</p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {result.necklines.map((n) => (
                    <span key={n} className="rounded-full bg-cream px-3 py-1 text-xs font-medium text-charcoal">{n}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link href="/services/threading" className="rounded-full bg-brown px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-brown-600">
            Book Brow Shaping
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

      {/* Question card */}
      <div className="rounded-3xl border border-brown/10 bg-white p-6 text-center shadow-soft sm:p-8">
        <h2 className="font-serif text-xl font-semibold text-luxury-black sm:text-2xl">{q.question}</h2>
        {q.hint && <p className="mt-2 text-xs text-charcoal/50">{q.hint}</p>}
      </div>

      {/* Options */}
      <div className="grid gap-3 sm:grid-cols-2">
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
