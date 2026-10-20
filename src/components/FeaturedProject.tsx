import { useEffect, useRef } from 'react';
import { Project, BUILTIN_ART } from '../data/portfolioData';
import ArrowIcon from './ArrowIcon';

interface FeaturedProjectProps {
  project: Project;
  onOpenProject: (project: Project) => void;
  onFeaturedPointerMove: (e: React.PointerEvent) => void;
  onFeaturedPointerLeave: () => void;
}

export default function FeaturedProject({
  project,
  onOpenProject,
  onFeaturedPointerMove,
  onFeaturedPointerLeave
}: FeaturedProjectProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const artRef = useRef<HTMLButtonElement>(null);

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
      { threshold: 0.22 }
    );

    el.classList.add('pending');
    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  const handlePointerMove = (e: React.PointerEvent) => {
    onFeaturedPointerMove(e);

    // 3D tilt calculation
    const art = artRef.current;
    if (!art) return;
    const rect = art.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    const tiltX = -y * 24;
    const tiltY = x * 24;

    art.style.setProperty('--tilt-x', `${tiltX.toFixed(2)}deg`);
    art.style.setProperty('--tilt-y', `${tiltY.toFixed(2)}deg`);
  };

  const handlePointerLeave = () => {
    onFeaturedPointerLeave();
    const art = artRef.current;
    if (art) {
      art.style.setProperty('--tilt-x', '0deg');
      art.style.setProperty('--tilt-y', '0deg');
    }
  };

  const artSrc = BUILTIN_ART[project.coverKey] || BUILTIN_ART.portfolio;

  return (
    <section
      id="featured"
      tabIndex={-1}
      ref={sectionRef}
      className="container-section featured motion-section reveal"
    >
      <div className="motion-divider" aria-hidden="true" />

      <div className="section-header">
        <h2 className="kicker motion-kicker">// Projeto em destaque</h2>
        <p id="featuredRepoMeta" className="micro motion-item" style={{ '--motion-delay': '80ms' } as React.CSSProperties}>
          REPOSITÓRIO PÚBLICO // {project.year}
        </p>
      </div>

      <div id="featuredProjectTitle" className="featured-title reveal-item motion-title">
        <span>
          {(project.featuredLines && project.featuredLines[0]) || project.title.toUpperCase()}
          <sup aria-hidden="true">[{project.id}]</sup>
        </span>
        {project.featuredLines && project.featuredLines[1] && (
          <span>{project.featuredLines[1]}</span>
        )}
      </div>

      <button
        type="button"
        id="featuredArt"
        ref={artRef}
        data-project={project.id}
        className="featured-art reveal-item motion-card"
        style={{ '--motion-delay': '140ms' } as React.CSSProperties}
        aria-label={`Ver detalhes do projeto ${project.title}`}
        onClick={() => onOpenProject(project)}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
      >
        <span className="art-wrap">
          <img
            src={artSrc}
            width={347}
            height={347}
            alt={`Ilustração conceitual de ${project.title}`}
          />
        </span>
        <span className="art-center-arrow" aria-hidden="true">
          <ArrowIcon />
        </span>
      </button>

      <div className="grid-band motion-item" style={{ '--motion-delay': '180ms' } as React.CSSProperties} aria-hidden="true">
        <p className="micro">{project.id} / CATÁLOGO DIGITAL RESPONSIVO — DEPLOY ONLINE.</p>
      </div>

      <div className="featured-caption reveal-item motion-item" style={{ '--motion-delay': '220ms' } as React.CSSProperties}>
        <h3 id="featuredProjectCaption">
          {project.title} — {project.caption}
        </h3>
        <p id="featuredProjectStack">
          {project.technologies.slice(0, 4).join(' / ')}
        </p>

        <div className="featured-actions" style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
          {project.deployUrl && (
            <a
              href={project.deployUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="pill motion-cta"
              style={{ background: 'var(--orange)', color: '#000', fontWeight: 600 }}
              aria-label={`Acessar demonstração ao vivo de ${project.title}`}
            >
              Ver Demonstração Online <ArrowIcon className="arrow" />
            </a>
          )}
          <button
            type="button"
            className="pill motion-cta"
            onClick={() => onOpenProject(project)}
          >
            Detalhes do projeto <ArrowIcon className="arrow" />
          </button>
        </div>

        <p className="featured-art-note">
          {project.deployUrl ? 'Deploy online ativo no GitHub Pages' : 'Ilustração conceitual / não é uma captura da aplicação'}
        </p>
      </div>
    </section>
  );
}
