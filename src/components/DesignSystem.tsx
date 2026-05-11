import { useState, useEffect, useRef } from 'react';
import { LucideIcon, Copy, Check, Menu, X, ExternalLink, Info, AlertTriangle, CheckCircle2, AlertCircle } from 'lucide-react';
import Hero from './Hero';
import Typography from './Typography';
import ColorPalette from './ColorPalette';
import Components from './Components';
import FloatingActions from './FloatingActions';

// --- Types & Helper Components ---

interface SectionProps {
  id: string;
  number: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

const Section = ({ id, number, title, subtitle, children }: SectionProps) => (
  <section id={id} className="relative py-24 border-b border-white/5 last:border-b-0">
    <div className="mb-12">
      <div className="mb-4 font-['IBM_Plex_Mono'] text-xs uppercase tracking-[0.3em] text-[#ff004d]">
        / {number} {subtitle || title}
      </div>
      <h2 className="font-['Syne'] text-5xl md:text-7xl font-bold text-white leading-none">
        {title}
      </h2>
    </div>
    {children}
  </section>
);

const CodeSnippet = ({ code }: { code: string }) => {
  const [copied, setCopied] = useState(false);
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="group relative mt-6">
      <pre className="overflow-x-auto rounded-none border border-white/10 bg-black/50 p-6 font-['IBM_Plex_Mono'] text-xs text-white/70">
        <code>{code}</code>
      </pre>
      <button 
        onClick={copyToClipboard}
        className="absolute right-4 top-4 text-white/30 hover:text-white transition-colors"
      >
        {copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
      </button>
    </div>
  );
};

export default function DesignSystem() {
  const [activeSection, setActiveSection] = useState('hero');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const sections = [
    { id: 'hero', title: '00 Showcase', number: '00' },
    { id: 'typography', title: '01 Typography', number: '01' },
    { id: 'colors', title: '02 Color Palette', number: '02' },
    { id: 'components', title: '03 UI Components', number: '03' },
    { id: 'spacing', title: '04 Spacing', number: '04' },
    { id: 'shapes', title: '05 Shapes', number: '05' },
    { id: 'modals', title: '06 Modals & Alerts', number: '06' },
    { id: 'loading', title: '07 Loading', number: '07' },
    { id: 'effects', title: '08 Effects', number: '08' },
    { id: 'interactions', title: '09 Interactions', number: '09' },
    { id: 'motion', title: '10 Motion', number: '10' },
    { id: 'grids', title: '11 Patterns', number: '11' },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.2, rootMargin: '-10% 0px -70% 0px' }
    );

