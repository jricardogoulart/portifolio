import { useEffect, useRef, useState } from 'react';
import { Service } from '../data/portfolioData';

interface ServicesSectionProps {
  services: Service[];
}

interface TechItem {
  name: string;
  svg: React.ReactNode;
}

const TECH_STACK: TechItem[] = [
  {
    name: 'React',
    svg: (
      <svg width="34" height="34" viewBox="-11.5 -10.23174 23 20.46348" fill="none" stroke="currentColor" strokeWidth="1">
        <circle cx="0" cy="0" r="2.05" fill="currentColor" stroke="none" />
        <ellipse rx="11" ry="4.2" />
        <ellipse rx="11" ry="4.2" transform="rotate(60)" />
        <ellipse rx="11" ry="4.2" transform="rotate(120)" />
      </svg>
    )
  },
  {
    name: 'TypeScript',
    svg: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
        <path d="M3 3h18v18H3V3zm8.7 10.3h-2v5.2H7.9v-5.2H5.9v-1.6h5.8v1.6zm7.4 2.8c-.3.7-.8 1.3-1.4 1.7-.7.4-1.5.6-2.5.6-1 0-1.8-.2-2.5-.7-.7-.5-1.1-1.2-1.3-2.1l1.7-.5c.1.5.4.9.8 1.2.4.3.9.4 1.5.4.5 0 1-.1 1.3-.3.3-.2.5-.5.5-.9 0-.3-.1-.5-.4-.7-.3-.2-.7-.4-1.3-.5l-.8-.2c-.9-.3-1.6-.6-2.1-1-.5-.4-.7-1-.7-1.8 0-.8.3-1.5.9-2 .6-.5 1.4-.8 2.3-.8.9 0 1.7.2 2.3.6.6.4 1 .9 1.2 1.6l-1.6.6c-.1-.4-.3-.7-.6-.9-.3-.2-.7-.3-1.2-.3-.5 0-.9.1-1.2.3-.3.2-.4.4-.4.8 0 .3.1.5.4.7.2.2.7.3 1.3.5l.8.2c1 .3 1.8.7 2.2 1.1.4.4.7 1 .7 1.8z" />
      </svg>
    )
  },
  {
    name: 'Node.js',
    svg: (
      <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2l8.5 5v10L12 22l-8.5-5V7L12 2z" />
        <path d="M12 2v20M3.5 7l17 10M20.5 7L3.5 17" opacity="0.3" />
      </svg>
    )
  },
  {
    name: 'JavaScript',
    svg: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
        <path d="M3 3h18v18H3V3zm9.8 14.5c.4.6.9 1 1.5 1.3.6.3 1.3.4 2 .4.8 0 1.5-.2 2.1-.6.6-.4.9-1 .9-1.8 0-.6-.2-1.1-.6-1.5-.4-.4-1.1-.7-2-1l-.7-.3c-.6-.2-1.1-.5-1.4-.7-.3-.3-.5-.6-.5-1.1 0-.5.2-.9.6-1.2.4-.3.9-.5 1.6-.5.6 0 1.1.1 1.6.4.4.3.7.7.9 1.3l1.5-.8c-.3-.8-.8-1.4-1.5-1.8-.7-.4-1.5-.6-2.5-.6-1 0-1.8.3-2.4.8-.6.5-.9 1.2-.9 2 0 .6.2 1.2.6 1.6.4.4 1 .8 1.8 1.1l.7.3c.7.3 1.2.6 1.5.9.3.3.4.7.4 1.1 0 .5-.2.9-.6 1.3-.4.3-1 .5-1.7.5-.7 0-1.3-.2-1.8-.5-.5-.4-.8-.9-1-1.6l-1.9.9zm-4.5.3c.3.5.7.8 1.2 1.1.5.3 1.1.4 1.7.4.7 0 1.3-.2 1.7-.5.4-.3.7-.8.7-1.4v-6.6h-2v6.4c0 .3-.1.5-.2.7-.2.2-.4.2-.8.2-.3 0-.6-.1-.8-.2l-.7 1.4z" />
      </svg>
    )
  },
  {
    name: 'Vue.js',
    svg: (
      <svg width="34" height="34" viewBox="0 0 24 24" fill="currentColor">
        <path d="M2 3h3.5L12 14.2 18.5 3H22L12 21 2 3z" />
        <path d="M6.5 3h3.5L12 6.5 14 3h3.5L12 12 6.5 3z" opacity="0.4" />
      </svg>
    )
  },
  {
    name: 'Tailwind CSS',
    svg: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.336 6.182 14.975 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.336 13.382 8.975 12 6.001 12z" />
      </svg>
    )
  },
  {
    name: 'Vite',
    svg: (
      <svg width="34" height="34" viewBox="0 0 24 24" fill="currentColor">
        <path d="M21.5 3.5l-9.1 17-9-17h18.1zm-8.8 1.8l-5.6 10.8 4.2-1.2-1.8 4.8 6.5-9.8-3.9 1.1 2.4-5.7h-1.8z" />
      </svg>
    )
  },
  {
    name: 'HTML5',
    svg: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
        <path d="M4 2l1.6 18 6.4 1.8 6.4-1.8L20 2H4zm13.3 5.4l-.2 2.3H8.8l.2 2.3h6.9l-.6 6.5-3.3.9-3.3-.9-.2-2.7h2l.1 1.3 1.4.4 1.4-.4.2-2.4H8.4L7.8 5.1h9.7l-.2 2.3z" />
      </svg>
    )
  },
  {
    name: 'CSS3',
    svg: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
        <path d="M4 2l1.6 18 6.4 1.8 6.4-1.8L20 2H4zm12.3 5.3H8.3l-.2-2.2h8.4l-.2 2.2zm-.3 3.3l-.2 2.3h-6.8l.2 2.3h4.6l-.3 3.4-2.3.6-2.3-.6-.1-1.7H7.2l.3 3.2 4.5 1.2 4.5-1.2.7-7.9h-8l-.2-2.3h7.6l.2-2.3z" />
      </svg>
    )
  },
  {
    name: 'Docker',
    svg: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="currentColor">
        <path d="M13 8h2v2h-2V8zm-3 0h2v2h-2V8zm-3 0h2v2H7V8zm6-3h2v2h-2V5zm-3 0h2v2h-2V5zm-3 0h2v2H7V5zm6 6h2v2h-2v-2zm-3 0h2v2h-2v-2zm-3 0h2v2H7v-2zm-3 0h2v2H4v-2zm17.5.3c-.4-.3-1.4-.4-2-.2-.2-.6-.6-1.1-1.1-1.5l-.6-.4-.4.6c-.3.4-.4 1-.4 1.6-.6.2-1.6.4-2.5.4H2.4c-.2.9 0 2 .5 2.9C3.9 18.2 6.8 20 10.7 20c5.3 0 9.8-3.1 10.8-7.7.7.1 1.5-.1 1.9-.6.2-.3.2-.7 0-1-.3-.2-.6-.3-.9-.4z" />
      </svg>
    )
  },
  {
    name: 'Git',
    svg: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
        <path d="M21.6 10.9L13.1 2.4c-.5-.5-1.4-.5-1.9 0l-1.9 1.9 2.4 2.4c.5-.2 1.2 0 1.6.4.4.4.6 1.1.4 1.6l2.3 2.3c.6-.2 1.2 0 1.6.4.6.6.6 1.6 0 2.2-.6.6-1.6.6-2.2 0-.5-.5-.6-1.2-.4-1.8L12.7 9v4.9c.2.1.4.3.5.5.6.6.6 1.6 0 2.2-.6.6-1.6.6-2.2 0-.6-.6-.6-1.6 0-2.2.2-.2.4-.4.6-.5V8.9c-.2-.1-.4-.3-.6-.5-.5-.5-.6-1.2-.4-1.8L8.2 4.2 2.4 10c-.5.5-.5 1.4 0 1.9l8.5 8.5c.5.5 1.4.5 1.9 0l8.8-8.8c.5-.5.5-1.3 0-1.7z" />
      </svg>
    )
  },
  {
    name: 'Python',
    svg: (
      <svg width="34" height="34" viewBox="0 0 24 24" fill="currentColor">
        <path d="M11.9 2c-3.1 0-5 .8-5 2.5v1.9h5v.6H4.4C2.5 7 1 8.8 1 11.2c0 2.6 1.6 4.3 3.8 4.3h1.6v-2.2c0-1.7 1.4-3.1 3.1-3.1h5.3c1.4 0 2.5-1.1 2.5-2.5V4.5C17.3 2.8 15 2 11.9 2zm-1.4 1.5c.5 0 .9.4.9.9s-.4.9-.9.9-.9-.4-.9-.9.4-.9.9-.9zm1.6 18.5c3.1 0 5-.8 5-2.5v-1.9h-5v-.6h7.5c1.9 0 3.4-1.8 3.4-4.2 0-2.6-1.6-4.3-3.8-4.3h-1.6v2.2c0 1.7-1.4 3.1-3.1 3.1H8.6c-1.4 0-2.5 1.1-2.5 2.5v3.2c0 1.7 2.3 2.5 5.4 2.5zm1.4-1.5c-.5 0-.9-.4-.9-.9s.4-.9.9-.9.9.4.9.9-.4.9-.9.9z" />
      </svg>
    )
  },
  {
    name: 'SQLite',
    svg: (
      <svg width="34" height="34" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.5 2 2 3.8 2 6v12c0 2.2 4.5 4 10 4s10-1.8 10-4V6c0-2.2-4.5-4-10-4zm0 2c4.7 0 8 1.4 8 2s-3.3 2-8 2-8-1.4-8-2 3.3-2 8-2zm8 14c0 .6-3.3 2-8 2s-8-1.4-8-2v-2.3c2 .9 4.8 1.4 8 1.4s6-.5 8-1.4V18zm0-4.5c0 .6-3.3 2-8 2s-8-1.4-8-2v-2.3c2 .9 4.8 1.4 8 1.4s6-.5 8-1.4v2.3z" />
      </svg>
    )
  },
  {
    name: 'Three.js',
    svg: (
      <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M3 6.5L12 2l9 4.5v11L12 22 3 17.5v-11z" />
        <path d="M12 2v20M3 6.5l9 5.5 9-5.5" />
      </svg>
    )
  }
];

