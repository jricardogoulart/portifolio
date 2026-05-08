interface NavigationProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export default function Navigation({ activeSection, setActiveSection }: NavigationProps) {
  const navItems = [
    { id: 'hero', label: 'Início', symbol: '◆' },
    { id: 'typography', label: 'Type', symbol: '◇' },
    { id: 'colors', label: 'Cores', symbol: '◈' },
    { id: 'components', label: 'UI', symbol: '◊' },
  ];

  return (
    <nav className="fixed left-0 right-0 top-0 z-50 border-b border-white/5 bg-[#0a0a0a]/80 backdrop-blur-xl">
      <div className="container mx-auto flex items-center justify-between px-6 py-5">
        {/* Logo - Unique Design */}
        <div className="group flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center border-2 border-[#ff004d] bg-[#ff004d]/10 transition-all group-hover:rotate-45">
            <div className="h-2 w-2 bg-[#ff004d]"></div>
          </div>
          <div>
            <div className="font-['Syne'] text-xl font-bold tracking-tighter text-white">
              ARCHETYPE
            </div>
            <div className="font-['IBM_Plex_Mono'] text-[9px] uppercase tracking-[0.2em] text-white/30">
              Design System
            </div>
          </div>
        </div>
        
        {/* Navigation Links - Unique Style */}
        <div className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={() => setActiveSection(item.id)}
              className={`group relative px-5 py-2 transition-all ${
                activeSection === item.id ? 'text-white' : 'text-white/40 hover:text-white'
              }`}
            >
              {/* Active Indicator - Diagonal Line */}
              {activeSection === item.id && (
                <div className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-[#ff004d]"
                     style={{ transform: 'rotate(-5deg) translateY(-50%)' }}></div>
              )}
              
              <span className="relative z-10 flex items-center gap-2 font-['DM_Sans'] text-sm font-medium">
                <span className="text-[#ff004d] opacity-0 transition-opacity group-hover:opacity-100">
                  {item.symbol}
                </span>
                {item.label}
              </span>
            </a>
          ))}
        </div>
        
        {/* CTA - Unique Design */}
        <div className="flex items-center gap-4">
          <div className="hidden items-center gap-2 font-['IBM_Plex_Mono'] text-xs text-white/30 md:flex">
            <div className="h-1.5 w-1.5 animate-pulse bg-[#bacfa3]"></div>
            <span>v2.0.1</span>
          </div>
          <button className="relative overflow-hidden border-2 border-white/10 bg-transparent px-6 py-2 font-['Syne'] text-sm font-semibold uppercase tracking-wider text-white transition-all hover:border-[#ff004d] hover:bg-[#ff004d]/10">
            <span className="relative z-10">Github</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
