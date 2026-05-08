import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { GraduationCap, Briefcase, MapPin, Mail, ArrowRight, Plus } from 'lucide-react';
import { FaGithub, FaLinkedin, FaInstagram, FaTwitter } from 'react-icons/fa';

export default function About() {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const blobsRef = useRef<(HTMLDivElement | null)[]>([]);
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

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
            scale: 1.05, // Slightly softer scale for better UX
            rotation: 0,
            duration: 0.5,
            ease: 'expo.out',
            zIndex: 50
          });
        });
        card.addEventListener('mouseleave', () => {
          gsap.to(card, {
            scale: 1,
            rotation: card.getAttribute('data-rotation') || 0,
            duration: 0.5,
            ease: 'expo.out',
            zIndex: 1
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
              ease: 'expo.out',
              stagger: 0.15
            });
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }); // Better trigger point

      document.querySelectorAll('.animate-on-scroll').forEach((el) => {
        gsap.set(el, { y: 60, opacity: 0 });
        observer.observe(el);
      });

    }, heroRef);

    return () => ctx.revert();
  }, []);

  // Mouse parallax effect and cursor logic
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });

      // Update custom cursor
      if (cursorRef.current && cursorDotRef.current) {
        gsap.to(cursorRef.current, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.2, // Snappier follow
          ease: 'power2.out',
        });
        gsap.to(cursorDotRef.current, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.05,
        });
      }

      // Parallax for title
      if (titleRef.current) {
        const rect = titleRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const deltaX = (e.clientX - centerX) / 60; // Softer parallax
        const deltaY = (e.clientY - centerY) / 60;

        gsap.to(titleRef.current, {
          x: deltaX,
          y: deltaY,
          duration: 0.8,
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
          const deltaX = (e.clientX - centerX) / (40 + index * 15);
          const deltaY = (e.clientY - centerY) / (40 + index * 15);

          gsap.to(card, {
            x: deltaX,
            y: deltaY,
            duration: 0.8,
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

        if (distance < 80) { // Tighter magnetic radius for precision
          const deltaX = (e.clientX - centerX) / 4;
          const deltaY = (e.clientY - centerY) / 4;
          gsap.to(button, {
            x: deltaX,
            y: deltaY,
            duration: 0.4,
            ease: 'power2.out',
          });
        } else {
          gsap.to(button, {
            x: 0,
            y: 0,
            duration: 0.4,
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
          const speed = 0.03 + index * 0.015; // Softer blob follow
          const currentX = parseFloat(blob.style.left || '0');
          const currentY = parseFloat(blob.style.top || '0');
          const targetX = mousePos.x * speed;
          const targetY = mousePos.y * speed;

          gsap.to(blob, {
            x: targetX - currentX,
            y: targetY - currentY,
            duration: 3,
            ease: 'power2.out',
          });
        }
      });
    };

    handleMouseMoveBlobs();
  }, [mousePos]);

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
        id="hero"
        className="relative flex min-h-screen items-center overflow-hidden px-6 lg:px-12"
      >
        {/* Interactive Morphing Blobs */}
        <div
          ref={(el) => { blobsRef.current[0] = el; }}
          className="morphing-blob pointer-events-none absolute left-[10%] top-[20%] h-[500px] w-[500px] bg-gradient-to-br from-[#ff004d]/15 to-[#f76c46]/10 blur-[100px]"
          style={{ mixBlendMode: 'screen' }}
        />
        <div
          ref={(el) => { blobsRef.current[1] = el; }}
          className="morphing-blob pointer-events-none absolute right-[15%] bottom-[25%] h-[600px] w-[600px] bg-gradient-to-tl from-[#85a1c5]/15 to-[#4a90e2]/10 blur-[120px]"
          style={{ mixBlendMode: 'screen' }}
        />
        <div
          ref={(el) => { blobsRef.current[2] = el; }}
          className="morphing-blob pointer-events-none absolute left-[40%] bottom-[10%] h-[400px] w-[400px] bg-gradient-to-tr from-[#bacfa3]/10 to-[#2d4a3e]/10 blur-[90px]"
          style={{ mixBlendMode: 'screen' }}
        />

        {/* Diagonal Lines Pattern - Very Subtle */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.015]"
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

        <div className="relative z-10 grid w-full max-w-7xl grid-cols-1 gap-16 lg:grid-cols-2 lg:items-center mx-auto mt-20 md:mt-0">
          {/* Left Column - Text Content */}
          <div className="space-y-10 text-left">
            {/* Overline */}
            <div 
              className="hero-subtitle inline-flex items-center gap-3 rounded-full border border-white/10 px-5 py-2.5 backdrop-blur-md bg-white/[0.02] transition-colors hover:bg-white/[0.05]"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              <div className="h-2 w-2 animate-pulse rounded-full bg-[#ff004d] shadow-[0_0_8px_#ff004d]" />
              <span className="font-['IBM_Plex_Mono'] text-[11px] font-medium uppercase tracking-[0.3em] text-white/80">
                Desenvolvedor Full Stack
              </span>
            </div>

            {/* Main Heading - Interactive */}
            <div ref={titleRef} className="space-y-1" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
              <div className="overflow-hidden">
                <h1 className="hero-title-line font-['Syne'] text-[clamp(3.5rem,8vw,7.5rem)] font-bold leading-[0.85] tracking-tight text-white/90">
                  JOSÉ
                </h1>
              </div>
              <div className="overflow-hidden">
                <h1
                  className="hero-title-line font-['Syne'] text-[clamp(3.5rem,8vw,7.5rem)] font-bold leading-[0.85] tracking-tight"
                  style={{
                    background: 'linear-gradient(135deg, #ff004d 0%, #f76c46 50%, #e9e778 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    filter: 'drop-shadow(0px 10px 20px rgba(255,0,77,0.15))'
                  }}
                >
                  GOULART
                </h1>
              </div>
            </div>

            {/* Subtitle */}
            <p className="hero-subtitle max-w-lg font-['DM_Sans'] text-lg leading-relaxed text-white/60">
              Unindo gestão administrativa e paixão pela tecnologia. Soluções inovadoras que equilibram funcionalidade impecável com <span className="text-white/90 font-medium">excelência visual</span>.
            </p>

            {/* Magnetic Buttons */}
            <div className="flex flex-wrap items-center gap-5 pt-2">
              <a href="#portifolio"
                className="magnetic-button hero-button inline-block group relative overflow-hidden bg-[#ff004d] px-9 py-4 font-['Syne'] text-sm font-bold uppercase tracking-wider text-white transition-all duration-300 hover:bg-[#ff004d]/80 shadow-[0_10px_30px_-10px_rgba(255,0,77,0.4)] hover:shadow-[0_15px_40px_-10px_rgba(255,0,77,0.6)]"
                style={{ clipPath: 'polygon(0 0, 100% 0, 93% 100%, 0% 100%)' }}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                <span className="relative z-10 flex items-center gap-2">Explorar Portfólio</span>
              </a>

              <a href="#curriculo"
                className="magnetic-button hero-button inline-block group relative overflow-hidden border-2 border-[#85a1c5]/50 bg-transparent px-9 py-4 font-['Syne'] text-sm font-bold uppercase tracking-wider text-[#85a1c5] transition-all duration-300 hover:border-[#85a1c5] hover:text-white"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                <div className="absolute inset-0 -z-10 bg-gradient-to-r from-transparent via-[#85a1c5]/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
                Ver Currículo
              </a>
            </div>

            {/* Stats - Animated */}
            <div className="flex items-center gap-8 border-l-2 border-[#ff004d]/50 pl-8 mt-4" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
              <div className="hero-stat group cursor-default">
                <div className="font-['Syne'] text-3xl font-bold text-white transition-colors group-hover:text-[#ff004d]">+2</div>
                <div className="font-['IBM_Plex_Mono'] text-[10px] font-medium uppercase tracking-[0.2em] text-white/40 transition-colors group-hover:text-white/70">
                  Anos Exp
                </div>
              </div>
              <div className="h-10 w-px bg-white/10" />
              <div className="hero-stat group cursor-default">
                <div className="font-['Syne'] text-3xl font-bold text-white transition-colors group-hover:text-[#85a1c5]">40</div>
                <div className="font-['IBM_Plex_Mono'] text-[10px] font-medium uppercase tracking-[0.2em] text-white/40 transition-colors group-hover:text-white/70">
                  Indústrias
                </div>
              </div>
              <div className="h-10 w-px bg-white/10" />
              <div className="hero-stat group cursor-default">
                <div className="font-['Syne'] text-3xl font-bold text-white transition-colors group-hover:text-[#bacfa3]">100%</div>
                <div className="font-['IBM_Plex_Mono'] text-[10px] font-medium uppercase tracking-[0.2em] text-white/40 transition-colors group-hover:text-white/70">
                  Paixão
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Interactive 3D Cards */}
          <div ref={cardsRef} className="relative hidden h-[650px] lg:block">
            {/* Card 1 - Tilted & Interactive */}
            <div
              className="hero-card absolute left-0 top-0 h-[300px] w-[340px] border border-white/10 bg-gradient-to-br from-[#ff004d] to-[#cc003d] p-8 shadow-[0_20px_50px_rgba(255,0,77,0.2)] transition-all"
              data-rotation="-6"
              style={{ transform: 'rotate(-6deg)', transformOrigin: 'top left' }}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              <div className="h-full border-2 border-white/20 p-6 flex flex-col justify-between backdrop-blur-sm bg-white/[0.02]">
                <div className="font-['IBM_Plex_Mono'] text-[10px] font-bold uppercase tracking-widest text-white/80">
                  Node.js / ReactJS
                </div>
                <div>
                  <div className="mt-4 font-['Syne'] text-4xl font-bold text-white leading-[0.9]">
                    FULL<br/>STACK
                  </div>
                  <div className="mt-6 h-[2px] w-12 bg-white/40" />
                  <div className="mt-4 font-['DM_Sans'] text-sm font-medium text-white/80">
                    Arquitetura Web Completa
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2 - Center & Interactive */}
            <div
              className="hero-card absolute left-20 top-36 h-[300px] w-[340px] border border-white/10 bg-gradient-to-br from-[#85a1c5] to-[#5b7ea8] p-8 shadow-[0_20px_50px_rgba(133,161,197,0.2)] transition-all"
              data-rotation="3"
              style={{ transform: 'rotate(3deg)' }}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              <div className="h-full border-2 border-white/20 p-6 flex flex-col justify-between backdrop-blur-sm bg-white/[0.02]">
                <div className="font-['IBM_Plex_Mono'] text-[10px] font-bold uppercase tracking-widest text-white/80">
                  Figma / Prototipagem
                </div>
                <div>
                  <div className="mt-4 font-['Syne'] text-4xl font-bold text-white leading-[0.9]">
                    UI/UX<br/>DESIGN
                  </div>
                  <div className="mt-6 h-[2px] w-12 bg-white/40" />
                  <div className="mt-4 font-['DM_Sans'] text-sm font-medium text-white/80">
                    Experiências de Alta Fidelidade
                  </div>
                </div>
              </div>
            </div>

            {/* Card 3 - Bottom & Interactive */}
            <div
              className="hero-card absolute left-40 top-72 h-[300px] w-[340px] border border-white/10 bg-gradient-to-br from-[#bacfa3] to-[#8fa874] p-8 shadow-[0_20px_50px_rgba(186,207,163,0.2)] transition-all"
              data-rotation="-3"
              style={{ transform: 'rotate(-3deg)' }}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              <div className="h-full border-2 border-white/20 p-6 flex flex-col justify-between backdrop-blur-sm bg-white/[0.02]">
                <div className="font-['IBM_Plex_Mono'] text-[10px] font-bold uppercase tracking-widest text-white/80">
                  Docker / Linux
                </div>
                <div>
                  <div className="mt-4 font-['Syne'] text-4xl font-bold text-white leading-[0.9]">
                    DEVOPS &<br/>SERVERS
                  </div>
                  <div className="mt-6 h-[2px] w-12 bg-white/40" />
                  <div className="mt-4 font-['DM_Sans'] text-sm font-medium text-white/80">
                    Infraestrutura Escalável
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator - Animated */}
        <div className="hero-subtitle pointer-events-none absolute bottom-8 left-1/2 -translate-x-1/2">
          <div className="flex flex-col items-center gap-3">
            <div className="font-['IBM_Plex_Mono'] text-[9px] font-semibold uppercase tracking-[0.4em] text-white/40">
              Scroll
            </div>
            <div className="h-16 w-[1px] bg-gradient-to-b from-white/40 to-transparent relative overflow-hidden">
               <div className="absolute top-0 left-0 w-full h-1/2 bg-white animate-[diagonalWipe_1.5s_ease-in-out_infinite]"></div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- REST OF THE PAGE ---------------- */}
      
      {/* SOBRE */}
      <section id="sobre" className="relative z-10 py-32 px-6 lg:px-24 border-t border-white/5 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-start gap-16 lg:gap-24">
            <div className="md:w-1/3 animate-on-scroll">
              <div className="mb-6 font-['JetBrains_Mono'] text-xs uppercase tracking-[0.3em] text-[#ff004d]">
                / 01 Info
              </div>
              <h2 className="font-['Syne'] text-5xl md:text-7xl font-bold text-white mb-6 leading-none">Sobre<br/><span className="text-[#85a1c5]">Mim</span></h2>
            </div>
            <div className="md:w-2/3 space-y-8 animate-on-scroll" style={{ animationDelay: '0.1s' }}>
              <p className="font-['DM_Sans'] text-xl lg:text-2xl leading-relaxed text-white/70" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
                Me chamo <strong className="text-white font-medium">José Ricardo Goulart Silva</strong>, natural de Franca, São Paulo. Sou graduado em Análise e Desenvolvimento de Sistemas pela FATEC.
              </p>
              <p className="font-['DM_Sans'] text-lg lg:text-xl leading-loose text-white/50">
                Minha trajetória é marcada pela união entre a gestão administrativa e a paixão pela tecnologia e educação. Com experiência sólida em desenvolvimento Full Stack e infraestrutura de TI, busco constantemente soluções inovadoras que equilibram funcionalidade robosta com excelência estética.
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-12 pt-12 border-t border-white/10 mt-16 animate-on-scroll" style={{ animationDelay: '0.2s' }}>
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
                  <div key={i} className="relative group cursor-default" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
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
                  <div key={i} className="relative group cursor-default" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
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
