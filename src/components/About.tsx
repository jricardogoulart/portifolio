import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

export default function About() {
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
      // Initial fade in animation for hero
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

      // SCROLL ANIMATIONS FOR SECTIONS
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            gsap.to(entry.target, {
              y: 0,
              opacity: 1,
              duration: 1.2,
              ease: 'power3.out',
              stagger: 0.2
            });
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1 });

      document.querySelectorAll('.animate-on-scroll').forEach((el) => {
        gsap.set(el, { y: 60, opacity: 0 });
        observer.observe(el);
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
    <div ref={heroRef} className="bg-[#0a0a0a]">
      {/* Custom Cursor */}
      <div
        ref={cursorRef}
        className={`custom-cursor ${isHovering ? 'cursor-hover' : ''}`}
      />
      <div ref={cursorDotRef} className="custom-cursor-dot" />

      {/* HERO SECTION */}
      <section
        id="hero"
        className="relative flex min-h-screen items-center overflow-hidden px-6"
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

        <div className="relative z-10 grid w-full max-w-7xl grid-cols-1 gap-16 lg:grid-cols-2 lg:items-center mx-auto">
          {/* Left Column - Text Content */}
          <div className="space-y-8 text-left">
            {/* Overline */}
            <div className="hero-subtitle inline-flex items-center gap-3 rounded-full border border-white/10 px-4 py-2 backdrop-blur-sm">
              <div className="h-2 w-2 animate-pulse rounded-full bg-[#ff004d]" />
              <span className="font-['IBM_Plex_Mono'] text-xs uppercase tracking-[0.3em] text-white/60">
                Desenvolvedor Full Stack
              </span>
            </div>

            {/* Main Heading - Interactive */}
            <div ref={titleRef} className="space-y-2">
              <div className="overflow-hidden">
                <h1 className="hero-title-line font-['Syne'] text-[clamp(3rem,8vw,7rem)] font-bold leading-[0.9] tracking-tight text-white">
                  JOSÉ
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
                  GOULART
                </h1>
              </div>
            </div>

            {/* Subtitle */}
            <p className="hero-subtitle max-w-lg font-['DM_Sans'] text-lg leading-relaxed text-white/50">
              Unindo gestão administrativa e paixão pela tecnologia. Soluções inovadoras que equilibram funcionalidade com excelência em design.
              <span className="italic text-white/70"> Código. Design. Infraestrutura.</span>
            </p>

            {/* Magnetic Buttons */}
            <div className="flex flex-wrap items-center gap-4">
              <a href="#portifolio"
                className="magnetic-button hero-button inline-block group relative overflow-hidden bg-[#ff004d] px-8 py-4 font-['Syne'] text-sm font-bold uppercase tracking-wider text-white transition-all hover:bg-[#ff004d]/90"
                style={{ clipPath: 'polygon(0 0, 100% 0, 95% 100%, 0% 100%)' }}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                Explorar Portfólio
              </a>

              <a href="#curriculo"
                className="magnetic-button hero-button inline-block group relative overflow-hidden border-2 border-[#85a1c5] bg-transparent px-8 py-4 font-['Syne'] text-sm font-bold uppercase tracking-wider text-white transition-all hover:bg-[#85a1c5]/10"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                <div className="absolute inset-0 -z-10 bg-gradient-to-r from-transparent via-[#85a1c5]/20 to-transparent opacity-0 transition-opacity group-hover:opacity-100"></div>
                Ver Currículo
              </a>
            </div>

            {/* Stats - Animated */}
            <div className="flex items-center gap-8 border-l-2 border-[#ff004d] pl-6">
              <div className="hero-stat">
                <div className="font-['Syne'] text-3xl font-bold text-white">+2</div>
                <div className="font-['IBM_Plex_Mono'] text-xs uppercase tracking-wider text-white/40">
                  Anos Exp
                </div>
              </div>
              <div className="h-8 w-px bg-white/10" />
              <div className="hero-stat">
                <div className="font-['Syne'] text-3xl font-bold text-white">40</div>
                <div className="font-['IBM_Plex_Mono'] text-xs uppercase tracking-wider text-white/40">
                  Indústrias
                </div>
              </div>
              <div className="h-8 w-px bg-white/10" />
              <div className="hero-stat">
                <div className="font-['Syne'] text-3xl font-bold text-white">100%</div>
                <div className="font-['IBM_Plex_Mono'] text-xs uppercase tracking-wider text-white/40">
                  Paixão
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Interactive 3D Cards */}
          <div ref={cardsRef} className="relative hidden h-[600px] lg:block">
            {/* Card 1 - Tilted & Interactive */}
            <div
              className="hero-card absolute left-0 top-0 h-72 w-80 border border-white/10 bg-gradient-to-br from-[#ff004d] to-[#f76c46] p-8 shadow-2xl transition-all hover:z-50"
              data-rotation="-6"
              style={{ transform: 'rotate(-6deg)', transformOrigin: 'top left' }}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              <div className="h-full border-2 border-white/20 p-6 flex flex-col justify-between">
                <div className="font-['IBM_Plex_Mono'] text-xs uppercase tracking-widest text-white/60">
                  Node.js / ReactJS
                </div>
                <div>
                  <div className="mt-4 font-['Syne'] text-4xl font-bold text-white leading-none">
                    FULL
                    <br />
                    STACK
                  </div>
                  <div className="mt-6 h-px bg-white/20" />
                  <div className="mt-4 font-['IBM_Plex_Mono'] text-xs text-white/60">
                    Desenvolvimento Web
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2 - Center & Interactive */}
            <div
              className="hero-card absolute left-16 top-32 h-72 w-80 border border-white/10 bg-gradient-to-br from-[#85a1c5] to-[#4a90e2] p-8 shadow-2xl transition-all hover:z-50"
              data-rotation="3"
              style={{ transform: 'rotate(3deg)' }}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              <div className="h-full border-2 border-white/20 p-6 flex flex-col justify-between">
                <div className="font-['IBM_Plex_Mono'] text-xs uppercase tracking-widest text-white/60">
                  Figma / Prototipagem
                </div>
                <div>
                  <div className="mt-4 font-['Syne'] text-4xl font-bold text-white leading-none">
                    UI/UX
                    <br />
                    DESIGN
                  </div>
                  <div className="mt-6 h-px bg-white/20" />
                  <div className="mt-4 font-['IBM_Plex_Mono'] text-xs text-white/60">
                    Alta Fidelidade
                  </div>
                </div>
              </div>
            </div>

            {/* Card 3 - Bottom & Interactive */}
            <div
              className="hero-card absolute left-32 top-64 h-72 w-80 border border-white/10 bg-gradient-to-br from-[#bacfa3] to-[#2d4a3e] p-8 shadow-2xl transition-all hover:z-50"
              data-rotation="-3"
              style={{ transform: 'rotate(-3deg)' }}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              <div className="h-full border-2 border-white/20 p-6 flex flex-col justify-between">
                <div className="font-['IBM_Plex_Mono'] text-xs uppercase tracking-widest text-white/60">
                  Docker / Infraestrutura
                </div>
                <div>
                  <div className="mt-4 font-['Syne'] text-4xl font-bold text-white leading-none">
                    DEVOPS &
                    <br />
                    SERVERS
                  </div>
                  <div className="mt-6 h-px bg-white/20" />
                  <div className="mt-4 font-['IBM_Plex_Mono'] text-xs text-white/60">
                    Manutenção Linux/Windows
                  </div>
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

      {/* ---------------- REST OF THE PAGE ---------------- */}
      
      {/* SOBRE */}
      <section id="sobre" className="relative z-10 py-32 px-6 lg:px-24 border-t border-white/5 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-start gap-16">
            <div className="md:w-1/3 animate-on-scroll">
              <div className="mb-4 font-['JetBrains_Mono'] text-xs uppercase tracking-[0.3em] text-[#ff004d]">
                / 01 Info
              </div>
              <h2 className="font-['Syne'] text-5xl md:text-6xl font-bold text-white mb-6">Sobre<br/><span className="text-[#85a1c5]">Mim</span></h2>
            </div>
            <div className="md:w-2/3 space-y-8 animate-on-scroll" style={{ animationDelay: '0.2s' }}>
              <p className="font-['DM_Sans'] text-xl leading-relaxed text-white/70">
                Me chamo <strong className="text-white">José Ricardo Goulart Silva</strong>, natural de Franca, São Paulo. Sou graduado em Análise e Desenvolvimento de Sistemas pela FATEC Franca.
              </p>
              <p className="font-['DM_Sans'] text-xl leading-relaxed text-white/70">
                Minha trajetória é marcada pela união entre a gestão administrativa e a paixão pela tecnologia e educação. Com experiência sólida em desenvolvimento Full Stack e infraestrutura de TI, busco constantemente soluções inovadoras que equilibram funcionalidade com excelência em design.
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-8 border-t border-white/10 mt-12 animate-on-scroll">
                <div>
                  <h4 className="font-['JetBrains_Mono'] text-xs text-white/40 uppercase tracking-widest mb-2">Nascimento</h4>
                  <p className="font-['Syne'] text-lg text-white">26/05/2003</p>
                </div>
                <div>
                  <h4 className="font-['JetBrains_Mono'] text-xs text-white/40 uppercase tracking-widest mb-2">Localização</h4>
                  <p className="font-['Syne'] text-lg text-white">Franca - SP</p>
                </div>
                <div>
                  <h4 className="font-['JetBrains_Mono'] text-xs text-white/40 uppercase tracking-widest mb-2">Hobby</h4>
                  <p className="font-['Syne'] text-lg text-white">Tocar Violão</p>
                </div>
                <div>
                  <h4 className="font-['JetBrains_Mono'] text-xs text-white/40 uppercase tracking-widest mb-2">Experiência</h4>
                  <p className="font-['Syne'] text-lg text-[#ff004d] font-bold">+2 anos em TI</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HABILIDADES */}
      <section id="habilidades" className="relative z-10 py-32 px-6 lg:px-24 border-t border-white/5 bg-gradient-to-br from-[#141414] to-[#0a0a0a]">
        <div className="max-w-7xl mx-auto">
          <div className="mb-24 animate-on-scroll">
            <div className="mb-4 font-['JetBrains_Mono'] text-xs uppercase tracking-[0.3em] text-[#ff004d]">
              / 02 Skills
            </div>
            <h2 className="font-['Syne'] text-5xl md:text-6xl font-bold text-white mb-6">
              Habili<br/><span style={{ background: 'linear-gradient(135deg, #85a1c5 0%, #ff004d 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>dades</span>
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-16">
            <div className="space-y-12 animate-on-scroll">
              <h3 className="font-['Syne'] text-2xl font-bold text-white">Hard Skills</h3>
              {[
                { name: 'Node.js / ReactJS', level: 80 },
                { name: 'Python / Flask', level: 70 },
                { name: 'Docker & Infraestrutura', level: 75 },
                { name: 'UI/UX (Figma)', level: 85 }
              ].map(skill => (
                <div key={skill.name} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="font-['JetBrains_Mono'] text-xs uppercase tracking-wider text-white/50">
                      {skill.name}
                    </label>
                    <span className="font-['Syne'] text-sm font-bold text-white">
                      {skill.level}%
                    </span>
                  </div>
                  {/* Archetype Progress Bar Component */}
                  <div className="relative h-3 overflow-hidden border border-white/20">
                    <div
                      className="h-full bg-gradient-to-r from-[#ff004d] to-[#f76c46] transition-all duration-1000"
                      style={{ 
                        width: `${skill.level}%`,
                        clipPath: 'polygon(0 0, 100% 0, 95% 100%, 0% 100%)'
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-12 animate-on-scroll" style={{ animationDelay: '0.2s' }}>
              <h3 className="font-['Syne'] text-2xl font-bold text-white">Soft Skills</h3>
              {[
                { name: 'Docência e Comunicação', level: 100 },
                { name: 'Trabalho em Equipe', level: 90 },
                { name: 'Resolução de Problemas', level: 95 }
              ].map(skill => (
                <div key={skill.name} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="font-['JetBrains_Mono'] text-xs uppercase tracking-wider text-white/50">
                      {skill.name}
                    </label>
                    <span className="font-['Syne'] text-sm font-bold text-white">
                      {skill.level}%
                    </span>
                  </div>
                  {/* Archetype Progress Bar Component (Blue Var) */}
                  <div className="relative h-3 overflow-hidden border border-white/20">
                    <div
                      className="h-full bg-gradient-to-r from-[#85a1c5] to-[#4a90e2] transition-all duration-1000"
                      style={{ 
                        width: `${skill.level}%`,
                        clipPath: 'polygon(0 0, 100% 0, 95% 100%, 0% 100%)'
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
          <div className="mb-20 animate-on-scroll">
            <div className="mb-4 font-['JetBrains_Mono'] text-xs uppercase tracking-[0.3em] text-[#ff004d]">
              / 03 Timeline
            </div>
            <h2 className="font-['Syne'] text-5xl md:text-6xl font-bold text-white mb-6">Currículo</h2>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-20">
            {/* Formação */}
            <div className="animate-on-scroll">
              <div className="flex items-center gap-4 mb-12 border-b border-white/10 pb-6">
                <div className="w-12 h-12 border-2 border-[#ff004d] bg-transparent flex items-center justify-center">
                  <i className="bi bi-mortarboard text-[#ff004d] text-xl"></i>
                </div>
                <h3 className="font-['Syne'] text-2xl font-bold text-white">Formação Acadêmica</h3>
              </div>
              
              <div className="space-y-16 pl-6 border-l-2 border-white/10">
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
                  <div key={i} className="relative group">
                    <div className="absolute -left-[33px] top-0 w-4 h-4 bg-[#0a0a0a] border-2 border-[#85a1c5] group-hover:bg-[#85a1c5] transition-all" style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }}></div>
                    <span className="font-['JetBrains_Mono'] text-xs text-[#ff004d] tracking-widest mb-3 block">{item.date}</span>
                    <h4 className="font-['Syne'] text-xl font-bold text-white mb-3">{item.title}</h4>
                    <p className="font-['DM_Sans'] text-white/50 text-base mb-4">{item.inst}</p>
                    <span className="inline-block border-2 border-[#85a1c5] bg-transparent px-4 py-1.5 text-xs text-white font-['JetBrains_Mono'] uppercase transition-colors group-hover:bg-[#85a1c5]/10">{item.status}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Profissional */}
            <div className="animate-on-scroll" style={{ animationDelay: '0.2s' }}>
              <div className="flex items-center gap-4 mb-12 border-b border-white/10 pb-6">
                <div className="w-12 h-12 border-2 border-[#ff004d] bg-transparent flex items-center justify-center">
                  <i className="bi bi-briefcase text-[#ff004d] text-xl"></i>
                </div>
                <h3 className="font-['Syne'] text-2xl font-bold text-white">Histórico Profissional</h3>
              </div>
              
              <div className="space-y-16 pl-6 border-l-2 border-white/10">
                {[
                  {
                    title: 'Auxiliar Administrativo (Analista de TI)',
                    date: '01/2022 - Atual',
                    inst: 'R. Raimundo Da Silva Franca',
                    desc: ['Desenvolvimento Full Stack (Node.js, React, Docker) para automação.', 'Manutenção de servidores e infraestrutura Windows/Linux.', 'Capacitação técnica de usuários.']
                  },
                  {
                    title: 'UI Designer (Estágio)',
                    date: '03/2024 - 06/2024',
                    inst: 'Gestor Inovação (Remoto)',
                    desc: ['Foco em prototipagem de alta fidelidade no Figma.', 'Reconhecido pela proatividade e capacidade de resolução.']
                  }
                ].map((item, i) => (
                  <div key={i} className="relative group">
                    <div className="absolute -left-[33px] top-0 w-4 h-4 bg-[#0a0a0a] border-2 border-[#85a1c5] group-hover:bg-[#85a1c5] transition-all" style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }}></div>
                    <span className="font-['JetBrains_Mono'] text-xs text-[#ff004d] tracking-widest mb-3 block">{item.date}</span>
                    <h4 className="font-['Syne'] text-xl font-bold text-white mb-3">{item.title}</h4>
                    <p className="font-['DM_Sans'] text-white/50 text-base mb-6">{item.inst}</p>
                    <ul className="space-y-3">
                      {item.desc.map((d, idx) => (
                        <li key={idx} className="font-['DM_Sans'] text-white/70 text-[15px] flex items-start gap-3">
                          <span className="text-[#ff004d] mt-1 text-xs">/</span> {d}
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
      <section id="portifolio" className="relative z-10 py-32 px-6 lg:px-24 border-t border-white/5 bg-gradient-to-br from-[#141414] to-[#0a0a0a]">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 animate-on-scroll">
            <div className="mb-4 font-['JetBrains_Mono'] text-xs uppercase tracking-[0.3em] text-[#ff004d]">
              / 04 Work
            </div>
            <h2 className="font-['Syne'] text-5xl md:text-6xl font-bold text-white mb-6">Portfólio</h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Layered Card - UI Abstracted from Components.tsx */}
            <div className="group relative animate-on-scroll">
              <div className="absolute left-3 top-3 h-full w-full border-2 border-white/10 transition-transform group-hover:translate-x-1 group-hover:translate-y-1"></div>
              <div className="relative border-2 border-[#ff004d] bg-[#0a0a0a] p-8 transition-transform group-hover:-translate-x-2 group-hover:-translate-y-2 h-full flex flex-col">
                <div className="mb-6 inline-block border border-[#ff004d] px-3 py-1 font-['JetBrains_Mono'] text-xs uppercase text-[#ff004d]">
                  HTML5 & CSS3
                </div>
                <div className="aspect-video mb-6 overflow-hidden border border-white/20">
                  <img 
                    src="https://images.unsplash.com/photo-1607252650355-f7fd0460ccdb?q=80&w=2070&auto=format&fit=crop" 
                    alt="Página Android" 
                    className="w-full h-full object-cover opacity-60 transition-transform duration-700 group-hover:scale-110 group-hover:opacity-100"
                  />
                </div>
                <h4 className="mb-3 font-['Syne'] text-3xl font-bold text-white">
                  PÁGINA<br/>ANDROID
                </h4>
                <p className="font-['DM_Sans'] text-sm text-white/70 mb-8 flex-grow">
                  Design responsivo com uso avançado de propriedades CSS modernas.
                </p>
                <div className="flex gap-4">
                  <a href="#" className="flex-1 bg-[#ff004d] text-center py-3 text-white font-['Syne'] text-sm font-bold uppercase transition-all hover:bg-[#ff004d]/80" style={{ clipPath: 'polygon(0 0, 100% 0, 90% 100%, 0% 100%)' }}>
                    Preview
                  </a>
                  <a href="#" className="w-12 flex items-center justify-center border-2 border-white/20 text-white hover:bg-white/10 transition-colors">
                    <i className="bi bi-github text-lg"></i>
                  </a>
                </div>
              </div>
            </div>
            
            {/* Angular Card - Abstracted from Components.tsx */}
            <div className="group relative overflow-hidden bg-gradient-to-br from-[#85a1c5] to-[#4a90e2] p-8 animate-on-scroll" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 90%, 0 100%)', animationDelay: '0.2s' }}>
              <div className="mb-6 inline-block bg-white/20 px-3 py-1 font-['JetBrains_Mono'] text-xs uppercase text-white">
                Em Breve
              </div>
              <div className="aspect-video mb-6 flex items-center justify-center bg-black/20 border border-white/20 transition-all duration-500 group-hover:bg-black/30">
                <i className="bi bi-plus-lg text-4xl text-white/50 transition-transform group-hover:scale-125 group-hover:rotate-90 duration-500"></i>
              </div>
              <h4 className="mb-3 font-['Syne'] text-3xl font-bold text-white">
                MAIS<br/>PROJETOS
              </h4>
              <p className="font-['DM_Sans'] text-sm text-white/80">
                Novos casos de estudo focados em UI/UX e desenvolvimento full stack.
              </p>
              <div className="mt-8 flex items-center justify-between border-t border-white/20 pt-4">
                <span className="font-['JetBrains_Mono'] text-xs text-white/80">
                  Stay Tuned
                </span>
                <svg className="h-5 w-5 text-white transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
          <div className="mb-20 animate-on-scroll">
            <div className="mb-4 font-['JetBrains_Mono'] text-xs uppercase tracking-[0.3em] text-[#ff004d]">
              / 05 Connect
            </div>
            <h2 className="font-['Syne'] text-5xl md:text-6xl font-bold text-white mb-6">Contato</h2>
          </div>
          
          <div className="grid lg:grid-cols-12 gap-16">
            <div className="lg:col-span-5 space-y-12 animate-on-scroll">
              <p className="font-['DM_Sans'] text-xl text-white/50 leading-relaxed mb-12">
                Tem um projeto em mente ou quer apenas dizer um olá? Sinta-se à vontade para entrar em contato.
              </p>

              <div className="flex gap-6 items-center">
                <div className="w-14 h-14 border-2 border-white/20 bg-transparent flex items-center justify-center shrink-0 text-white hover:border-[#ff004d] transition-colors" style={{ clipPath: 'polygon(15% 0, 100% 0, 85% 100%, 0 100%)' }}>
                  <i className="bi bi-geo-alt text-xl"></i>
                </div>
                <div>
                  <h4 className="font-['JetBrains_Mono'] text-xs uppercase tracking-widest text-white/40 mb-2">Localização</h4>
                  <p className="font-['Syne'] text-lg text-white">Franca, SP - Brasil</p>
                </div>
              </div>
              
              <div className="flex gap-6 items-center">
                <div className="w-14 h-14 border-2 border-white/20 bg-transparent flex items-center justify-center shrink-0 text-white hover:border-[#ff004d] transition-colors" style={{ clipPath: 'polygon(15% 0, 100% 0, 85% 100%, 0 100%)' }}>
                  <i className="bi bi-envelope text-xl"></i>
                </div>
                <div>
                  <h4 className="font-['JetBrains_Mono'] text-xs uppercase tracking-widest text-white/40 mb-2">E-Mail</h4>
                  <p className="font-['Syne'] text-lg text-white">jricardogoulartsilva@gmail.com</p>
                </div>
              </div>

              <div className="flex gap-4 pt-8">
                {[
                  { icon: 'bi-linkedin', url: 'https://www.linkedin.com/in/jos%C3%A9-ricardo-goulart-silva-ab622a288/' },
                  { icon: 'bi-github', url: 'https://github.com/jricardogoulart' },
                  { icon: 'bi-instagram', url: 'https://www.instagram.com/jricardogoulart/' },
                  { icon: 'bi-twitter-x', url: 'https://twitter.com/jricardogoulart' }
                ].map((social, i) => (
                  <a key={i} href={social.url} target="_blank" rel="noreferrer" className="w-12 h-12 border-2 border-[#85a1c5] flex items-center justify-center text-white/50 hover:text-white hover:bg-[#85a1c5]/10 transition-all relative overflow-hidden group">
                    <div className="absolute inset-0 -z-10 bg-gradient-to-r from-transparent via-[#85a1c5]/20 to-transparent opacity-0 transition-opacity group-hover:opacity-100"></div>
                    <i className={`bi ${social.icon} text-lg`}></i>
                  </a>
                ))}
              </div>
            </div>

            <div className="lg:col-span-7 animate-on-scroll" style={{ animationDelay: '0.2s' }}>
              <form className="p-10 border-2 border-white/5 bg-gradient-to-br from-[#141414] to-[#0a0a0a] space-y-10" onSubmit={(e) => e.preventDefault()}>
                <h3 className="mb-8 font-['Syne'] text-2xl font-bold text-white">
                  Envie uma Mensagem
                </h3>
                
                <div className="grid md:grid-cols-2 gap-10">
                  <div className="space-y-3">
                    <label className="font-['JetBrains_Mono'] text-xs uppercase tracking-wider text-white/50">
                      Seu Nome
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Digite seu nome..."
                        className="w-full border-b-2 border-white/20 bg-transparent pb-3 font-['DM_Sans'] text-white placeholder-white/30 transition-all focus:border-[#ff004d] focus:outline-none"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <label className="font-['JetBrains_Mono'] text-xs uppercase tracking-wider text-white/50">
                      Seu Email
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        placeholder="exemplo@email.com"
                        className="w-full border-b-2 border-white/20 bg-transparent pb-3 font-['DM_Sans'] text-white placeholder-white/30 transition-all focus:border-[#85a1c5] focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <label className="font-['JetBrains_Mono'] text-xs uppercase tracking-wider text-white/50">
                    Sua Mensagem
                  </label>
                  <textarea
                    rows={5}
                    placeholder="Escreva sua mensagem aqui..."
                    className="w-full border-2 border-white/20 bg-white/5 p-4 font-['DM_Sans'] text-white placeholder-white/30 transition-all focus:border-[#ff004d] focus:outline-none resize-none"
                    style={{ clipPath: 'polygon(0 0, 100% 0, 98% 100%, 0% 100%)' }}
                  ></textarea>
                </div>
                
                {/* Diagonal Cut Button Abstracted from Components.tsx */}
                <button type="submit" className="group relative overflow-hidden bg-[#ff004d] px-8 py-4 font-['Syne'] text-sm font-bold uppercase text-white transition-all hover:bg-[#ff004d]/90 w-full md:w-auto mt-4" style={{ clipPath: 'polygon(0 0, 100% 0, 95% 100%, 0% 100%)' }}>
                  Enviar Mensagem
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative z-10 py-10 border-t border-white/5 text-center bg-[#141414]">
        <p className="font-['JetBrains_Mono'] text-xs text-white/30 mb-2">
          &copy; {new Date().getFullYear()} <strong className="text-white/50">José R. Goulart</strong>.
        </p>
        <p className="font-['JetBrains_Mono'] text-[10px] text-white/20 uppercase tracking-widest">
          Archetype Design Elements
        </p>
      </footer>
    </div>
  );
}
