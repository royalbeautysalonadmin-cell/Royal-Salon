"use client";

import { useState } from "react";
import Link from "next/link";

interface Treatment {
  name: string;
  description: string;
  category: string;
  href: string;
  why: string;
  duration: string;
  price: string;
  aftercare: string;
  frequency: string;
}

const concerns: Record<string, string[]> = {
  hair: [
    "Frizzy or unmanageable hair",
    "Damaged or dry hair",
    "Want a colour change",
    "Thinning or falling hair",
    "Want smoother/straighter hair",
    "Just a trim or restyle",
    "Grey hair coverage",
    "Hair growth & scalp health",
  ],
  skin: [
    "Acne or congestion",
    "Dry or dehydrated skin",
    "Fine lines and ageing",
    "Pigmentation or dark spots",
    "Dull, tired skin",
    "Sensitive or red skin",
    "Large pores",
    "Under-eye circles",
  ],
  brows: [
    "Overgrown or unruly brows",
    "Sparse or thin brows",
    "Want a new brow shape",
    "Brow colour enhancement",
    "Sparse brow gaps",
  ],
  nails: [
    "Damaged or weak nails",
    "Want a long-lasting polish",
    "Dry hands or cracked heels",
    "Ingrown toenails",
    "Nail art or designs",
  ],
  hairRemoval: [
    "Facial hair (upper lip, chin)",
    "Full body smoothness",
    "Bikini area",
    "Underarms",
    "Sensitive skin hair removal",
    "Back or chest hair",
  ],
};