    sections.forEach((section) => {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Mobile Menu Toggle */}
      <button 
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="fixed bottom-6 left-6 z-[1001] flex h-12 w-12 items-center justify-center bg-[#ff004d] text-white lg:hidden"
      >
        {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar Navigation */}
      <aside className={`fixed inset-y-0 left-0 z-[1000] w-64 transform border-r border-white/5 bg-[#0a0a0a]/80 backdrop-blur-xl transition-transform duration-500 lg:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex h-full flex-col p-8">
          <div className="mb-12 flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center border-2 border-[#ff004d]">
              <div className="h-2 w-2 bg-[#ff004d]"></div>
            </div>
            <div className="font-['Syne'] text-xl font-bold tracking-tight">ARCHETYPE</div>
          </div>
          
          <nav className="flex-1 space-y-1 overflow-y-auto pr-4 scrollbar-hide">
            {sections.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                onClick={() => setIsSidebarOpen(false)}
                className={`group flex items-center gap-4 py-2 font-['IBM_Plex_Mono'] text-[10px] uppercase tracking-widest transition-all ${
                  activeSection === section.id ? 'text-[#ff004d]' : 'text-white/40 hover:text-white'
                }`}
              >
                <span className={`h-px w-4 transition-all ${activeSection === section.id ? 'bg-[#ff004d] w-8' : 'bg-white/10 group-hover:bg-white/30'}`}></span>
                {section.title}
              </a>
            ))}
          </nav>

          <div className="mt-8 border-t border-white/5 pt-8 font-['IBM_Plex_Mono'] text-[10px] text-white/20">
            v2.0 · LIVING DOCS
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="lg:ml-64">
        {/* Floating Actions (Search, Stats, etc) */}
        <FloatingActions />

        <div className="mx-auto max-w-full">
          
          {/* 0 · HERO SHOWCASE */}
          <div id="hero">
            <Hero />
          </div>

          <div className="px-8 lg:px-16 max-w-7xl mx-auto">
            {/* 1 · TYPOGRAPHY */}
            <div id="typography">
              <Typography />
            </div>

            {/* 2 · COLOR PALETTE */}
            <div id="colors">
              <ColorPalette />
            </div>

            {/* 3 · UI COMPONENTS */}
            <div id="components">
              <Components />
            </div>

            {/* 4 · SPACING */}
            <Section id="spacing" number="04" title="Spacing & Layout">
               <div className="grid gap-12 lg:grid-cols-2">
                 <div className="space-y-8">
                   <div className="grid gap-4">
                     {[
                       { name: 'XS', size: '0.5rem', class: 'w-2 h-2' },
                       { name: 'SM', size: '1rem', class: 'w-4 h-4' },
                       { name: 'MD', size: '2rem', class: 'w-8 h-8' },
                       { name: 'LG', size: '4rem', class: 'w-16 h-16' },
                       { name: 'XL', size: '6rem', class: 'w-24 h-24' },
                     ].map((s) => (
                       <div key={s.name} className="flex items-center gap-6">
                         <div className={`${s.class} bg-[#ff004d]`}></div>
                         <div className="flex-1 border-b border-white/5 pb-2">
                           <div className="flex items-center justify-between">
                             <span className="font-['Syne'] font-bold">{s.name}</span>
                             <span className="font-['IBM_Plex_Mono'] text-xs text-white/40">{s.size}</span>
                           </div>
                         </div>
                       </div>
                     ))}
                   </div>
                 </div>
                 <div className="space-y-6">
                    <div className="aspect-video w-full border border-white/10 bg-white/5 p-4 relative overflow-hidden">
                      <div className="absolute inset-0 grid grid-cols-12 gap-2 p-2 opacity-20">
                        {Array.from({ length: 12 }).map((_, i) => (
                          <div key={i} className="h-full bg-[#ff004d]"></div>
                        ))}
                      </div>
                      <div className="relative h-full flex items-center justify-center border border-[#ff004d]/30 border-dashed">
                        <span className="font-['IBM_Plex_Mono'] text-[10px] text-[#ff004d]">Container: max-w-7xl</span>
                      </div>
                    </div>
                    <p className="font-['DM_Sans'] text-sm text-white/50">Grid de 12 colunas com gutter de 2rem (md). Padding horizontal responsivo: 1.5rem (mobile) a 6rem (desktop).</p>
                 </div>
               </div>
            </Section>

