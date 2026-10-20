import { useState, useEffect } from 'react';
import { PERSONA } from '../data/portfolioData';

const PHRASES = [
  "Vamos criar algo que importa.",
  "Vamos otimizar as suas operações.",
  "Vamos superar os obstáculos.",
  "Vamos otimizar as suas métricas.",
  "Vamos inovar juntos."
];

export default function ContactSection() {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [copied, setCopied] = useState(false);

  // Efeito de digitação suave (Typing Effect)
  useEffect(() => {
    const currentPhrase = PHRASES[phraseIndex];
    let timeout: NodeJS.Timeout;

    if (!isDeleting) {
      // Digitando
      if (displayText.length < currentPhrase.length) {
        timeout = setTimeout(() => {
          setDisplayText(currentPhrase.slice(0, displayText.length + 1));
        }, 65);
      } else {
        // Pausa ao completar a frase
        timeout = setTimeout(() => {
          setIsDeleting(true);
        }, 2200);
      }
    } else {
      // Apagando
      if (displayText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayText(currentPhrase.slice(0, displayText.length - 1));
        }, 35);
      } else {
        // Passa para a próxima frase
        setIsDeleting(false);
        setPhraseIndex((prev) => (prev + 1) % PHRASES.length);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, phraseIndex]);

  const handleCopyEmail = () => {
    if (PERSONA.email) {
      navigator.clipboard?.writeText(PERSONA.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    }
  };

  const email = PERSONA.email || 'jricardogoulart@gmail.com';
  const linkedin = PERSONA.socialLinks.find(
    (l) => l.label.toLowerCase() === 'linkedin'
  );
  const otherSocials = PERSONA.socialLinks.filter(
    (l) => l !== linkedin
  );

  return (
    <section
      id="contact"
      tabIndex={-1}
      className="container-section contact"
      aria-label="Contato"
    >
      <h2 className="kicker">// Contato</h2>

      {/* Headline com efeito de digitação dinâmico */}
      <div className="contact-title" aria-label={displayText || PHRASES[0]}>
        <span style={{ minHeight: '1.8em', display: 'inline-block' }}>
          {displayText}
          <span className="contact-typing-cursor" aria-hidden="true" />
        </span>
      </div>

      <div className="contact-body">
        <div className="contact-text">
          <p>
            Uma ideia, um projeto ou uma oportunidade em desenvolvimento de software?
            Vamos conversar sobre o que você está construindo.
          </p>
          <span className="micro">APLICAÇÕES WEB / INTERFACES / INTEGRAÇÕES</span>
        </div>

        <div className="contact-links">
          {/* E-mail como canal principal e prioritário */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <a
              id="primaryContactLink"
              className="pill contact-email-btn"
              href={`mailto:${email}`}
              aria-label={`Enviar e-mail para ${email}`}
            >
              <span>{email}</span>
              <span className="arrow" aria-hidden="true">↗</span>
            </a>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <button
                type="button"
                onClick={handleCopyEmail}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#888',
                  font: '11px var(--utility)',
                  cursor: 'pointer',
                  padding: 0,
                  textDecoration: 'underline'
                }}
              >
                {copied ? '✓ E-mail copiado!' : 'Copiar e-mail'}
              </button>
            </div>
          </div>

          {/* LinkedIn e Redes Sociais */}
          <div id="socialLinks" className="socials">
            {linkedin && (
              <a
                href={linkedin.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#fff', fontWeight: 500 }}
                aria-label={`Perfil de ${PERSONA.fullName} no LinkedIn`}
              >
                {linkedin.label} <span aria-hidden="true">↗</span>
              </a>
            )}
            {otherSocials.map((social) => (
              <a
                key={social.label}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {social.label} <span aria-hidden="true">↗</span>
              </a>
            ))}
          </div>

          <p id="contactLocation" className="contact-location">
            {PERSONA.location}
          </p>
        </div>
      </div>
    </section>
  );
}
