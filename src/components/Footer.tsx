import { PERSONA } from '../data/portfolioData';
import ArrowIcon from './ArrowIcon';

interface FooterProps {
  onBackToTop: () => void;
}

export default function Footer({ onBackToTop }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="footerContent" className="container-section" style={{ paddingBottom: '30px' }}>
      <div className="footer" style={{ marginTop: '70px' }}>
        <p>
          © <span id="currentYear">{currentYear}</span>{' '}
          <span id="ownerName">{PERSONA.firstName} {PERSONA.lastName}</span>
        </p>

        <a
          className="back-to-top"
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            onBackToTop();
          }}
        >
          Voltar ao topo <ArrowIcon direction="up" />
        </a>
      </div>

      <p className="footer-note">
        Seleção de projetos públicos do GitHub. Anos de criação dos repositórios. Artes conceituais, não capturas das aplicações.
      </p>
    </footer>
  );
}
