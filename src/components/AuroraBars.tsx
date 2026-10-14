"use client";

import * as React from "react";
import { motion, useAnimationFrame } from "motion/react";
import { cn } from "@/lib/utils";

export interface AuroraBarsProps {
  /** Number of bars on desktop (>= 768px) @default 24 */
  barCount?: number;
  /** Number of bars on mobile (< 768px) @default 13 */
  mobileBarCount?: number;
  /**
   * Gradient color stops, bottom to top.
   * Defaults to Floema Design System palette:
   * Passion Red (#ff004d) -> Urban Coral (#f76c46) -> Flour Yellow (#e9e778) -> Vista Blue (#85a1c5) -> transparent
   */
  colors?: string[];
  /** Max bar height as fraction of container height @default 0.88 */
  maxHeightRatio?: number;
  /** Mobile max bar height fraction — keeps heading legible @default 0.68 */
  mobileMaxHeightRatio?: number;
  /** Min bar height as fraction of container height @default 0.16 */
  minHeightRatio?: number;
  /** Mobile min bar height fraction @default 0.10 */
  mobileMinHeightRatio?: number;
  /** Undulation speed @default 0.45 */
  speed?: number;
  /** Mobile undulation speed — gentler on mobile battery @default 0.35 */
  mobileSpeed?: number;
  /** Gap between bars in px on desktop @default 4 */
  gap?: number;
  /** Gap between bars in px on mobile @default 2.5 */
  mobileGap?: number;
  /** Px blur per bar, creates soft organic glow @default 6 */
  blur?: number;
  /** Mobile blur in px @default 4 */
  mobileBlur?: number;
  /** Container background @default "transparent" */
  background?: string;
  /** Custom class name */
  className?: string;
  /** Base bar opacity @default 0.85 */
  opacity?: number;
  /** Enable interactive wave response to pointer / touch @default true */
  interactive?: boolean;
}

// Floema Design System palette — Urban Coral and Flour Yellow (without Passion Red)
const DEFAULT_DS_COLORS = [
  "#f76c46", // Urban Coral
  "#e9e778", // Flour Yellow
  "rgba(233, 231, 120, 0)", // Soft radiant fade into dark atmosphere
];

/**
 * Fast & fluid multi-octave harmonic wave formula.
 * Simulates liquid rippling with bidirectional traveling waves and organic fluidity.
 */
function barHeight(
  index: number,
  total: number,
  time: number,
  minH: number,
  maxH: number,
  pointerOffset = 0,
): number {
  const norm = total <= 1 ? 0.5 : index / (total - 1);
  // Center-weighted arch envelope
  const arch = Math.sin(norm * Math.PI);

  // Phase offsets for traveling fluid motion across bars
  const phase1 = norm * Math.PI * 3.2;
  const phase2 = norm * Math.PI * 5.8;
  const phase3 = norm * Math.PI * 2.1;

  // Intersecting waves create rapid, organic liquid undulation
  const wave1 = Math.sin(time * 2.2 + phase1) * 0.26;
  const wave2 = Math.sin(time * 1.6 - phase2) * 0.20;
  const wave3 = Math.cos(time * 3.1 + phase3) * 0.12;

  const wave = 0.5 + wave1 + wave2 + wave3;

  // Fluid blending between arch foundation and quick dancing crests
  const blended = Math.min(
    1,
    Math.max(0, arch * 0.52 + wave * 0.48 + pointerOffset * 0.22),
  );

  return minH + blended * (maxH - minH);
}

