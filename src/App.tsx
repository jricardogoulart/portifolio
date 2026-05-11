import { useState, useEffect, useRef } from 'react';
import About from './components/About';
import DesignSystem from './components/DesignSystem';

type ViewState = 'design-system' | 'about';

// --- Lerp helper ---
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

export default function App() {
  const [currentView, setCurrentView] = useState<ViewState>('design-system');
  const [isHovering, setIsHovering] = useState(false);
  
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const cursor = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);

  // Global Cursor Loop
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest('button') || 
        target.closest('a') || 
        target.closest('input') ||
        target.closest('[data-cursor="hover"]')
      ) {
        setIsHovering(true);
      }
    };

    const handleMouseOut = () => {
      setIsHovering(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mouseout', handleMouseOut);

    const animate = () => {
      cursor.current.x = lerp(cursor.current.x, mouse.current.x, 0.15);
      cursor.current.y = lerp(cursor.current.y, mouse.current.y, 0.15);

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${cursor.current.x - 10}px, ${cursor.current.y - 10}px)`;
      }
      if (cursorDotRef.current) {
        cursorDotRef.current.style.transform = `translate(${mouse.current.x - 3}px, ${mouse.current.y - 3}px)`;
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mouseout', handleMouseOut);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

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
      {/* Global Custom Cursor */}
      <div
        ref={cursorRef}
        className={`custom-cursor ${isHovering ? 'cursor-hover' : ''}`}
        style={{ transform: 'translate(-100px,-100px)' }}
      />
      <div
        ref={cursorDotRef}
        className="custom-cursor-dot"
        style={{ transform: 'translate(-100px,-100px)' }}
      />

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
