import { useEffect, useRef } from 'react';
import ArrowIcon from './ArrowIcon';

interface AboutMeSectionProps {
  onNavigate?: (hash: string) => void;
}

export default function AboutMeSection({ onNavigate: _onNavigate }: AboutMeSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el || !('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.classList.remove('pending');
            el.classList.add('visible');
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.15 }
    );

    el.classList.add('pending');
    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="about-me"
      tabIndex={-1}
      ref={sectionRef}
      className="container-section about-me motion-section reveal"
      aria-label="Sobre mim e currículo"
    >
      <div className="motion-divider" aria-hidden="true" />

      <div className="section-header">
        <h2 className="kicker motion-kicker">// Sobre mim &amp; trajetória</h2>
        <p className="micro motion-item" style={{ '--motion-delay': '80ms' } as React.CSSProperties}>
          FORMAÇÃO &amp; EXPERIÊNCIA // 2022–2026
        </p>
      </div>

      <div className="about-me-header reveal-item motion-item">
        <div className="about-me-title motion-title">
          <span>TRAJETÓRIA &amp;</span>
          <span style={{ color: 'var(--orange)' }}> EXPERIÊNCIA.</span>
        </div>

        <a
          href="/docs/curriculo-jose-ricardo-goulart.pdf"
          download="Curriculo-Jose-Ricardo-Goulart.pdf"
          className="pill download-cv-btn motion-cta"
          aria-label="Baixar currículo em PDF de José Ricardo Goulart"
        >
          <span>Baixar Currículo (PDF)</span>
          <ArrowIcon direction="down" className="arrow" />
        </a>
      </div>

      <div className="about-me-grid">
        {/* Profile / Context Card */}
        <div className="about-profile-card reveal-item motion-card" style={{ '--motion-delay': '120ms' } as React.CSSProperties}>
          <div className="about-avatar-wrapper">
            <img
              src="/images/profile/jose-goulart.jpg"
              alt="José Ricardo Goulart Silva"
              className="about-avatar-img"
              width={180}
              height={180}
              loading="lazy"
            />
          </div>

          <h3 className="about-profile-name">José Ricardo Goulart</h3>
          <p className="about-profile-role micro">Analista de TI &amp; Desenvolvedor Full Stack</p>

          <div className="about-meta-list">
            <div className="about-meta-item">
              <span className="meta-label">Localização</span>
              <p>Franca, SP — Brasil</p>
            </div>
            <div className="about-meta-item">
              <span className="meta-label">Formação</span>
              <p>ADS · FATEC Franca (Doutor Thomaz Novelino)</p>
            </div>
            <div className="about-meta-item">
              <span className="meta-label">Atuação Principal</span>
              <p>Node.js, React, TypeScript &amp; Infraestrutura</p>
            </div>
            <div className="about-meta-item">
              <span className="meta-label">Disponibilidade</span>
              <p style={{ color: 'var(--orange)' }}>Aberto a novas oportunidades</p>
            </div>
          </div>

          <div className="about-profile-cta">
            <a
              href="/docs/curriculo-jose-ricardo-goulart.pdf"
              download="Curriculo-Jose-Ricardo-Goulart.pdf"
              className="about-cv-link"
            >
              <span>Download CV Oficial</span>
              <ArrowIcon />
            </a>
          </div>
        </div>

        {/* Timeline: Formação & Experiência */}
        <div className="about-timeline-wrapper">
          {/* Experiência Profissional */}
          <div className="about-timeline-section reveal-item motion-item" style={{ '--motion-delay': '160ms' } as React.CSSProperties}>
            <div className="timeline-section-title">
              <span className="micro">// HISTÓRICO PROFISSIONAL</span>
              <h3>Experiência Prática</h3>
            </div>

            <div className="timeline-items">
              <article className="timeline-item motion-item" style={{ '--motion-delay': '200ms' } as React.CSSProperties}>
                <span className="timeline-marker" aria-hidden="true" />
                <div className="timeline-period micro">03/2022 – ATUAL</div>
                <h4 className="timeline-role">
                  Auxiliar Administrativo / Atuação como Analista de TI &amp; Dev Full Stack
                </h4>
                <p className="timeline-company">R Raimundo Da Silva Franca</p>
                <ul className="timeline-bullets">
                  <li>
                    <strong>Desenvolvimento de Sistemas:</strong> Concepção e sustentação de ecossistema completo de gestão com Node.js, ReactJS e Docker, padronizando processos de 35 indústrias parceiras.
                  </li>
                  <li>
                    <strong>Infraestrutura &amp; Servidores:</strong> Gestão e manutenção preventiva/corretiva de servidores e estações de trabalho críticas em ambientes Windows e Linux.
                  </li>
                  <li>
                    <strong>Automação de Processos:</strong> Escrita de rotinas automatizadas e scripts de integração que mitigaram falhas operacionais e otimizaram fluxos diários.
                  </li>
                  <li>
                    <strong>Capacitação &amp; Treinamento:</strong> Elaboração de materiais técnicos, manuais operacionais e treinamento de equipes.
                  </li>
                </ul>
              </article>

              <article className="timeline-item motion-item" style={{ '--motion-delay': '260ms' } as React.CSSProperties}>
                <span className="timeline-marker" aria-hidden="true" />
                <div className="timeline-period micro">03/2024 – 06/2024</div>
                <h4 className="timeline-role">
                  UI Designer (Estágio em Interfaces &amp; Usabilidade)
                </h4>
                <p className="timeline-company">Gestor Inovação (Remoto)</p>
                <ul className="timeline-bullets">
                  <li>
                    <strong>Prototipagem de Alta Fidelidade:</strong> Criação de componentes navegáveis no Figma, estabelecendo Design Systems com tokens e consistência visual.
                  </li>
                  <li>
                    <strong>Arquitetura &amp; Handoff:</strong> Mapeamento de fluxos de jornada do usuário com foco em acessibilidade e documentação técnica para implementação no front-end.
                  </li>
                </ul>
              </article>
            </div>
          </div>

          {/* Formação Acadêmica */}
          <div className="about-timeline-section reveal-item motion-item" style={{ '--motion-delay': '300ms' } as React.CSSProperties}>
            <div className="timeline-section-title">
              <span className="micro">// FORMAÇÃO ACADÊMICA</span>
              <h3>Graduação &amp; Educação</h3>
            </div>

            <div className="timeline-items">
              <article className="timeline-item motion-item" style={{ '--motion-delay': '340ms' } as React.CSSProperties}>
                <span className="timeline-marker" aria-hidden="true" />
                <div className="timeline-period micro">02/2022 – 12/2024</div>
                <h4 className="timeline-role">
                  Graduação Tecnológica em Análise e Desenvolvimento de Sistemas (ADS)
                </h4>
                <p className="timeline-company">
                  Faculdade de Tecnologia de Franca &quot;Doutor Thomaz Novelino&quot; (FATEC)
                </p>
                <p className="timeline-desc">
                  Formação superior com sólida fundamentação em engenharia de software, modelagem de banco de dados, arquitetura web, redes e infraestrutura.
                </p>
              </article>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
