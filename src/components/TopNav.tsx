import { useEffect, useState } from 'react';

interface TopNavProps {
  menuOpen: boolean;
  onToggleMenu: () => void;
  onCloseMenu: () => void;
  onNavigate: (hash: string) => void;
}

function getLocalTimeData() {
  const date = new Date();
  const minutes = -date.getTimezoneOffset();
  const abs = Math.abs(minutes);
  const pad = (n: number) => String(n).padStart(2, '0');
  const label = `GMT${minutes >= 0 ? '+' : '−'}${pad(Math.floor(abs / 60))}:${pad(abs % 60)} // LOCAL`;
  const time = `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
  return { label, time, iso: date.toISOString() };
}

export default function TopNav({ menuOpen, onToggleMenu, onCloseMenu, onNavigate }: TopNavProps) {
  const [clock, setClock] = useState(getLocalTimeData);

  useEffect(() => {
    let timer: number | undefined;
    const update = () => setClock(getLocalTimeData());

    const start = () => {
      window.clearInterval(timer);
      update();
      if (!document.hidden) {
        timer = window.setInterval(update, 1000);
      }
    };

    document.addEventListener('visibilitychange', start);
    start();

    return () => {
      window.clearInterval(timer);
      document.removeEventListener('visibilitychange', start);
    };
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, hash: string) => {
    e.preventDefault();
    onCloseMenu();
    onNavigate(hash);
  };

  const rollingWord = (word: string) => {
    return Array.from(word).map((char, i) => (
      <span
        key={i}
        className="roll-letter"
        style={{ '--i': i } as React.CSSProperties}
        aria-hidden="true"
      >
        <span className="roll-track">
          <span>{char}</span>
          <span>{char}</span>
        </span>
      </span>
    ));
  };

  return (
    <>
      <header className="top-nav" aria-label="Navegação principal">
        <div id="clockBlock" className="clock">
          <span id="clockLabel" className="clock-label">
            {clock.label}
          </span>
          <time id="clockTime" className="clock-time" dateTime={clock.iso}>
            {clock.time}
          </time>
        </div>

        <button
          id="menuTrigger"
          className="menu-trigger"
          type="button"
          aria-controls="menuPanel"
          aria-expanded={menuOpen}
          aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
          onClick={onToggleMenu}
        >
          <span className="menu-mark" aria-hidden="true">
            <i style={{ height: '3px' }} />
            <i style={{ height: '7px' }} />
            <i style={{ height: '12px' }} />
            <i style={{ height: '4px' }} />
            <i style={{ height: '8px' }} />
            <i style={{ height: '6px' }} />
            <i style={{ height: '3px' }} />
          </span>
          <span>MENU</span>
        </button>
      </header>

      {menuOpen && (
        <button
          id="menuScrim"
          className="menu-scrim"
          aria-label="Fechar menu"
          onClick={onCloseMenu}
        />
      )}

      {menuOpen && (
        <nav
          id="menuPanel"
          className="menu-panel"
          role="dialog"
          aria-modal="true"
          aria-label="Menu expandido"
        >
          <div className="menu-links">
            <a
              className="rolling-link"
              href="#about"
              onClick={(e) => handleLinkClick(e, '#about')}
            >
              <span className="sr-only">Sobre</span>
              {rollingWord('Sobre')}
            </a>
            <a
              className="rolling-link"
              href="#about-me"
              onClick={(e) => handleLinkClick(e, '#about-me')}
            >
              <span className="sr-only">Trajetória</span>
              {rollingWord('Trajetória')}
            </a>
            <a
              className="rolling-link"
              href="#work"
              onClick={(e) => handleLinkClick(e, '#work')}
            >
              <span className="sr-only">Projetos</span>
              {rollingWord('Projetos')}
            </a>
            <a
              className="rolling-link"
              href="#contact"
              onClick={(e) => handleLinkClick(e, '#contact')}
            >
              <span className="sr-only">Contato</span>
              {rollingWord('Contato')}
            </a>
          </div>

          <div className="menu-foot micro">
            <span>JOSÉ GOULART / PORTFÓLIO</span>
            <span>CÓDIGO &amp; INTERFACES</span>
          </div>
        </nav>
      )}
    </>
  );
}
