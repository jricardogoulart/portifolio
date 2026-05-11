import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

// ─── Lerp helper ─────────────────────────────────────────────────────────────
export default function Hero() {
  const heroRef    = useRef<HTMLDivElement>(null);
  const titleRef   = useRef<HTMLDivElement>(null);
  const cardsRef   = useRef<HTMLDivElement>(null);
  const blobsRef   = useRef<(HTMLDivElement | null)[]>([]);

  // Tracked via ref so rAF loop doesn't need React state
  const mouse   = useRef({ x: 0, y: 0 });
  const rafRef  = useRef<number>(0);

  // ── Entrance animations (run once on mount) ────────────────────────────────
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hero-title-line', {
        y: 80,
        opacity: 0,
        duration: 1.1,
        stagger: 0.18,
        ease: 'power4.out',
        delay: 0.2,
      });

      gsap.from('.hero-subtitle', {
        y: 24,
        opacity: 0,
        duration: 0.9,
        delay: 0.9,
        ease: 'power3.out',
      });

      gsap.from('.hero-button', {
        y: 16,
        opacity: 0,
        duration: 0.7,
        stagger: 0.09,
        delay: 1.2,
        ease: 'power3.out',
      });

      gsap.from('.hero-stat', {
        scale: 0,
        opacity: 0,
        duration: 0.55,
        stagger: 0.09,
        delay: 1.4,
        ease: 'back.out(1.7)',
      });

      // Smooth float loop — GPU-only (no layout triggers)
      gsap.to('.hero-card', {
        y: -16,
        duration: 2.4,
        stagger: { each: 0.35, from: 'start' },
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      // Blob idle drift (pure transform, no layout)
      blobsRef.current.forEach((blob, i) => {
        if (!blob) return;
        gsap.to(blob, {
          x: gsap.utils.random(-40, 40),
          y: gsap.utils.random(-40, 40),
          scale: gsap.utils.random(0.88, 1.12),
          duration: gsap.utils.random(5, 8),
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: i * 0.6,
        });
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  // ── Card hover micro-interaction ───────────────────────────────────────────
  useEffect(() => {
    const cards = document.querySelectorAll<HTMLElement>('.hero-card');
    const handlers: Array<{ el: Element; enter: () => void; leave: () => void }> = [];

    cards.forEach((card) => {
      const enter = () => {
        gsap.to(card, { scale: 1.07, zIndex: 50, duration: 0.35, ease: 'power2.out', overwrite: 'auto' });
      };
      const leave = () => {
        const r = card.dataset.rotation ?? '0';
        gsap.to(card, {
          scale: 1,
          zIndex: 1,
          rotation: Number(r),
          duration: 0.45,
          ease: 'power2.out',
          overwrite: 'auto',
        });
      };
      card.addEventListener('mouseenter', enter);
      card.addEventListener('mouseleave', leave);
      handlers.push({ el: card, enter, leave });
    });

    return () => {
      handlers.forEach(({ el, enter, leave }) => {
        el.removeEventListener('mouseenter', enter);
        el.removeEventListener('mouseleave', leave);
      });
    };
  }, []);

  // ── Single rAF loop: cursor + parallax (lerp-smoothed, no layout thrash) ──
  useEffect(() => {
    // Cache card rects once; refresh on resize
    let cardRects: DOMRect[] = [];
    let titleRect: DOMRect | null = null;

    const refreshRects = () => {
      titleRect = titleRef.current?.getBoundingClientRect() ?? null;
      const cards = cardsRef.current?.querySelectorAll<HTMLElement>('.hero-card') ?? [];
      cardRects = Array.from(cards).map((c) => c.getBoundingClientRect());
    };

    refreshRects();
    const resizeObserver = new ResizeObserver(refreshRects);
    if (heroRef.current) resizeObserver.observe(heroRef.current);

    const onMouseMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', onMouseMove, { passive: true });

    // rAF loop — all animation happens here, zero GSAP calls per frame
    const loop = () => {
      const mx = mouse.current.x;
      const my = mouse.current.y;

      // ── Cursor (fast lerp for snappy dot, slow for ring)
      cursor.current.x = lerp(cursor.current.x, mx, 0.18);
      cursor.current.y = lerp(cursor.current.y, my, 0.18);

      if (cursorRef.current) {
        cursorRef.current.style.transform =
          `translate(${cursor.current.x - 10}px, ${cursor.current.y - 10}px)`;
      }
      if (cursorDotRef.current) {
        cursorDotRef.current.style.transform = `translate(${mx - 3}px, ${my - 3}px)`;
      }

      // ── Title parallax (subtle)
      if (titleRef.current && titleRect) {
        const cx = titleRect.left + titleRect.width  / 2;
        const cy = titleRect.top  + titleRect.height / 2;
        const dx = (mx - cx) / 60;
        const dy = (my - cy) / 60;
        titleRef.current.style.transform = `translate(${dx}px, ${dy}px)`;
      }

      // ── Cards parallax (depth-layered)
      const cards = cardsRef.current?.querySelectorAll<HTMLElement>('.hero-card') ?? [];
      cards.forEach((card, i) => {
        const rect = cardRects[i];
        if (!rect) return;
        const cx = rect.left + rect.width  / 2;
        const cy = rect.top  + rect.height / 2;
        const factor = 35 + i * 12;
        const dx = (mx - cx) / factor;
        const dy = (my - cy) / factor;
        // Blend with existing transform carefully — only override x/y offset
        card.style.setProperty('--px', `${dx}px`);
        card.style.setProperty('--py', `${dy}px`);
      });

      // ── Magnetic buttons
      document.querySelectorAll<HTMLElement>('.magnetic-button').forEach((btn) => {
        const r = btn.getBoundingClientRect();
        const cx = r.left + r.width  / 2;
        const cy = r.top  + r.height / 2;
        const dist = Math.hypot(mx - cx, my - cy);
        if (dist < 110) {
          btn.style.setProperty('--mx', `${(mx - cx) / 3.5}px`);
          btn.style.setProperty('--my', `${(my - cy) / 3.5}px`);
        } else {
          btn.style.setProperty('--mx', '0px');
          btn.style.setProperty('--my', '0px');
        }
      });

      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(rafRef.current);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <>
      <section
        ref={heroRef}
        id="hero"
        className="relative flex min-h-screen items-center overflow-hidden bg-[#0a0a0a] px-6"
      >
        {/* Morphing Blobs — GPU-promoted */}
        <div
          ref={(el) => { blobsRef.current[0] = el; }}
          className="morphing-blob pointer-events-none absolute left-[10%] top-[20%] h-[500px] w-[500px] bg-gradient-to-br from-[#ff004d]/20 to-[#f76c46]/10 blur-[100px]"
          style={{ mixBlendMode: 'screen', willChange: 'transform' }}
        />
        <div
          ref={(el) => { blobsRef.current[1] = el; }}
          className="morphing-blob pointer-events-none absolute right-[15%] bottom-[25%] h-[600px] w-[600px] bg-gradient-to-tl from-[#85a1c5]/20 to-[#4a90e2]/10 blur-[120px]"
          style={{ mixBlendMode: 'screen', willChange: 'transform' }}
        />
        <div
          ref={(el) => { blobsRef.current[2] = el; }}
          className="morphing-blob pointer-events-none absolute left-[40%] bottom-[10%] h-[400px] w-[400px] bg-gradient-to-tr from-[#bacfa3]/15 to-[#2d4a3e]/10 blur-[90px]"
          style={{ mixBlendMode: 'screen', willChange: 'transform' }}
        />

        {/* Diagonal Lines Pattern */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `repeating-linear-gradient(
              45deg,
              transparent,
              transparent 50px,
              rgba(255, 255, 255, 0.1) 50px,
              rgba(255, 255, 255, 0.1) 51px
            )`,
          }}
        />

        <div className="relative z-10 grid w-full max-w-7xl grid-cols-1 gap-16 lg:grid-cols-2 lg:items-center">
          {/* Left Column */}
          <div className="space-y-8 text-left">
            {/* Overline */}
            <div className="hero-subtitle inline-flex items-center gap-3 rounded-full border border-white/10 px-4 py-2 backdrop-blur-sm">
              <div className="h-2 w-2 animate-pulse rounded-full bg-[#ff004d]" />
              <span className="font-['IBM_Plex_Mono'] text-xs uppercase tracking-[0.3em] text-white/60">
                Design Tokens v2.0
              </span>
            </div>

            {/* Heading */}
            <div
              ref={titleRef}
              className="space-y-2"
              style={{ willChange: 'transform' }}
            >
              <div className="overflow-hidden">
                <h1 className="hero-title-line font-['Syne'] text-[clamp(3rem,8vw,7rem)] font-bold leading-[0.85] tracking-[-0.04em] text-white">
                  DESIGN
                </h1>
              </div>
              <div className="overflow-hidden">
                <h1
                  className="hero-title-line font-['Syne'] text-[clamp(3rem,8vw,7rem)] font-bold leading-[0.85] tracking-[-0.04em]"
                  style={{
                    background: 'linear-gradient(135deg, #ff004d 0%, #f76c46 50%, #e9e778 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  TOKENS
                </h1>
              </div>
            </div>

            {/* Subtitle */}
            <p className="hero-subtitle max-w-lg font-['DM_Sans'] text-lg leading-relaxed text-white/50">
              Sistema interativo de design tokens. Experimente os efeitos com seu mouse.
              <span className="italic text-white/70"> Movimento. Paralaxe. Magnetismo.</span>
            </p>

            {/* Magnetic Buttons */}
            <div className="flex flex-wrap items-center gap-4">
              <button
                className="magnetic-button hero-button group relative overflow-hidden border-2 border-[#ff004d] bg-[#ff004d] px-8 py-4 font-['Syne'] text-sm font-semibold uppercase tracking-wider text-white"
                style={{
                  transform: 'translate(var(--mx, 0px), var(--my, 0px))',
                  transition: 'background 0.3s, border-color 0.3s',
                  willChange: 'transform',
                }}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                <span className="relative z-10">Explorar Sistema</span>
              </button>

              <button
                className="magnetic-button hero-button group relative overflow-hidden border-2 border-white/20 bg-transparent px-8 py-4 font-['Syne'] text-sm font-semibold uppercase tracking-wider text-white"
                style={{
                  transform: 'translate(var(--mx, 0px), var(--my, 0px))',
                  willChange: 'transform',
                }}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                <div
                  className="absolute inset-0 -translate-x-full bg-white/5 transition-transform duration-500 group-hover:translate-x-0"
                  style={{ clipPath: 'polygon(0 0, 100% 0, 85% 100%, 0% 100%)' }}
                />
                <span className="relative z-10">Ver Tokens</span>
              </button>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-8 border-l-2 border-[#ff004d] pl-6">
              <div className="hero-stat">
                <div className="font-['Syne'] text-3xl font-bold text-white">24</div>
                <div className="font-['IBM_Plex_Mono'] text-xs uppercase tracking-wider text-white/40">Colors</div>
              </div>
              <div className="h-8 w-px bg-white/10" />
              <div className="hero-stat">
                <div className="font-['Syne'] text-3xl font-bold text-white">3</div>
                <div className="font-['IBM_Plex_Mono'] text-xs uppercase tracking-wider text-white/40">Typefaces</div>
              </div>
              <div className="h-8 w-px bg-white/10" />
              <div className="hero-stat">
                <div className="font-['Syne'] text-3xl font-bold text-white">∞</div>
                <div className="font-['IBM_Plex_Mono'] text-xs uppercase tracking-wider text-white/40">Interactive</div>
              </div>
            </div>
          </div>

          {/* Right Column — Cards */}
          <div ref={cardsRef} className="relative hidden h-[600px] lg:block">
            {/* Card 1 */}
            <div
              className="hero-card absolute left-0 top-0 h-72 w-80 border border-white/10 bg-gradient-to-br from-[#ff004d] to-[#f76c46] p-8 shadow-2xl"
              data-rotation="-6"
              style={{
                transform: 'rotate(-6deg) translate(var(--px,0px), var(--py,0px))',
                transformOrigin: 'top left',
                willChange: 'transform',
              }}
              onMouseEnter={() => {}}
              onMouseLeave={() => {}}
            >
              <div className="h-full border-2 border-white/20 p-6">
                <div className="font-['IBM_Plex_Mono'] text-xs uppercase tracking-widest text-white/60">#ff004d</div>
                <div className="mt-4 font-['Syne'] text-4xl font-bold text-white">PASSION<br />RED</div>
                <div className="mt-6 h-px bg-white/20" />
                <div className="mt-4 font-['IBM_Plex_Mono'] text-xs text-white/60">RGB 255, 0, 77</div>
              </div>
            </div>

            {/* Card 2 */}
            <div
              className="hero-card absolute left-16 top-32 h-72 w-80 border border-white/10 bg-gradient-to-br from-[#85a1c5] to-[#4a90e2] p-8 shadow-2xl"
              data-rotation="3"
              style={{
                transform: 'rotate(3deg) translate(var(--px,0px), var(--py,0px))',
                willChange: 'transform',
              }}
              onMouseEnter={() => {}}
              onMouseLeave={() => {}}
            >
              <div className="h-full border-2 border-white/20 p-6">
                <div className="font-['IBM_Plex_Mono'] text-xs uppercase tracking-widest text-white/60">#85a1c5</div>
                <div className="mt-4 font-['Syne'] text-4xl font-bold text-white">VISTA<br />BLUE</div>
                <div className="mt-6 h-px bg-white/20" />
                <div className="mt-4 font-['IBM_Plex_Mono'] text-xs text-white/60">RGB 133, 161, 197</div>
              </div>
            </div>

            {/* Card 3 */}
            <div
              className="hero-card absolute left-32 top-64 h-72 w-80 border border-white/10 bg-gradient-to-br from-[#bacfa3] to-[#2d4a3e] p-8 shadow-2xl"
              data-rotation="-3"
              style={{
                transform: 'rotate(-3deg) translate(var(--px,0px), var(--py,0px))',
                willChange: 'transform',
              }}
              onMouseEnter={() => {}}
              onMouseLeave={() => {}}
            >
              <div className="h-full border-2 border-white/20 p-6">
                <div className="font-['IBM_Plex_Mono'] text-xs uppercase tracking-widest text-white/60">#bacfa3</div>
                <div className="mt-4 font-['Syne'] text-4xl font-bold text-white">GOLF<br />CELADON</div>
                <div className="mt-6 h-px bg-white/20" />
                <div className="mt-4 font-['IBM_Plex_Mono'] text-xs text-white/60">RGB 186, 207, 163</div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="hero-subtitle pointer-events-none absolute bottom-12 left-1/2 -translate-x-1/2">
          <div className="flex flex-col items-center gap-2">
            <div className="font-['IBM_Plex_Mono'] text-[10px] uppercase tracking-[0.3em] text-white/30">Scroll</div>
            <div className="h-12 w-px animate-pulse bg-gradient-to-b from-white/40 to-transparent" />
          </div>
        </div>
      </section>
    </>
  );
}
