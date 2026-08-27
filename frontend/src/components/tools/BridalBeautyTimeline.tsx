"use client";

import { useState } from "react";
import Link from "next/link";

interface TimelineEntry {
  timeframe: string;
  weeksLabel: string;
  title: string;
  description: string;
  icon: string;
  category: string;
  estimatedPrice: string;
  bookingTip: string;
  urgency: "plan-ahead" | "book-now" | "final-touch";
}

function generateTimeline(weddingDate: Date): TimelineEntry[] {
  const now = new Date();
  const diffMs = weddingDate.getTime() - now.getTime();
  const diffWeeks = Math.floor(diffMs / (1000 * 60 * 60 * 24 * 7));

  const allEntries: { weeksBefore: number; entry: TimelineEntry }[] = [
    { weeksBefore: 28, entry: { timeframe: "7 months before", weeksLabel: "28 weeks", title: "Start a Skincare Routine", description: "Begin monthly facials to build a healthy skin base. If you have acne, pigmentation or scarring, start treatment now — these concerns need time to respond. Our skin therapists will create a custom plan for your skin type.", icon: "🧴", category: "Skincare", estimatedPrice: "Facials from 150 zł", bookingTip: "Book your first consultation 7 months out so we can assess your skin and build a timeline.", urgency: "plan-ahead" } },
    { weeksBefore: 26, entry: { timeframe: "6 months before", weeksLabel: "26 weeks", title: "Hair Colour & Treatments", description: "If you want a major hair colour change (blonde, balayage, etc.), do it now. This gives time for the colour to settle, any damage to be repaired, and your hair to look natural on the day. Keratin smoothing can also be done now.", icon: "💇", category: "Hair", estimatedPrice: "Colour from 250 zł, Keratin from 500 zł", bookingTip: "Major colour changes need time to grow out and settle. Starting 6 months out means your colour will look natural, not fresh.", urgency: "plan-ahead" } },
    { weeksBefore: 20, entry: { timeframe: "5 months before", weeksLabel: "20 weeks", title: "Dental Whitening (Optional)", description: "If you want teeth whitening for your wedding smile, start now. Professional whitening takes 2-3 sessions and needs time for sensitivity to settle.", icon: "😁", category: "Optional", estimatedPrice: "Varies by provider", bookingTip: "Whitening sensitivity peaks 24-48 hours after treatment. Start early so your smile is comfortable on the day.", urgency: "plan-ahead" } },
    { weeksBefore: 16, entry: { timeframe: "4 months before", weeksLabel: "16 weeks", title: "Book Your Bridal Package", description: "Lock in your bridal hair, makeup and any other beauty services. Our wedding season fills fast — popular dates are booked 6-12 months ahead. A trial is included with our bridal package.", icon: "📋", category: "Booking", estimatedPrice: "Bridal packages from 800 zł", bookingTip: "Secure your date now. We require a deposit to hold your wedding date — this is non-refundable but applied to your final bill.", urgency: "book-now" } },
    { weeksBefore: 14, entry: { timeframe: "3.5 months before", weeksLabel: "14 weeks", title: "Waxing Programme Starts", description: "If you plan to wax before the wedding, start a regular programme now. First-time waxing can cause redness and irritation — starting early means your skin adapts and reactions decrease with each session.", icon: "🪶", category: "Hair Removal", estimatedPrice: "Full body wax from 300 zł", bookingTip: "Regular waxing every 4-6 weeks trains hair growth. By the wedding, regrowth will be finer and sessions quicker.", urgency: "plan-ahead" } },
    { weeksBefore: 12, entry: { timeframe: "3 months before", weeksLabel: "12 weeks", title: "Monthly Facial Cycle Begins", description: "Book a facial every 4-6 weeks leading up to the wedding. Consistency is what builds genuine glow — a single facial won't deliver lasting results. We recommend HydraFacial or our signature Royal Facial.", icon: "✨", category: "Skincare", estimatedPrice: "HydraFacial from 250 zł", bookingTip: "Consistency matters more than any single treatment. Book your facials now so they're in the calendar.", urgency: "book-now" } },
    { weeksBefore: 10, entry: { timeframe: "10 weeks before", weeksLabel: "10 weeks", title: "Brow Shaping & Tinting Trial", description: "Have your brows professionally shaped and tinted now so you can see how they look. If you don't like the shape, there's time to adjust before the wedding. Never try a new brow shape for the first time right before the event.", icon: "👁️", category: "Brows", estimatedPrice: "Threading from 40 zł, Henna from 60 zł", bookingTip: "Brow threading shapes last 2-4 weeks. Time your final brow appointment 3-5 days before the wedding.", urgency: "plan-ahead" } },
    { weeksBefore: 8, entry: { timeframe: "8 weeks before", weeksLabel: "8 weeks", title: "Makeup Trial", description: "This is the most important appointment before the wedding. We'll test different looks, colours, and styles. Bring inspiration photos, wear a white or ivory top, and have your bridesmaids present if possible.", icon: "💄", category: "Makeup", estimatedPrice: "Trial included in bridal package", bookingTip: "Take photos in different lighting during the trial. Your makeup should look great in daylight AND in venue lighting.", urgency: "book-now" } },
    { weeksBefore: 8, entry: { timeframe: "8 weeks before", weeksLabel: "8 weeks", title: "Hair Trial", description: "Trial your bridal hairstyle alongside the makeup trial. Bring your veil, tiara or hair accessories so we can see the complete look. Try 2-3 different styles if you're unsure.", icon: "👰", category: "Hair", estimatedPrice: "Trial included in bridal package", bookingTip: "Wash your hair the night before the trial — not the morning of. Day-old hair holds styling better and gives a more realistic result.", urgency: "book-now" } },
    { weeksBefore: 6, entry: { timeframe: "6 weeks before", weeksLabel: "6 weeks", title: "Nail Programme Begins", description: "Start regular manicures so your nails are healthy, conditioned and strong. If you want gel or acrylic for the wedding, start testing products now to ensure no allergic reactions.", icon: "💅", category: "Nails", estimatedPrice: "Manicure from 80 zł", bookingTip: "Regular cuticle oil daily keeps nails healthy. Start this habit now — it makes a visible difference by the wedding.", urgency: "book-now" } },
    { weeksBefore: 4, entry: { timeframe: "4 weeks before", weeksLabel: "4 weeks", title: "Final Brow Shape", description: "Get your brows shaped 4 weeks before so they settle into their natural look. Any redness from threading will be gone, and the shape will look soft and natural in photos.", icon: "👁️", category: "Brows", estimatedPrice: "Threading from 40 zł", bookingTip: "Don't try a new brow shape this close to the wedding. Stick with what you know works.", urgency: "final-touch" } },
    { weeksBefore: 3, entry: { timeframe: "3 weeks before", weeksLabel: "3 weeks", title: "Hair Colour Touch-Up", description: "Root touch-up, gloss or toner to freshen your colour. This is the last safe window for colour — any later risks uneven results or sensitivity on the day.", icon: "🎨", category: "Hair", estimatedPrice: "Root touch-up from 150 zł", bookingTip: "This is your final colour appointment. If you want highlights, do them now — not closer to the date.", urgency: "final-touch" } },
    { weeksBefore: 2, entry: { timeframe: "2 weeks before", weeksLabel: "2 weeks", title: "Final Facial", description: "Your last facial — close enough to glow, far enough to avoid any reaction. We recommend a gentle hydrating facial, NOT an active treatment like a peel or microneedling.", icon: "🌟", category: "Skincare", estimatedPrice: "Hydrating facial from 180 zł", bookingTip: "No new products, no active treatments. This facial is about glow, not correction.", urgency: "final-touch" } },
    { weeksBefore: 1, entry: { timeframe: "1 week before", weeksLabel: "1 week", title: "Spray Tan (Optional)", description: "If you want a sun-kissed glow, book a trial spray tan at least 2 weeks before, then the final tan 2-3 days before the wedding. Never skip the trial.", icon: "☀️", category: "Optional", estimatedPrice: "Spray tan from 120 zł", bookingTip: "Always do a trial first. Colour develops over 24 hours — what looks perfect immediately may darken overnight.", urgency: "final-touch" } },
    { weeksBefore: 0, entry: { timeframe: "3 days before", weeksLabel: "3 days", title: "Final Waxing (If Needed)", description: "If you wax, this is the last safe window. Any later risks redness or irritation on the day. Stick to areas you've waxed before — no new areas this close.", icon: "🪶", category: "Hair Removal", estimatedPrice: "From 50 zł per area", bookingTip: "Only wax areas you've waxed before. New areas risk reactions you won't have time to treat.", urgency: "final-touch" } },
    { weeksBefore: 0, entry: { timeframe: "2 days before", weeksLabel: "2 days", title: "Manicure & Pedicure", description: "Fresh nails that last through the wedding and honeymoon. Gel polish is recommended for durability. Choose a classic colour that won't clash with your dress or flowers.", icon: "💅", category: "Nails", estimatedPrice: "Manicure + Pedicure from 170 zł", bookingTip: "Gel polish lasts 2-3 weeks without chipping — perfect for the wedding and honeymoon.", urgency: "final-touch" } },
    { weeksBefore: 0, entry: { timeframe: "1 day before", weeksLabel: "1 day", title: "Relax & Prepare", description: "Gentle cleanse, hydrate, early night. No new products, no heavy exercise, no alcohol. Your prepared skin will do the rest. Get plenty of sleep — it shows in photos.", icon: "😌", category: "Preparation", estimatedPrice: "—", bookingTip: "Pack your emergency kit: blotting papers, lipstick for touch-ups, Bobby pins, and a small sewing kit.", urgency: "final-touch" } },
    { weeksBefore: 0, entry: { timeframe: "Wedding day", weeksLabel: "Day of", title: "Bridal Hair & Makeup", description: "Arrive fresh-faced with clean, product-free hair. We handle everything — you relax and enjoy the moment. Allow 2-3 hours for hair and makeup together.", icon: "💒", category: "Big Day", estimatedPrice: "Included in package", bookingTip: "Eat a good breakfast, stay hydrated, and trust your team. You've prepared for this — now enjoy it.", urgency: "final-touch" } },
  ];

  return allEntries.filter((e) => e.weeksBefore <= diffWeeks + 1).map((e) => e.entry);
}

