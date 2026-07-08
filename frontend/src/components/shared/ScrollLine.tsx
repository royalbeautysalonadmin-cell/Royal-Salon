"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useMotionValueEvent,
} from "framer-motion";

/**
 * Builds a smooth serpentine path centred on the page, bulging alternately
 * left and right, sized 1:1 to the measured content area so the curves keep
 * the same rhythm on any page length.
 */
function buildPath(width: number, height: number) {
  const cx = width / 2;
  const amp = Math.min(width * 0.34, 620);
  const waveHeight = 950; // px per half-wave — one gentle sweep per section
  const n = Math.max(2, Math.round(height / waveHeight));
  const segH = height / n;

  let d = `M ${cx.toFixed(1)} 0`;
  for (let i = 0; i < n; i++) {
    const dir = i % 2 === 0 ? 1 : -1;
    const x = (cx + amp * dir).toFixed(1);
    const y0 = i * segH;
    const y1 = (i + 1) * segH;
    d += ` C ${x} ${(y0 + segH * 0.32).toFixed(1)}, ${x} ${(y1 - segH * 0.32).toFixed(1)}, ${cx.toFixed(1)} ${y1.toFixed(1)}`;
  }
  return d;
}

/**
 * Decorative golden line that flows down the middle of the page, weaving
 * between sections and drawing itself in as the visitor scrolls, led by a
 * glowing tip. Mounted as an absolute overlay covering the page content.
 */
export function ScrollLine() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<SVGPathElement>(null);
  const tipRef = useRef<SVGGElement>(null);
  // Cached so the scroll-driven tip update never calls getTotalLength() (an
  // SVG geometry read that can force a reflow) on every animation frame —
  // only recomputed when the path itself changes, in the effect below.
  const lengthRef = useRef(0);
  const [size, setSize] = useState({ width: 0, height: 0 });

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end end"],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    mass: 0.4,
  });

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setSize({ width: Math.round(width), height: Math.round(height) });
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const moveTip = (v: number) => {
    const track = trackRef.current;
    const tip = tipRef.current;
    if (!track || !tip || !lengthRef.current) return;
    const point = track.getPointAtLength(
      Math.min(Math.max(v, 0.001), 1) * lengthRef.current
    );
    tip.setAttribute("transform", `translate(${point.x}, ${point.y})`);
  };

  useMotionValueEvent(progress, "change", moveTip);
  // Recompute the cached length only when the path is rebuilt (resize /
  // route change), then re-anchor the tip once with the fresh value.
  useEffect(() => {
    lengthRef.current = trackRef.current?.getTotalLength() ?? 0;
    moveTip(progress.get());
  }, [size]); // eslint-disable-line react-hooks/exhaustive-deps

  const d = size.height > 0 ? buildPath(size.width, size.height) : "";

  return (
    <div
      ref={wrapperRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 z-[1] hidden overflow-hidden md:block"
    >
      {d && (
        <svg
          width="100%"
          height="100%"
          viewBox={`0 0 ${size.width} ${size.height}`}
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

          {/* Faint full track hinting the line's course */}
          <path
            ref={trackRef}
            d={d}
            stroke="#B8860B"
            strokeOpacity={0.1}
            strokeWidth={1.5}
          />

          {/* Portion drawn in as the visitor scrolls */}
          <motion.path
            d={d}
            stroke="url(#scroll-line-gold)"
            strokeOpacity={0.65}
            strokeWidth={2.5}
            strokeLinecap="round"
            style={{ pathLength: progress }}
          />

          {/* Glowing tip leading the drawn line */}
          <g ref={tipRef}>
            <circle r={11} fill="#D4AF37" opacity={0.18} />
            <circle r={5.5} fill="#D4AF37" opacity={0.35} />
            <circle r={3} fill="#E8C56A" />
          </g>
        </svg>
      )}
    </div>
  );
}
