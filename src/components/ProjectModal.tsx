import { useEffect, useRef } from 'react';
import { Project, BUILTIN_ART } from '../data/portfolioData';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (project) {
      if (typeof dialog.showModal === 'function') {
        if (!dialog.open) dialog.showModal();
      } else {
        dialog.setAttribute('open', '');
      }
      document.body.classList.add('modal-open');
      closeButtonRef.current?.focus();
    } else {
      if (typeof dialog.close === 'function') {
        if (dialog.open) dialog.close();
      } else {
        dialog.removeAttribute('open');
      }
      document.body.classList.remove('modal-open');
    }

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.classList.remove('modal-open');
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  const artSrc = BUILTIN_ART[project.coverKey] || BUILTIN_ART.portfolio;

  return (
    <dialog
      id="studyDialog"
      ref={dialogRef}
      className="study-dialog"
      aria-labelledby="dialogTitle"
      onClick={(e) => {
        // Close when clicking directly on the backdrop
        if (e.target === dialogRef.current) onClose();
      }}
    >
      <div className="dialog-toolbar">
        <p id="dialogLabel" className="micro">
          DETALHES DO PROJETO
        </p>
        <button
          type="button"
          id="dialogClose"
          ref={closeButtonRef}
          className="dialog-close"
          aria-label="Fechar detalhes do projeto"
          onClick={onClose}
        >
          Fechar <span aria-hidden="true">×</span>
        </button>
      </div>

      <div className="dialog-inner">
        <h2 id="dialogTitle" className="dialog-title">
          {project.title}
        </h2>
        <p id="dialogSummary" className="dialog-summary">
          {project.summary}
        </p>

        <div className="dialog-art">
          <img
            id="dialogArtwork"
            src={artSrc}
            width={540}
            height={540}
            alt={`Ilustração conceitual do projeto ${project.title}`}
          />
        </div>

        <div className="dialog-meta">
          <div>
            <span className="meta-label">AUTORIA &amp; CONTEXTO</span>
            <p id="dialogRole">{project.role}</p>
          </div>
          <div>
            <span className="meta-label">TECNOLOGIAS CONFIRMADAS</span>
            <p id="dialogTech">{project.technologies.join(' / ')}</p>
          </div>
        </div>

        <section className="dialog-section">
          <h3>Sobre a implementação</h3>
          <p id="dialogApproach">{project.approach}</p>
        </section>

        <section className="dialog-section">
          <h3>Recursos documentados</h3>
          <ul id="dialogFeatures">
            {project.features.map((feat, i) => (
              <li key={i}>{feat}</li>
            ))}
          </ul>
        </section>

        <div className="dialog-source" style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
          {project.deployUrl && (
            <a
              id="dialogDeploy"
              className="pill"
              href={project.deployUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{ background: 'var(--orange)', color: '#000', fontWeight: 600 }}
            >
              Acessar Deploy Online <span className="arrow" aria-hidden="true">↗</span>
            </a>
          )}
          <a
            id="dialogSource"
            className="pill"
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            Ver no GitHub <span className="arrow" aria-hidden="true">↗</span>
          </a>
          <p id="dialogNote" className="micro" style={{ width: '100%', marginTop: '8px' }}>
            {project.note}
          </p>
        </div>
      </div>
    </dialog>
  );
}
