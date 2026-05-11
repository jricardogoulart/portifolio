import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { GraduationCap, Briefcase, MapPin, Mail, ArrowRight, Plus } from 'lucide-react';
import { FaGithub, FaLinkedin, FaInstagram, FaTwitter } from 'react-icons/fa';

// ─── Lerp helper ─────────────────────────────────────────────────────────────
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

export default function About() {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const blobsRef = useRef<(HTMLDivElement | null)[]>([]);
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  // Tracked via ref so rAF loop doesn't need React state
  const mouse   = useRef({ x: 0, y: 0 });
  const cursor  = useRef({ x: 0, y: 0 });
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

  // Determine cursor styling based on state
  const cursorStyle = isTyping 
    ? 'w-1 h-8 rounded-sm bg-[#ff004d] border-none mix-blend-normal' 
    : isHovering 
      ? 'scale-[2.5] bg-[#ff004d]/10 border-[#ff004d]/50' 
      : '';

  return (
    <div ref={heroRef} className="bg-[#0a0a0a]">
      {/* Custom Cursor */}
      <div
        ref={cursorRef}
        className={`custom-cursor transition-all duration-300 ease-out ${cursorStyle}`}
        style={{
          width: isTyping ? '4px' : '20px',
          height: isTyping ? '32px' : '20px',
          borderRadius: isTyping ? '2px' : '50%'
        }}
      />
      <div 
        ref={cursorDotRef} 
        className={`custom-cursor-dot transition-opacity duration-200 ${isTyping ? 'opacity-0' : 'opacity-100'}`} 
      />

      {/* HERO SECTION */}
      <section
        ref={heroRef}
        id="hero"
        className="relative flex min-h-screen items-center overflow-hidden bg-[#0a0a0a] px-6 lg:px-12"
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

        <div className="relative z-10 grid w-full max-w-7xl grid-cols-1 gap-16 lg:grid-cols-2 lg:items-center mx-auto">
          {/* Left Column */}
          <div className="space-y-8 text-left">
            {/* Overline */}
            <div className="hero-subtitle inline-flex items-center gap-3 rounded-full border border-white/10 px-4 py-2 backdrop-blur-sm bg-white/[0.02]">
              <div className="h-2 w-2 animate-pulse rounded-full bg-[#ff004d]" />
              <span className="font-['IBM_Plex_Mono'] text-xs uppercase tracking-[0.3em] text-white/60">
                Desenvolvedor Full Stack
              </span>
            </div>

            {/* Heading */}
            <div
              ref={titleRef}
              className="space-y-2"
              style={{ willChange: 'transform' }}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
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
            <p className="hero-subtitle max-w-lg font-['DM_Sans'] text-lg leading-relaxed text-white/50">
              Unindo gestão administrativa e paixão pela tecnologia. Soluções inovadoras que equilibram funcionalidade impecável com <span className="text-white/70 italic">excelência visual</span>.
            </p>

            {/* Magnetic Buttons */}
            <div className="flex flex-wrap items-center gap-4">
              <a
                href="#portifolio"
                className="magnetic-button hero-button group relative overflow-hidden border-2 border-[#ff004d] bg-[#ff004d] px-8 py-4 font-['Syne'] text-sm font-semibold uppercase tracking-wider text-white transition-all hover:bg-[#ff004d]/90"
                style={{
                  willChange: 'transform',
                }}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                <span className="relative z-10">Explorar Portfólio</span>
              </a>

              <a
                href="#curriculo"
                className="magnetic-button hero-button group relative overflow-hidden border-2 border-white/20 bg-transparent px-8 py-4 font-['Syne'] text-sm font-semibold uppercase tracking-wider text-white"
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
                <span className="relative z-10">Ver Currículo</span>
              </a>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-8 border-l-2 border-[#ff004d] pl-6" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
              <div className="hero-stat group cursor-default">
                <div className="font-['Syne'] text-3xl font-bold text-white transition-colors group-hover:text-[#ff004d]">+2</div>
                <div className="font-['IBM_Plex_Mono'] text-[10px] font-medium uppercase tracking-[0.2em] text-white/40">
                  Anos Exp
                </div>
              </div>
              <div className="h-8 w-px bg-white/10" />
              <div className="hero-stat group cursor-default">
                <div className="font-['Syne'] text-3xl font-bold text-white transition-colors group-hover:text-[#85a1c5]">40</div>
                <div className="font-['IBM_Plex_Mono'] text-[10px] font-medium uppercase tracking-[0.2em] text-white/40">
                  Indústrias
                </div>
              </div>
              <div className="h-8 w-px bg-white/10" />
              <div className="hero-stat group cursor-default">
                <div className="font-['Syne'] text-3xl font-bold text-white transition-colors group-hover:text-[#bacfa3]">100%</div>
                <div className="font-['IBM_Plex_Mono'] text-[10px] font-medium uppercase tracking-[0.2em] text-white/40">
                  Paixão
                </div>
              </div>
            </div>
          </div>

          {/* Right Column — Cards */}
          <div ref={cardsRef} className="relative hidden h-[600px] lg:block">
            {/* Card 1 */}
            <div
              className="hero-card absolute left-0 top-0 h-72 w-80 border border-white/10 bg-gradient-to-br from-[#ff004d] to-[#cc003d] p-8 shadow-2xl transition-all"
              data-rotation="-6"
              style={{
                transform: 'rotate(-6deg)',
                transformOrigin: 'top left',
                willChange: 'transform',
              }}
              onMouseEnter={() => {}}
              onMouseLeave={() => {}}
            >
              <div className="h-full border-2 border-white/20 p-6 flex flex-col justify-between backdrop-blur-sm bg-white/[0.02]">
                <div className="font-['IBM_Plex_Mono'] text-[10px] font-bold uppercase tracking-widest text-white/60">
                  Node.js / ReactJS
                </div>
                <div>
                  <div className="mt-4 font-['Syne'] text-4xl font-bold text-white leading-[0.9]">
                    FULL<br/>STACK
                  </div>
                  <div className="mt-6 h-[2px] w-12 bg-white/40" />
                  <div className="mt-4 font-['DM_Sans'] text-xs font-medium text-white/80">
                    Arquitetura Web Completa
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
              onMouseEnter={() => {}}
              onMouseLeave={() => {}}
            >
              <div className="h-full border-2 border-white/20 p-6 flex flex-col justify-between backdrop-blur-sm bg-white/[0.02]">
                <div className="font-['IBM_Plex_Mono'] text-[10px] font-bold uppercase tracking-widest text-white/60">
                  Figma / Prototipagem
                </div>
                <div>
                  <div className="mt-4 font-['Syne'] text-4xl font-bold text-white leading-[0.9]">
                    UI/UX<br/>DESIGN
                  </div>
                  <div className="mt-6 h-[2px] w-12 bg-white/40" />
                  <div className="mt-4 font-['DM_Sans'] text-xs font-medium text-white/80">
                    Experiências de Alta Fidelidade
                  </div>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div
              className="hero-card absolute left-32 top-64 h-72 w-80 border border-white/10 bg-gradient-to-br from-[#bacfa3] to-[#8fa874] p-8 shadow-2xl transition-all"
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
                  Docker / Linux
                </div>
                <div>
                  <div className="mt-4 font-['Syne'] text-4xl font-bold text-white leading-[0.9]">
                    DEVOPS &<br/>SERVERS
                  </div>
                  <div className="mt-6 h-[2px] w-12 bg-white/40" />
                  <div className="mt-4 font-['DM_Sans'] text-xs font-medium text-white/80">
                    Infraestrutura Escalável
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
      <section id="sobre" className="relative z-10 py-32 px-6 lg:px-24 border-t border-white/5 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto">

          {/* Section header */}
          <div className="mb-20 animate-on-scroll">
            <div className="mb-6 font-['JetBrains_Mono'] text-xs uppercase tracking-[0.3em] text-[#ff004d]">
              / 01 Info
            </div>
            <h2 className="font-['Syne'] text-5xl md:text-7xl font-bold text-white leading-none">
              Sobre<br/><span className="text-[#85a1c5]">Mim</span>
            </h2>
          </div>

          {/* Content grid: profile card + bio */}
          <div className="flex flex-col lg:flex-row items-start gap-16 lg:gap-24">

            {/* ── GitHub Profile Card ── */}
            <div className="w-full lg:w-[320px] shrink-0 animate-on-scroll" style={{ animationDelay: '0.05s' }}>
              <div
                className="group relative border border-white/10 bg-[#0f0f0f] overflow-hidden transition-all duration-500 hover:border-[#ff004d]/30"
                style={{ clipPath: 'polygon(0 0, 100% 0, 100% 94%, 94% 100%, 0 100%)' }}
                onMouseEnter={() => {}}
                onMouseLeave={() => {}}
              >
                {/* Top accent bar */}
                <div className="h-[3px] w-full bg-gradient-to-r from-[#ff004d] via-[#f76c46] to-[#85a1c5]" />

                {/* Avatar */}
                <div className="relative px-8 pt-10 pb-6 flex flex-col items-center text-center">
                  {/* Glow ring behind avatar */}
                  <div className="relative mb-6">
                    <div className="absolute inset-0 rounded-none bg-gradient-to-br from-[#ff004d]/30 to-[#85a1c5]/20 blur-xl scale-125 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    {/* Outer decorative border — DS parallelogram shape */}
                    <div
                      className="relative p-[3px] bg-gradient-to-br from-[#ff004d] via-[#f76c46] to-[#85a1c5]"
                      style={{ clipPath: 'polygon(0 0, 100% 0, 100% 88%, 88% 100%, 0 100%)' }}
                    >
                      <div
                        className="bg-[#0a0a0a] p-[3px]"
                        style={{ clipPath: 'polygon(0 0, 100% 0, 100% 88%, 88% 100%, 0 100%)' }}
                      >
                        <img
                          src="https://avatars.githubusercontent.com/u/131194841?v=4"
                          alt="José Goulart — GitHub Avatar"
                          width={160}
                          height={160}
                          className="block w-40 h-40 object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                          style={{ clipPath: 'polygon(0 0, 100% 0, 100% 88%, 88% 100%, 0 100%)' }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Name + handle */}
                  <h3 className="font-['Syne'] text-2xl font-bold text-white mb-1 transition-colors group-hover:text-[#ff004d]">
                    José Goulart
                  </h3>
                  <div className="font-['IBM_Plex_Mono'] text-[11px] text-white/40 tracking-widest uppercase mb-4">
                    @jricardogoulart
                  </div>

                  {/* Bio chip */}
                  <p className="font-['DM_Sans'] text-sm text-white/50 leading-relaxed mb-6 max-w-[220px]">
                    Full Stack Dev · UI/UX · DevOps
                  </p>

                  {/* Divider */}
                  <div className="w-full h-px bg-white/10 mb-6" />

                  {/* Meta info rows */}
                  <div className="w-full space-y-3 text-left">
                    {([ 
                      { label: 'Localização', value: 'Franca, SP — Brasil', accent: false },
                      { label: 'Graduação',   value: 'ADS · FATEC Franca',  accent: false },
                      { label: 'Status',      value: 'Open to work',        accent: true  },
                    ] as { label: string; value: string; accent: boolean }[]).map((row) => (
                      <div key={row.label} className="flex items-baseline justify-between gap-2">
                        <span className="font-['IBM_Plex_Mono'] text-[9px] uppercase tracking-[0.2em] text-white/30 shrink-0">
                          {row.label}
                        </span>
                        <span className={`font-['Syne'] text-sm font-medium truncate ${row.accent ? 'text-[#ff004d]' : 'text-white/80'}`}>
                          {row.value}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Divider */}
                  <div className="w-full h-px bg-white/10 mt-6 mb-5" />

                  {/* GitHub stats row */}
                  <div className="w-full flex justify-between text-center">
                    {[
                      { count: '7', label: 'Repos' },
                      { count: '8', label: 'Seguidores' },
                      { count: '13', label: 'Seguindo' },
                    ].map((stat) => (
                      <div key={stat.label} className="group/stat flex flex-col gap-1">
                        <span className="font-['Syne'] text-xl font-bold text-white transition-colors group-hover/stat:text-[#ff004d]">
                          {stat.count}
                        </span>
                        <span className="font-['IBM_Plex_Mono'] text-[9px] uppercase tracking-widest text-white/30">
                          {stat.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom CTA */}
                <a
                  href="https://github.com/jricardogoulart"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between w-full px-8 py-4 bg-white/[0.03] border-t border-white/10 transition-all duration-300 hover:bg-[#ff004d]/10 hover:border-[#ff004d]/30 group/cta"
                >
                  <span className="font-['IBM_Plex_Mono'] text-[10px] uppercase tracking-[0.2em] text-white/40 transition-colors group-hover/cta:text-[#ff004d]">
                    Ver Perfil GitHub
                  </span>
                  <FaGithub className="w-4 h-4 text-white/30 transition-all duration-300 group-hover/cta:text-[#ff004d] group-hover/cta:translate-x-0.5" />
                </a>

                {/* Corner decoration */}
                <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-[#ff004d]/40" />
              </div>
            </div>

            {/* ── Bio content ── */}
            <div className="flex-1 space-y-8 animate-on-scroll" style={{ animationDelay: '0.15s' }}>
              <p className="font-['DM_Sans'] text-xl lg:text-2xl leading-relaxed text-white/70" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
                Me chamo <strong className="text-white font-medium">José Ricardo Goulart Silva</strong>, natural de Franca, São Paulo. Sou graduado em Análise e Desenvolvimento de Sistemas pela FATEC.
              </p>
              <p className="font-['DM_Sans'] text-lg lg:text-xl leading-loose text-white/50">
                Minha trajetória é marcada pela união entre a gestão administrativa e a paixão pela tecnologia e educação. Com experiência sólida em desenvolvimento Full Stack e infraestrutura de TI, busco constantemente soluções inovadoras que equilibram funcionalidade robosta com excelência estética.
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-12 pt-12 border-t border-white/10 mt-8 animate-on-scroll" style={{ animationDelay: '0.25s' }}>
                <div className="group" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
                  <h4 className="font-['JetBrains_Mono'] text-[10px] text-white/40 uppercase tracking-widest mb-3 transition-colors group-hover:text-[#ff004d]">Nascimento</h4>
                  <p className="font-['Syne'] text-lg font-medium text-white/90">26/05/2003</p>
                </div>
                <div className="group" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
                  <h4 className="font-['JetBrains_Mono'] text-[10px] text-white/40 uppercase tracking-widest mb-3 transition-colors group-hover:text-[#ff004d]">Localização</h4>
                  <p className="font-['Syne'] text-lg font-medium text-white/90">Franca - SP</p>
                </div>
                <div className="group" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
                  <h4 className="font-['JetBrains_Mono'] text-[10px] text-white/40 uppercase tracking-widest mb-3 transition-colors group-hover:text-[#ff004d]">Hobby</h4>
                  <p className="font-['Syne'] text-lg font-medium text-white/90">Tocar Violão</p>
                </div>
                <div className="group" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
                  <h4 className="font-['JetBrains_Mono'] text-[10px] text-white/40 uppercase tracking-widest mb-3 transition-colors group-hover:text-[#ff004d]">Status</h4>
                  <p className="font-['Syne'] text-lg font-bold text-[#ff004d]">Formado</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HABILIDADES */}
      <section id="habilidades" className="relative z-10 py-32 px-6 lg:px-24 border-t border-white/5 bg-gradient-to-b from-[#141414] to-[#0a0a0a]">
        <div className="max-w-7xl mx-auto">
          <div className="mb-24 animate-on-scroll">
            <div className="mb-6 font-['JetBrains_Mono'] text-xs uppercase tracking-[0.3em] text-[#ff004d]">
              / 02 Skills
            </div>
            <h2 className="font-['Syne'] text-5xl md:text-7xl font-bold text-white mb-6 leading-none">
              Habili<br className="block md:hidden"/>
              <span style={{ background: 'linear-gradient(135deg, #85a1c5 0%, #ff004d 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                dades
              </span>
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-20 lg:gap-32">
            <div className="space-y-12 animate-on-scroll">
              <h3 className="font-['Syne'] text-3xl font-bold text-white mb-10 pb-4 border-b border-white/10" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>Hard Skills</h3>
              {[
                { name: 'Node.js / ReactJS', level: 80 },
                { name: 'Python / Flask', level: 70 },
                { name: 'Docker & Infraestrutura', level: 75 },
                { name: 'UI/UX (Figma)', level: 85 }
              ].map((skill, idx) => (
                <div key={skill.name} className="group space-y-4" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
                  <div className="flex items-center justify-between">
                    <label className="font-['JetBrains_Mono'] text-xs uppercase tracking-wider text-white/60 transition-colors group-hover:text-white">
                      {skill.name}
                    </label>
                    <span className="font-['Syne'] text-sm font-bold text-white/80 transition-colors group-hover:text-[#ff004d]">
                      {skill.level}%
                    </span>
                  </div>
                  {/* Archetype Progress Bar Component */}
                  <div className="relative h-2 overflow-hidden border border-white/10 bg-black/50">
                    <div
                      className="h-full bg-gradient-to-r from-[#ff004d] to-[#f76c46] transition-all duration-1000 ease-out"
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

            <div className="space-y-12 animate-on-scroll" style={{ animationDelay: '0.2s' }}>
              <h3 className="font-['Syne'] text-3xl font-bold text-white mb-10 pb-4 border-b border-white/10" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>Soft Skills</h3>
              {[
                { name: 'Docência e Comunicação', level: 100 },
                { name: 'Gestão Administrativa', level: 85 },
                { name: 'Trabalho em Equipe', level: 90 },
                { name: 'Resolução de Problemas', level: 95 }
              ].map((skill, idx) => (
                <div key={skill.name} className="group space-y-4" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
                  <div className="flex items-center justify-between">
                    <label className="font-['JetBrains_Mono'] text-xs uppercase tracking-wider text-white/60 transition-colors group-hover:text-white">
                      {skill.name}
                    </label>
                    <span className="font-['Syne'] text-sm font-bold text-white/80 transition-colors group-hover:text-[#85a1c5]">
                      {skill.level}%
                    </span>
                  </div>
                  {/* Archetype Progress Bar Component (Blue Var) */}
                  <div className="relative h-2 overflow-hidden border border-white/10 bg-black/50">
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

      {/* CURRICULO */}
      <section id="curriculo" className="relative z-10 py-32 px-6 lg:px-24 border-t border-white/5 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto">
          <div className="mb-24 animate-on-scroll">
            <div className="mb-6 font-['JetBrains_Mono'] text-xs uppercase tracking-[0.3em] text-[#ff004d]">
              / 03 Timeline
            </div>
            <h2 className="font-['Syne'] text-5xl md:text-7xl font-bold text-white mb-6 leading-none">Currículo</h2>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-24">
            {/* Formação */}
            <div className="animate-on-scroll">
              <div className="flex items-center gap-6 mb-16 border-b border-white/10 pb-8" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
                <div className="w-14 h-14 border-2 border-[#ff004d] bg-transparent flex items-center justify-center transition-transform hover:rotate-12">
                  <GraduationCap className="text-[#ff004d] w-7 h-7" />
                </div>
                <h3 className="font-['Syne'] text-3xl font-bold text-white">Formação</h3>
              </div>
              
              <div className="space-y-20 pl-8 border-l-[1px] border-white/20">
                {[
                  {
                    title: 'Análise e Desenvolvimento de Sistemas',
                    date: '02/2022 - 12/2024',
                    inst: 'FATEC - Faculdade de Tecnologia de Franca',
                    status: 'Completo'
                  },
                  {
                    title: 'Ensino Médio',
                    date: '2018 - 2020',
                    inst: 'Escola Estadual Evaristo Fabricio',
                    status: 'Completo'
                  }
                ].map((item, i) => (
                  <div key={i} className="relative group cursor-default">
                    <div className="absolute -left-[41px] top-0 w-4 h-4 bg-[#0a0a0a] border-[1px] border-[#85a1c5] group-hover:bg-[#85a1c5] group-hover:scale-125 transition-all duration-300" style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }}></div>
                    <span className="font-['JetBrains_Mono'] text-[10px] text-[#ff004d] font-bold uppercase tracking-[0.2em] mb-4 block transition-colors group-hover:text-white">{item.date}</span>
                    <h4 className="font-['Syne'] text-2xl font-bold text-white/90 mb-4 transition-colors group-hover:text-white">{item.title}</h4>
                    <p className="font-['DM_Sans'] text-white/50 text-base mb-6 leading-relaxed">{item.inst}</p>
                    <span className="inline-block border border-white/10 bg-white/5 px-4 py-2 text-[10px] text-white/70 font-['JetBrains_Mono'] font-medium uppercase tracking-wider transition-colors group-hover:border-[#85a1c5] group-hover:text-[#85a1c5]">{item.status}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Profissional */}
            <div className="animate-on-scroll" style={{ animationDelay: '0.2s' }}>
              <div className="flex items-center gap-6 mb-16 border-b border-white/10 pb-8" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
                <div className="w-14 h-14 border-2 border-[#85a1c5] bg-transparent flex items-center justify-center transition-transform hover:rotate-12">
                  <Briefcase className="text-[#85a1c5] w-7 h-7" />
                </div>
                <h3 className="font-['Syne'] text-3xl font-bold text-white">Experiência</h3>
              </div>
              
              <div className="space-y-20 pl-8 border-l-[1px] border-white/20">
                {[
                  {
                    title: 'Analista de TI & Full Stack Dev',
                    date: '01/2022 - Atual',
                    inst: 'R. Raimundo Da Silva Franca',
                    desc: ['Desenvolvimento Full Stack (Node.js, React, Docker).', 'Manutenção de infraestrutura Windows e Linux.', 'Capacitação técnica de usuários e metodologias.']
                  },
                  {
                    title: 'UI Designer (Estágio)',
                    date: '03/2024 - 06/2024',
                    inst: 'Gestor Inovação (Remoto)',
                    desc: ['Prototipagem de alta fidelidade no Figma.', 'Estruturação avançada de fluxos de usabilidade.']
                  }
                ].map((item, i) => (
                  <div key={i} className="relative group cursor-default">
                    <div className="absolute -left-[41px] top-0 w-4 h-4 bg-[#0a0a0a] border-[1px] border-[#ff004d] group-hover:bg-[#ff004d] group-hover:scale-125 transition-all duration-300" style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }}></div>
                    <span className="font-['JetBrains_Mono'] text-[10px] text-[#85a1c5] font-bold uppercase tracking-[0.2em] mb-4 block transition-colors group-hover:text-white">{item.date}</span>
                    <h4 className="font-['Syne'] text-2xl font-bold text-white/90 mb-4 transition-colors group-hover:text-white">{item.title}</h4>
                    <p className="font-['DM_Sans'] text-white/50 text-base mb-6 leading-relaxed font-medium">{item.inst}</p>
                    <ul className="space-y-4">
                      {item.desc.map((d, idx) => (
                        <li key={idx} className="font-['DM_Sans'] text-white/60 text-sm flex items-start gap-4 transition-colors group-hover:text-white/80">
                          <span className="text-[#ff004d] font-bold mt-[2px] text-[10px]">/</span> <span className="leading-relaxed">{d}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PORTFOLIO */}
      <section id="portifolio" className="relative z-10 py-32 px-6 lg:px-24 border-t border-white/5 bg-gradient-to-bl from-[#141414] to-[#0a0a0a]">
        <div className="max-w-7xl mx-auto">
          <div className="mb-24 animate-on-scroll">
            <div className="mb-6 font-['JetBrains_Mono'] text-xs uppercase tracking-[0.3em] text-[#ff004d]">
              / 04 Work
            </div>
            <h2 className="font-['Syne'] text-5xl md:text-7xl font-bold text-white mb-6 leading-none">Portfólio</h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {/* Layered Card - UI Abstracted from Components.tsx */}
            <div className="group relative animate-on-scroll" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
              <div className="absolute left-3 top-3 h-full w-full border border-white/10 transition-transform duration-500 group-hover:translate-x-2 group-hover:translate-y-2"></div>
              <div className="relative border border-white/10 bg-[#0a0a0a] p-8 transition-transform duration-500 group-hover:-translate-x-2 group-hover:-translate-y-2 h-full flex flex-col hover:border-[#ff004d]/50">
                <div className="mb-8 inline-block border border-[#ff004d] px-4 py-1.5 font-['JetBrains_Mono'] text-[10px] font-bold uppercase tracking-widest text-[#ff004d] bg-[#ff004d]/5">
                  HTML5 & CSS3
                </div>
                <div className="aspect-[4/3] mb-8 overflow-hidden border border-white/10 relative">
                  <div className="absolute inset-0 bg-[#ff004d]/20 mix-blend-overlay group-hover:opacity-0 transition-opacity duration-500 z-10"></div>
                  <img 
                    src="https://images.unsplash.com/photo-1607252650355-f7fd0460ccdb?q=80&w=2070&auto=format&fit=crop" 
                    alt="Página Android" 
                    className="w-full h-full object-cover opacity-70 transition-transform duration-1000 group-hover:scale-110 group-hover:opacity-100"
                  />
                </div>
                <h4 className="mb-4 font-['Syne'] text-3xl font-bold text-white transition-colors group-hover:text-[#ff004d]">
                  PÁGINA<br/>ANDROID
                </h4>
                <p className="font-['DM_Sans'] text-sm text-white/50 mb-10 flex-grow leading-relaxed group-hover:text-white/70 transition-colors">
                  Design responsivo com uso avançado de propriedades CSS modernas e foco absoluto em usabilidade mobile.
                </p>
                <div className="flex gap-4">
                  <a href="#" className="magnetic-button flex-1 bg-[#ff004d] text-center py-4 text-white font-['Syne'] text-sm font-bold uppercase tracking-wider transition-all duration-300 hover:bg-white hover:text-black shadow-lg" style={{ clipPath: 'polygon(0 0, 100% 0, 92% 100%, 0% 100%)' }}>
                    Preview
                  </a>
                  <a href="#" className="magnetic-button w-14 flex items-center justify-center border border-white/20 text-white/50 hover:bg-white hover:text-black hover:border-white transition-all duration-300">
                    <FaGithub className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
            
            {/* Angular Card - Abstracted from Components.tsx */}
            <div className="group relative overflow-hidden bg-gradient-to-br from-[#1a2332] to-[#0a0f18] border border-white/5 p-8 animate-on-scroll hover:border-[#85a1c5]/30 transition-colors duration-500" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 92%, 0 100%)', animationDelay: '0.2s' }} onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
              <div className="mb-8 inline-block bg-white/10 px-4 py-1.5 font-['JetBrains_Mono'] text-[10px] font-bold uppercase tracking-widest text-white/80">
                Em Breve
              </div>
              <div className="aspect-[4/3] mb-8 flex items-center justify-center bg-black/40 border border-white/5 transition-all duration-700 group-hover:bg-black/60 group-hover:border-[#85a1c5]/20">
                <div className="relative w-16 h-16 flex items-center justify-center rounded-full border border-white/10 group-hover:border-[#85a1c5]/50 transition-colors duration-500">
                  <Plus className="w-6 h-6 text-white/30 transition-all duration-700 group-hover:scale-150 group-hover:rotate-180 group-hover:text-[#85a1c5]" />
                </div>
              </div>
              <h4 className="mb-4 font-['Syne'] text-3xl font-bold text-white/50 transition-colors group-hover:text-white">
                MAIS<br/>PROJETOS
              </h4>
              <p className="font-['DM_Sans'] text-sm text-white/40 leading-relaxed group-hover:text-white/60 transition-colors">
                Novos estudos de caso focados em UI/UX e arquitetura full stack estão sendo polidos.
              </p>
              <div className="mt-10 flex items-center justify-between border-t border-white/10 pt-6">
                <span className="font-['JetBrains_Mono'] text-[10px] font-bold uppercase tracking-widest text-white/30 group-hover:text-[#85a1c5] transition-colors">
                  Stay Tuned
                </span>
                <svg className="h-5 w-5 text-white/30 transition-all duration-300 group-hover:translate-x-2 group-hover:text-[#85a1c5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTATO */}
      <section id="contato" className="relative z-10 py-32 px-6 lg:px-24 border-t border-white/5 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto">
          <div className="mb-24 animate-on-scroll">
            <div className="mb-6 font-['JetBrains_Mono'] text-xs uppercase tracking-[0.3em] text-[#ff004d]">
              / 05 Connect
            </div>
            <h2 className="font-['Syne'] text-5xl md:text-7xl font-bold text-white mb-6 leading-none">Contato</h2>
          </div>
          
          <div className="grid lg:grid-cols-12 gap-20">
            <div className="lg:col-span-5 space-y-16 animate-on-scroll">
              <p className="font-['DM_Sans'] text-xl lg:text-2xl text-white/50 leading-relaxed font-light" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
                Construindo experiências digitais memoráveis. <br/>
                <strong className="text-white font-medium">Vamos conversar?</strong>
              </p>

              <div className="space-y-10">
                <div className="flex gap-6 items-center group cursor-default" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
                  <div className="w-16 h-16 border border-white/10 bg-transparent flex items-center justify-center shrink-0 text-white/50 transition-all duration-500 group-hover:border-[#ff004d] group-hover:text-[#ff004d] group-hover:bg-[#ff004d]/5" style={{ clipPath: 'polygon(15% 0, 100% 0, 85% 100%, 0 100%)' }}>
                    <MapPin className="w-7 h-7 transition-transform group-hover:scale-110" />
                  </div>
                  <div>
                    <h4 className="font-['JetBrains_Mono'] text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 mb-2 transition-colors group-hover:text-[#ff004d]">Localização</h4>
                    <p className="font-['Syne'] text-xl font-medium text-white/90">Franca, SP - Brasil</p>
                  </div>
                </div>
                
                <div className="flex gap-6 items-center group cursor-default" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
                  <div className="w-16 h-16 border border-white/10 bg-transparent flex items-center justify-center shrink-0 text-white/50 transition-all duration-500 group-hover:border-[#ff004d] group-hover:text-[#ff004d] group-hover:bg-[#ff004d]/5" style={{ clipPath: 'polygon(15% 0, 100% 0, 85% 100%, 0 100%)' }}>
                    <Mail className="w-7 h-7 transition-transform group-hover:scale-110" />
                  </div>
                  <div>
                    <h4 className="font-['JetBrains_Mono'] text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 mb-2 transition-colors group-hover:text-[#ff004d]">E-Mail</h4>
                    <p className="font-['Syne'] text-xl font-medium text-white/90 break-all">jricardogoulartsilva@gmail.com</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-5 pt-4">
                {[
                  { Icon: FaLinkedin, url: 'https://www.linkedin.com/in/jos%C3%A9-ricardo-goulart-silva-ab622a288/' },
                  { Icon: FaGithub, url: 'https://github.com/jricardogoulart' },
                  { Icon: FaInstagram, url: 'https://www.instagram.com/jricardogoulart/' },
                  { Icon: FaTwitter, url: 'https://twitter.com/jricardogoulart' }
                ].map((social, i) => {
                  const SocialIcon = social.Icon;
                  return (
                    <a key={i} href={social.url} target="_blank" rel="noreferrer" 
                       className="magnetic-button w-14 h-14 border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white transition-all duration-300 relative overflow-hidden group"
                       onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}
                    >
                      <div className="absolute inset-0 -z-10 bg-white opacity-0 transition-opacity duration-300 group-hover:opacity-10"></div>
                      <SocialIcon className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
                    </a>
                  );
                })}
              </div>
            </div>

            <div className="lg:col-span-7 animate-on-scroll" style={{ animationDelay: '0.2s' }}>
              <form className="p-10 lg:p-14 border border-white/10 bg-[#141414]/50 backdrop-blur-sm space-y-12 relative overflow-hidden" onSubmit={(e) => e.preventDefault()}>
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#ff004d]/5 blur-[80px] pointer-events-none"></div>
                <h3 className="mb-10 font-['Syne'] text-3xl font-bold text-white" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
                  Envie uma Mensagem
                </h3>
                
                <div className="grid md:grid-cols-2 gap-12">
                  <div className="space-y-4">
                    <label className="font-['JetBrains_Mono'] text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">
                      Seu Nome
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Como devemos lhe chamar?"
                        className="w-full border-b-[1px] border-white/20 bg-transparent pb-4 font-['DM_Sans'] text-lg text-white placeholder-white/20 transition-all duration-300 focus:border-[#ff004d] focus:outline-none focus:bg-white/[0.02] px-2"
                        onMouseEnter={() => setIsTyping(true)} onMouseLeave={() => setIsTyping(false)}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <label className="font-['JetBrains_Mono'] text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">
                      Seu Email
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        placeholder="Para respondermos..."
                        className="w-full border-b-[1px] border-white/20 bg-transparent pb-4 font-['DM_Sans'] text-lg text-white placeholder-white/20 transition-all duration-300 focus:border-[#85a1c5] focus:outline-none focus:bg-white/[0.02] px-2"
                        onMouseEnter={() => setIsTyping(true)} onMouseLeave={() => setIsTyping(false)}
                      />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <label className="font-['JetBrains_Mono'] text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">
                    Sua Mensagem
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Conte sobre sua ideia ou projeto..."
                    className="w-full border-[1px] border-white/10 bg-white/[0.02] p-5 font-['DM_Sans'] text-lg text-white placeholder-white/20 transition-all duration-300 focus:border-[#ff004d] focus:bg-white/[0.05] focus:outline-none resize-none"
                    style={{ clipPath: 'polygon(0 0, 100% 0, 98% 100%, 0% 100%)' }}
                    onMouseEnter={() => setIsTyping(true)} onMouseLeave={() => setIsTyping(false)}
                  ></textarea>
                </div>
                
                <button 
                  type="submit" 
                  className="magnetic-button group relative overflow-hidden bg-[#ff004d] px-10 py-5 font-['Syne'] text-sm font-bold uppercase tracking-widest text-white transition-all hover:bg-white hover:text-black w-full md:w-auto mt-4 shadow-lg shadow-[#ff004d]/20" 
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
