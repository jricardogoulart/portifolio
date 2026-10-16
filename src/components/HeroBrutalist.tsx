import { useState, useEffect } from 'react';

/**
 * HeroBrutalist - Inspired by runrobrun.com
 * Editorial Brutalist layout with split massive H1, live location clock,
 * and anchor ready for procedural 3D WebGL blob.
 */
export default function HeroBrutalist() {
  const [timeString, setTimeString] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeString(
        now.toLocaleTimeString('pt-BR', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        })
      );
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="hero-brutalist-container" aria-label="Hero Section">
      {/* Top Split Display Headline */}
      <div className="hero-row-top">
        <h1 className="hero-split-text hero-text-top">CREATIVE</h1>
      </div>

      {/* Central Anchor for 3D WebGL Blob (Phase 999.4) */}
      <div className="hero-center-anchor" id="hero-3d-portal" aria-hidden="true">
        {/* Placeholder for 3D Blob */}
      </div>

      {/* Bottom Split Display Headline */}
      <div className="hero-row-bottom">
        <div className="hero-split-text hero-text-bottom">DEVELOPER</div>
      </div>

      {/* Meta Left: Bio & About */}
      <div className="hero-meta-left">
        <span className="hero-meta-label">ABOUT</span>
        <p className="hero-bio-text">
          CRIANDO EXPERIÊNCIAS WEB EXPRESSIVAS E ARQUITETURAS ESCALÁVEIS.
          FULL STACK DEVELOPER &amp; CREATIVE CODER.
        </p>
      </div>

      {/* Meta Right: Live Location & Clock */}
      <div className="hero-meta-right">
        <span>LOCATION: BRASIL / FRANCA-SP</span>
        <span className="hero-clock">{timeString || '--:--:--'}</span>
      </div>
    </section>
  );
}
