import { useState } from 'react';
import Hero from './components/Hero';
import Navigation from './components/Navigation';
import Typography from './components/Typography';
import ColorPalette from './components/ColorPalette';
import Components from './components/Components';
import FloatingActions from './components/FloatingActions';
import About from './components/About';

export default function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [showAbout, setShowAbout] = useState(true);

  if (showAbout) {
    return (
      <>
        <button 
          onClick={() => setShowAbout(false)}
          className="fixed top-4 right-4 z-[9999] bg-[#ff004d] text-white px-4 py-2 font-['IBM_Plex_Mono'] text-xs hover:bg-white hover:text-black transition-colors rounded-none"
        >
          View Archetype Showcase
        </button>
        <About />
      </>
    );
  }

  return (
    <div className="relative min-h-screen bg-[#0a0a0a]">
      <button 
        onClick={() => setShowAbout(true)}
        className="fixed top-4 right-4 z-[9999] bg-white text-black px-4 py-2 font-['IBM_Plex_Mono'] text-xs hover:bg-[#ff004d] hover:text-white transition-colors rounded-none"
      >
        View About Page
      </button>
      <Navigation activeSection={activeSection} setActiveSection={setActiveSection} />
      <Hero />
      <Typography />
      <ColorPalette />
      <Components />
      <FloatingActions />
      
      {/* Footer */}
      <footer className="relative overflow-hidden border-t border-white/5 bg-[#0a0a0a] py-20">
        {/* Gradient Background */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute left-0 top-0 h-full w-1/3 bg-gradient-to-r from-[#ff004d]/20 to-transparent"></div>
          <div className="absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-[#85a1c5]/20 to-transparent"></div>
        </div>
        
        <div className="container relative mx-auto px-6">
          <div className="mb-12 grid gap-12 md:grid-cols-3">
            {/* Brand */}
            <div>
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center border-2 border-[#ff004d]">
                  <div className="h-3 w-3 bg-[#ff004d]"></div>
                </div>
                <div className="font-['Syne'] text-3xl font-bold text-white">
                  ARCHETYPE
                </div>
              </div>
              <p className="font-['DM_Sans'] text-sm leading-relaxed text-white/50">
                Sistema de design tokens premium extraído de referências globais.
              </p>
            </div>
            
            {/* Links */}
            <div>
              <h4 className="mb-4 font-['Syne'] text-sm font-bold uppercase text-white">
                Recursos
              </h4>
              <ul className="space-y-2 font-['DM_Sans'] text-sm text-white/50">
                <li className="hover:text-white">Documentação</li>
                <li className="hover:text-white">Componentes</li>
                <li className="hover:text-white">Tokens</li>
                <li className="hover:text-white">Github</li>
              </ul>
            </div>
            
            {/* Info */}
            <div>
              <h4 className="mb-4 font-['Syne'] text-sm font-bold uppercase text-white">
                Inspiração
              </h4>
              <ul className="space-y-2 font-['IBM_Plex_Mono'] text-xs text-white/40">
                <li>→ Floema</li>
                <li>→ Tribe</li>
                <li>→ Archidomo</li>
              </ul>
            </div>
          </div>
          
          {/* Bottom Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-8">
            <div className="font-['IBM_Plex_Mono'] text-xs text-white/30">
              © 2024 Archetype — Design System v2.0
            </div>
            <div className="flex items-center gap-4 font-['IBM_Plex_Mono'] text-xs text-white/30">
              <span>MIT License</span>
              <span>•</span>
              <span>Made with React + Vite + GSAP</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