            {/* 5 · SHAPES */}
            <Section id="shapes" number="05" title="Formas & Clip-Paths">
              <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                {[
                  { name: 'Diagonal Cut', path: 'polygon(0 0, 100% 0, 95% 100%, 0% 100%)' },
                  { name: 'Angular Card', path: 'polygon(0 0, 100% 0, 100% 90%, 0 100%)' },
                  { name: 'Parallelogram', path: 'polygon(15% 0, 100% 0, 85% 100%, 0 100%)' },
                  { name: 'Diamond', path: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' },
                  { name: 'Cut Corner', path: 'polygon(0 0, 100% 0, 100% 88%, 88% 100%, 0 100%)' },
                  { name: 'Ticket Cut', path: 'polygon(10% 0, 90% 0, 100% 10%, 100% 90%, 90% 100%, 10% 100%, 0 90%, 0 10%)' },
                ].map((shape) => (
                  <div key={shape.name} className="group flex flex-col items-center gap-4 border border-white/5 bg-white/5 p-8 transition-colors hover:bg-white/10">
                    <div className="h-16 w-16 bg-[#ff004d] transition-transform duration-500 group-hover:scale-110" style={{ clipPath: shape.path }}></div>
                    <div className="font-['IBM_Plex_Mono'] text-[10px] uppercase text-white/40">{shape.name}</div>
                  </div>
                ))}
              </div>
              <CodeSnippet code={`clip-path: polygon(0 0, 100% 0, 95% 100%, 0% 100%); /* Diagonal Cut */`} />
            </Section>

            {/* 6 · MODALS & ALERTS */}
            <Section id="modals" number="06" title="Modals & Alerts">
              <div className="space-y-12">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <div className="border-l-4 border-[#85a1c5] bg-white/5 p-6 flex gap-4">
                  <Info className="text-[#85a1c5] shrink-0" size={20} />
                  <div>
                    <div className="font-['Syne'] font-bold text-sm">System Update</div>
                    <p className="font-['DM_Sans'] text-xs text-white/50 mt-1">Maintenance scheduled for tonight.</p>
                  </div>
                </div>
                <div className="border-l-4 border-[#bacfa3] bg-white/5 p-6 flex gap-4">
                  <CheckCircle2 className="text-[#bacfa3] shrink-0" size={20} />
                  <div>
                    <div className="font-['Syne'] font-bold text-sm">Operation Success</div>
                    <p className="font-['DM_Sans'] text-xs text-white/50 mt-1">Data synchronized successfully.</p>
                  </div>
                </div>
                <div className="border-l-4 border-[#ff004d] bg-white/5 p-6 flex gap-4">
                  <AlertTriangle className="text-[#ff004d] shrink-0" size={20} />
                  <div>
                    <div className="font-['Syne'] font-bold text-sm">Action Required</div>
                    <p className="font-['DM_Sans'] text-xs text-white/50 mt-1">Confirm deletion of resource.</p>
                  </div>
                </div>
              </div>

              <div className="relative border border-white/10 bg-[#141414] p-8 max-w-lg mx-auto"
                   style={{ clipPath: 'polygon(0 0, 100% 0, 100% 95%, 95% 100%, 0 100%)' }}>
                <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-[#ff004d] to-[#85a1c5]"></div>
                <div className="flex justify-between items-start mb-6">
                  <h3 className="font-['Syne'] text-2xl font-bold">Modal Title</h3>
                  <X size={20} className="text-white/30" />
                </div>
                <p className="font-['DM_Sans'] text-white/60 mb-8 leading-relaxed">
                  Design system compliant modal with top accent gradient and clipped bottom corner for industrial aesthetic.
                </p>
                <div className="flex gap-4">
                  <button className="flex-1 bg-[#ff004d] py-3 font-['Syne'] text-xs font-bold uppercase">Confirm</button>
                  <button className="flex-1 border border-white/20 py-3 font-['Syne'] text-xs font-bold uppercase text-white/60">Cancel</button>
                </div>
              </div>
            </div>
          </Section>

          {/* 7 · LOADING */}
          <Section id="loading" number="07" title="Loading States">
            <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
              <div className="flex flex-col items-center gap-4">
                <div className="h-10 w-10 animate-spin border-2 border-white/10 border-t-[#ff004d] rounded-full"></div>
                <div className="font-['IBM_Plex_Mono'] text-[10px] text-white/40">Standard Spinner</div>
              </div>

              <div className="flex flex-col items-center gap-4">
                <div className="h-10 w-10 animate-spin border-2 border-white/10 border-t-[#85a1c5]" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }}></div>
                <div className="font-['IBM_Plex_Mono'] text-[10px] text-white/40">DS Spinner (Square)</div>
              </div>

              <div className="space-y-4 w-full">
                <div className="animate-pulse space-y-3">
                  <div className="h-4 w-full bg-white/5"></div>
                  <div className="h-4 w-3/4 bg-white/5"></div>
                  <div className="h-4 w-5/6 bg-white/5"></div>
                </div>
                <div className="font-['IBM_Plex_Mono'] text-[10px] text-white/40">Skeleton UI</div>
              </div>

