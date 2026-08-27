"use client";

import { useState, useRef, useCallback } from "react";
import Link from "next/link";

interface HairColor {
  name: string;
  cssColor: string;
  blend: number;
  description: string;
  bestFor: string;
  maintenance: string;
  priceRange: string;
  skinTones: string[];
}

const hairColors: HairColor[] = [
  { name: "Natural Black", cssColor: "rgba(20,15,10,0.55)", blend: 0.55, description: "Classic deep black with subtle warm undertones. The most natural-looking dark shade that adds depth and shine.", bestFor: "Cool and neutral skin tones", maintenance: "Low — root growth is less visible", priceRange: "From 150 zł", skinTones: ["Fair", "Medium", "Olive", "Dark"] },
  { name: "Dark Espresso", cssColor: "rgba(45,25,15,0.52)", blend: 0.52, description: "Rich, dark brown with cool undertones. Deeper than chocolate, more nuanced than black.", bestFor: "Cool and neutral undertones", maintenance: "Low — subtle root grow-out", priceRange: "From 150 zł", skinTones: ["Fair", "Medium", "Olive"] },
  { name: "Chocolate Brown", cssColor: "rgba(100,55,25,0.48)", blend: 0.48, description: "Warm, rich brown with golden and copper undertones. One of the most universally flattering shades.", bestFor: "Warm and neutral skin tones", maintenance: "Low to medium", priceRange: "From 180 zł", skinTones: ["Fair", "Medium", "Olive", "Dark"] },
  { name: "Caramel", cssColor: "rgba(160,110,50,0.45)", blend: 0.45, description: "Warm golden-brown that catches the light beautifully. Creates a sun-kissed, dimensional look.", bestFor: "Warm and olive skin tones", maintenance: "Medium — toning every 6-8 weeks", priceRange: "From 250 zł (balayage)", skinTones: ["Medium", "Olive", "Dark"] },
  { name: "Honey Blonde", cssColor: "rgba(200,170,90,0.42)", blend: 0.42, description: "Warm, golden blonde with depth. Not too light, not too dark — the perfect warm blonde.", bestFor: "Warm skin tones with golden undertones", maintenance: "Medium to high — root touch-ups every 6-8 weeks", priceRange: "From 300 zł", skinTones: ["Fair", "Medium"] },
  { name: "Platinum Blonde", cssColor: "rgba(230,220,200,0.40)", blend: 0.40, description: "Ultra-light, cool-toned blonde. A bold, high-fashion statement that requires commitment.", bestFor: "Cool skin tones, light eyes", maintenance: "High — toning every 4 weeks, root touch-ups every 4-6 weeks", priceRange: "From 400 zł", skinTones: ["Fair"] },
  { name: "Auburn", cssColor: "rgba(140,40,20,0.48)", blend: 0.48, description: "Rich red-brown with warm copper tones. A striking, autumnal colour that glows in sunlight.", bestFor: "Warm and neutral skin tones, green/hazel eyes", maintenance: "Medium — red fades fastest, toning helps", priceRange: "From 200 zł", skinTones: ["Fair", "Medium", "Olive"] },
  { name: "Burgundy", cssColor: "rgba(120,20,40,0.50)", blend: 0.50, description: "Deep red-wine colour with purple undertones. Dramatic, bold and head-turning.", bestFor: "Cool and neutral skin tones", maintenance: "Medium — colour-safe products essential", priceRange: "From 200 zł", skinTones: ["Fair", "Medium", "Olive"] },
  { name: "Copper Red", cssColor: "rgba(180,70,30,0.46)", blend: 0.46, description: "Vibrant, fiery copper that radiates warmth. A show-stopping colour that suits confident personalities.", bestFor: "Warm skin tones, fair to medium", maintenance: "Medium to high — vibrant reds need maintenance", priceRange: "From 220 zł", skinTones: ["Fair", "Medium"] },
  { name: "Ash Blonde", cssColor: "rgba(180,175,165,0.42)", blend: 0.42, description: "Cool-toned, muted blonde without warmth. Modern, sophisticated and very on-trend.", bestFor: "Cool skin tones, pink or blue undertones", maintenance: "High — purple shampoo needed, regular toning", priceRange: "From 350 zł", skinTones: ["Fair", "Medium"] },
  { name: "Rose Gold", cssColor: "rgba(200,140,130,0.40)", blend: 0.40, description: "Trendy pink-gold shimmer that's equal parts feminine and edgy. A fashion-forward statement.", bestFor: "Warm and neutral skin tones", maintenance: "High — fades quickly, needs colour-refreshing", priceRange: "From 300 zł", skinTones: ["Fair", "Medium"] },
  { name: "Silver Grey", cssColor: "rgba(180,180,185,0.42)", blend: 0.42, description: "Modern, edgy silver that makes a statement. Requires pre-lightening for most natural hair colours.", bestFor: "Cool skin tones, any age", maintenance: "Very high — toning every 2-3 weeks", priceRange: "From 450 zł", skinTones: ["Fair", "Medium"] },
  { name: "Sandy Blonde", cssColor: "rgba(190,165,120,0.43)", blend: 0.43, description: "Neutral, beachy blonde with warm and cool balance. Effortless and natural-looking.", bestFor: "Neutral skin tones", maintenance: "Medium — low-maintenance grow-out", priceRange: "From 280 zł", skinTones: ["Fair", "Medium"] },
  { name: "Mahogany", cssColor: "rgba(110,30,25,0.50)", blend: 0.50, description: "Deep brown with rich red-violet undertones. Luxurious and sophisticated.", bestFor: "Warm and neutral skin tones", maintenance: "Medium", priceRange: "From 200 zł", skinTones: ["Medium", "Olive", "Dark"] },
  { name: "Chestnut", cssColor: "rgba(120,65,30,0.47)", blend: 0.47, description: "Medium brown with warm golden highlights. Natural, versatile and always elegant.", bestFor: "All skin tones", maintenance: "Low to medium", priceRange: "From 180 zł", skinTones: ["Fair", "Medium", "Olive", "Dark"] },
  { name: "Ice Blonde", cssColor: "rgba(220,225,230,0.38)", blend: 0.38, description: "Ultra-cool, almost white blonde. High-maintenance but absolutely stunning when done right.", bestFor: "Cool skin tones only", maintenance: "Very high — salon visits every 3-4 weeks", priceRange: "From 500 zł", skinTones: ["Fair"] },
];

