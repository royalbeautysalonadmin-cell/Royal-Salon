"use client";

import { useEffect, useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useMotionValueEvent,
} from "framer-motion";

// Wavy vertical path in a 56 x 800 viewBox, stretched to the viewport height.
const LINE_PATH =
  "M28 6 C 46 90, 10 160, 28 250 C 46 340, 10 410, 28 500 C 46 590, 10 660, 28 745 L 28 794";

/**
 * Decorative golden SVG line fixed to the right edge of the viewport that
 * draws itself in as the page is scrolled, with a glowing tip that travels
 * along the path. Purely visual — hidden from pointer events and readers.
 */
export function ScrollLine() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    mass: 0.4,
  });

  const trackRef = useRef<SVGPathElement>(null);
  const tipRef = useRef<SVGGElement>(null);

  const moveTip = (v: number) => {
    const track = trackRef.current;
    const tip = tipRef.current;
    if (!track || !tip) return;
    const length = track.getTotalLength();
    const point = track.getPointAtLength(Math.min(Math.max(v, 0.002), 1) * length);
    tip.setAttribute("transform", `translate(${point.x}, ${point.y})`);
  };

  useMotionValueEvent(progress, "change", moveTip);
  useEffect(() => moveTip(progress.get()), []); // position tip before first scroll

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-y-0 right-2 z-30 hidden w-14 lg:block"
    >
      <svg
        className="h-full w-full"
        viewBox="0 0 56 800"
        preserveAspectRatio="none"
        fill="none"
      >
        <defs>
          <linearGradient id="scroll-line-gold" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#E8C56A" />
            <stop offset="55%" stopColor="#D4AF37" />
            <stop offset="100%" stopColor="#B8860B" />
          </linearGradient>
        </defs>

        {/* Faint full track so the line's course is always hinted */}
        <path
          ref={trackRef}
          d={LINE_PATH}
          stroke="#B8860B"
          strokeOpacity={0.18}
          strokeWidth={1.5}
        />

        {/* Portion drawn in as the visitor scrolls */}
        <motion.path
          d={LINE_PATH}
          stroke="url(#scroll-line-gold)"
          strokeWidth={2.5}
          strokeLinecap="round"
          style={{ pathLength: progress }}
        />

        {/* Glowing tip riding the end of the drawn line */}
        <g ref={tipRef}>
          <circle r={9} fill="#D4AF37" opacity={0.22} />
          <circle r={3.5} fill="#E8C56A" />
        </g>
      </svg>
    </div>
  );
}
