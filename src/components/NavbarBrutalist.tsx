import React from 'react';

/**
 * NavbarBrutalist - Minimalist Swiss Editorial Navbar
 * Inspired by runrobrun.com (Robert Aperios)
 * Displays 'JOSÉ GOULART' on the left, and uppercase monospace links with
 * an orange accent square on 'LET'S CREATE ■'.
 */
export default function NavbarBrutalist() {
  const scrollTo = (targetId: string) => {
    let target = document.getElementById(targetId);
    if (!target) {
      if (targetId === 'about') target = document.getElementById('sobre');
      if (targetId === 'portfolio') target = document.getElementById('portifolio');
      if (targetId === 'contact') target = document.getElementById('contato');
    }

    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="navbar-brutalist" role="banner">
      {/* Branding left */}
      <div
        className="nav-logo"
        onClick={scrollToTop}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && scrollToTop()}
        aria-label="Voltar ao início"
      >
        JOSÉ GOULART
      </div>

      {/* Navigation right */}
      <nav className="nav-links" aria-label="Navegação Principal">
        <button
          type="button"
          onClick={() => scrollTo('about')}
          className="nav-link"
        >
          ABOUT
        </button>

        <button
          type="button"
          onClick={() => scrollTo('portfolio')}
          className="nav-link"
        >
          WORK
        </button>

        <button
          type="button"
          onClick={() => scrollTo('contact')}
          className="nav-link nav-link-cta"
        >
          LET'S CREATE
          <span className="nav-accent-sq" aria-hidden="true" />
        </button>
      </nav>
    </header>
  );
}