export function AuroraBars({
  barCount = 24,
  mobileBarCount = 13,
  colors = DEFAULT_DS_COLORS,
  maxHeightRatio = 0.88,
  mobileMaxHeightRatio = 0.68,
  minHeightRatio = 0.16,
  mobileMinHeightRatio = 0.10,
  speed = 0.95,
  mobileSpeed = 0.80,
  gap = 4,
  mobileGap = 2.5,
  blur = 6,
  mobileBlur = 4,
  background = "transparent",
  opacity = 0.88,
  interactive = true,
  className,
}: AuroraBarsProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const barsRef = React.useRef<(HTMLDivElement | null)[]>([]);
  const pointerPos = React.useRef<{ x: number; y: number } | null>(null);
  const [isMobile, setIsMobile] = React.useState(false);

  // Responsive breakpoint detection with cleanup
  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile, { passive: true });
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Compute effective settings based on mobile / desktop viewport
  const activeCount = isMobile ? mobileBarCount : barCount;
  const activeMaxH = isMobile ? mobileMaxHeightRatio : maxHeightRatio;
  const activeMinH = isMobile ? mobileMinHeightRatio : minHeightRatio;
  const activeSpeed = isMobile ? mobileSpeed : speed;
  const activeGap = isMobile ? mobileGap : gap;
  const activeBlur = isMobile ? mobileBlur : blur;

  const timeRef = React.useRef(0);

  // Track pointer / touch position relative to the container for interactive ripple
  const handlePointerMove = React.useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!interactive || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      pointerPos.current = {
        x: Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width)),
        y: Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height)),
      };
    },
    [interactive],
  );

  const handlePointerLeave = React.useCallback(() => {
    pointerPos.current = null;
  }, []);

  // Direct GPU transform manipulation inside animation frame
  // Avoids 60+ React re-renders per second, ensuring buttery smooth 60/120fps on mobile
  useAnimationFrame((_, delta) => {
    timeRef.current += (delta / 1000) * activeSpeed;
    const t = timeRef.current;
    const p = pointerPos.current;

    for (let i = 0; i < activeCount; i++) {
      const el = barsRef.current[i];
      if (!el) continue;

      let pointerInfluence = 0;
      if (p) {
        const barNorm = activeCount <= 1 ? 0.5 : i / (activeCount - 1);
        const dist = Math.abs(barNorm - p.x);
        pointerInfluence = Math.max(0, 1 - dist * 3.5);
      }

      const fraction = barHeight(
        i,
        activeCount,
        t,
        activeMinH,
        activeMaxH,
        pointerInfluence,
      );

      // GPU-accelerated transform: scaleY with bottom origin has 0 layout reflow overhead
      el.style.transform = `scaleY(${fraction})`;
    }
  });

  // Construct gradient CSS stop string
  const gradientStops = React.useMemo(() => {
    return colors
      .map((c, i) => `${c} ${Math.round((i / (colors.length - 1)) * 100)}%`)
      .join(", ");
  }, [colors]);

  const barGradient = `linear-gradient(to top, ${gradientStops})`;

  return (
    <div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className={cn(
        "pointer-events-none relative h-full w-full overflow-hidden select-none",
        className,
      )}
      style={{ background }}
      aria-hidden="true"
    >
      {/* Bars container */}
      <div className="absolute inset-0 flex items-end justify-between px-2 sm:px-6">
        {Array.from({ length: activeCount }).map((_, i) => (
          <div
            key={i}
            className="flex-1 h-full flex items-end"
            style={{
              padding: `0 ${activeGap / 2}px`,
            }}
          >
            <motion.div
              ref={(node) => {
                barsRef.current[i] = node as HTMLDivElement | null;
              }}
              className="w-full h-full rounded-t-full origin-bottom"
              style={{
                background: barGradient,
                filter: `blur(${activeBlur}px)`,
                opacity,
                willChange: "transform",
                transform: `scaleY(${activeMinH})`,
              }}
            />
          </div>
        ))}
      </div>

      {/* Floema DS Atmosphere Vignette: blends the bottom bars naturally into #0a0a0a */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 110% 85% at 50% 100%, transparent 30%, rgba(10, 10, 10, 0.65) 65%, #0a0a0a 100%),
            linear-gradient(to bottom, #0a0a0a 0%, transparent 22%, transparent 70%, rgba(10, 10, 10, 0.4) 100%)
          `,
        }}
      />
    </div>
  );
}

export default AuroraBars;