export default function ServicesSection({ services }: ServicesSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [openServiceIds, setOpenServiceIds] = useState<string[]>([]);

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

  const toggleService = (id: string) => {
    setOpenServiceIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <section
      id="services"
      tabIndex={-1}
      ref={sectionRef}
      className="container-section services reveal"
    >
      <div className="services-head">
        <h2 className="services-title reveal-item">
          <span>CÓDIGO BEM ESTRUTURADO.</span>
          <span>EXPERIÊNCIAS COM INTENÇÃO.</span>
        </h2>
        <p className="kicker">// ÁREAS EM FOCO</p>
      </div>

      {/* Marquee horizontal de logos translúcidos */}
      <div className="tech-marquee-container reveal-item" aria-label="Tecnologias e ferramentas">
        <div className="tech-marquee-track">
          {[...TECH_STACK, ...TECH_STACK].map((tech, index) => (
            <div
              key={`${tech.name}-${index}`}
              className="tech-logo-item"
              title={tech.name}
              aria-label={tech.name}
            >
              <div className="tech-logo-svg">{tech.svg}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="service-list">
        <div className="service-columns" aria-hidden="true">
          <span />
          <span>ÁREA</span>
          <span>TECNOLOGIAS &amp; CONTEXTO</span>
          <span />
        </div>

        {services.map((service, index) => {
          const isOpen = openServiceIds.includes(service.id);

          return (
            <article
              key={service.id}
              className="service-row reveal-item"
              style={{ '--reveal-delay': `${index * 85}ms` } as React.CSSProperties}
            >
              <div className="service-summary">
                <span className="service-id">{service.id}</span>
                <h3 className="service-title">{service.title}</h3>
                <p className="service-scope">{service.scope}</p>

                <button
                  type="button"
                  className="disclosure-button"
                  aria-expanded={isOpen}
                  aria-controls={`service-panel-${service.id}`}
                  aria-label={`${isOpen ? 'Fechar' : 'Explorar'} ${service.title}`}
                  onClick={() => toggleService(service.id)}
                >
                  <span className="disclosure-label">
                    {isOpen ? 'Fechar' : 'Explorar'}
                  </span>
                  <span className="disclosure-symbol" aria-hidden="true">
                    {isOpen ? '−' : '+'}
                  </span>
                </button>
              </div>

              {/* Acordeon animado com grid transition suave */}
              <div
                id={`service-panel-${service.id}`}
                className={`service-accordion ${isOpen ? 'open' : ''}`}
              >
                <div className="service-accordion-inner">
                  <div className="service-panel">
                    <p>{service.text}</p>
                    <p>
                      <strong>Projetos e evidências:</strong> {service.deliverables}
                    </p>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      <div className="services-notes">
        <p>Da interface à integração, da web ao desktop.</p>
        <p>Foco declarado no perfil / Evidências nos repositórios</p>
      </div>
    </section>
  );
}
