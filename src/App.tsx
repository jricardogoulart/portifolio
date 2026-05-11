import { useState } from 'react';
import Hero from './components/Hero';
import Navigation from './components/Navigation';
import Typography from './components/Typography';
import ColorPalette from './components/ColorPalette';
import Components from './components/Components';
import FloatingActions from './components/FloatingActions';
import About from './components/About';
import DesignSystem from './components/DesignSystem';

type ViewState = 'design-system' | 'about';

export default function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [currentView, setCurrentView] = useState<ViewState>('design-system');

  const renderView = () => {
    switch (currentView) {
      case 'about':
        return <About />;
      case 'design-system':
        return <DesignSystem />;
    }
  };

  return (
    <>
      {/* Global Navigation Toggle */}
      <div className="fixed top-6 right-6 z-[9999] flex flex-col items-end gap-2">
        <div className="flex bg-black/50 backdrop-blur-md border border-white/10 p-1">
          {(['design-system', 'about'] as ViewState[]).map((view) => (
            <button
              key={view}
              onClick={() => setCurrentView(view)}
              className={`px-4 py-2 font-['IBM_Plex_Mono'] text-[10px] uppercase tracking-widest transition-all ${
                currentView === view 
                  ? 'bg-[#ff004d] text-white' 
                  : 'text-white/40 hover:text-white hover:bg-white/5'
              }`}
            >
              {view.replace('-', ' ')}
            </button>
          ))}
        </div>
      </div>

      {renderView()}
    </>
  );
}