const recommendations: Record<string, Treatment[]> = {
  "Frizzy or unmanageable hair": [
    { name: "Keratin Treatment", description: "Professional smoothing treatment that infuses keratin protein into the hair shaft, sealing the cuticle and eliminating frizz for 3-5 months.", category: "Hair", href: "/services/hair", why: "Keratin fills in damaged gaps in the hair cuticle, creating a smooth, reflective surface that resists humidity.", duration: "2-3 hours", price: "From 500 zł", aftercare: "Use sulphate-free shampoo, avoid clipping hair back for 3 days, no washing for 48 hours.", frequency: "Every 3-5 months" },
    { name: "Nanoplasty", description: "Advanced, low-formaldehyde smoothing treatment that delivers silky, frizz-free results while being gentler on the hair and scalp than traditional keratin.", category: "Hair", href: "/services/hair", why: "Ideal for sensitive scalps or those who want a gentler formula without sacrificing results.", duration: "2-3 hours", price: "From 600 zł", aftercare: "Sulphate-free products, no tying hair for 3 days, avoid salt water for 1 week.", frequency: "Every 3-5 months" },
  ],
  "Damaged or dry hair": [
    { name: "Hair Spa Treatment", description: "Deep conditioning treatment with steam that opens the cuticle to allow intensive moisture and nutrients to penetrate deep into the hair shaft.", category: "Hair", href: "/services/hair", why: "Steam opens the cuticle so conditioning agents penetrate deeper than surface-level masks, restoring hair from within.", duration: "45-60 minutes", price: "From 120 zł", aftercare: "Apply a weekly home hair mask, reduce heat styling, use a heat protectant.", frequency: "Every 2-4 weeks" },
    { name: "Hair Oil Massage with Steam", description: "Nourishing oil treatment combined with steam and a relaxing scalp massage that stimulates blood circulation and deeply conditions.", category: "Hair", href: "/services/hair", why: "Massage stimulates follicles and blood flow while oil penetrates for deep nourishment. Steam enhances absorption.", duration: "30-45 minutes", price: "From 80 zł", aftercare: "Leave oil on for a few hours or overnight before washing. Avoid hot water.", frequency: "Weekly for best results" },
  ],
  "Want a colour change": [
    { name: "Balayage", description: "Hand-painted highlights that create natural, sun-kissed dimensions with soft, blended roots. Low-maintenance and grows out beautifully.", category: "Hair", href: "/services/hair", why: "Freehand painting means no harsh lines — the colour grows out naturally, reducing maintenance visits.", duration: "2-4 hours", price: "From 300 zł", aftercare: "Colour-safe shampoo, purple toning shampoo for blondes, deep condition weekly.", frequency: "Every 3-4 months" },
    { name: "Global Colour", description: "Full head colour application for a dramatic or subtle transformation. Covers greys completely and adds depth and shine.", category: "Hair", href: "/services/hair", why: "Complete, even coverage with low-ammonia products that protect hair integrity.", duration: "1.5-2.5 hours", price: "From 200 zł", aftercare: "Wait 48-72 hours before first wash, use colour-safe products, avoid heat for 1 week.", frequency: "Every 4-6 weeks for roots" },
  ],
  "Thinning or falling hair": [
    { name: "Hair Oil Massage with Steam", description: "Stimulating scalp massage with nourishing oils and steam to boost circulation and strengthen hair follicles.", category: "Hair", href: "/services/hair", why: "Improved blood flow delivers more nutrients to follicles, supporting growth and reducing hair fall.", duration: "30-45 minutes", price: "From 80 zł", aftercare: "Massage scalp gently at home for 5 minutes daily. Avoid tight hairstyles.", frequency: "Weekly" },
    { name: "Hair Spa Treatment", description: "Intensive treatment that nourishes the scalp and strengthens weak hair from root to tip.", category: "Hair", href: "/services/hair", why: "Strengthens the hair shaft to reduce breakage and adds volume to thinning hair.", duration: "45-60 minutes", price: "From 120 zł", aftercare: "Avoid over-washing, use volumising products, eat protein-rich foods.", frequency: "Every 2 weeks" },
  ],
  "Want smoother/straighter hair": [
    { name: "Keratin Smoothing", description: "Professional smoothing that lasts 3-5 months, making hair easier to manage and style daily.", category: "Hair", href: "/services/hair", why: "Fills damaged cuticle gaps, seals in moisture, and creates a smooth, straight finish that resists humidity.", duration: "2-3 hours", price: "From 500 zł", aftercare: "Sulphate-free shampoo, no clipping hair back, no washing for 48 hours.", frequency: "Every 3-5 months" },
    { name: "Hair Botox", description: "Deep conditioning treatment that fills damaged areas of the hair fibre, restoring elasticity and smoothness without chemicals.", category: "Hair", href: "/services/hair", why: "Like botox for hair — fills in damaged gaps for visibly healthier, smoother hair without straightening.", duration: "1-1.5 hours", price: "From 250 zł", aftercare: "Moisturise regularly, avoid sulphates, use a weekly mask.", frequency: "Monthly" },
  ],
  "Just a trim or restyle": [
    { name: "Advanced Haircut", description: "Precision cut with personalised consultation, shampoo, cut and styling tailored to your face shape, hair type and lifestyle.", category: "Hair", href: "/services/hair", why: "A cut designed around YOUR features — not a one-size-fits-all approach.", duration: "45-60 minutes", price: "From 108 zł", aftercare: "Regular trims every 6-8 weeks to maintain shape and prevent split ends.", frequency: "Every 6-8 weeks" },
    { name: "Blow Dry", description: "Professional wash and blow dry with styling — adds volume, smoothness and a polished finish.", category: "Hair", href: "/services/hair", why: "Professional technique and products create a finish that's impossible to replicate at home.", duration: "30-45 minutes", price: "From 60 zł", aftercare: "Avoid touching hair to prevent frizz. Use dry shampoo to extend the style.", frequency: "As needed" },
  ],
  "Grey hair coverage": [
    { name: "Root Touch-Up", description: "Colour application focused on new growth to blend grey roots with your existing colour.", category: "Hair", href: "/services/hair", why: "Targeted coverage that's quick, affordable and maintains your colour between full sessions.", duration: "1-1.5 hours", price: "From 150 zł", aftercare: "Colour-safe shampoo, avoid washing for 48 hours.", frequency: "Every 4-6 weeks" },
    { name: "Global Colour", description: "Full head colour for complete, even grey coverage with a fresh, vibrant result.", category: "Hair", href: "/services/hair", why: "Comprehensive coverage with products designed for grey-resistant hair.", duration: "1.5-2.5 hours", price: "From 200 zł", aftercare: "Wait 48-72 hours before washing, use colour-safe products.", frequency: "Every 4-6 weeks" },
  ],
  "Hair growth & scalp health": [
    { name: "Hair Oil Massage with Steam", description: "Traditional champi oil massage with steam treatment to nourish the scalp and promote healthy growth.", category: "Hair", href: "/services/hair", why: "Stimulates blood circulation, unclogs follicles and provides nutrients for growth.", duration: "30-45 minutes", price: "From 80 zł", aftercare: "Oil scalp at home 2-3 times weekly. Massage gently for 5 minutes.", frequency: "Weekly" },
  ],
  "Acne or congestion": [
    { name: "Deep Cleansing Facial", description: "Thorough cleanse with professional extraction, exfoliation and clarification to clear blocked pores and reduce breakouts.", category: "Facials", href: "/services/facials", why: "Professional extraction removes congestion that home care can't reach, preventing future breakouts.", duration: "60 minutes", price: "From 180 zł", aftercare: "Avoid touching face, use non-comedogenic products, no makeup for 12 hours.", frequency: "Every 2-4 weeks" },
    { name: "HydraFacial", description: "Patented hydradermabrasion that cleanses, exfoliates, extracts and hydrates in one session — gentle enough for acne-prone skin.", category: "Facials", href: "/services/facials", why: "Deeply cleanses without irritation. The vacuum extraction is gentler than manual extraction.", duration: "45 minutes", price: "From 250 zł", aftercare: "Light moisturiser, avoid actives for 24 hours, SPF daily.", frequency: "Every 4-6 weeks" },
  ],
  "Dry or dehydrated skin": [
    { name: "Hydrating Facial", description: "Intense moisture infusion with hyaluronic acid, ceramides and nourishing masks to restore the skin's moisture barrier.", category: "Facials", href: "/services/facials", why: "Layered hydrating serums and masks penetrate deeper than any home product, restoring plumpness.", duration: "60 minutes", price: "From 200 zł", aftercare: "Drink plenty of water, apply hyaluronic serum daily, avoid hot showers.", frequency: "Every 3-4 weeks" },
    { name: "Royal Facial", description: "Our signature facial — customised to your skin's exact needs with premium products, massage and a tailored protocol.", category: "Facials", href: "/services/facials", why: "Every step is adapted to YOUR skin — no two Royal Facials are the same.", duration: "75 minutes", price: "From 280 zł", aftercare: "Follow the personalised home-care plan your therapist provides.", frequency: "Every 4-6 weeks" },
  ],
  "Fine lines and ageing": [
    { name: "Anti-Aging Facial", description: "Collagen-boosting treatment with retinol, peptides and firming actives that target fine lines, sagging and loss of elasticity.", category: "Facials", href: "/services/facials", why: "Active ingredients stimulate collagen production, visibly firming and smoothing the skin over time.", duration: "60-75 minutes", price: "From 250 zł", aftercare: "Use SPF daily, apply retinol at home as directed, avoid sun exposure.", frequency: "Every 3-4 weeks" },
    { name: "Mesotherapy (Mezoterapia)", description: "Microneedling with vitamin cocktails that penetrate deep into the dermis, stimulating collagen and elastin production at a cellular level.", category: "Facials", href: "/services/facials", why: "Micro-channels allow active ingredients to penetrate 4000x deeper than topical application.", duration: "45-60 minutes", price: "From 300 zł", aftercare: "No makeup for 24 hours, avoid sun for 48 hours, use gentle cleanser.", frequency: "3-4 sessions, 4 weeks apart" },
  ],
  "Pigmentation or dark spots": [
    { name: "Brightening Facial", description: "Targets dark spots, melasma and uneven tone with vitamin C, niacinamide and brightening actives.", category: "Facials", href: "/services/facials", why: "Professional-grade brightening ingredients penetrate deeper than serums, fading pigmentation faster.", duration: "60 minutes", price: "From 220 zł", aftercare: "SPF 50 daily is non-negotiable. Avoid direct sun for 48 hours.", frequency: "Every 2-3 weeks" },
    { name: "Chemical Peel", description: "Controlled exfoliation that removes damaged outer layers of skin, revealing fresh, even-toned skin underneath.", category: "Facials", href: "/services/facials", why: "Removes pigmented cells and accelerates cell turnover, revealing brighter, more even skin.", duration: "30-45 minutes", price: "From 200 zł", aftercare: "No picking peeling skin, SPF daily, gentle cleanser only.", frequency: "Every 3-4 weeks, series of 4-6" },
  ],
  "Dull, tired skin": [
    { name: "HydraFacial", description: "Instant glow with zero downtime — cleanses, exfoliates and hydrates in one session for immediate radiance.", category: "Facials", href: "/services/facials", why: "Removes dead skin cells and infuses hydration for an instant, visible glow.", duration: "45 minutes", price: "From 250 zł", aftercare: "Light moisturiser, SPF, avoid actives for 24 hours.", frequency: "Every 4-6 weeks" },
    { name: "Glow Facial", description: "Quick refresh with exfoliation, massage and a brightening mask for immediate luminosity.", category: "Facials", href: "/services/facials", why: "Perfect before events — gives visible radiance in one quick session.", duration: "30-45 minutes", price: "From 150 zł", aftercare: "Hydrate well, apply illuminating serum.", frequency: "As needed" },
  ],
  "Sensitive or red skin": [
    { name: "Calming Facial", description: "Gentle, soothing treatment using hypoallergenic products to reduce redness, strengthen the skin barrier and calm irritation.", category: "Facials", href: "/services/facials", why: "Specifically formulated for reactive skin — no fragrance, no harsh actives, just calming ingredients.", duration: "60 minutes", price: "From 200 zł", aftercare: "Use only gentle, fragrance-free products for 48 hours. Avoid heat.", frequency: "Every 4-6 weeks" },
    { name: "HydraFacial", description: "Gentle hydradermabrasion technology that cleanses without irritation — suitable for even the most sensitive skin.", category: "Facials", href: "/services/facials", why: "The vortex technology is non-abrasive and adjusts to your skin's sensitivity level.", duration: "45 minutes", price: "From 250 zł", aftercare: "Light moisturiser, avoid actives for 24 hours.", frequency: "Every 4-6 weeks" },
  ],
  "Large pores": [
    { name: "Deep Cleansing Facial", description: "Professional extraction and deep cleanse to clear blocked pores and minimise their appearance.", category: "Facials", href: "/services/facials", why: "Removes the debris that stretches pores, and uses astringent toners to tighten them.", duration: "60 minutes", price: "From 180 zł", aftercare: "Use a pore-minimising toner, avoid heavy moisturisers on oily areas.", frequency: "Every 3-4 weeks" },
  ],
  "Under-eye circles": [
    { name: "Royal Facial", description: "Our signature facial includes targeted eye area treatment with cooling masks and brightening serums.", category: "Facials", href: "/services/facials", why: "Specialised eye products penetrate the delicate eye area to brighten and depuff.", duration: "75 minutes", price: "From 280 zł", aftercare: "Apply eye cream daily, get adequate sleep, use cold compresses.", frequency: "Every 4-6 weeks" },
  ],
  "Overgrown or unruly brows": [
    { name: "Eyebrow Threading", description: "Precise shaping using a fine twisted thread that removes hair from the follicle for clean, defined lines.", category: "Threading", href: "/services/threading", why: "Thread removes hair at the follicle level — more precise than waxing and gentle on sensitive skin.", duration: "10-15 minutes", price: "From 40 zł", aftercare: "Avoid touching area for 2 hours, no makeup on brows for 12 hours.", frequency: "Every 2-4 weeks" },
    { name: "Henna Brows", description: "Natural plant-based tint that colours both hair and skin, defining shape and filling sparse areas for 2-3 weeks.", category: "Threading", href: "/services/threading", why: "Stains the skin beneath the hair, creating a fuller, more defined look that lasts.", duration: "20-30 minutes", price: "From 60 zł", aftercare: "Avoid water for 24 hours, apply oil daily to maintain colour.", frequency: "Every 2-3 weeks" },
  ],
  "Sparse or thin brows": [
    { name: "Henna Brows", description: "Tints brow hair and stains the skin to create the illusion of fuller, thicker brows with better definition.", category: "Threading", href: "/services/threading", why: "The skin staining fills gaps between hairs, making brows look dramatically fuller.", duration: "20-30 minutes", price: "From 60 zł", aftercare: "Avoid water for 24 hours, apply oil daily.", frequency: "Every 2-3 weeks" },
    { name: "Brow Lamination", description: "Chemical treatment that sets brow hairs in a lifted, brushed-up position for a fuller, more defined look.", category: "Threading", href: "/services/threading", why: "Permanently (for 6-8 weeks) sets hairs in place, covering gaps and creating a uniform shape.", duration: "30-40 minutes", price: "From 80 zł", aftercare: "No water for 24 hours, brush brows daily with provided gel.", frequency: "Every 6-8 weeks" },
  ],
  "Want a new brow shape": [
    { name: "Eyebrow Threading", description: "Expert shaping using brow mapping — measuring your face to find the perfect arch, thickness and length.", category: "Threading", href: "/services/threading", why: "Brow mapping ensures the shape complements your unique bone structure.", duration: "10-15 minutes", price: "From 40 zł", aftercare: "Avoid touching for 2 hours.", frequency: "Every 2-4 weeks" },
  ],
  "Brow colour enhancement": [
    { name: "Henna Brows", description: "Natural plant-based tint that enhances brow colour and definition for weeks.", category: "Threading", href: "/services/threading", why: "Provides richer, longer-lasting colour than traditional tint.", duration: "20-30 minutes", price: "From 60 zł", aftercare: "Avoid water for 24 hours.", frequency: "Every 2-3 weeks" },
    { name: "Brow Tinting", description: "Semi-permanent dye that darkens and defines brows for a more polished look.", category: "Threading", href: "/services/threading", why: "Quick, effective enhancement that makes brows look groomed and defined.", duration: "15 minutes", price: "From 40 zł", aftercare: "Avoid water for 12 hours.", frequency: "Every 3-4 weeks" },
  ],
  "Sparse brow gaps": [
    { name: "Henna Brows", description: "Stains the skin beneath the hair to fill gaps and create a uniform, fuller look.", category: "Threading", href: "/services/threading", why: "The skin stain effect fills gaps that threading alone can't address.", duration: "20-30 minutes", price: "From 60 zł", aftercare: "Avoid water for 24 hours, oil daily.", frequency: "Every 2-3 weeks" },
  ],
  "Damaged or weak nails": [
    { name: "Nail Strengthening Manicure", description: "Professional cuticle care, shaping and a strengthening treatment with keratin-infused products.", category: "Nails", href: "/services/nails", why: "Professional-grade strengthening treatments penetrate the nail plate to fortify from within.", duration: "45 minutes", price: "From 80 zł", aftercare: "Apply cuticle oil daily, wear gloves for cleaning.", frequency: "Weekly" },
    { name: "Manicure SPA", description: "Pampering treatment with exfoliation, hydrating mask, hot towel wrap and massage for deeply nourished hands and nails.", category: "Nails", href: "/services/nails", why: "Intensive nourishment improves nail flexibility and strength while pampering dry hands.", duration: "60 minutes", price: "From 120 zł", aftercare: "Apply hand cream and cuticle oil daily.", frequency: "Every 2 weeks" },
  ],
  "Want a long-lasting polish": [
    { name: "Gel Manicure", description: "UV/LED-cured gel polish that lasts 2-3 weeks without chipping, in hundreds of colours and effects.", category: "Nails", href: "/services/nails", why: "Gel cures to a hard, chip-resistant finish that lasts dramatically longer than regular polish.", duration: "45-60 minutes", price: "From 100 zł", aftercare: "Apply cuticle oil daily, avoid using nails as tools.", frequency: "Every 2-3 weeks" },
    { name: "Gel Pedicure", description: "Long-lasting foot colour with professional nail care, cuticle work and gel polish application.", category: "Nails", href: "/services/nails", why: "Durable colour that survives sandals, pools and holidays.", duration: "60 minutes", price: "From 120 zł", aftercare: "Moisturise feet daily, apply cuticle oil.", frequency: "Every 3-4 weeks" },
  ],
  "Dry hands or cracked heels": [
    { name: "SPA Pedicure", description: "Complete foot pampering — exfoliation, mask, hot towel wrap, massage and polish for silky smooth feet.", category: "Nails", href: "/services/nails", why: "Removes dead skin, deeply moisturises and restores cracked heels to softness.", duration: "60-75 minutes", price: "From 130 zł", aftercare: "Moisturise feet daily, use a foot file weekly.", frequency: "Every 3-4 weeks" },
    { name: "Manicure SPA", description: "Hand treatment with exfoliation, intensive mask and massage for deeply nourished, silky-smooth hands.", category: "Nails", href: "/services/nails", why: "Restores moisture and softness to dry, rough hands.", duration: "60 minutes", price: "From 120 zł", aftercare: "Apply hand cream after every wash.", frequency: "Every 2 weeks" },
  ],
  "Ingrown toenails": [
    { name: "Medical Pedicure", description: "Professional foot care that safely treats ingrown toenails, corns and calluses with sterile instruments.", category: "Nails", href: "/services/nails", why: "Expert technique addresses the root cause, not just the symptom, preventing recurrence.", duration: "45-60 minutes", price: "From 150 zł", aftercare: "Keep feet clean and dry, wear open-toe shoes for 24 hours.", frequency: "As needed" },
  ],
  "Nail art or designs": [
    { name: "Nail Art Manicure", description: "Creative nail designs — from minimal accent nails to full art — using gel, chrome, foils and hand-painted details.", category: "Nails", href: "/services/nails", why: "Express your personality with custom designs that last as long as your gel manicure.", duration: "60-90 minutes", price: "From 150 zł", aftercare: "Avoid using nails as tools to preserve the art.", frequency: "Every 2-3 weeks" },
  ],
  "Facial hair (upper lip, chin)": [
    { name: "Threading Combo", description: "Precision hair removal for brows, upper lip, chin and sideburns using fine twisted thread.", category: "Threading", href: "/services/threading", why: "Threading lifts hair from the root for results that last 2-4 weeks, more precise than waxing.", duration: "15-20 minutes", price: "From 40 zł", aftercare: "Avoid touching area for 2 hours, skip makeup for 12 hours.", frequency: "Every 2-4 weeks" },
  ],
  "Full body smoothness": [
    { name: "Full Body Wax", description: "Complete waxing from face to toes using premium, low-temperature wax for smooth, long-lasting results.", category: "Waxing", href: "/services/waxing", why: "Removes hair from the root — regrowth is finer and slower over time.", duration: "2-3 hours", price: "From 400 zł", aftercare: "Avoid heat, swimming and tight clothing for 24 hours. Exfoliate after 3 days.", frequency: "Every 4-6 weeks" },
    { name: "Full Legs Wax", description: "Professional leg waxing for smooth, hair-free legs that last for weeks.", category: "Waxing", href: "/services/waxing", why: "Much longer-lasting than shaving, with finer regrowth over time.", duration: "45-60 minutes", price: "From 120 zł", aftercare: "Moisturise daily, exfoliate after 3 days to prevent ingrowns.", frequency: "Every 4-6 weeks" },
  ],
  "Bikini area": [
    { name: "Brazilian Wax", description: "Expert intimate waxing with premium, gentle wax for smooth, confident results.", category: "Waxing", href: "/services/waxing", why: "Experienced therapists use techniques that minimise discomfort and maximise smoothness.", duration: "30-45 minutes", price: "From 102 zł", aftercare: "Avoid tight clothing, swimming and exfoliate after 3 days.", frequency: "Every 3-4 weeks" },
  ],
  "Underarms": [
    { name: "Underarm Wax", description: "Quick, smooth underarm hair removal that lasts weeks — far better than daily shaving.", category: "Waxing", href: "/services/waxing", why: "Waxing removes hair from the root, so regrowth is finer and slower than shaving.", duration: "15 minutes", price: "From 40 zł", aftercare: "Wear loose tops for 24 hours, avoid deodorant for 12 hours.", frequency: "Every 3-4 weeks" },
  ],
  "Sensitive skin hair removal": [
    { name: "Threading", description: "No products touch the skin — only thread removes hair. Ideal for reactive, sensitive or allergy-prone skin.", category: "Threading", href: "/services/threading", why: "Zero chemicals, zero product contact with skin — the gentlest hair removal method available.", duration: "10-20 minutes", price: "From 25 zł", aftercare: "Avoid touching area for 2 hours.", frequency: "Every 2-4 weeks" },
  ],
  "Back or chest hair": [
    { name: "Back Wax", description: "Professional back waxing for smooth, hair-free skin using gentle, effective wax.", category: "Waxing", href: "/services/waxing", why: "Hard-to-reach areas handled efficiently by experienced therapists.", duration: "30-45 minutes", price: "From 100 zł", aftercare: "Avoid heat and tight clothing for 24 hours.", frequency: "Every 4-6 weeks" },
  ],
};

