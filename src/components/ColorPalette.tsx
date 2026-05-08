export default function ColorPalette() {
  const primaryColors = [
    { name: 'Passion Red', hex: '#ff004d', rgb: '255, 0, 77' },
    { name: 'Urban Coral', hex: '#f76c46', rgb: '247, 108, 70' },
    { name: 'Fleur Yellow', hex: '#e9e778', rgb: '233, 231, 120' },
  ];

  const secondaryColors = [
    { name: 'Vista Blue', hex: '#85a1c5', rgb: '133, 161, 197' },
    { name: 'Primary Blue', hex: '#4a90e2', rgb: '74, 144, 226' },
    { name: 'Golf Celadon', hex: '#bacfa3', rgb: '186, 207, 163' },
    { name: 'Forest Green', hex: '#2d4a3e', rgb: '45, 74, 62' },
  ];

  const neutralColors = [
    { name: 'Bright Ivory', hex: '#fcf9f2', rgb: '252, 249, 242' },
    { name: 'Creme', hex: '#f4efd7', rgb: '244, 239, 215' },
    { name: 'Nature Kraft', hex: '#c6af88', rgb: '198, 175, 136' },
    { name: 'Stone Brown', hex: '#7a6656', rgb: '122, 102, 86' },
  ];

  return (
    <section id="colors" className="relative bg-gradient-to-b from-[#0a0a0a] to-[#000000] py-32">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="mb-24 grid gap-8 lg:grid-cols-2">
          <div>
            <div className="mb-4 font-['JetBrains_Mono'] text-xs uppercase tracking-[0.3em] text-[#ff004d]">
              / 02 Color Palette
            </div>
            <h2 className="font-['Syne'] text-6xl font-bold leading-tight text-white lg:text-8xl">
              COR &<br />
              <span style={{ 
                background: 'linear-gradient(135deg, #ff004d 0%, #e9e778 50%, #85a1c5 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                EMOÇÃO
              </span>
            </h2>
          </div>
          <div className="flex items-end">
            <p className="font-['DM_Sans'] text-lg leading-relaxed text-white/50">
              Cada cor foi extraída de sistemas de design premium. Uma paleta que equilibra 
              ousadia com sofisticação.
            </p>
          </div>
        </div>
        
        {/* Primary Colors - Unique Layout */}
        <div className="mb-20">
          <div className="mb-8 flex items-center gap-4">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-white/10"></div>
            <h3 className="font-['Syne'] text-2xl font-bold text-white">
              Cores Primárias
            </h3>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-white/10"></div>
          </div>
          
          <div className="grid gap-6 md:grid-cols-3">
            {primaryColors.map((color, idx) => (
              <div key={idx} className="group">
                {/* Color Block - Unique Shape */}
                <div 
                  className="relative mb-6 h-80 overflow-hidden transition-all duration-700 hover:scale-105"
                  style={{ 
                    backgroundColor: color.hex,
                    clipPath: 'polygon(0 0, 100% 0, 100% 85%, 0 100%)'
                  }}
                >
                  {/* Overlay Pattern */}
                  <div className="absolute inset-0 opacity-0 transition-opacity group-hover:opacity-10"
                       style={{
                         backgroundImage: `repeating-linear-gradient(
                           45deg,
                           transparent,
                           transparent 10px,
                           rgba(0,0,0,0.3) 10px,
                           rgba(0,0,0,0.3) 11px
                         )`
                       }}>
                  </div>
                  
                  {/* Large Hex Code */}
                  <div className="absolute bottom-6 left-6 font-['JetBrains_Mono'] text-4xl font-bold text-white opacity-20 transition-opacity group-hover:opacity-30">
                    {color.hex}
                  </div>
                </div>
                
                {/* Color Info */}
                <div className="space-y-3 border-l-4 border-white/10 pl-6 transition-all group-hover:border-l-8"
                     style={{ borderColor: color.hex }}>
                  <h4 className="font-['Syne'] text-2xl font-bold uppercase text-white">
                    {color.name}
                  </h4>
                  <div className="space-y-1 font-['JetBrains_Mono'] text-sm text-white/50">
                    <div>HEX: {color.hex}</div>
                    <div>RGB: {color.rgb}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Secondary Colors - Grid Layout */}
        <div className="mb-20">
          <div className="mb-8 flex items-center gap-4">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-white/10"></div>
            <h3 className="font-['Syne'] text-2xl font-bold text-white">
              Cores Secundárias
            </h3>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-white/10"></div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {secondaryColors.map((color, idx) => (
              <div key={idx} className="group">
                <div 
                  className="mb-4 aspect-square transition-all duration-500 hover:scale-110 hover:rotate-6"
                  style={{ 
                    backgroundColor: color.hex,
                    clipPath: idx % 2 === 0 
                      ? 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' 
                      : 'polygon(10% 0, 100% 0, 90% 100%, 0 100%)'
                  }}
                />
                <div className="space-y-1">
                  <div className="font-['Syne'] text-sm font-semibold text-white">
                    {color.name}
                  </div>
                  <div className="font-['JetBrains_Mono'] text-xs text-white/40">
                    {color.hex}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Neutral Colors - Horizontal */}
        <div className="mb-20">
          <div className="mb-8 flex items-center gap-4">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-white/10"></div>
            <h3 className="font-['Syne'] text-2xl font-bold text-white">
              Tons Neutros
            </h3>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-white/10"></div>
          </div>
          
          {/* Stacked Bars */}
          <div className="space-y-3">
            {neutralColors.map((color, idx) => (
              <div key={idx} className="group flex items-center gap-6">
                <div 
                  className="h-20 flex-1 transition-all duration-500 group-hover:flex-[1.5]"
                  style={{ backgroundColor: color.hex }}
                />
                <div className="w-48 space-y-1">
                  <div className="font-['Syne'] text-lg font-semibold text-white">
                    {color.name}
                  </div>
                  <div className="font-['JetBrains_Mono'] text-xs text-white/40">
                    {color.hex} · RGB {color.rgb}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Gradient Combinations - Unique Showcase */}
        <div>
          <div className="mb-8 flex items-center gap-4">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-white/10"></div>
            <h3 className="font-['Syne'] text-2xl font-bold text-white">
              Combinações Gradient
            </h3>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-white/10"></div>
          </div>
          
          <div className="grid gap-6 md:grid-cols-3">
            {/* Gradient 1 */}
            <div className="group relative overflow-hidden border-2 border-white/10">
              <div className="h-64" style={{
                background: 'linear-gradient(135deg, #ff004d 0%, #f76c46 100%)'
              }}></div>
              <div className="border-t-2 border-white/10 bg-[#0a0a0a] p-6">
                <div className="mb-2 font-['Syne'] text-lg font-semibold text-white">
                  Energia Intensa
                </div>
                <div className="font-['JetBrains_Mono'] text-xs text-white/40">
                  Passion Red → Urban Coral
                </div>
              </div>
            </div>
            
            {/* Gradient 2 */}
            <div className="group relative overflow-hidden border-2 border-white/10">
              <div className="h-64" style={{
                background: 'linear-gradient(135deg, #85a1c5 0%, #4a90e2 100%)'
              }}></div>
              <div className="border-t-2 border-white/10 bg-[#0a0a0a] p-6">
                <div className="mb-2 font-['Syne'] text-lg font-semibold text-white">
                  Calma Profunda
                </div>
                <div className="font-['JetBrains_Mono'] text-xs text-white/40">
                  Vista Blue → Primary Blue
                </div>
              </div>
            </div>
            
            {/* Gradient 3 */}
            <div className="group relative overflow-hidden border-2 border-white/10">
              <div className="h-64" style={{
                background: 'linear-gradient(135deg, #bacfa3 0%, #2d4a3e 100%)'
              }}></div>
              <div className="border-t-2 border-white/10 bg-[#0a0a0a] p-6">
                <div className="mb-2 font-['Syne'] text-lg font-semibold text-white">
                  Natureza Viva
                </div>
                <div className="font-['JetBrains_Mono'] text-xs text-white/40">
                  Golf Celadon → Forest Green
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Color Usage Examples */}
        <div className="mt-20 border-2 border-white/5 bg-gradient-to-br from-[#141414] to-[#0a0a0a] p-10">
          <h3 className="mb-8 font-['Syne'] text-3xl font-bold text-white">
            Aplicação em UI
          </h3>
          
          <div className="grid gap-8 md:grid-cols-2">
            {/* Example 1 */}
            <div className="space-y-4">
              <div className="font-['JetBrains_Mono'] text-xs text-white/40">
                // Primary Actions
              </div>
              <div className="flex flex-wrap gap-3">
                <button className="px-6 py-3 font-['Syne'] text-sm font-semibold uppercase text-white transition-transform hover:scale-105"
                        style={{ backgroundColor: '#ff004d' }}>
                  Action
                </button>
                <button className="px-6 py-3 font-['Syne'] text-sm font-semibold uppercase text-white transition-transform hover:scale-105"
                        style={{ backgroundColor: '#f76c46' }}>
                  Secondary
                </button>
                <button className="px-6 py-3 font-['Syne'] text-sm font-semibold uppercase text-white transition-transform hover:scale-105"
                        style={{ backgroundColor: '#4a90e2' }}>
                  Tertiary
                </button>
              </div>
            </div>
            
            {/* Example 2 */}
            <div className="space-y-4">
              <div className="font-['JetBrains_Mono'] text-xs text-white/40">
                // Status Indicators
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-3 rounded border-l-4 bg-white/5 p-3"
                     style={{ borderColor: '#bacfa3' }}>
                  <div className="font-['DM_Sans'] text-sm text-white">Success State</div>
                </div>
                <div className="flex items-center gap-3 rounded border-l-4 bg-white/5 p-3"
                     style={{ borderColor: '#e9e778' }}>
                  <div className="font-['DM_Sans'] text-sm text-white">Warning State</div>
                </div>
                <div className="flex items-center gap-3 rounded border-l-4 bg-white/5 p-3"
                     style={{ borderColor: '#ff004d' }}>
                  <div className="font-['DM_Sans'] text-sm text-white">Error State</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
