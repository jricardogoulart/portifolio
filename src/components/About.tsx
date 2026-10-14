import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { GraduationCap, Briefcase, MapPin, Mail, ArrowRight, Plus, Download, CheckCircle2, ExternalLink } from 'lucide-react';
import { FaGithub, FaLinkedin, FaInstagram, FaTwitter } from 'react-icons/fa';
import AuroraBars from './AuroraBars';

// Linear interpolation function
const lerp = (start: number, end: number, factor: number) => start + (end - start) * factor;

export default function About() {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const blobsRef = useRef<(HTMLDivElement | null)[]>([]);

  // Tracked via ref so rAF loop doesn't need React state
  const mouse = useRef({ x: 0, y: 0 });
  const cursor = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);

  // Cursor element refs
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);

  // State for hover/typing interactions
  const [isHovering, setIsHovering] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

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

      // SCROLL ANIMATIONS FOR SECTIONS
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            gsap.to(entry.target, {
              y: 0,
              opacity: 1,
              duration: 1.2,
              ease: 'expo.out',
              stagger: 0.15
            });
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

      document.querySelectorAll('.animate-on-scroll').forEach((el) => {
        gsap.set(el, { y: 60, opacity: 0 });
        observer.observe(el);
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
        const cx = titleRect.left + titleRect.width / 2;
        const cy = titleRect.top + titleRect.height / 2;
        const dx = (mx - cx) / 60;
        const dy = (my - cy) / 60;
        titleRef.current.style.transform = `translate(${dx}px, ${dy}px)`;
      }

      // ── Cards parallax (depth-layered)
      const cards = cardsRef.current?.querySelectorAll<HTMLElement>('.hero-card') ?? [];
      cards.forEach((card, i) => {
        const rect = cardRects[i];
        if (!rect) return;
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
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
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;
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
    <div ref={heroRef} className="bg-[#0a0a0a]">
      {/* Custom Cursor */}
      <div
        ref={cursorRef}
        className="pointer-events-none fixed z-50 w-5 h-5 border-2 border-[#ff004d]/50 rounded-full mix-blend-screen"
        style={{
          transform: 'translate(-50%, -50%)',
          willChange: 'transform',
          opacity: isHovering ? 0.8 : 0.5,
        }}
      />
      <div
        ref={cursorDotRef}
        className="pointer-events-none fixed z-50 w-1.5 h-1.5 bg-[#ff004d] rounded-full mix-blend-screen"
        style={{
          transform: 'translate(-50%, -50%)',
          willChange: 'transform',
          opacity: isTyping ? 0.3 : 0.8,
        }}
      />
      {/* HERO SECTION */}
      <section
        ref={heroRef}
        id="hero"
        className="relative flex min-h-screen items-center overflow-hidden bg-[#0a0a0a] px-4 sm:px-6 lg:px-12 py-24 sm:py-28 lg:py-0"
      >
        {/* Aurora Bars Background — Floema Design System */}
        <div className="pointer-events-none absolute inset-0 z-0 opacity-80 sm:opacity-90">
          <AuroraBars
            barCount={26}
            mobileBarCount={13}
            maxHeightRatio={0.88}
            mobileMaxHeightRatio={0.68}
            minHeightRatio={0.16}
            mobileMinHeightRatio={0.10}
            speed={1.05}
            mobileSpeed={0.85}
            gap={3.5}
            mobileGap={2}
            blur={6}
            mobileBlur={4}
          />
        </div>

        {/* Morphing Blobs — GPU-promoted */}
        <div
          ref={(el) => { blobsRef.current[0] = el; }}
          className="morphing-blob pointer-events-none absolute left-[10%] top-[20%] h-[350px] sm:h-[500px] w-[350px] sm:w-[500px] bg-gradient-to-br from-[#ff004d]/15 to-[#f76c46]/10 blur-[90px] sm:blur-[100px]"
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

        <div className="relative z-10 grid w-full max-w-7xl grid-cols-1 gap-16 lg:grid-cols-2 lg:items-center mx-auto">
          {/* Left Column */}
          <div className="space-y-8 text-left">
            {/* Overline */}
            <div className="hero-subtitle inline-flex items-center gap-3 rounded-full border border-white/10 px-4 py-2 backdrop-blur-sm bg-white/[0.02]">
              <div className="h-2 w-2 animate-pulse rounded-full bg-[#ff004d]" />
              <span className="font-['IBM_Plex_Mono'] text-xs uppercase tracking-[0.3em] text-white/60">
                Analista de TI & Dev Full Stack
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
                  JOSÉ
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
                  GOULART
                </h1>
              </div>
            </div>

            {/* Subtitle */}
            <p className="hero-subtitle max-w-lg font-['DM_Sans'] text-base sm:text-lg leading-relaxed text-white/70">
              Desenvolvedor Full Stack e Analista de TI com vivência sólida em <span className="text-white font-medium">UI/UX Design</span>. Da arquitetura de ecossistemas corporativos escaláveis (Node.js, React, Docker) à concepção de <span className="text-white/90 italic">interfaces de alta fidelidade</span> e usabilidade no Figma.
            </p>

            {/* Magnetic Buttons — responsive touch targets */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
              <a
                href="#portifolio"
                className="magnetic-button hero-button group relative overflow-hidden border-2 border-[#ff004d] bg-[#ff004d] px-6 sm:px-8 py-3.5 sm:py-4 font-['Syne'] text-xs sm:text-sm font-semibold uppercase tracking-wider text-white text-center transition-all hover:bg-[#ff004d]/90 shadow-lg shadow-[#ff004d]/20"
                style={{
                  willChange: 'transform',
                }}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                <span className="relative z-10">Explorar Portfólio</span>
              </a>

              <a
                href="/curriculo-jose-ricardo-goulart.pdf"
                download="Curriculo-Jose-Ricardo-Goulart.pdf"
                className="magnetic-button hero-button group relative overflow-hidden border-2 border-white/20 bg-transparent px-6 sm:px-8 py-3.5 sm:py-4 font-['Syne'] text-xs sm:text-sm font-semibold uppercase tracking-wider text-white text-center transition-all hover:border-[#f76c46] hover:text-[#f76c46]"
                style={{
                  willChange: 'transform',
                }}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                <div
                  className="absolute inset-0 -translate-x-full bg-white/5 transition-transform duration-500 group-hover:translate-x-0"
                  style={{ clipPath: 'polygon(0 0, 100% 0, 85% 100%, 0% 100%)' }}
                />
                <span className="relative z-10 inline-flex items-center gap-2">
                  <Download className="w-4 h-4 transition-transform group-hover:translate-y-0.5" />
                  Baixar CV (PDF)
                </span>
              </a>
            </div>

            {/* Stats — wrapped comfortably on narrow mobile screens */}
            <div className="flex flex-wrap sm:flex-nowrap items-center gap-6 sm:gap-8 border-l-2 border-[#ff004d] pl-4 sm:pl-6" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
              <div className="hero-stat group cursor-default">
                <div className="font-['Syne'] text-2xl sm:text-3xl font-bold text-white transition-colors group-hover:text-[#ff004d]">+2</div>
                <div className="font-['IBM_Plex_Mono'] text-[10px] font-medium uppercase tracking-[0.2em] text-white/40">
                  Anos Atuação
                </div>
              </div>
              <div className="h-8 w-px bg-white/10 hidden sm:block" />
              <div className="hero-stat group cursor-default">
                <div className="font-['Syne'] text-2xl sm:text-3xl font-bold text-white transition-colors group-hover:text-[#85a1c5]">35</div>
                <div className="font-['IBM_Plex_Mono'] text-[10px] font-medium uppercase tracking-[0.2em] text-white/40">
                  Indústrias
                </div>
              </div>
              <div className="h-8 w-px bg-white/10 hidden sm:block" />
              <div className="hero-stat group cursor-default">
                <div className="font-['Syne'] text-2xl sm:text-3xl font-bold text-white transition-colors group-hover:text-[#bacfa3]">FATEC</div>
                <div className="font-['IBM_Plex_Mono'] text-[10px] font-medium uppercase tracking-[0.2em] text-white/40">
                  ADS Formado
                </div>
              </div>
            </div>
          </div>

          {/* Right Column — Cards (balanced rightward alignment, 100% visible) */}
          <div ref={cardsRef} className="relative hidden h-[600px] lg:block ml-auto w-full max-w-[460px]">
            {/* Card 1 */}
            <div
              className="hero-card absolute left-6 top-0 h-72 w-80 border border-white/10 bg-gradient-to-br from-[#ff004d] to-[#cc003d] p-8 shadow-2xl transition-all"
              data-rotation="-6"
              style={{
                transform: 'rotate(-6deg)',
                transformOrigin: 'top left',
                willChange: 'transform',
              }}
              onMouseEnter={() => { }}
              onMouseLeave={() => { }}
            >
              <div className="h-full border-2 border-white/20 p-6 flex flex-col justify-between backdrop-blur-sm bg-white/[0.02]">
                <div className="font-['IBM_Plex_Mono'] text-[10px] font-bold uppercase tracking-widest text-white/60">
                  Node.js · ReactJS · Docker
                </div>
                <div>
                  <div className="mt-4 font-['Syne'] text-4xl font-bold text-white leading-[0.9]">
                    FULL<br />STACK
                  </div>
                  <div className="mt-6 h-[2px] w-12 bg-white/40" />
                  <div className="mt-4 font-['DM_Sans'] text-xs font-medium text-white/80">
                    Ecossistema p/ 35 Indústrias
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div
              className="hero-card absolute left-16 top-32 h-72 w-80 border border-white/10 bg-gradient-to-br from-[#85a1c5] to-[#5b7ea8] p-8 shadow-2xl transition-all"
              data-rotation="3"
              style={{
                transform: 'rotate(3deg)',
                willChange: 'transform',
              }}
              onMouseEnter={() => { }}
              onMouseLeave={() => { }}
            >
              <div className="h-full border-2 border-white/20 p-6 flex flex-col justify-between backdrop-blur-sm bg-white/[0.02]">
                <div className="font-['IBM_Plex_Mono'] text-[10px] font-bold uppercase tracking-widest text-white/60">
                  Figma · CorelDRAW
                </div>
                <div>
                  <div className="mt-4 font-['Syne'] text-4xl font-bold text-white leading-[0.9]">
                    UI/UX &<br />DESIGN
                  </div>
                  <div className="mt-6 h-[2px] w-12 bg-white/40" />
                  <div className="mt-4 font-['DM_Sans'] text-xs font-medium text-white/80">
                    Prototipagem & Design Técnico
                  </div>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div
              className="hero-card absolute left-28 top-64 h-72 w-80 border border-white/10 bg-gradient-to-br from-[#bacfa3] to-[#8fa874] p-8 shadow-2xl transition-all"
              data-rotation="-3"
              style={{
                transform: 'rotate(-3deg)',
                willChange: 'transform',
              }}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              <div className="h-full border-2 border-white/20 p-6 flex flex-col justify-between backdrop-blur-sm bg-white/[0.02]">
                <div className="font-['IBM_Plex_Mono'] text-[10px] font-bold uppercase tracking-widest text-white/60">
                  Linux · Windows Server · Docker
                </div>
                <div>
                  <div className="mt-4 font-['Syne'] text-4xl font-bold text-white leading-[0.9]">
                    INFRA &<br />SERVERS
                  </div>
                  <div className="mt-6 h-[2px] w-12 bg-white/40" />
                  <div className="mt-4 font-['DM_Sans'] text-xs font-medium text-white/80">
                    Alta Disponibilidade & Automação
                  </div>
                </div>
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

      {/* ---------------- REST OF THE PAGE ---------------- */}

      {/* SOBRE */}
      <section id="sobre" className="relative z-10 py-12 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-16 border-t border-white/5 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto">

          {/* Section header */}
          <div className="mb-8 md:mb-10 animate-on-scroll">
            <div className="mb-2 font-['JetBrains_Mono'] text-xs uppercase tracking-[0.3em] text-[#ff004d]">
              / 01 Info
            </div>
            <h2 className="font-['Syne'] text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-none">
              Sobre<br /><span className="text-[#85a1c5]">Mim</span>
            </h2>
          </div>

          {/* Content grid: profile card + bio */}
          <div className="flex flex-col lg:flex-row items-start gap-6 lg:gap-12">

            {/* ── GitHub Profile Card (compact scale) ── */}
            <div className="w-full lg:w-[250px] shrink-0 animate-on-scroll" style={{ animationDelay: '0.05s' }}>
              <div
                className="group relative border border-white/10 bg-[#0f0f0f] overflow-hidden transition-all duration-500 hover:border-[#ff004d]/30"
                style={{ clipPath: 'polygon(0 0, 100% 0, 100% 94%, 94% 100%, 0 100%)' }}
                onMouseEnter={() => { }}
                onMouseLeave={() => { }}
              >
                {/* Top accent bar */}
                <div className="h-[2px] w-full bg-gradient-to-r from-[#ff004d] via-[#f76c46] to-[#85a1c5]" />

                {/* Avatar & content */}
                <div className="relative px-4 pt-5 pb-3.5 flex flex-col items-center text-center">
                  {/* Glow ring behind avatar */}
                  <div className="relative mb-3">
                    <div className="absolute inset-0 rounded-none bg-gradient-to-br from-[#ff004d]/30 to-[#85a1c5]/20 blur-xl scale-125 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    {/* Outer decorative border */}
                    <div
                      className="relative p-[2px] bg-gradient-to-br from-[#ff004d] via-[#f76c46] to-[#85a1c5]"
                      style={{ clipPath: 'polygon(0 0, 100% 0, 100% 88%, 88% 100%, 0 100%)' }}
                    >
                      <div
                        className="bg-[#0a0a0a] p-[2px]"
                        style={{ clipPath: 'polygon(0 0, 100% 0, 100% 88%, 88% 100%, 0 100%)' }}
                      >
                        <img
                          src="https://avatars.githubusercontent.com/u/131194841?v=4"
                          alt="José Goulart — GitHub Avatar"
                          width={96}
                          height={96}
                          className="block w-20 h-20 sm:w-24 sm:h-24 object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                          style={{ clipPath: 'polygon(0 0, 100% 0, 100% 88%, 88% 100%, 0 100%)' }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Name + handle */}
                  <h3 className="font-['Syne'] text-base sm:text-lg font-bold text-white mb-0.5 transition-colors group-hover:text-[#ff004d]">
                    José Goulart
                  </h3>
                  <div className="font-['IBM_Plex_Mono'] text-[9px] text-white/40 tracking-widest uppercase mb-2.5">
                    @jricardogoulart
                  </div>

                  {/* Bio chip */}
                  <p className="font-['DM_Sans'] text-[11px] text-white/50 leading-relaxed mb-3 max-w-[190px]">
                    Full Stack Dev · UI/UX · DevOps
                  </p>

                  {/* Divider */}
                  <div className="w-full h-px bg-white/10 mb-3" />

                  {/* Meta info rows */}
                  <div className="w-full space-y-1.5 text-left">
                    {([
                      { label: 'Localização', value: 'Franca, SP — Brasil', accent: false },
                      { label: 'Graduação', value: 'ADS · FATEC Franca', accent: false },
                      { label: 'Atuação', value: 'TI & Full Stack Dev', accent: false },
                      { label: 'Status', value: 'Disponível / Open to Work', accent: true },
                    ] as { label: string; value: string; accent: boolean }[]).map((row) => (
                      <div key={row.label} className="flex items-baseline justify-between gap-2">
                        <span className="font-['IBM_Plex_Mono'] text-[8.5px] uppercase tracking-[0.2em] text-white/30 shrink-0">
                          {row.label}
                        </span>
                        <span className={`font-['Syne'] text-xs font-medium truncate ${row.accent ? 'text-[#ff004d]' : 'text-white/80'}`}>
                          {row.value}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Divider */}
                  <div className="w-full h-px bg-white/10 mt-3 mb-3" />

                  {/* GitHub stats row */}
                  <div className="w-full flex justify-between text-center">
                    {[
                      { count: '35', label: 'Indústrias' },
                      { count: '+2', label: 'Anos Exp' },
                      { count: 'FATEC', label: 'Graduado' },
                    ].map((stat) => (
                      <div key={stat.label} className="group/stat flex flex-col gap-0.5">
                        <span className="font-['Syne'] text-sm sm:text-base font-bold text-white transition-colors group-hover/stat:text-[#ff004d]">
                          {stat.count}
                        </span>
                        <span className="font-['IBM_Plex_Mono'] text-[8.5px] uppercase tracking-widest text-white/30">
                          {stat.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom CTA */}
                <a
                  href="/curriculo-jose-ricardo-goulart.pdf"
                  download="Curriculo-Jose-Ricardo-Goulart.pdf"
                  className="flex items-center justify-between w-full px-4 py-2.5 bg-white/[0.03] border-t border-white/10 transition-all duration-300 hover:bg-[#ff004d]/10 hover:border-[#ff004d]/30 group/cta"
                >
                  <span className="font-['IBM_Plex_Mono'] text-[9px] uppercase tracking-[0.2em] text-white/60 transition-colors group-hover/cta:text-[#ff004d] inline-flex items-center gap-1.5">
                    <Download className="w-3 h-3 text-[#ff004d]" /> Baixar Currículo (PDF)
                  </span>
                  <ArrowRight className="w-3 h-3 text-white/30 transition-all duration-300 group-hover/cta:text-[#ff004d] group-hover/cta:translate-x-0.5" />
                </a>

                {/* Corner decoration */}
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#ff004d]/40" />
              </div>
            </div>

            {/* ── Bio content (scaled hierarchy) ── */}
            <div className="flex-1 space-y-4 sm:space-y-5 animate-on-scroll" style={{ animationDelay: '0.15s' }}>
              <p className="font-['DM_Sans'] text-sm sm:text-base md:text-lg leading-relaxed text-white/90" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
                Me chamo <strong className="text-white font-medium">José Ricardo Goulart Silva</strong>, natural de Franca, São Paulo. Sou graduado em <strong className="text-[#85a1c5] font-semibold">Análise e Desenvolvimento de Sistemas</strong> pela <strong className="text-white">FATEC Franca (Doutor Thomaz Novelino)</strong>.
              </p>
              <p className="font-['DM_Sans'] text-xs sm:text-sm leading-relaxed text-white/60">
                Atuo como <strong className="text-white">Analista de TI e Desenvolvedor Full Stack</strong> na R Raimundo Da Silva, responsável pelo desenvolvimento e sustentação de um ecossistema completo de ordens de serviço (Node.js, ReactJS e Docker) que automatiza e padroniza a produção de <strong className="text-white/90">35 indústrias parceiras</strong>.
              </p>
              <p className="font-['DM_Sans'] text-xs sm:text-sm leading-relaxed text-white/60">
                Minha experiência une infraestrutura corporativa crítica (administração de servidores Windows/Linux e containers), desenvolvimento de rotinas automatizadas e capacitação técnica e pedagógica de equipes com forte apoio multidisciplinar em UI/UX e design técnico (Figma e CorelDRAW).
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-4 pt-4 border-t border-white/10 mt-4 animate-on-scroll" style={{ animationDelay: '0.25s' }}>
                <div className="group" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
                  <h4 className="font-['JetBrains_Mono'] text-[9px] text-white/40 uppercase tracking-widest mb-1 transition-colors group-hover:text-[#ff004d]">Graduação</h4>
                  <p className="font-['Syne'] text-xs sm:text-sm font-medium text-white/90">FATEC Franca</p>
                </div>
                <div className="group" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
                  <h4 className="font-['JetBrains_Mono'] text-[9px] text-white/40 uppercase tracking-widest mb-1 transition-colors group-hover:text-[#ff004d]">Localização</h4>
                  <p className="font-['Syne'] text-xs sm:text-sm font-medium text-white/90">Franca - SP</p>
                </div>
                <div className="group" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
                  <h4 className="font-['JetBrains_Mono'] text-[9px] text-white/40 uppercase tracking-widest mb-1 transition-colors group-hover:text-[#ff004d]">Atuação</h4>
                  <p className="font-['Syne'] text-xs sm:text-sm font-medium text-white/90">Full Stack & TI</p>
                </div>
                <div className="group" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
                  <h4 className="font-['JetBrains_Mono'] text-[9px] text-white/40 uppercase tracking-widest mb-1 transition-colors group-hover:text-[#ff004d]">Contato</h4>
                  <a href="mailto:jricardogoulart@gmail.com" className="font-['Syne'] text-xs sm:text-sm font-bold text-[#ff004d] hover:underline truncate block">
                    jricardogoulart@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* COMPETÊNCIAS E TECNOLOGIAS */}
      <section id="habilidades" className="relative z-10 py-12 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-16 border-t border-white/5 bg-gradient-to-b from-[#141414] to-[#0a0a0a]">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8 md:mb-10 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 animate-on-scroll">
            <div>
              <div className="mb-2 font-['JetBrains_Mono'] text-xs uppercase tracking-[0.3em] text-[#ff004d]">
                / 02 Competências
              </div>
              <h2 className="font-['Syne'] text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2 leading-none">
                Competências &<br className="block md:hidden" />{' '}
                <span style={{ background: 'linear-gradient(135deg, #85a1c5 0%, #ff004d 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  Tecnologias
                </span>
              </h2>
            </div>
            <div className="font-['IBM_Plex_Mono'] text-xs text-white/40 uppercase tracking-widest">
              Stack & Metodologias Validadas
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 lg:gap-12">
            {/* Hard Skills */}
            <div className="space-y-4 sm:space-y-5 animate-on-scroll">
              <h3 className="font-['Syne'] text-base sm:text-lg md:text-xl font-bold text-white mb-3 pb-2 border-b border-white/10 flex items-center justify-between" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
                <span>Tecnologias & Ferramentas</span>
                <span className="font-['IBM_Plex_Mono'] text-[10px] text-white/40 uppercase font-normal">Nível de Domínio</span>
              </h3>
              {[
                { name: 'Figma & UI/UX', level: 90, badge: 'Avançado' },
                { name: 'CorelDRAW (Design Técnico)', level: 88, badge: 'Avançado' },
                { name: 'Docker & Containers', level: 85, badge: 'Avançado' },
                { name: 'Linux & Windows Server', level: 85, badge: 'Avançado' },
                { name: 'Node.js & ReactJS', level: 80, badge: 'Intermediário' },
                { name: 'JavaScript ES6+', level: 80, badge: 'Intermediário' },
                { name: 'Microsoft Office & Power BI', level: 75, badge: 'Intermediário' },
                { name: 'AWS Cloud Services', level: 60, badge: 'Básico' },
              ].map((skill, idx) => (
                <div key={skill.name} className="group space-y-1.5" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
                  <div className="flex items-center justify-between">
                    <label className="font-['JetBrains_Mono'] text-[11px] sm:text-xs uppercase tracking-wider text-white/70 transition-colors group-hover:text-white flex items-center gap-2">
                      <span>{skill.name}</span>
                      <span className="font-['IBM_Plex_Mono'] text-[9px] px-1.5 py-0.2 border border-white/10 text-white/40 group-hover:border-[#ff004d]/40 group-hover:text-[#ff004d] transition-colors">
                        {skill.badge}
                      </span>
                    </label>
                    <span className="font-['Syne'] text-xs sm:text-sm font-bold text-white/80 transition-colors group-hover:text-[#ff004d]">
                      {skill.level}%
                    </span>
                  </div>
                  {/* Progress Bar Component */}
                  <div className="relative h-1.5 overflow-hidden border border-white/10 bg-black/50">
                    <div
                      className="h-full bg-gradient-to-r from-[#ff004d] to-[#f76c46] transition-all duration-1000 ease-out"
                      style={{
                        width: `${skill.level}%`,
                        clipPath: 'polygon(0 0, 100% 0, 98% 100%, 0% 100%)',
                        transitionDelay: `${idx * 0.08}s`
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>

            {/* Soft Skills & Competências Estratégicas */}
            <div className="space-y-4 sm:space-y-5 animate-on-scroll" style={{ animationDelay: '0.2s' }}>
              <h3 className="font-['Syne'] text-base sm:text-lg md:text-xl font-bold text-white mb-3 pb-2 border-b border-white/10 flex items-center justify-between" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
                <span>Atuação Multidisciplinar</span>
                <span className="font-['IBM_Plex_Mono'] text-[10px] text-white/40 uppercase font-normal">Capacidade Prática</span>
              </h3>
              {[
                { name: 'Docência, Treinamento & Ementas', level: 100, desc: 'Capacitação pedagógica e manuais para sistemas corporativos' },
                { name: 'Automação de Rotinas & Scripts', level: 95, desc: 'Eliminação de falhas operacionais humanas via rotinas automatizadas' },
                { name: 'Gestão de Ambientes Críticos', level: 90, desc: 'Alta disponibilidade e segurança em servidores físicos e lógicos' },
                { name: 'Apoio Multidisciplinar (TI + Design)', level: 90, desc: 'Unificação entre processos de software, logística e design técnico' },
              ].map((skill, idx) => (
                <div key={skill.name} className="group space-y-1.5" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
                  <div className="flex items-baseline justify-between">
                    <div>
                      <label className="font-['JetBrains_Mono'] text-[11px] sm:text-xs uppercase tracking-wider text-white/70 transition-colors group-hover:text-white block">
                        {skill.name}
                      </label>
                      <span className="font-['DM_Sans'] text-[10px] text-white/40 transition-colors group-hover:text-white/60">
                        {skill.desc}
                      </span>
                    </div>
                    <span className="font-['Syne'] text-xs sm:text-sm font-bold text-white/80 transition-colors group-hover:text-[#85a1c5] shrink-0 ml-2">
                      {skill.level}%
                    </span>
                  </div>
                  {/* Progress Bar Component (Blue Var) */}
                  <div className="relative h-1.5 overflow-hidden border border-white/10 bg-black/50">
                    <div
                      className="h-full bg-gradient-to-r from-[#85a1c5] to-[#4a90e2] transition-all duration-1000 ease-out"
                      style={{
                        width: `${skill.level}%`,
                        clipPath: 'polygon(0 0, 100% 0, 98% 100%, 0% 100%)',
                        transitionDelay: `${idx * 0.1}s`
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CURRICULO & FORMAÇÃO */}
      <section id="curriculo" className="relative z-10 py-12 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-16 border-t border-white/5 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto">
          {/* Header with direct CV Download */}
          <div className="mb-8 md:mb-10 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 animate-on-scroll">
            <div>
              <div className="mb-2 font-['JetBrains_Mono'] text-xs uppercase tracking-[0.3em] text-[#ff004d]">
                / 03 Timeline
              </div>
              <h2 className="font-['Syne'] text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2 leading-none">
                Currículo & Trajetória
              </h2>
            </div>
            <div>
              <a
                href="/curriculo-jose-ricardo-goulart.pdf"
                download="Curriculo-Jose-Ricardo-Goulart.pdf"
                className="magnetic-button inline-flex items-center gap-2.5 px-5 py-3 border border-[#ff004d]/50 bg-[#ff004d]/10 text-white font-['Syne'] text-xs uppercase tracking-wider hover:bg-[#ff004d] hover:text-white transition-all duration-300 shadow-lg shadow-[#ff004d]/10"
                style={{ clipPath: 'polygon(0 0, 100% 0, 93% 100%, 0% 100%)' }}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                <Download className="w-4 h-4 text-white" />
                <span>Baixar CV Completo (PDF)</span>
              </a>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Formação Acadêmica */}
            <div className="animate-on-scroll">
              <div className="flex items-center gap-3.5 mb-6 border-b border-white/10 pb-3" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
                <div className="w-9 h-9 border-2 border-[#ff004d] bg-transparent flex items-center justify-center transition-transform hover:rotate-12">
                  <GraduationCap className="text-[#ff004d] w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-['Syne'] text-base sm:text-lg md:text-xl font-bold text-white">Formação Acadêmica</h3>
                  <span className="font-['IBM_Plex_Mono'] text-[9px] text-white/40 uppercase tracking-widest">Ensino Superior & Médio</span>
                </div>
              </div>

              <div className="space-y-6 md:space-y-8 pl-5 border-l-[1px] border-white/20">
                {[
                  {
                    title: 'Graduação Tecnológica em Análise e Desenvolvimento de Sistemas',
                    date: '02/2022 – 12/2024',
                    inst: 'Faculdade de Tecnologia de Franca "Doutor Thomaz Novelino" (FATEC)',
                    status: 'Concluído',
                    desc: 'Formação superior com sólida base em engenharia de software, modelagem de banco de dados, arquitetura em nuvem e infraestrutura computacional.'
                  },
                  {
                    title: 'Ensino Médio',
                    date: '01/2018 – 12/2020',
                    inst: 'Escola Estadual Evaristo Fabrício',
                    status: 'Concluído',
                    desc: 'Formação geral preparatória concluída com ênfase em ciências exatas e raciocínio lógico.'
                  }
                ].map((item, i) => (
                  <div key={i} className="relative group cursor-default">
                    <div className="absolute -left-[27px] top-1 w-3 h-3 bg-[#0a0a0a] border-[1px] border-[#85a1c5] group-hover:bg-[#85a1c5] group-hover:scale-125 transition-all duration-300" style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }}></div>
                    <span className="font-['JetBrains_Mono'] text-[8.5px] text-[#ff004d] font-bold uppercase tracking-[0.2em] mb-1 block transition-colors group-hover:text-white">{item.date}</span>
                    <h4 className="font-['Syne'] text-sm sm:text-base md:text-lg font-bold text-white/90 mb-1 transition-colors group-hover:text-white">{item.title}</h4>
                    <p className="font-['DM_Sans'] text-white/60 text-xs mb-1.5 leading-relaxed font-medium">{item.inst}</p>
                    <p className="font-['DM_Sans'] text-white/40 text-[11px] mb-2.5 leading-relaxed">{item.desc}</p>
                    <span className="inline-block border border-white/10 bg-white/5 px-2.5 py-0.5 text-[8.5px] text-white/70 font-['JetBrains_Mono'] font-medium uppercase tracking-wider transition-colors group-hover:border-[#85a1c5] group-hover:text-[#85a1c5]">{item.status}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Experiência Profissional */}
            <div className="animate-on-scroll" style={{ animationDelay: '0.2s' }}>
              <div className="flex items-center gap-3.5 mb-6 border-b border-white/10 pb-3">
                <div className="w-9 h-9 border-2 border-[#85a1c5] bg-transparent flex items-center justify-center transition-transform hover:rotate-12">
                  <Briefcase className="text-[#85a1c5] w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-['Syne'] text-base sm:text-lg md:text-xl font-bold text-white">Experiência Profissional</h3>
                  <span className="font-['IBM_Plex_Mono'] text-[9px] text-white/40 uppercase tracking-widest">Histórico & Resultados Práticos</span>
                </div>
              </div>

              <div className="space-y-6 md:space-y-8 pl-5 border-l-[1px] border-white/20">
                <div className="relative group cursor-default">
                  <div className="absolute -left-[27px] top-1 w-3 h-3 bg-[#0a0a0a] border-[1px] border-[#ff004d] group-hover:bg-[#ff004d] group-hover:scale-125 transition-all duration-300" style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }}></div>
                  <span className="font-['JetBrains_Mono'] text-[8.5px] text-[#85a1c5] font-bold uppercase tracking-[0.2em] mb-1 block transition-colors group-hover:text-white">03/2022 – Atual</span>
                  <h4 className="font-['Syne'] text-sm sm:text-base md:text-lg font-bold text-white/90 mb-0.5 transition-colors group-hover:text-white">
                    Auxiliar Administrativo
                    <span className="block text-xs sm:text-sm font-medium text-[#f76c46]">
                      (Atuação Plena como Analista de TI e Desenvolvedor Full Stack)
                    </span>
                  </h4>
                  <p className="font-['DM_Sans'] text-white/50 text-xs mb-3 leading-relaxed font-medium">R Raimundo Da Silva Franca</p>
                  <ul className="space-y-2">
                    {[
                      {
                        title: 'Desenvolvimento de Sistemas (Full Stack)',
                        text: 'Projetou e implementou um ecossistema completo de gestão de ordens de serviço utilizando Node.js, ReactJS e Docker, responsável por automatizar e padronizar o fluxo produtivo de 35 indústrias parceiras.'
                      },
                      {
                        title: 'Suporte e Infraestrutura',
                        text: 'Responsável direto pela gestão, manutenção corretiva e preventiva de servidores e estações de trabalho, assegurando a alta disponibilidade, estabilidade e segurança dos ambientes críticos corporativos Windows e Linux.'
                      },
                      {
                        title: 'Docência e Treinamento',
                        text: 'Atuação ativa na capacitação técnica e pedagógica de usuários, sendo responsável pela criação e elaboração de materiais didáticos e manuais de procedimentos para operação de hardware, redes e sistemas.'
                      },
                      {
                        title: 'Automação de Processos',
                        text: 'Concepção e escrita de scripts automatizados para otimização de rotinas recorrentes (emissão de boletos e disparos de documentos fiscais por e-mail), mitigando integralmente falhas operacionais humanas.'
                      },
                      {
                        title: 'Apoio Multidisciplinar Integrado',
                        text: 'Interface estratégica unificando processos de tecnologia da informação a vertentes de design gráfico técnico (CorelDRAW) e controle de fluxos logísticos e de insumos.'
                      }
                    ].map((item, idx) => (
                      <li key={idx} className="font-['DM_Sans'] text-white/70 text-xs flex items-start gap-2 transition-colors group-hover:text-white/80">
                        <span className="text-[#ff004d] font-bold mt-[1px] text-[10px] shrink-0">/</span>
                        <span className="leading-relaxed">
                          <strong className="text-white font-semibold">{item.title}:</strong> {item.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Estágio UI Designer */}
                <div className="relative group cursor-default">
                  <div className="absolute -left-[27px] top-1 w-3 h-3 bg-[#0a0a0a] border-[1px] border-[#85a1c5] group-hover:bg-[#85a1c5] group-hover:scale-125 transition-all duration-300" style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }}></div>
                  <span className="font-['JetBrains_Mono'] text-[8.5px] text-[#85a1c5] font-bold uppercase tracking-[0.2em] mb-1 block transition-colors group-hover:text-white">03/2024 – 06/2024</span>
                  <h4 className="font-['Syne'] text-sm sm:text-base md:text-lg font-bold text-white/90 mb-0.5 transition-colors group-hover:text-white">
                    UI Designer
                    <span className="block text-xs sm:text-sm font-medium text-[#85a1c5]">
                      (Estágio em Design de Interfaces e Usabilidade)
                    </span>
                  </h4>
                  <p className="font-['DM_Sans'] text-white/50 text-xs mb-3 leading-relaxed font-medium">Gestor Inovação (Remoto)</p>
                  <ul className="space-y-2">
                    {[
                      {
                        title: 'Prototipagem de Alta Fidelidade',
                        text: 'Criação de protótipos interativos navegáveis no Figma, estruturando Design Systems com componentes reutilizáveis, tokens e auto-layout.'
                      },
                      {
                        title: 'Arquitetura de Usabilidade & UX',
                        text: 'Mapeamento de fluxos de jornada do usuário e refinamento de heurísticas visuais com foco absoluto em usabilidade responsiva e acessibilidade.'
                      },
                      {
                        title: 'Integração Multidisciplinar',
                        text: 'Ponte direta entre design e desenvolvimento web, preparando documentações técnicas de handoff para implementação fiel no front-end.'
                      }
                    ].map((item, idx) => (
                      <li key={idx} className="font-['DM_Sans'] text-white/70 text-xs flex items-start gap-2 transition-colors group-hover:text-white/80">
                        <span className="text-[#85a1c5] font-bold mt-[1px] text-[10px] shrink-0">/</span>
                        <span className="leading-relaxed">
                          <strong className="text-white font-semibold">{item.title}:</strong> {item.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Informações Adicionais e Diferenciais */}
          <div className="mt-10 sm:mt-12 pt-8 sm:pt-10 border-t border-white/10 animate-on-scroll">
            <h4 className="font-['Syne'] text-base sm:text-lg font-bold text-white mb-4 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#85a1c5]" />
              Informações Adicionais & Diferenciais Técnicos
            </h4>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
              <div className="p-4 border border-white/10 bg-white/[0.02] hover:border-[#ff004d]/40 transition-colors">
                <span className="font-['IBM_Plex_Mono'] text-[9px] uppercase tracking-widest text-[#ff004d] block mb-1">Ecosistemas</span>
                <p className="font-['DM_Sans'] text-xs text-white/70 leading-relaxed">
                  Domínio técnico no uso de containers Docker para padronização de ambientes locais e corporativos de desenvolvimento.
                </p>
              </div>
              <div className="p-4 border border-white/10 bg-white/[0.02] hover:border-[#85a1c5]/40 transition-colors">
                <span className="font-['IBM_Plex_Mono'] text-[9px] uppercase tracking-widest text-[#85a1c5] block mb-1">Sistemas Operacionais</span>
                <p className="font-['DM_Sans'] text-xs text-white/70 leading-relaxed">
                  Experiência prática em administração de servidores e manutenção em distribuições Linux e ecossistema Windows.
                </p>
              </div>
              <div className="p-4 border border-white/10 bg-white/[0.02] hover:border-[#bacfa3]/40 transition-colors sm:col-span-2 md:col-span-1">
                <span className="font-['IBM_Plex_Mono'] text-[9px] uppercase tracking-widest text-[#bacfa3] block mb-1">Perfil Docente</span>
                <p className="font-['DM_Sans'] text-xs text-white/70 leading-relaxed">
                  Habilidade comprovada na condução de treinamentos operacionais, elaboração de ementas corporativas de tecnologia e facilitação do aprendizado técnico para equipes multidisciplinares.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PORTFOLIO (Seção 04 com escala compacta e elegante) */}
      <section id="portifolio" className="relative z-10 py-12 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-16 border-t border-white/5 bg-gradient-to-bl from-[#141414] to-[#0a0a0a]">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8 md:mb-10 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 animate-on-scroll">
            <div>
              <div className="mb-2 font-['JetBrains_Mono'] text-xs uppercase tracking-[0.3em] text-[#ff004d]">
                / 04 Work
              </div>
              <h2 className="font-['Syne'] text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2 leading-none">
                Projetos & Portfólio
              </h2>
            </div>
            <a
              href="https://github.com/jricardogoulart?tab=repositories"
              target="_blank"
              rel="noopener noreferrer"
              className="font-['IBM_Plex_Mono'] text-xs text-white/50 uppercase tracking-widest hover:text-[#ff004d] transition-colors inline-flex items-center gap-1.5"
            >
              <span>Ver todos no GitHub</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {/* 1. Summer Cardápio - Com GitHub Pages Deploy */}
            <div className="group relative animate-on-scroll" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
              <div className="absolute left-2 top-2 h-full w-full border border-white/10 transition-transform duration-500 group-hover:translate-x-1.5 group-hover:translate-y-1.5"></div>
              <div className="relative border border-white/10 bg-[#0a0a0a] p-5 sm:p-6 transition-transform duration-500 group-hover:-translate-x-1.5 group-hover:-translate-y-1.5 h-full flex flex-col hover:border-[#ff004d]/50">
                <div className="mb-4 flex items-center justify-between">
                  <span className="border border-[#ff004d] px-3 py-1 font-['JetBrains_Mono'] text-[9px] font-bold uppercase tracking-widest text-[#ff004d] bg-[#ff004d]/5">
                    JavaScript · Pages Deploy
                  </span>
                  <span className="inline-flex items-center gap-1 font-['JetBrains_Mono'] text-[9px] text-[#bacfa3]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#bacfa3] animate-pulse"></span>
                    Online
                  </span>
                </div>
                <div className="aspect-[16/10] mb-4 overflow-hidden border border-white/10 relative bg-[#121212]">
                  <div className="absolute inset-0 bg-[#ff004d]/10 mix-blend-overlay group-hover:opacity-0 transition-opacity duration-500 z-10 pointer-events-none"></div>
                  <img
                    src="/summer-cardapio.png"
                    alt="Summer Cardápio Digital — Beach Tennis & Bar"
                    className="w-full h-full object-cover object-top opacity-85 transition-transform duration-1000 group-hover:scale-105 group-hover:opacity-100"
                  />
                </div>
                <h4 className="mb-2 font-['Syne'] text-xl sm:text-2xl font-bold text-white leading-tight transition-colors group-hover:text-[#ff004d]">
                  SUMMER<br />CARDÁPIO
                </h4>
                <p className="font-['DM_Sans'] text-xs sm:text-sm text-white/50 mb-5 flex-grow leading-relaxed group-hover:text-white/70 transition-colors">
                  Cardápio digital moderno e responsivo com navegação fluida por categorias, seleção de pedidos e experiência mobile-first de alta conversão.
                </p>
                <div className="flex gap-3">
                  <a
                    href="https://jricardogoulart.github.io/summer-cardapio/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="magnetic-button flex-1 bg-[#ff004d] text-center py-2.5 sm:py-3 text-white font-['Syne'] text-xs font-bold uppercase tracking-wider transition-all duration-300 hover:bg-white hover:text-black shadow-lg inline-flex items-center justify-center gap-2"
                    style={{ clipPath: 'polygon(0 0, 100% 0, 92% 100%, 0% 100%)' }}
                  >
                    <span>Deploy Live</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  <a
                    href="https://github.com/jricardogoulart/summer-cardapio"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="magnetic-button w-10 sm:w-11 flex items-center justify-center border border-white/20 text-white/50 hover:bg-white hover:text-black hover:border-white transition-all duration-300"
                    title="Ver no GitHub"
                  >
                    <FaGithub className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>

            {/* 2. Tyller Finance */}
            <div className="group relative animate-on-scroll" style={{ animationDelay: '0.1s' }} onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
              <div className="absolute left-2 top-2 h-full w-full border border-white/10 transition-transform duration-500 group-hover:translate-x-1.5 group-hover:translate-y-1.5"></div>
              <div className="relative border border-white/10 bg-[#0a0a0a] p-5 sm:p-6 transition-transform duration-500 group-hover:-translate-x-1.5 group-hover:-translate-y-1.5 h-full flex flex-col hover:border-[#85a1c5]/50">
                <div className="mb-4 inline-block self-start border border-[#85a1c5] px-3 py-1 font-['JetBrains_Mono'] text-[9px] font-bold uppercase tracking-widest text-[#85a1c5] bg-[#85a1c5]/5">
                  TypeScript · FinTech
                </div>
                <div className="aspect-[16/10] mb-4 overflow-hidden border border-white/10 relative">
                  <div className="absolute inset-0 bg-[#85a1c5]/15 mix-blend-overlay group-hover:opacity-0 transition-opacity duration-500 z-10"></div>
                  <img
                    src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop"
                    alt="Tyller Finance"
                    className="w-full h-full object-cover opacity-70 transition-transform duration-1000 group-hover:scale-110 group-hover:opacity-100"
                  />
                </div>
                <h4 className="mb-2 font-['Syne'] text-xl sm:text-2xl font-bold text-white leading-tight transition-colors group-hover:text-[#85a1c5]">
                  TYLLER<br />FINANCE
                </h4>
                <p className="font-['DM_Sans'] text-xs sm:text-sm text-white/50 mb-5 flex-grow leading-relaxed group-hover:text-white/70 transition-colors">
                  Aplicação de controle orçamentário e finanças pessoais construída com TypeScript, oferecendo tipagem estrita, performance e dashboards claros.
                </p>
                <div className="flex gap-3">
                  <a
                    href="https://github.com/jricardogoulart/tyller-finance"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="magnetic-button flex-1 bg-transparent border border-[#85a1c5] text-center py-2.5 sm:py-3 text-white font-['Syne'] text-xs font-bold uppercase tracking-wider transition-all duration-300 hover:bg-[#85a1c5] hover:text-black shadow-lg inline-flex items-center justify-center gap-2"
                    style={{ clipPath: 'polygon(0 0, 100% 0, 92% 100%, 0% 100%)' }}
                  >
                    <span>Repositório</span>
                    <FaGithub className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>

            {/* 3. Mars Photos - NASA API */}
            <div className="group relative animate-on-scroll" style={{ animationDelay: '0.2s' }} onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
              <div className="absolute left-2 top-2 h-full w-full border border-white/10 transition-transform duration-500 group-hover:translate-x-1.5 group-hover:translate-y-1.5"></div>
              <div className="relative border border-white/10 bg-[#0a0a0a] p-5 sm:p-6 transition-transform duration-500 group-hover:-translate-x-1.5 group-hover:-translate-y-1.5 h-full flex flex-col hover:border-[#f76c46]/50">
                <div className="mb-4 inline-block self-start border border-[#f76c46] px-3 py-1 font-['JetBrains_Mono'] text-[9px] font-bold uppercase tracking-widest text-[#f76c46] bg-[#f76c46]/5">
                  Vue.js · NASA API
                </div>
                <div className="aspect-[16/10] mb-4 overflow-hidden border border-white/10 relative">
                  <div className="absolute inset-0 bg-[#f76c46]/15 mix-blend-overlay group-hover:opacity-0 transition-opacity duration-500 z-10"></div>
                  <img
                    src="https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?q=80&w=1200&auto=format&fit=crop"
                    alt="Mars Photos Explorer"
                    className="w-full h-full object-cover opacity-70 transition-transform duration-1000 group-hover:scale-110 group-hover:opacity-100"
                  />
                </div>
                <h4 className="mb-2 font-['Syne'] text-xl sm:text-2xl font-bold text-white leading-tight transition-colors group-hover:text-[#f76c46]">
                  MARS<br />EXPLORER
                </h4>
                <p className="font-['DM_Sans'] text-xs sm:text-sm text-white/50 mb-5 flex-grow leading-relaxed group-hover:text-white/70 transition-colors">
                  Explorador espacial em Vue.js integrado à API oficial da NASA para consumo dinâmico e filtragem de imagens captadas pelas missões em Marte.
                </p>
                <div className="flex gap-3">
                  <a
                    href="https://github.com/jricardogoulart/mars-photos"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="magnetic-button flex-1 bg-transparent border border-[#f76c46] text-center py-2.5 sm:py-3 text-white font-['Syne'] text-xs font-bold uppercase tracking-wider transition-all duration-300 hover:bg-[#f76c46] hover:text-black shadow-lg inline-flex items-center justify-center gap-2"
                    style={{ clipPath: 'polygon(0 0, 100% 0, 92% 100%, 0% 100%)' }}
                  >
                    <span>Repositório</span>
                    <FaGithub className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>

            {/* 4. ProFinance */}
            <div className="group relative animate-on-scroll" style={{ animationDelay: '0.1s' }} onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
              <div className="absolute left-2 top-2 h-full w-full border border-white/10 transition-transform duration-500 group-hover:translate-x-1.5 group-hover:translate-y-1.5"></div>
              <div className="relative border border-white/10 bg-[#0a0a0a] p-5 sm:p-6 transition-transform duration-500 group-hover:-translate-x-1.5 group-hover:-translate-y-1.5 h-full flex flex-col hover:border-[#bacfa3]/50">
                <div className="mb-4 inline-block self-start border border-[#bacfa3] px-3 py-1 font-['JetBrains_Mono'] text-[9px] font-bold uppercase tracking-widest text-[#bacfa3] bg-[#bacfa3]/5">
                  JavaScript · Gestão
                </div>
                <div className="aspect-[16/10] mb-4 overflow-hidden border border-white/10 relative">
                  <div className="absolute inset-0 bg-[#bacfa3]/15 mix-blend-overlay group-hover:opacity-0 transition-opacity duration-500 z-10"></div>
                  <img
                    src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop"
                    alt="ProFinance"
                    className="w-full h-full object-cover opacity-70 transition-transform duration-1000 group-hover:scale-110 group-hover:opacity-100"
                  />
                </div>
                <h4 className="mb-2 font-['Syne'] text-xl sm:text-2xl font-bold text-white leading-tight transition-colors group-hover:text-[#bacfa3]">
                  PRO<br />FINANCE
                </h4>
                <p className="font-['DM_Sans'] text-xs sm:text-sm text-white/50 mb-5 flex-grow leading-relaxed group-hover:text-white/70 transition-colors">
                  Solução de inteligência financeira corporativa focada em conciliação de receitas, controle de custos e relatórios analíticos de gestão.
                </p>
                <div className="flex gap-3">
                  <a
                    href="https://github.com/jricardogoulart/profinance"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="magnetic-button flex-1 bg-transparent border border-[#bacfa3] text-center py-2.5 sm:py-3 text-white font-['Syne'] text-xs font-bold uppercase tracking-wider transition-all duration-300 hover:bg-[#bacfa3] hover:text-black shadow-lg inline-flex items-center justify-center gap-2"
                    style={{ clipPath: 'polygon(0 0, 100% 0, 92% 100%, 0% 100%)' }}
                  >
                    <span>Repositório</span>
                    <FaGithub className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>

            {/* 5. Pokédex Interativa */}
            <div className="group relative animate-on-scroll" style={{ animationDelay: '0.2s' }} onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
              <div className="absolute left-2 top-2 h-full w-full border border-white/10 transition-transform duration-500 group-hover:translate-x-1.5 group-hover:translate-y-1.5"></div>
              <div className="relative border border-white/10 bg-[#0a0a0a] p-5 sm:p-6 transition-transform duration-500 group-hover:-translate-x-1.5 group-hover:-translate-y-1.5 h-full flex flex-col hover:border-[#e9e778]/50">
                <div className="mb-4 inline-block self-start border border-[#e9e778] px-3 py-1 font-['JetBrains_Mono'] text-[9px] font-bold uppercase tracking-widest text-[#e9e778] bg-[#e9e778]/5">
                  JavaScript · CSS3
                </div>
                <div className="aspect-[16/10] mb-4 overflow-hidden border border-white/10 relative">
                  <div className="absolute inset-0 bg-[#e9e778]/15 mix-blend-overlay group-hover:opacity-0 transition-opacity duration-500 z-10"></div>
                  <img
                    src="https://images.unsplash.com/photo-1613771404784-3a5686aa2be3?q=80&w=1200&auto=format&fit=crop"
                    alt="Pokédex Interativa"
                    className="w-full h-full object-cover opacity-70 transition-transform duration-1000 group-hover:scale-110 group-hover:opacity-100"
                  />
                </div>
                <h4 className="mb-2 font-['Syne'] text-xl sm:text-2xl font-bold text-white leading-tight transition-colors group-hover:text-[#e9e778]">
                  POKÉDEX<br />INTERATIVA
                </h4>
                <p className="font-['DM_Sans'] text-xs sm:text-sm text-white/50 mb-5 flex-grow leading-relaxed group-hover:text-white/70 transition-colors">
                  Interface de catálogo com filtragem por tipos e busca dinâmica, implementando interações rápidas e estilização CSS moderna.
                </p>
                <div className="flex gap-3">
                  <a
                    href="https://github.com/jricardogoulart/pokedex"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="magnetic-button flex-1 bg-transparent border border-[#e9e778] text-center py-2.5 sm:py-3 text-white font-['Syne'] text-xs font-bold uppercase tracking-wider transition-all duration-300 hover:bg-[#e9e778] hover:text-black shadow-lg inline-flex items-center justify-center gap-2"
                    style={{ clipPath: 'polygon(0 0, 100% 0, 92% 100%, 0% 100%)' }}
                  >
                    <span>Repositório</span>
                    <FaGithub className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>

            {/* 6. Calculadora Vue */}
            <div className="group relative animate-on-scroll" style={{ animationDelay: '0.3s' }} onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
              <div className="absolute left-2 top-2 h-full w-full border border-white/10 transition-transform duration-500 group-hover:translate-x-1.5 group-hover:translate-y-1.5"></div>
              <div className="relative border border-white/10 bg-[#0a0a0a] p-5 sm:p-6 transition-transform duration-500 group-hover:-translate-x-1.5 group-hover:-translate-y-1.5 h-full flex flex-col hover:border-[#85a1c5]/50">
                <div className="mb-4 inline-block self-start border border-[#85a1c5] px-3 py-1 font-['JetBrains_Mono'] text-[9px] font-bold uppercase tracking-widest text-[#85a1c5] bg-[#85a1c5]/5">
                  Vue.js · Componentes
                </div>
                <div className="aspect-[16/10] mb-4 overflow-hidden border border-white/10 relative">
                  <div className="absolute inset-0 bg-[#85a1c5]/15 mix-blend-overlay group-hover:opacity-0 transition-opacity duration-500 z-10"></div>
                  <img
                    src="https://images.unsplash.com/photo-1587145820266-a5951ee6f620?q=80&w=1200&auto=format&fit=crop"
                    alt="Calculadora Vue"
                    className="w-full h-full object-cover opacity-70 transition-transform duration-1000 group-hover:scale-110 group-hover:opacity-100"
                  />
                </div>
                <h4 className="mb-2 font-['Syne'] text-xl sm:text-2xl font-bold text-white leading-tight transition-colors group-hover:text-[#85a1c5]">
                  CALCULADORA<br />VUE.JS
                </h4>
                <p className="font-['DM_Sans'] text-xs sm:text-sm text-white/50 mb-5 flex-grow leading-relaxed group-hover:text-white/70 transition-colors">
                  Aplicação de cálculo reativo com Vue.js, demonstrando manipulação granular de estados, arquitetura de componentes modulares e usabilidade.
                </p>
                <div className="flex gap-3">
                  <a
                    href="https://github.com/jricardogoulart/CalculadoraVue"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="magnetic-button flex-1 bg-transparent border border-[#85a1c5] text-center py-2.5 sm:py-3 text-white font-['Syne'] text-xs font-bold uppercase tracking-wider transition-all duration-300 hover:bg-[#85a1c5] hover:text-black shadow-lg inline-flex items-center justify-center gap-2"
                    style={{ clipPath: 'polygon(0 0, 100% 0, 92% 100%, 0% 100%)' }}
                  >
                    <span>Repositório</span>
                    <FaGithub className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTATO */}
      <section id="contato" className="relative z-10 py-12 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-16 border-t border-white/5 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8 md:mb-10 animate-on-scroll">
            <div className="mb-2 font-['JetBrains_Mono'] text-xs uppercase tracking-[0.3em] text-[#ff004d]">
              / 05 Connect
            </div>
            <h2 className="font-['Syne'] text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2 leading-none">Contato</h2>
          </div>

          <div className="grid lg:grid-cols-12 gap-10 lg:gap-14">
            <div className="lg:col-span-5 space-y-8 md:space-y-10 animate-on-scroll">
              <p className="font-['DM_Sans'] text-base sm:text-lg md:text-xl text-white/60 leading-relaxed font-light" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
                Construindo experiências digitais memoráveis. <br />
                <strong className="text-white font-medium">Vamos conversar?</strong>
              </p>

              <div className="space-y-5 sm:space-y-6">
                <div className="flex gap-4 items-center group cursor-default" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
                  <div className="w-11 h-11 border border-white/10 bg-transparent flex items-center justify-center shrink-0 text-white/50 transition-all duration-500 group-hover:border-[#ff004d] group-hover:text-[#ff004d] group-hover:bg-[#ff004d]/5" style={{ clipPath: 'polygon(15% 0, 100% 0, 85% 100%, 0 100%)' }}>
                    <MapPin className="w-5 h-5 transition-transform group-hover:scale-110" />
                  </div>
                  <div>
                    <h4 className="font-['JetBrains_Mono'] text-[9px] font-bold uppercase tracking-[0.2em] text-white/30 mb-1 transition-colors group-hover:text-[#ff004d]">Localização</h4>
                    <p className="font-['Syne'] text-base sm:text-lg font-medium text-white/90">Franca, SP - Brasil</p>
                  </div>
                </div>

                <div className="flex gap-4 items-center group cursor-default" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
                  <div className="w-11 h-11 border border-white/10 bg-transparent flex items-center justify-center shrink-0 text-white/50 transition-all duration-500 group-hover:border-[#ff004d] group-hover:text-[#ff004d] group-hover:bg-[#ff004d]/5" style={{ clipPath: 'polygon(15% 0, 100% 0, 85% 100%, 0 100%)' }}>
                    <Mail className="w-5 h-5 transition-transform group-hover:scale-110" />
                  </div>
                  <div>
                    <h4 className="font-['JetBrains_Mono'] text-[9px] font-bold uppercase tracking-[0.2em] text-white/30 mb-1 transition-colors group-hover:text-[#ff004d]">E-Mail</h4>
                    <a href="mailto:jricardogoulart@gmail.com" className="font-['Syne'] text-base sm:text-lg font-medium text-white/90 hover:text-[#ff004d] transition-colors break-all block">
                      jricardogoulart@gmail.com
                    </a>
                  </div>
                </div>
              </div>

              <div className="flex gap-3.5 pt-2">
                {[
                  { Icon: FaLinkedin, url: 'https://www.linkedin.com/in/jos%C3%A9-ricardo-goulart-silva-ab622a288/' },
                  { Icon: FaGithub, url: 'https://github.com/jricardogoulart' },
                  { Icon: FaInstagram, url: 'https://www.instagram.com/jricardogoulart/' },
                  { Icon: FaTwitter, url: 'https://twitter.com/jricardogoulart' }
                ].map((social, i) => {
                  const SocialIcon = social.Icon;
                  return (
                    <a key={i} href={social.url} target="_blank" rel="noreferrer"
                      className="magnetic-button w-10 sm:w-11 h-10 sm:h-11 border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white transition-all duration-300 relative overflow-hidden group"
                      onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}
                    >
                      <div className="absolute inset-0 -z-10 bg-white opacity-0 transition-opacity duration-300 group-hover:opacity-10"></div>
                      <SocialIcon className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" />
                    </a>
                  );
                })}
              </div>
            </div>

            <div className="lg:col-span-7 animate-on-scroll" style={{ animationDelay: '0.2s' }}>
              <form className="p-6 sm:p-8 lg:p-10 border border-white/10 bg-[#141414]/50 backdrop-blur-sm space-y-6 sm:space-y-8 relative overflow-hidden" onSubmit={(e) => e.preventDefault()}>
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#ff004d]/5 blur-[80px] pointer-events-none"></div>
                <h3 className="mb-6 font-['Syne'] text-xl sm:text-2xl font-bold text-white" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
                  Envie uma Mensagem
                </h3>

                <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
                  <div className="space-y-2.5">
                    <label className="font-['JetBrains_Mono'] text-[9px] font-bold uppercase tracking-[0.2em] text-white/40">
                      Seu Nome
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Como devemos lhe chamar?"
                        className="w-full border-b-[1px] border-white/20 bg-transparent pb-2.5 font-['DM_Sans'] text-sm sm:text-base text-white placeholder-white/20 transition-all duration-300 focus:border-[#ff004d] focus:outline-none focus:bg-white/[0.02] px-1"
                        onMouseEnter={() => setIsTyping(true)} onMouseLeave={() => setIsTyping(false)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2.5">
                    <label className="font-['JetBrains_Mono'] text-[9px] font-bold uppercase tracking-[0.2em] text-white/40">
                      Seu Email
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        placeholder="Para respondermos..."
                        className="w-full border-b-[1px] border-white/20 bg-transparent pb-2.5 font-['DM_Sans'] text-sm sm:text-base text-white placeholder-white/20 transition-all duration-300 focus:border-[#85a1c5] focus:outline-none focus:bg-white/[0.02] px-1"
                        onMouseEnter={() => setIsTyping(true)} onMouseLeave={() => setIsTyping(false)}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2.5">
                  <label className="font-['JetBrains_Mono'] text-[9px] font-bold uppercase tracking-[0.2em] text-white/40">
                    Sua Mensagem
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Conte sobre sua ideia ou projeto..."
                    className="w-full border-[1px] border-white/10 bg-white/[0.02] p-3.5 font-['DM_Sans'] text-sm sm:text-base text-white placeholder-white/20 transition-all duration-300 focus:border-[#ff004d] focus:bg-white/[0.05] focus:outline-none resize-none"
                    style={{ clipPath: 'polygon(0 0, 100% 0, 98% 100%, 0% 100%)' }}
                    onMouseEnter={() => setIsTyping(true)} onMouseLeave={() => setIsTyping(false)}
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="magnetic-button group relative overflow-hidden bg-[#ff004d] px-8 py-3.5 font-['Syne'] text-xs font-bold uppercase tracking-widest text-white transition-all hover:bg-white hover:text-black w-full md:w-auto mt-2 shadow-lg shadow-[#ff004d]/20"
                  style={{ clipPath: 'polygon(0 0, 100% 0, 95% 100%, 0% 100%)' }}
                  onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}
                >
                  <span className="relative z-10 flex items-center justify-center gap-3">
                    Enviar Mensagem <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-2" />
                  </span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative z-10 py-12 border-t border-white/10 text-center bg-[#0a0a0a]">
        <p className="font-['JetBrains_Mono'] text-xs text-white/40 mb-3" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
          &copy; {new Date().getFullYear()} <strong className="text-white/80 font-semibold">José R. Goulart</strong>.
        </p>
        <p className="font-['JetBrains_Mono'] text-[9px] font-bold text-white/20 uppercase tracking-[0.3em]">
          Powered by Archetype Design
        </p>
      </footer>
    </div>
  );
}