export function BridalBeautyTimeline() {
  const [weddingDate, setWeddingDate] = useState("");
  const [timeline, setTimeline] = useState<TimelineEntry[] | null>(null);
  const [weeksLeft, setWeeksLeft] = useState(0);

  const generate = () => {
    if (!weddingDate) return;
    const date = new Date(weddingDate);
    const now = new Date();
    const diffMs = date.getTime() - now.getTime();
    const weeks = Math.max(0, Math.floor(diffMs / (1000 * 60 * 60 * 24 * 7)));
    setWeeksLeft(weeks);
    setTimeline(generateTimeline(date));
  };

  const urgencyColors = {
    "plan-ahead": "border-l-emerald-400 bg-emerald-50/50",
    "book-now": "border-l-amber-400 bg-amber-50/50",
    "final-touch": "border-l-rose-400 bg-rose-50/50",
  };

  const urgencyLabels = {
    "plan-ahead": { label: "Plan Ahead", color: "text-emerald-700 bg-emerald-100" },
    "book-now": { label: "Book Now", color: "text-amber-700 bg-amber-100" },
    "final-touch": { label: "Final Touch", color: "text-rose-700 bg-rose-100" },
  };

  if (timeline) {
    return (
      <div className="space-y-8">
        {/* Summary header */}
        <div className="rounded-3xl border border-brown/10 bg-cream p-6 text-center shadow-soft sm:p-8">
          <span className="text-xs font-medium uppercase tracking-[0.25em] text-brown">Your Bridal Beauty Timeline</span>
          <h2 className="mt-3 font-serif text-2xl font-semibold text-luxury-black sm:text-3xl">
            {weeksLeft > 0 ? `${weeksLeft} weeks until your wedding` : "It's your wedding week!"}
          </h2>
          <p className="mt-2 text-sm text-charcoal/70">
            {timeline.length} appointments and milestones planned based on your wedding date.
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-3 text-xs">
            <span className="flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1 text-emerald-700"><span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> Plan Ahead</span>
            <span className="flex items-center gap-1.5 rounded-full bg-amber-100 px-3 py-1 text-amber-700"><span className="h-1.5 w-1.5 rounded-full bg-amber-400" /> Book Now</span>
            <span className="flex items-center gap-1.5 rounded-full bg-rose-100 px-3 py-1 text-rose-700"><span className="h-1.5 w-1.5 rounded-full bg-rose-400" /> Final Touch</span>
          </div>
        </div>

        {/* Timeline */}
        <div className="relative">
          <div className="absolute left-5 top-0 bottom-0 w-px bg-brown/15 sm:left-6" />
          <div className="space-y-4">
            {timeline.map((entry, i) => (
              <div key={i} className="relative flex gap-4 sm:gap-6">
                <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-cream text-lg shadow-soft sm:h-12 sm:w-12 sm:text-xl">
                  {entry.icon}
                </div>
                <div className={`flex-1 rounded-2xl border border-brown/10 border-l-4 bg-white p-4 shadow-soft sm:p-5 ${urgencyColors[entry.urgency]}`}>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-medium uppercase tracking-wider text-brown">{entry.timeframe}</span>
                    <span className={`rounded-full px-2 py-0.5 text-[0.6rem] font-semibold ${urgencyLabels[entry.urgency].color}`}>
                      {urgencyLabels[entry.urgency].label}
                    </span>
                  </div>
                  <h3 className="mt-1 font-serif text-base font-semibold text-luxury-black sm:text-lg">{entry.title}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-charcoal/70 sm:text-sm">{entry.description}</p>
                  <div className="mt-3 flex flex-wrap gap-3 text-xs text-charcoal/50">
                    <span className="rounded-full bg-cream px-2.5 py-0.5">{entry.category}</span>
                    {entry.estimatedPrice !== "—" && <span className="rounded-full bg-cream px-2.5 py-0.5">{entry.estimatedPrice}</span>}
                  </div>
                  <p className="mt-2 text-xs italic text-brown/80">💡 {entry.bookingTip}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link href="/contact" className="rounded-full bg-brown px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-brown-600">
            Book Bridal Consultation
          </Link>
          <button onClick={() => setTimeline(null)} className="rounded-full border border-brown/20 px-8 py-3 text-sm font-semibold text-charcoal transition-colors hover:bg-cream">
            Choose a Different Date
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="rounded-3xl border border-brown/10 bg-white p-6 text-center shadow-soft sm:p-8">
        <h2 className="font-serif text-2xl font-semibold text-luxury-black">When is your wedding?</h2>
        <p className="mt-2 text-sm text-charcoal/70">
          Select your wedding date and we will create a personalised beauty preparation timeline with pricing, booking tips and exact milestones.
        </p>
        <div className="mt-6 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <input
            type="date"
            value={weddingDate}
            onChange={(e) => setWeddingDate(e.target.value)}
            min={new Date().toISOString().split("T")[0]}
            className="w-full rounded-full border border-brown/20 bg-cream px-6 py-3 text-sm font-medium text-charcoal focus:border-brown focus:outline-none sm:w-auto"
          />
          <button
            onClick={generate}
            disabled={!weddingDate}
            className="w-full rounded-full bg-brown px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-brown-600 disabled:opacity-50 sm:w-auto"
          >
            Generate My Timeline
          </button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { title: "18+ Milestones", desc: "From skincare start to wedding day — every appointment mapped.", icon: "📋" },
          { title: "Pricing Estimates", desc: "Know what each treatment costs so you can budget with confidence.", icon: "💰" },
          { title: "Expert Tips", desc: "Booking advice from our bridal team — what to do, what to avoid, and why.", icon: "💡" },
        ].map((f) => (
          <div key={f.title} className="rounded-2xl border border-brown/10 bg-cream p-5 text-center shadow-soft">
            <span className="text-2xl">{f.icon}</span>
            <h3 className="mt-2 font-serif text-lg font-semibold text-luxury-black">{f.title}</h3>
            <p className="mt-1 text-sm text-charcoal/70">{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
