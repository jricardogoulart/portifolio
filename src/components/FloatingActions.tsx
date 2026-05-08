import { useState } from 'react';

export default function FloatingActions() {
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Bottom Right - Diagonal Stack */}
      <div className="fixed bottom-8 right-8 z-40 flex flex-col items-end gap-3">
        {/* Scroll to Top - Diagonal Button */}
        <button
          onClick={scrollToTop}
          className="group relative h-14 w-14 overflow-hidden border-2 border-white/20 bg-[#0a0a0a] transition-all hover:border-[#ff004d] hover:bg-[#ff004d]"
          style={{ clipPath: 'polygon(0 0, 100% 0, 90% 100%, 0 100%)' }}
          aria-label="Scroll to top"
        >
          <svg className="absolute left-1/2 top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 text-white transition-transform group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
        
        {/* Share Button */}
        <button
          className="group relative h-14 w-14 overflow-hidden border-2 border-white/20 bg-[#0a0a0a] transition-all hover:border-[#85a1c5] hover:bg-[#85a1c5]"
          style={{ clipPath: 'polygon(0 0, 100% 0, 90% 100%, 0 100%)' }}
          aria-label="Share"
        >
          <svg className="absolute left-1/2 top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 text-white transition-transform group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
          </svg>
        </button>
        
        {/* Download Button */}
        <button
          className="group relative h-14 w-14 overflow-hidden border-2 border-white/20 bg-[#0a0a0a] transition-all hover:border-[#bacfa3] hover:bg-[#bacfa3]"
          style={{ clipPath: 'polygon(0 0, 100% 0, 90% 100%, 0 100%)' }}
          aria-label="Download"
        >
          <svg className="absolute left-1/2 top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 text-white transition-transform group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
        </button>
      </div>
      
      {/* Bottom Left - Expandable Menu */}
      <div className="fixed bottom-8 left-8 z-40">
        <div className="relative">
          {/* Menu Items */}
          {menuOpen && (
            <div className="absolute bottom-20 left-0 flex flex-col gap-3">
              <button className="group flex items-center gap-3 border-2 border-white/20 bg-[#0a0a0a] px-5 py-3 font-['Syne'] text-sm font-semibold uppercase text-white transition-all hover:border-[#ff004d] hover:bg-[#ff004d]/10">
                <span>◆</span>
                <span>Tokens</span>
              </button>
              <button className="group flex items-center gap-3 border-2 border-white/20 bg-[#0a0a0a] px-5 py-3 font-['Syne'] text-sm font-semibold uppercase text-white transition-all hover:border-[#85a1c5] hover:bg-[#85a1c5]/10">
                <span>◇</span>
                <span>Docs</span>
              </button>
              <button className="group flex items-center gap-3 border-2 border-white/20 bg-[#0a0a0a] px-5 py-3 font-['Syne'] text-sm font-semibold uppercase text-white transition-all hover:border-[#bacfa3] hover:bg-[#bacfa3]/10">
                <span>◈</span>
                <span>Github</span>
              </button>
            </div>
          )}
          
          {/* Main Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className={`relative h-16 w-16 overflow-hidden border-2 font-['Syne'] text-xs font-bold uppercase tracking-wider transition-all ${
              menuOpen
                ? 'border-[#ff004d] bg-[#ff004d] text-white'
                : 'border-white/20 bg-[#0a0a0a] text-white hover:border-white/40'
            }`}
            style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 10% 100%)' }}
          >
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              {menuOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <span>MENU</span>
              )}
            </div>
          </button>
        </div>
      </div>
      
      {/* Top Right - Status Badge */}
      <div className="fixed right-8 top-24 z-40 hidden md:block">
        <div className="group flex items-center gap-3 border-2 border-white/10 bg-[#0a0a0a]/80 px-4 py-2 backdrop-blur-xl transition-all hover:border-[#bacfa3]">
          <div className="flex h-8 w-8 items-center justify-center bg-gradient-to-br from-[#bacfa3] to-[#2d4a3e]">
            <div className="h-2 w-2 animate-pulse bg-white"></div>
          </div>
          <div>
            <div className="font-['Syne'] text-xs font-bold text-white">
              LIVE
            </div>
            <div className="font-['JetBrains_Mono'] text-[9px] text-white/40">
              Status: Active
            </div>
          </div>
        </div>
      </div>
      
      {/* Side Indicator - Left Edge */}
      <div className="fixed left-0 top-1/2 z-40 hidden -translate-y-1/2 lg:block">
        <div className="flex flex-col items-center gap-4 border-r-2 border-white/10 bg-[#0a0a0a]/80 p-3 backdrop-blur-xl">
          <div className="h-1 w-1 bg-[#ff004d]"></div>
          <div className="h-12 w-px bg-gradient-to-b from-[#ff004d] via-white/20 to-transparent"></div>
          <div className="font-['JetBrains_Mono'] rotate-180 text-[9px] uppercase tracking-widest text-white/30" 
               style={{ writingMode: 'vertical-lr' }}>
            Archetype
          </div>
        </div>
      </div>
    </>
  );
}
