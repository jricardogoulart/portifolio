import { useEffect, useRef, useCallback } from 'react';
import ArrowIcon from './ArrowIcon';

interface AboutSectionProps {
  onStatementPointerMove: (e: React.PointerEvent) => void;
  onStatementPointerLeave: () => void;
  onNavigate?: (hash: string) => void;
}

// Texto editorial, curto, persuasivo e em 1ª pessoa
const STATEMENT_WORDS = [
  { text: "Do", accent: false },
  { text: "primeiro", accent: false },
  { text: "clique", accent: false },
  { text: "ao", accent: false },
  { text: "fechamento", accent: false },
  { text: "de", accent: false },
  { text: "contrato.", accent: false },
  { text: "Construo", accent: false },
  { text: "interfaces", accent: false },
  { text: "e", accent: false },
  { text: "produtos", accent: false },
  { text: "digitais", accent: false },
  { text: "de", accent: false },
  { text: "alto", accent: false },
  { text: "impacto", accent: false },
  { text: "que", accent: false },
  { text: "posicionam", accent: false },
  { text: "marcas", accent: false },
  { text: "e", accent: false },
  { text: "convertem", accent: true },
  { text: "visitantes", accent: true },
  { text: "em", accent: true },
  { text: "clientes.", accent: true },
];

export default function AboutSection({
  onStatementPointerMove,
  onStatementPointerLeave,
  onNavigate
}: AboutSectionProps) {
  const containerRef = useRef<HTMLElement>(null);
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const metaRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    void video.play().catch((error: unknown) => {
      console.warn('Não foi possível iniciar o vídeo de fundo automaticamente.', error);
    });
  }, []);

  const updateWordProgress = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const windowH = window.innerHeight;
    const totalScroll = container.offsetHeight - windowH;
    if (totalScroll <= 0) return;

    // Progresso normalizado de 0 a 1 durante o percurso de scroll da seção
    const scrolled = -rect.top;
    const progress = Math.max(0, Math.min(1, scrolled / totalScroll));

    const totalWords = STATEMENT_WORDS.length;

    // Atualiza a opacidade de cada palavra individualmente
    wordRefs.current.forEach((span, i) => {
      if (!span) return;
      const wordStart = i / (totalWords + 1);
      const wordEnd = (i + 1.2) / (totalWords + 1);

      if (progress < wordStart) {
        // Palavra futura: transparente
        span.style.opacity = '0.14';
        span.style.transform = 'translateY(4px)';
        span.style.filter = 'blur(1px)';
      } else if (progress >= wordEnd) {
        // Palavra passada: visível com leitura limpa
        span.style.opacity = '0.82';
        span.style.transform = 'translateY(0)';
        span.style.filter = 'blur(0)';
      } else {
        // Palavra ativa no momento atual do scroll: 100% acesa e em foco
        const localT = (progress - wordStart) / (wordEnd - wordStart);
        span.style.opacity = `${0.14 + localT * 0.86}`;
        span.style.transform = `translateY(${(1 - localT) * 4}px)`;
        span.style.filter = 'blur(0)';
      }
    });

    // Revela a linha de contato no final do percurso
    if (metaRef.current) {
      const metaProgress = Math.max(0, Math.min(1, (progress - 0.75) / 0.22));
      metaRef.current.style.opacity = `${metaProgress}`;
      metaRef.current.style.transform = `translateY(${(1 - metaProgress) * 16}px)`;
      metaRef.current.style.pointerEvents = metaProgress > 0.4 ? 'auto' : 'none';
    }
  }, []);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          updateWordProgress();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', updateWordProgress, { passive: true });
    updateWordProgress();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', updateWordProgress);
    };
  }, [updateWordProgress]);

  return (
    <section
      id="about"
      tabIndex={-1}
      ref={containerRef}
      className="about-scroll-container"
      aria-label="Sobre e abordagem"
    >
      <div className="container-section about-sticky-stage">
        {/* Vídeo contínuo e fluido de fundo (sem cortes, 60fps) */}
        <div className="about-video-container" aria-hidden="true">
          <video
            ref={videoRef}
            className="about-video-bg"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            src="/about-video.mp4"
          />
          <div className="about-video-overlay" />
        </div>

        {/* Conteúdo com revelação palavra por palavra */}
        <div className="about-content">
          <h2 className="kicker">// Sobre &amp; abordagem</h2>

          <div
            id="statement"
            className="statement about-word-statement"
            onPointerMove={onStatementPointerMove}
            onPointerLeave={onStatementPointerLeave}
          >
            <p className="statement-paragraph">
              {STATEMENT_WORDS.map((w, index) => (
                <span
                  key={index}
                  ref={(el) => { wordRefs.current[index] = el; }}
                  className={`word-item ${w.accent ? 'word-accent' : ''}`}
                >
                  {w.text}{' '}
                </span>
              ))}
            </p>
          </div>

          <div ref={metaRef} className="about-meta about-meta-clean">
            <p id="aboutBio" className="about-copy-clean">
              José Goulart — Desenvolvimento web autoral, interfaces reativas e ecossistemas digitais orientados à conversão.
            </p>

            <a
              href="#contact"
              className="pill about-direct-cta"
              onClick={(e) => {
                e.preventDefault();
                onNavigate?.('#contact');
              }}
            >
              Iniciar conversa <ArrowIcon className="arrow" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