export function TreatmentRecommender() {
  const [step, setStep] = useState(0);
  const [area, setArea] = useState<string | null>(null);
  const [selectedConcerns, setSelectedConcerns] = useState<string[]>([]);
  const [results, setResults] = useState<Treatment[] | null>(null);

  const areas = [
    { id: "hair", label: "Hair", icon: "💇", desc: "Colour, smoothing, cuts, treatments" },
    { id: "skin", label: "Skin & Face", icon: "✨", desc: "Facials, acne, anti-aging, glow" },
    { id: "brows", label: "Brows", icon: "👁️", desc: "Shaping, tinting, lamination" },
    { id: "nails", label: "Nails", icon: "💅", desc: "Manicure, pedicure, gel, art" },
    { id: "hairRemoval", label: "Hair Removal", icon: "🪶", desc: "Waxing, threading, smooth skin" },
  ];

  const handleAreaSelect = (a: string) => { setArea(a); setStep(1); };

  const toggleConcern = (c: string) => {
    setSelectedConcerns((prev) => prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]);
  };

  const showResults = () => {
    const all: Treatment[] = [];
    selectedConcerns.forEach((c) => {
      (recommendations[c] || []).forEach((t) => {
        if (!all.find((x) => x.name === t.name)) all.push(t);
      });
    });
    setResults(all.length > 0 ? all : [{ name: "Free Consultation", description: "Book a free in-person consultation for personalised advice from our beauty experts.", category: "General", href: "/contact", why: "Every face is different — our therapists can assess your needs and build a custom plan.", duration: "30 minutes", price: "Free", aftercare: "N/A", frequency: "Once" }]);
    setStep(2);
  };

  const restart = () => { setStep(0); setArea(null); setSelectedConcerns([]); setResults(null); };

  if (results) {
    return (
      <div className="space-y-8">
        <div className="rounded-3xl border border-brown/10 bg-cream p-6 text-center shadow-soft sm:p-8">
          <span className="text-xs font-medium uppercase tracking-[0.25em] text-brown">Your Personalised Recommendations</span>
          <h2 className="mt-3 font-serif text-2xl font-semibold text-luxury-black sm:text-3xl">
            {results.length} treatment{results.length !== 1 ? "s" : ""} recommended
          </h2>
          <p className="mt-2 text-sm text-charcoal/70">Based on your selected concerns, here are our expert recommendations.</p>
        </div>

        <div className="space-y-4">
          {results.map((t, i) => (
            <div key={`${t.name}-${i}`} className="rounded-2xl border border-brown/10 bg-white p-5 shadow-soft sm:p-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-cream px-2.5 py-0.5 text-[0.65rem] font-medium text-brown">{t.category}</span>
                    <span className="text-xs text-charcoal/40">{t.duration}</span>
                  </div>
                  <h3 className="mt-1 font-serif text-lg font-semibold text-luxury-black">{t.name}</h3>
                  <p className="mt-1 text-sm text-charcoal/70">{t.description}</p>
                  <p className="mt-2 text-xs italic text-brown/80">Why this treatment: {t.why}</p>
                </div>
                <div className="flex flex-wrap gap-3 text-xs sm:flex-col sm:items-end">
                  <span className="rounded-full bg-brown/10 px-3 py-1 font-semibold text-brown">{t.price}</span>
                  <span className="rounded-full bg-cream px-3 py-1 text-charcoal/60">{t.frequency}</span>
                </div>
              </div>
              <div className="mt-4 rounded-xl bg-cream/50 p-3">
                <p className="text-xs font-medium text-charcoal/50">Aftercare</p>
                <p className="mt-0.5 text-xs text-charcoal/70">{t.aftercare}</p>
              </div>
              <Link href={t.href} className="mt-3 inline-flex text-sm font-medium text-brown hover:underline">
                View {t.category} services →
              </Link>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link href="/contact" className="rounded-full bg-brown px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-brown-600">
            Book Consultation
          </Link>
          <button onClick={restart} className="rounded-full border border-brown/20 px-8 py-3 text-sm font-semibold text-charcoal transition-colors hover:bg-cream">
            Start Over
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {step === 0 && (
        <>
          <div className="rounded-3xl border border-brown/10 bg-white p-6 text-center shadow-soft sm:p-8">
            <h2 className="font-serif text-2xl font-semibold text-luxury-black">What area do you need help with?</h2>
            <p className="mt-2 text-sm text-charcoal/70">Select the area and we will recommend the best treatments for your specific concerns.</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {areas.map((a) => (
              <button
                key={a.id}
                onClick={() => handleAreaSelect(a.id)}
                className="flex items-center gap-4 rounded-2xl border border-brown/10 bg-cream p-5 text-left shadow-soft transition-all hover:-translate-y-0.5 hover:border-brown/30 hover:shadow-luxury"
              >
                <span className="text-3xl">{a.icon}</span>
                <div>
                  <span className="font-serif text-base font-semibold text-luxury-black">{a.label}</span>
                  <p className="text-xs text-charcoal/50">{a.desc}</p>
                </div>
              </button>
            ))}
          </div>
        </>
      )}

      {step === 1 && area && (
        <>
          <div className="rounded-3xl border border-brown/10 bg-white p-6 text-center shadow-soft sm:p-8">
            <h2 className="font-serif text-2xl font-semibold text-luxury-black">What are your concerns?</h2>
            <p className="mt-2 text-sm text-charcoal/70">Select all that apply — we will recommend treatments for each concern.</p>
          </div>
          <div className="grid gap-2.5 sm:grid-cols-2">
            {concerns[area]?.map((c) => (
              <button
                key={c}
                onClick={() => toggleConcern(c)}
                className={`rounded-2xl p-4 text-left text-sm font-medium transition-all ${
                  selectedConcerns.includes(c)
                    ? "border-2 border-brown bg-brown/5 text-luxury-black shadow-soft"
                    : "border border-brown/10 bg-white text-charcoal/70 hover:border-brown/30"
                }`}
              >
                <span className="mr-2">{selectedConcerns.includes(c) ? "✓" : "○"}</span>
                {c}
              </button>
            ))}
          </div>
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <button onClick={() => setStep(0)} className="rounded-full border border-brown/20 px-6 py-2.5 text-sm font-medium text-charcoal hover:bg-cream">
              ← Back
            </button>
            <button
              onClick={showResults}
              disabled={selectedConcerns.length === 0}
              className="rounded-full bg-brown px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-brown-600 disabled:opacity-50"
            >
              Show Recommendations ({selectedConcerns.length})
            </button>
          </div>
        </>
      )}
    </div>
  );
}
