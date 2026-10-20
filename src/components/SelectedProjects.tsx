import { useEffect, useRef } from 'react';
import { Project, BUILTIN_ART } from '../data/portfolioData';

interface SelectedProjectsProps {
  projects: Project[];
  onOpenProject: (project: Project) => void;
  onNavigate: (hash: string) => void;
}

export default function SelectedProjects({
  projects,
  onOpenProject,
  onNavigate
}: SelectedProjectsProps) {
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
      id="work"
      tabIndex={-1}
      ref={sectionRef}
      className="container-section work reveal"
    >
      <div className="section-header">
        <h2 className="kicker">// Projetos selecionados</h2>
        <p className="micro">{projects.length} PROJETOS SELECIONADOS / 2024–2026</p>
      </div>

      <div className="project-index">
        <div className="work-columns" aria-hidden="true">
          <span>ÍNDICE</span>
          <span>PROJETO</span>
          <span>FOCO</span>
          <span>ANO</span>
          <span />
        </div>

        {projects.map((project, index) => {
          const artSrc = BUILTIN_ART[project.coverKey] || BUILTIN_ART.portfolio;

          return (
            <button
              key={project.id}
              type="button"
              className="project-row reveal-item"
              style={{ '--reveal-delay': `${index * 85}ms` } as React.CSSProperties}
              aria-label={`Ver detalhes do projeto ${project.title}`}
              onClick={() => onOpenProject(project)}
            >
              <span className="project-number">{project.id}</span>
              <span className="project-title">
                {project.title}
                {project.deployUrl && (
                  <span
                    style={{
                      display: 'inline-block',
                      marginLeft: '12px',
                      fontSize: '10px',
                      fontFamily: 'var(--utility)',
                      background: 'rgba(255, 99, 15, 0.18)',
                      color: 'var(--orange)',
                      border: '1px solid rgba(255, 99, 15, 0.4)',
                      padding: '2px 8px',
                      borderRadius: '12px',
                      verticalAlign: 'middle',
                      letterSpacing: '0.04em'
                    }}
                  >
                    ● Deploy Live
                  </span>
                )}
                <span className="project-mobile-discipline">{project.discipline}</span>
              </span>
              <span className="discipline">{project.discipline}</span>
              <span className="year">{project.year}</span>
              <span className="project-arrow" aria-hidden="true">
                ↗
              </span>

              <span className="project-preview" aria-hidden="true">
                <img
                  src={artSrc}
                  width={180}
                  height={180}
                  alt=""
                />
              </span>
            </button>
          );
        })}
      </div>

      <div className="work-cta">
        <p className="micro">TEM UM PROJETO EM MENTE?</p>
        <a
          className="pill"
          href="#contact"
          onClick={(e) => {
            e.preventDefault();
            onNavigate('#contact');
          }}
        >
          Vamos conversar <span className="arrow" aria-hidden="true">↗</span>
        </a>
      </div>
    </section>
  );
}
