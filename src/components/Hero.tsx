import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const blobsRef = useRef<(HTMLDivElement | null)[]>([]);
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial fade in animation
      gsap.from('.hero-title-line', {
        y: 100,
        opacity: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: 'power4.out',
        delay: 0.3,
      });

      gsap.from('.hero-subtitle', {
        y: 30,
        opacity: 0,
        duration: 1,
        delay: 1,
        ease: 'power3.out',
      });

      gsap.from('.hero-button', {
        y: 20,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        delay: 1.3,
        ease: 'power3.out',
      });

      gsap.from('.hero-stat', {
        scale: 0,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        delay: 1.5,
        ease: 'back.out(1.7)',
      });

      // Floating animation for cards
      gsap.to('.hero-card', {
        y: -20,
        duration: 2,
        stagger: 0.3,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
      });

      // Rotate cards on hover
      const cards = document.querySelectorAll('.hero-card');
      cards.forEach((card) => {
        card.addEventListener('mouseenter', () => {
          gsap.to(card, {
            scale: 1.1,
            rotation: 0,
            duration: 0.4,
            ease: 'power2.out',
          });
        });
        card.addEventListener('mouseleave', () => {
          gsap.to(card, {
            scale: 1,
            rotation: card.getAttribute('data-rotation') || 0,
            duration: 0.4,
            ease: 'power2.out',
          });
        });
      });

      // Blob morphing animation
      blobsRef.current.forEach((blob, index) => {
        if (blob) {
          gsap.to(blob, {
            x: gsap.utils.random(-50, 50),
            y: gsap.utils.random(-50, 50),
            scale: gsap.utils.random(0.8, 1.2),
            duration: gsap.utils.random(4, 6),
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: index * 0.5,
          });
        }
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  // Mouse parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });

      // Update custom cursor
      if (cursorRef.current && cursorDotRef.current) {
        gsap.to(cursorRef.current, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.3,
          ease: 'power2.out',
        });
        gsap.to(cursorDotRef.current, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.1,
        });
      }

      // Parallax for title
      if (titleRef.current) {
        const rect = titleRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const deltaX = (e.clientX - centerX) / 50;
        const deltaY = (e.clientY - centerY) / 50;

        gsap.to(titleRef.current, {
          x: deltaX,
          y: deltaY,
          duration: 0.5,
          ease: 'power2.out',
        });
      }

      // Parallax for cards
      if (cardsRef.current) {
        const cards = cardsRef.current.querySelectorAll('.hero-card');
        cards.forEach((card, index) => {
          const rect = card.getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;
          const deltaX = (e.clientX - centerX) / (30 + index * 10);
          const deltaY = (e.clientY - centerY) / (30 + index * 10);

          gsap.to(card, {
            x: deltaX,
            y: deltaY,
            duration: 0.5,
            ease: 'power2.out',
          });
        });
      }

      // Magnetic effect for buttons
      const buttons = document.querySelectorAll('.magnetic-button');
      buttons.forEach((button) => {
        const rect = button.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const distance = Math.sqrt(
          Math.pow(e.clientX - centerX, 2) + Math.pow(e.clientY - centerY, 2)
        );

        if (distance < 100) {
          const deltaX = (e.clientX - centerX) / 3;
          const deltaY = (e.clientY - centerY) / 3;
          gsap.to(button, {
            x: deltaX,
            y: deltaY,
            duration: 0.3,
            ease: 'power2.out',
          });
        } else {
          gsap.to(button, {
            x: 0,
            y: 0,
            duration: 0.3,
            ease: 'power2.out',
          });
        }
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Interactive blob followers
  useEffect(() => {
    const handleMouseMoveBlobs = () => {
      blobsRef.current.forEach((blob, index) => {
        if (blob) {
          const speed = 0.05 + index * 0.02;
          const currentX = parseFloat(blob.style.left || '0');
          const currentY = parseFloat(blob.style.top || '0');
          const targetX = mousePos.x * speed;
          const targetY = mousePos.y * speed;

          gsap.to(blob, {
            x: targetX - currentX,
            y: targetY - currentY,
            duration: 2,
            ease: 'power1.out',
          });
        }
      });
    };

    handleMouseMoveBlobs();
  }, [mousePos]);

  return (
    <>
      {/* Custom Cursor */}
      <div
        ref={cursorRef}
        className={`custom-cursor ${isHovering ? 'cursor-hover' : ''}`}
      />
      <div ref={cursorDotRef} className="custom-cursor-dot" />

      <section
        ref={heroRef}
        id="hero"
        className="relative flex min-h-screen items-center overflow-hidden bg-[#0a0a0a] px-6"
        onMouseEnter={() => setIsHovering(false)}
      >
        {/* Interactive Morphing Blobs */}
        <div
          ref={(el) => { blobsRef.current[0] = el; }}
          className="morphing-blob pointer-events-none absolute left-[10%] top-[20%] h-[500px] w-[500px] bg-gradient-to-br from-[#ff004d]/20 to-[#f76c46]/10 blur-[100px]"
          style={{ mixBlendMode: 'screen' }}
        />
        <div
          ref={(el) => { blobsRef.current[1] = el; }}
          className="morphing-blob pointer-events-none absolute right-[15%] bottom-[25%] h-[600px] w-[600px] bg-gradient-to-tl from-[#85a1c5]/20 to-[#4a90e2]/10 blur-[120px]"
          style={{ mixBlendMode: 'screen' }}
        />
        <div
          ref={(el) => { blobsRef.current[2] = el; }}
          className="morphing-blob pointer-events-none absolute left-[40%] bottom-[10%] h-[400px] w-[400px] bg-gradient-to-tr from-[#bacfa3]/15 to-[#2d4a3e]/10 blur-[90px]"
          style={{ mixBlendMode: 'screen' }}
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
          {/* Left Column - Text Content */}
          <div className="space-y-8 text-left">
            {/* Overline */}
            <div className="hero-subtitle inline-flex items-center gap-3 rounded-full border border-white/10 px-4 py-2 backdrop-blur-sm">
              <div className="h-2 w-2 animate-pulse rounded-full bg-[#ff004d]" />
              <span className="font-['IBM_Plex_Mono'] text-xs uppercase tracking-[0.3em] text-white/60">
                Design Tokens v2.0
              </span>
            </div>

            {/* Main Heading - Interactive */}
            <div ref={titleRef} className="space-y-2">
              <div className="overflow-hidden">
                <h1 className="hero-title-line font-['Syne'] text-[clamp(3rem,8vw,7rem)] font-bold leading-[0.9] tracking-tight text-white">
                  DESIGN
                </h1>
              </div>
              <div className="overflow-hidden">
                <h1
                  className="hero-title-line font-['Syne'] text-[clamp(3rem,8vw,7rem)] font-bold leading-[0.9] tracking-tight"
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
                className="magnetic-button hero-button group relative overflow-hidden border-2 border-[#ff004d] bg-[#ff004d] px-8 py-4 font-['Syne'] text-sm font-semibold uppercase tracking-wider text-white transition-all hover:bg-transparent"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                <span className="relative z-10">Explorar Sistema</span>
              </button>

              <button
                className="magnetic-button hero-button group relative overflow-hidden border-2 border-white/20 bg-transparent px-8 py-4 font-['Syne'] text-sm font-semibold uppercase tracking-wider text-white transition-all hover:border-white/40"
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

            {/* Stats - Animated */}
            <div className="flex items-center gap-8 border-l-2 border-[#ff004d] pl-6">
              <div className="hero-stat">
                <div className="font-['Syne'] text-3xl font-bold text-white">24</div>
                <div className="font-['IBM_Plex_Mono'] text-xs uppercase tracking-wider text-white/40">
                  Colors
                </div>
              </div>
              <div className="h-8 w-px bg-white/10" />
              <div className="hero-stat">
                <div className="font-['Syne'] text-3xl font-bold text-white">3</div>
                <div className="font-['IBM_Plex_Mono'] text-xs uppercase tracking-wider text-white/40">
                  Typefaces
                </div>
              </div>
              <div className="h-8 w-px bg-white/10" />
              <div className="hero-stat">
                <div className="font-['Syne'] text-3xl font-bold text-white">∞</div>
                <div className="font-['IBM_Plex_Mono'] text-xs uppercase tracking-wider text-white/40">
                  Interactive
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Interactive 3D Cards */}
          <div ref={cardsRef} className="relative hidden h-[600px] lg:block">
            {/* Card 1 - Tilted & Interactive */}
            <div
              className="hero-card absolute left-0 top-0 h-72 w-80 border border-white/10 bg-gradient-to-br from-[#ff004d] to-[#f76c46] p-8 shadow-2xl transition-all"
              data-rotation="-6"
              style={{ transform: 'rotate(-6deg)', transformOrigin: 'top left' }}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              <div className="h-full border-2 border-white/20 p-6">
                <div className="font-['IBM_Plex_Mono'] text-xs uppercase tracking-widest text-white/60">
                  #ff004d
                </div>
                <div className="mt-4 font-['Syne'] text-4xl font-bold text-white">
                  PASSION
                  <br />
                  RED
                </div>
                <div className="mt-6 h-px bg-white/20" />
                <div className="mt-4 font-['IBM_Plex_Mono'] text-xs text-white/60">
                  RGB 255, 0, 77
                </div>
              </div>
            </div>

            {/* Card 2 - Center & Interactive */}
            <div
              className="hero-card absolute left-16 top-32 h-72 w-80 border border-white/10 bg-gradient-to-br from-[#85a1c5] to-[#4a90e2] p-8 shadow-2xl transition-all hover:z-10"
              data-rotation="3"
              style={{ transform: 'rotate(3deg)' }}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              <div className="h-full border-2 border-white/20 p-6">
                <div className="font-['IBM_Plex_Mono'] text-xs uppercase tracking-widest text-white/60">
                  #85a1c5
                </div>
                <div className="mt-4 font-['Syne'] text-4xl font-bold text-white">
                  VISTA
                  <br />
                  BLUE
                </div>
                <div className="mt-6 h-px bg-white/20" />
                <div className="mt-4 font-['IBM_Plex_Mono'] text-xs text-white/60">
                  RGB 133, 161, 197
                </div>
              </div>
            </div>

            {/* Card 3 - Bottom & Interactive */}
            <div
              className="hero-card absolute left-32 top-64 h-72 w-80 border border-white/10 bg-gradient-to-br from-[#bacfa3] to-[#2d4a3e] p-8 shadow-2xl transition-all hover:z-20"
              data-rotation="-3"
              style={{ transform: 'rotate(-3deg)' }}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              <div className="h-full border-2 border-white/20 p-6">
                <div className="font-['IBM_Plex_Mono'] text-xs uppercase tracking-widest text-white/60">
                  #bacfa3
                </div>
                <div className="mt-4 font-['Syne'] text-4xl font-bold text-white">
                  GOLF
                  <br />
                  CELADON
                </div>
                <div className="mt-6 h-px bg-white/20" />
                <div className="mt-4 font-['IBM_Plex_Mono'] text-xs text-white/60">
                  RGB 186, 207, 163
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator - Animated */}
        <div className="hero-subtitle pointer-events-none absolute bottom-12 left-1/2 -translate-x-1/2">
          <div className="flex flex-col items-center gap-2">
            <div className="font-['IBM_Plex_Mono'] text-[10px] uppercase tracking-[0.3em] text-white/30">
              Scroll
            </div>
            <div className="h-12 w-px animate-pulse bg-gradient-to-b from-white/40 to-transparent" />
          </div>
        </div>
      </section>
    </>
  );
}