              <div className="space-y-4 w-full flex flex-col items-center justify-center">
                 <div className="flex gap-1">
                    <span className="h-2 w-2 bg-[#ff004d] animate-bounce" style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }}></span>
                    <span className="h-2 w-2 bg-[#ff004d] animate-bounce [animation-delay:0.2s]" style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }}></span>
                    <span className="h-2 w-2 bg-[#ff004d] animate-bounce [animation-delay:0.4s]" style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }}></span>
                 </div>
                 <div className="font-['IBM_Plex_Mono'] text-[10px] text-white/40">Diamond Dots</div>
              </div>
            </div>
          </Section>

          {/* 8 · EFFECTS */}
          <Section id="effects" number="08" title="Visual Effects">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {/* Grain Effect */}
              <div className="grain-overlay relative aspect-video border border-white/10 bg-[#1a1a1a] flex items-center justify-center overflow-hidden">
                <div className="relative z-10 text-center">
                   <h4 className="font-['Syne'] text-xl font-bold mb-2">Grain Overlay</h4>
                   <p className="font-['DM_Sans'] text-[10px] uppercase tracking-widest text-white/40">Native SVG Filter</p>
                </div>
              </div>

              {/* Pulse Glow */}
              <div className="relative aspect-video border border-white/10 bg-[#0a0a0a] flex items-center justify-center overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-32 w-32 bg-[#ff004d]/20 blur-[60px] animate-pulse"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-16 w-16 bg-[#ff004d]/40 blur-[30px] animate-pulse [animation-delay:0.5s]"></div>
                <div className="relative z-10 text-center">
                   <h4 className="font-['Syne'] text-xl font-bold mb-2">Pulse Glow</h4>
                   <p className="font-['DM_Sans'] text-[10px] uppercase tracking-widest text-white/40">Atmospheric Depth</p>
                </div>
              </div>

              {/* Glassmorphism */}
              <div className="relative aspect-video border border-white/10 bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] flex items-center justify-center overflow-hidden">
                <div className="absolute top-0 left-0 h-full w-full bg-[url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=400')] bg-cover opacity-20"></div>
                <div className="glass relative z-10 p-6 w-3/4">
                   <h4 className="font-['Syne'] text-xl font-bold mb-1">Glassmorphism</h4>
                   <p className="font-['DM_Sans'] text-xs text-white/50">Backdrop blur + Border</p>
                </div>
              </div>
            </div>
            <CodeSnippet code={`.glass {\n  background: rgba(255, 255, 255, 0.05);\n  backdrop-filter: blur(20px);\n  border: 1px solid rgba(255, 255, 255, 0.1);\n}`} />
          </Section>

          {/* 9 · INTERACTIONS */}
          <Section id="interactions" number="09" title="Micro-interactions">
            <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
               <div className="space-y-4">
                  <div className="group relative border border-white/10 bg-white/5 p-8 transition-all hover:-translate-y-2 hover:border-[#ff004d]/50">
                    <h5 className="font-['Syne'] font-bold">Hover Lift</h5>
                    <p className="font-['DM_Sans'] text-xs text-white/40 mt-2">Smooth Y-axis translation on interaction.</p>
                  </div>
               </div>
               <div className="space-y-4">
                  <div className="group relative overflow-hidden border border-white/10 bg-white/5 p-8">
                    <div className="absolute inset-0 bg-[#ff004d] translate-y-full transition-transform duration-500 group-hover:translate-y-0"></div>
                    <div className="relative z-10">
                      <h5 className="font-['Syne'] font-bold transition-colors group-hover:text-white">Slide reveal</h5>
                      <p className="font-['DM_Sans'] text-xs text-white/40 mt-2 group-hover:text-white/70">Background color fill transition.</p>
                    </div>
                  </div>
               </div>
               <div className="space-y-4">
                  <div className="flex flex-col items-center justify-center h-full gap-4">
                    <div className="h-12 w-12 border-2 border-[#ff004d] flex items-center justify-center group cursor-pointer overflow-hidden">
                       <Check size={20} className="text-[#ff004d] translate-y-10 group-hover:translate-y-0 transition-transform duration-300" />
                    </div>
                    <span className="font-['IBM_Plex_Mono'] text-[10px] text-white/40">Icon Bounce</span>
                  </div>
               </div>
            </div>
          </Section>

          {/* 10 · MOTION */}
          <Section id="motion" number="10" title="Motion Tokens">
             <div className="space-y-8">
                <div className="grid gap-4">
                  {[
                    { name: 'Fast', value: '150ms', desc: 'UI states, toggle, hover', color: 'bg-green-500' },
                    { name: 'Base', value: '300ms', desc: 'Page transitions, standard moves', color: 'bg-blue-500' },
                    { name: 'Slow', value: '600ms', desc: 'Section entry, hero animations', color: 'bg-purple-500' },
                    { name: 'X-Slow', value: '1200ms', desc: 'Ambient cycles, large reveals', color: 'bg-red-500' },
                  ].map((m) => (
                    <div key={m.name} className="flex items-center gap-6 group">
                      <div className={`h-1 w-0 group-hover:w-32 transition-all duration-1000 ${m.color}`}></div>
                      <div className="flex-1 border-b border-white/5 pb-2">
                         <div className="flex items-center justify-between">
                            <div>
                               <span className="font-['Syne'] font-bold">{m.name}</span>
                               <span className="ml-4 font-['DM_Sans'] text-xs text-white/30">{m.desc}</span>
                            </div>
                            <span className="font-['IBM_Plex_Mono'] text-xs text-white/40">{m.value}</span>
                         </div>
                      </div>
                    </div>
                  ))}
                </div>
                <CodeSnippet code={`ease: "expo.out" // Primary entry\nease: "power4.out" // Text reveal\nease: "back.out(1.7)" // Bounce interaction`} />
             </div>
          </Section>

          {/* 11 · GRIDS */}
          <Section id="grids" number="11" title="Grid Patterns">
            <div className="grid gap-8 md:grid-cols-3">
              <div className="aspect-square border border-white/10" style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '24px 24px' }}>
                 <div className="h-full flex items-center justify-center">
                    <span className="bg-[#0a0a0a] px-3 py-1 font-['IBM_Plex_Mono'] text-[10px] text-white/40">Dot Grid</span>
                 </div>
              </div>
              <div className="aspect-square border border-white/10" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '50px 50px' }}>
                 <div className="h-full flex items-center justify-center">
                    <span className="bg-[#0a0a0a] px-3 py-1 font-['IBM_Plex_Mono'] text-[10px] text-white/40">Square Grid</span>
                 </div>
              </div>
              <div className="aspect-square border border-white/10 overflow-hidden relative">
                 <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, white 10px, white 11px)' }}></div>
                 <div className="h-full flex items-center justify-center relative">
                    <span className="bg-[#0a0a0a] px-3 py-1 font-['IBM_Plex_Mono'] text-[10px] text-white/40">Diagonal Lines</span>
                 </div>
              </div>
            </div>
          </Section>
        </div>

          {/* FOOTER */}
          <footer className="py-24 border-t border-white/5 text-center">
            <div className="font-['Syne'] text-xl font-bold mb-4">ARCHETYPE / v2.0</div>
            <p className="font-['DM_Sans'] text-sm text-white/30 max-w-sm mx-auto">
              Open source design documentation for high-end technical interfaces.
            </p>
            <div className="mt-8 flex justify-center gap-6 font-['IBM_Plex_Mono'] text-[10px] uppercase text-[#ff004d]">
               <a href="#" className="hover:text-white transition-colors">Github</a>
               <a href="#" className="hover:text-white transition-colors">NPM</a>
               <a href="#" className="hover:text-white transition-colors">Figma</a>
            </div>
          </footer>
        </div>
      </main>
    </div>
  );
}