export function HairColorSimulator() {
  const [selectedColor, setSelectedColor] = useState(hairColors[0]);
  const [image, setImage] = useState<string | null>(null);
  const [intensity, setIntensity] = useState(50);
  const [selectedSkinTone, setSelectedSkinTone] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setImage(ev.target?.result as string);
    reader.readAsDataURL(file);
  }, []);

  const blendValue = (selectedColor.blend * intensity) / 50;
  const filteredColors = selectedSkinTone
    ? hairColors.filter((c) => c.skinTones.includes(selectedSkinTone))
    : hairColors;

  return (
    <div className="space-y-8">
      {/* Skin tone selector */}
      <div className="rounded-3xl border border-brown/10 bg-white p-6 shadow-soft">
        <h3 className="font-serif text-lg font-semibold text-luxury-black">What&apos;s your skin tone?</h3>
        <p className="mt-1 text-xs text-charcoal/50">Optional — we&apos;ll filter colours that suit you best.</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {["Fair", "Medium", "Olive", "Dark"].map((tone) => (
            <button
              key={tone}
              onClick={() => setSelectedSkinTone(selectedSkinTone === tone ? null : tone)}
              className={`rounded-full px-5 py-2 text-sm font-medium transition-all ${
                selectedSkinTone === tone
                  ? "bg-brown text-white shadow-soft"
                  : "border border-brown/15 bg-cream text-charcoal/70 hover:border-brown/30"
              }`}
            >
              {tone}
            </button>
          ))}
        </div>
      </div>

      {/* Upload area */}
      {!image ? (
        <button
          onClick={() => fileRef.current?.click()}
          className="flex w-full flex-col items-center justify-center rounded-3xl border-2 border-dashed border-brown/20 bg-cream py-16 text-center transition-colors hover:border-brown/40 sm:py-20"
        >
          <svg className="h-12 w-12 text-brown/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <p className="mt-3 text-sm font-medium text-charcoal/70">Click to upload a front-facing photo</p>
          <p className="mt-1 text-xs text-charcoal/50">JPG, PNG — your photo stays in your browser, never uploaded to a server</p>
          <div className="mt-4 flex flex-wrap justify-center gap-2 text-xs text-charcoal/40">
            <span className="rounded-full bg-white px-3 py-1">Hair pulled back</span>
            <span className="rounded-full bg-white px-3 py-1">Natural lighting</span>
            <span className="rounded-full bg-white px-3 py-1">Front-facing</span>
          </div>
        </button>
      ) : (
        <>
          <div className="relative overflow-hidden rounded-3xl border border-brown/10 bg-cream shadow-soft">
            <img src={image} alt="Your photo with hair colour overlay" className="w-full object-cover" style={{ maxHeight: "500px" }} />
            <div className="absolute inset-0 mix-blend-color" style={{ backgroundColor: selectedColor.cssColor, opacity: blendValue }} />
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
              <span className="rounded-full bg-luxury-black/80 px-4 py-1.5 text-xs font-medium text-white backdrop-blur-sm">
                {selectedColor.name}
              </span>
              <button onClick={() => setImage(null)} className="rounded-full bg-luxury-black/80 px-4 py-2 text-xs font-medium text-white backdrop-blur-sm transition-colors hover:bg-luxury-black">
                Upload New Photo
              </button>
            </div>
          </div>

          {/* Intensity slider */}
          <div className="rounded-3xl border border-brown/10 bg-white p-6 shadow-soft">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-charcoal/70">Colour Intensity</p>
                <p className="text-xs text-charcoal/50">Lower = more natural, Higher = more dramatic</p>
              </div>
              <span className="text-lg font-semibold text-brown">{intensity}%</span>
            </div>
            <input type="range" min={10} max={100} value={intensity} onChange={(e) => setIntensity(Number(e.target.value))} className="mt-3 w-full accent-brown" />
          </div>
        </>
      )}

      {/* Colour palette */}
      <div className="rounded-3xl border border-brown/10 bg-white p-6 shadow-soft">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-serif text-lg font-semibold text-luxury-black">Choose a Hair Colour</h3>
            <p className="mt-0.5 text-xs text-charcoal/50">{filteredColors.length} colours available{selectedSkinTone ? ` for ${selectedSkinTone} skin` : ""}</p>
          </div>
          <span className="rounded-full bg-cream px-3 py-1 text-xs font-medium text-brown">{selectedColor.name}</span>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-4 sm:gap-3 lg:grid-cols-5">
          {filteredColors.map((c) => (
            <button
              key={c.name}
              onClick={() => setSelectedColor(c)}
              className={`flex flex-col items-center rounded-2xl p-3 transition-all ${
                selectedColor.name === c.name
                  ? "ring-2 ring-brown shadow-luxury"
                  : "border border-brown/10 hover:border-brown/30"
              }`}
            >
              <div className="h-10 w-10 rounded-full shadow-inner" style={{ backgroundColor: c.cssColor, mixBlendMode: "multiply" }} />
              <span className="mt-2 text-[0.65rem] font-medium text-charcoal/70 sm:text-xs">{c.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Selected colour details */}
      <div className="rounded-3xl border border-brown/10 bg-cream p-6 shadow-soft sm:p-8">
        <h3 className="font-serif text-xl font-semibold text-luxury-black">{selectedColor.name}</h3>
        <p className="mt-2 text-sm leading-relaxed text-charcoal/70">{selectedColor.description}</p>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl bg-white p-4">
            <p className="text-xs font-medium uppercase tracking-wider text-brown">Best For</p>
            <p className="mt-1 text-sm text-charcoal/70">{selectedColor.bestFor}</p>
          </div>
          <div className="rounded-2xl bg-white p-4">
            <p className="text-xs font-medium uppercase tracking-wider text-brown">Maintenance</p>
            <p className="mt-1 text-sm text-charcoal/70">{selectedColor.maintenance}</p>
          </div>
          <div className="rounded-2xl bg-white p-4">
            <p className="text-xs font-medium uppercase tracking-wider text-brown">Price Range</p>
            <p className="mt-1 text-sm text-charcoal/70">{selectedColor.priceRange}</p>
          </div>
        </div>
        <Link href="/services/hair" className="mt-6 inline-flex rounded-full bg-brown px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brown-600">
          Book Hair Colour Consultation
        </Link>
      </div>

      <input ref={fileRef} type="file" accept="image/*" onChange={handleUpload} className="hidden" />
    </div>
  );
}
