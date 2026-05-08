import { useState } from 'react';

export default function Components() {
  const [activeTab, setActiveTab] = useState(0);
  const [progress, setProgress] = useState(65);
  const [isToggled, setIsToggled] = useState(false);

  return (
    <section id="components" className="relative border-b border-white/5 bg-[#0a0a0a] py-32">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="mb-24 grid gap-8 lg:grid-cols-2">
          <div>
            <div className="mb-4 font-['JetBrains_Mono'] text-xs uppercase tracking-[0.3em] text-[#ff004d]">
              / 03 Components
            </div>
            <h2 className="font-['Syne'] text-6xl font-bold leading-tight text-white lg:text-8xl">
              UI<br />
              <span style={{ 
                background: 'linear-gradient(135deg, #85a1c5 0%, #ff004d 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                ELEMENTS
              </span>
            </h2>
          </div>
          <div className="flex items-end">
            <p className="font-['DM_Sans'] text-lg leading-relaxed text-white/50">
              Componentes únicos e personalizados. Nada de designs genéricos — cada elemento 
              tem personalidade própria.
            </p>
          </div>
        </div>
        
        {/* Unique Button Designs */}
        <div className="mb-20 border-2 border-white/5 bg-gradient-to-br from-[#141414] to-[#0a0a0a] p-10">
          <h3 className="mb-8 font-['Syne'] text-2xl font-bold text-white">
            Botões Únicos
          </h3>
          
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Diagonal Cut Button */}
            <div className="space-y-3">
              <div className="font-['JetBrains_Mono'] text-xs text-white/40">
                // Diagonal Cut
              </div>
              <button className="group relative overflow-hidden bg-[#ff004d] px-8 py-4 font-['Syne'] text-sm font-bold uppercase text-white transition-all hover:bg-[#ff004d]/90"
                      style={{ clipPath: 'polygon(0 0, 100% 0, 95% 100%, 0% 100%)' }}>
                Click Me
              </button>
            </div>
            
            {/* Rotating Border Button */}
            <div className="space-y-3">
              <div className="font-['JetBrains_Mono'] text-xs text-white/40">
                // Rotating Border
              </div>
              <button className="group relative overflow-hidden border-2 border-[#85a1c5] bg-transparent px-8 py-4 font-['Syne'] text-sm font-bold uppercase text-white transition-all hover:bg-[#85a1c5]/10">
                <div className="absolute inset-0 -z-10 bg-gradient-to-r from-transparent via-[#85a1c5]/20 to-transparent opacity-0 transition-opacity group-hover:opacity-100"></div>
                Hover Me
              </button>
            </div>
            
            {/* Split Color Button */}
            <div className="space-y-3">
              <div className="font-['JetBrains_Mono'] text-xs text-white/40">
                // Split Color
              </div>
              <button className="group relative overflow-hidden px-8 py-4 font-['Syne'] text-sm font-bold uppercase text-white"
                      style={{ 
                        background: 'linear-gradient(90deg, #ff004d 50%, #f76c46 50%)'
                      }}>
                <div className="absolute inset-0 bg-gradient-to-r from-[#f76c46] to-[#ff004d] opacity-0 transition-opacity group-hover:opacity-100"></div>
                <span className="relative z-10">Gradient</span>
              </button>
            </div>
            
            {/* Hollow Button */}
            <div className="space-y-3">
              <div className="font-['JetBrains_Mono'] text-xs text-white/40">
                // Hollow Effect
              </div>
              <button className="group relative overflow-hidden border-4 border-white bg-transparent px-8 py-4 font-['Syne'] text-sm font-bold uppercase text-white transition-all hover:border-[#e9e778] hover:text-[#e9e778]">
                Outline
              </button>
            </div>
            
            {/* Neon Glow Button */}
            <div className="space-y-3">
              <div className="font-['JetBrains_Mono'] text-xs text-white/40">
                // Neon Glow
              </div>
              <button className="group bg-transparent px-8 py-4 font-['Syne'] text-sm font-bold uppercase text-[#bacfa3] transition-all hover:text-white"
                      style={{
                        textShadow: '0 0 10px rgba(186, 207, 163, 0.5)',
                        border: '2px solid rgba(186, 207, 163, 0.5)',
                      }}>
                Glow
              </button>
            </div>
            
            {/* Layered Button */}
            <div className="space-y-3">
              <div className="font-['JetBrains_Mono'] text-xs text-white/40">
                // Layered
              </div>
              <div className="relative">
                <div className="absolute left-2 top-2 h-full w-full border-2 border-white/20"></div>
                <button className="relative bg-[#4a90e2] px-8 py-4 font-['Syne'] text-sm font-bold uppercase text-white transition-all hover:-translate-x-1 hover:-translate-y-1">
                  Depth
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Unique Cards */}
        <div className="mb-20 border-2 border-white/5 bg-gradient-to-br from-[#141414] to-[#0a0a0a] p-10">
          <h3 className="mb-8 font-['Syne'] text-2xl font-bold text-white">
            Cards Personalizados
          </h3>
          
          <div className="grid gap-6 md:grid-cols-3">
            {/* Angular Card */}
            <div className="group relative overflow-hidden bg-gradient-to-br from-[#ff004d] to-[#f76c46] p-8"
                 style={{ clipPath: 'polygon(0 0, 100% 0, 100% 90%, 0 100%)' }}>
              <div className="mb-4 inline-block bg-white/20 px-3 py-1 font-['JetBrains_Mono'] text-xs uppercase">
                Featured
              </div>
              <h4 className="mb-3 font-['Syne'] text-3xl font-bold text-white">
                ANGULAR
              </h4>
              <p className="font-['DM_Sans'] text-sm text-white/80">
                Cortes diagonais criam dinamismo visual e direcionam o olhar.
              </p>
              <div className="mt-6 h-px bg-white/20"></div>
              <div className="mt-4 flex items-center justify-between">
                <span className="font-['JetBrains_Mono'] text-xs text-white/60">
                  Card Type A
                </span>
                <svg className="h-5 w-5 text-white transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
            
            {/* Layered Card */}
            <div className="group relative">
              <div className="absolute left-3 top-3 h-full w-full border-2 border-white/10"></div>
              <div className="relative border-2 border-[#85a1c5] bg-[#0a0a0a] p-8 transition-transform group-hover:-translate-x-2 group-hover:-translate-y-2">
                <div className="mb-4 inline-block border border-[#85a1c5] px-3 py-1 font-['JetBrains_Mono'] text-xs uppercase text-[#85a1c5]">
                  Premium
                </div>
                <h4 className="mb-3 font-['Syne'] text-3xl font-bold text-white">
                  LAYERED
                </h4>
                <p className="font-['DM_Sans'] text-sm text-white/70">
                  Profundidade através de camadas sobrepostas e deslocamento.
                </p>
              </div>
            </div>
            
            {/* Gradient Border Card */}
            <div className="group relative p-[2px]"
                 style={{ background: 'linear-gradient(135deg, #bacfa3, #2d4a3e)' }}>
              <div className="h-full bg-[#0a0a0a] p-8">
                <div className="mb-4 inline-block bg-[#bacfa3]/20 px-3 py-1 font-['JetBrains_Mono'] text-xs uppercase text-[#bacfa3]">
                  Organic
                </div>
                <h4 className="mb-3 font-['Syne'] text-3xl font-bold text-white">
                  GRADIENT
                </h4>
                <p className="font-['DM_Sans'] text-sm text-white/70">
                  Bordas com gradiente adicionam sofisticação e fluidez.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Unique Form Elements */}
        <div className="mb-20 border-2 border-white/5 bg-gradient-to-br from-[#141414] to-[#0a0a0a] p-10">
          <h3 className="mb-8 font-['Syne'] text-2xl font-bold text-white">
            Inputs & Controles
          </h3>
          
          <div className="grid gap-8 md:grid-cols-2">
            {/* Underline Input */}
            <div className="space-y-3">
              <label className="font-['JetBrains_Mono'] text-xs uppercase tracking-wider text-white/50">
                Underline Style
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Digite aqui..."
                  className="w-full border-b-2 border-white/20 bg-transparent pb-3 font-['DM_Sans'] text-white placeholder-white/30 transition-all focus:border-[#ff004d] focus:outline-none"
                />
              </div>
            </div>
            
            {/* Diagonal Input */}
            <div className="space-y-3">
              <label className="font-['JetBrains_Mono'] text-xs uppercase tracking-wider text-white/50">
                Diagonal Cut
              </label>
              <input
                type="text"
                placeholder="Texto aqui..."
                className="w-full border-2 border-white/20 bg-white/5 p-3 font-['DM_Sans'] text-white placeholder-white/30 transition-all focus:border-[#85a1c5] focus:outline-none"
                style={{ clipPath: 'polygon(0 0, 100% 0, 98% 100%, 0% 100%)' }}
              />
            </div>
            
            {/* Toggle Switch - Unique */}
            <div className="space-y-3">
              <label className="font-['JetBrains_Mono'] text-xs uppercase tracking-wider text-white/50">
                Custom Toggle
              </label>
              <button
                onClick={() => setIsToggled(!isToggled)}
                className={`relative h-12 w-24 border-2 transition-all ${
                  isToggled 
                    ? 'border-[#bacfa3] bg-[#bacfa3]/20' 
                    : 'border-white/20 bg-white/5'
                }`}
              >
                <div
                  className={`absolute top-1 h-8 w-8 transition-all ${
                    isToggled 
                      ? 'left-[calc(100%-2.5rem)] bg-[#bacfa3]' 
                      : 'left-1 bg-white/30'
                  }`}
                  style={{ clipPath: 'polygon(0 0, 100% 0, 85% 100%, 0 100%)' }}
                ></div>
              </button>
            </div>
            
            {/* Progress Bar - Unique */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="font-['JetBrains_Mono'] text-xs uppercase tracking-wider text-white/50">
                  Progress
                </label>
                <span className="font-['Syne'] text-sm font-bold text-white">
                  {progress}%
                </span>
              </div>
              <div className="relative h-3 overflow-hidden border border-white/20">
                <div
                  className="h-full bg-gradient-to-r from-[#ff004d] to-[#f76c46] transition-all duration-500"
                  style={{ 
                    width: `${progress}%`,
                    clipPath: 'polygon(0 0, 100% 0, 95% 100%, 0% 100%)'
                  }}
                ></div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setProgress(Math.max(0, progress - 10))}
                  className="border border-white/20 px-3 py-1 font-['JetBrains_Mono'] text-xs text-white hover:bg-white/5"
                >
                  -10
                </button>
                <button
                  onClick={() => setProgress(Math.min(100, progress + 10))}
                  className="border border-white/20 px-3 py-1 font-['JetBrains_Mono'] text-xs text-white hover:bg-white/5"
                >
                  +10
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Unique Tabs */}
        <div className="border-2 border-white/5 bg-gradient-to-br from-[#141414] to-[#0a0a0a] p-10">
          <h3 className="mb-8 font-['Syne'] text-2xl font-bold text-white">
            Navegação por Tabs
          </h3>
          
          {/* Tab Headers */}
          <div className="mb-8 flex gap-2 border-b-2 border-white/10">
            {['Design', 'Development', 'Deploy'].map((tab, idx) => (
              <button
                key={idx}
                onClick={() => setActiveTab(idx)}
                className={`relative px-6 py-3 font-['Syne'] text-sm font-semibold uppercase transition-all ${
                  activeTab === idx ? 'text-white' : 'text-white/40 hover:text-white/70'
                }`}
              >
                {tab}
                {activeTab === idx && (
                  <div className="absolute bottom-0 left-0 h-[2px] w-full bg-[#ff004d]"></div>
                )}
              </button>
            ))}
          </div>
          
          {/* Tab Content */}
          <div className="min-h-[200px]">
            {activeTab === 0 && (
              <div className="space-y-4">
                <h4 className="font-['Syne'] text-xl font-bold text-white">
                  Design Tokens
                </h4>
                <p className="font-['DM_Sans'] leading-relaxed text-white/70">
                  Tokens de design são as decisões fundamentais de design traduzidas em dados. 
                  Cores, tipografia, espaçamento — tudo codificado para consistência.
                </p>
              </div>
            )}
            {activeTab === 1 && (
              <div className="space-y-4">
                <h4 className="font-['Syne'] text-xl font-bold text-white">
                  Implementation
                </h4>
                <pre className="overflow-x-auto border border-white/10 bg-black/30 p-4 font-['JetBrains_Mono'] text-sm text-white">
{`const theme = {
  colors: {
    primary: '#ff004d',
    secondary: '#85a1c5'
  }
};`}
                </pre>
              </div>
            )}
            {activeTab === 2 && (
              <div className="space-y-4">
                <h4 className="font-['Syne'] text-xl font-bold text-white">
                  Production Ready
                </h4>
                <p className="font-['DM_Sans'] leading-relaxed text-white/70">
                  Sistema pronto para produção com componentes testados, acessíveis e otimizados 
                  para performance.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
