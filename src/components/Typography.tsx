export default function Typography() {
  return (
    <section id="typography" className="relative border-b border-white/5 bg-[#0a0a0a] py-32">
      <div className="container mx-auto px-6">
        {/* Section Header - Unique Layout */}
        <div className="mb-24 grid gap-8 lg:grid-cols-2">
          <div>
            <div className="mb-4 font-['IBM_Plex_Mono'] text-xs uppercase tracking-[0.3em] text-[#ff004d]">
              / 01 Typography
            </div>
            <h2 className="font-['Syne'] text-6xl font-bold leading-tight text-white lg:text-8xl">
              TYPE
              <br />
              <span style={{ 
                background: 'linear-gradient(135deg, #ff004d 0%, #e9e778 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                FACES
              </span>
            </h2>
          </div>
          <div className="flex items-end">
            <p className="font-['DM_Sans'] text-lg leading-relaxed text-white/50">
              Tipografia é a voz visual do design. Cada fonte conta uma história diferente, 
              cada peso transmite uma emoção única.
            </p>
          </div>
        </div>
        
        {/* Font Showcase - Unique Cards */}
        <div className="grid gap-12 lg:grid-cols-2">
          {/* Syne - Display Font */}
          <div className="group relative">
            {/* Diagonal Background Element */}
            <div className="absolute -left-4 -top-4 h-full w-full border-2 border-white/5 transition-transform group-hover:translate-x-2 group-hover:translate-y-2"></div>
            
            <div className="relative border-2 border-white/10 bg-[#0a0a0a] p-10">
              {/* Font Name */}
              <div className="mb-8 flex items-center justify-between border-b border-white/5 pb-6">
                <div>
                  <h3 className="font-['Syne'] text-5xl font-bold text-white">
                    Syne
                  </h3>
                  <p className="mt-2 font-['IBM_Plex_Mono'] text-xs uppercase tracking-wider text-white/40">
                    Display / Headings
                  </p>
                </div>
                <div className="font-['DM_Sans'] text-sm text-white/30">
                  Variable Font
                </div>
              </div>
              
              {/* Weight Specimens */}
              <div className="space-y-6">
                <div className="flex items-baseline justify-between border-b border-white/5 pb-4">
                  <span className="font-['Syne'] text-4xl font-normal text-white">Aa</span>
                  <span className="font-['IBM_Plex_Mono'] text-xs text-white/40">Regular 400</span>
                </div>
                <div className="flex items-baseline justify-between border-b border-white/5 pb-4">
                  <span className="font-['Syne'] text-4xl font-medium text-white">Aa</span>
                  <span className="font-['IBM_Plex_Mono'] text-xs text-white/40">Medium 500</span>
                </div>
                <div className="flex items-baseline justify-between border-b border-white/5 pb-4">
                  <span className="font-['Syne'] text-4xl font-semibold text-white">Aa</span>
                  <span className="font-['IBM_Plex_Mono'] text-xs text-white/40">Semibold 600</span>
                </div>
                <div className="flex items-baseline justify-between border-b border-white/5 pb-4">
                  <span className="font-['Syne'] text-4xl font-bold text-white">Aa</span>
                  <span className="font-['IBM_Plex_Mono'] text-xs text-white/40">Bold 700</span>
                </div>
                <div className="flex items-baseline justify-between">
                  <span className="font-['Syne'] text-4xl font-extrabold text-white">Aa</span>
                  <span className="font-['IBM_Plex_Mono'] text-xs text-white/40">Extrabold 800</span>
                </div>
              </div>
              
              {/* Sample Text */}
              <div className="mt-8 border-t border-white/5 pt-8">
                <p className="font-['Syne'] text-2xl font-bold leading-tight text-white">
                  The quick brown fox jumps over the lazy dog
                </p>
              </div>
            </div>
          </div>
          
          {/* DM Sans - Body Font */}
          <div className="group relative">
            {/* Diagonal Background Element */}
            <div className="absolute -left-4 -top-4 h-full w-full border-2 border-white/5 transition-transform group-hover:translate-x-2 group-hover:translate-y-2"></div>
            
            <div className="relative border-2 border-white/10 bg-[#0a0a0a] p-10">
              {/* Font Name */}
              <div className="mb-8 flex items-center justify-between border-b border-white/5 pb-6">
                <div>
                  <h3 className="font-['DM_Sans'] text-5xl font-medium text-white">
                    DM Sans
                  </h3>
                  <p className="mt-2 font-['IBM_Plex_Mono'] text-xs uppercase tracking-wider text-white/40">
                    Body / Interface
                  </p>
                </div>
                <div className="font-['DM_Sans'] text-sm text-white/30">
                  Variable Font
                </div>
              </div>
              
              {/* Weight Specimens */}
              <div className="space-y-6">
                <div className="flex items-baseline justify-between border-b border-white/5 pb-4">
                  <span className="font-['DM_Sans'] text-4xl font-light text-white">Aa</span>
                  <span className="font-['IBM_Plex_Mono'] text-xs text-white/40">Light 300</span>
                </div>
                <div className="flex items-baseline justify-between border-b border-white/5 pb-4">
                  <span className="font-['DM_Sans'] text-4xl font-normal text-white">Aa</span>
                  <span className="font-['IBM_Plex_Mono'] text-xs text-white/40">Regular 400</span>
                </div>
                <div className="flex items-baseline justify-between border-b border-white/5 pb-4">
                  <span className="font-['DM_Sans'] text-4xl font-medium text-white">Aa</span>
                  <span className="font-['IBM_Plex_Mono'] text-xs text-white/40">Medium 500</span>
                </div>
                <div className="flex items-baseline justify-between border-b border-white/5 pb-4">
                  <span className="font-['DM_Sans'] text-4xl italic font-normal text-white">Aa</span>
                  <span className="font-['IBM_Plex_Mono'] text-xs text-white/40">Italic 400</span>
                </div>
                <div className="flex items-baseline justify-between">
                  <span className="font-['DM_Sans'] text-4xl italic font-medium text-white">Aa</span>
                  <span className="font-['IBM_Plex_Mono'] text-xs text-white/40">Italic 500</span>
                </div>
              </div>
              
              {/* Sample Text */}
              <div className="mt-8 border-t border-white/5 pt-8">
                <p className="font-['DM_Sans'] text-lg leading-relaxed text-white/70">
                  The quick brown fox jumps over the lazy dog. Pack my box with five dozen liquor jugs.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Type Scale - Unique Visual Hierarchy */}
        <div className="mt-24">
          <div className="mb-12 font-['IBM_Plex_Mono'] text-xs uppercase tracking-[0.3em] text-white/40">
            / Scale Hierarchy
          </div>
          
          <div className="space-y-12">
            {/* Display Sizes */}
            <div className="group border-l-4 border-[#ff004d] pl-8 transition-all hover:border-l-8">
              <div className="mb-2 font-['IBM_Plex_Mono'] text-xs text-white/40">
                96px / Display XL
              </div>
              <h1 className="font-['Syne'] text-[clamp(3rem,10vw,6rem)] font-bold leading-none text-white">
                IMPACTO VISUAL
              </h1>
            </div>
            
            <div className="group border-l-4 border-[#f76c46] pl-8 transition-all hover:border-l-8">
              <div className="mb-2 font-['IBM_Plex_Mono'] text-xs text-white/40">
                72px / Display L
              </div>
              <h2 className="font-['Syne'] text-[clamp(2.5rem,8vw,4.5rem)] font-bold leading-tight text-white">
                Grandes Títulos
              </h2>
            </div>
            
            <div className="group border-l-4 border-[#85a1c5] pl-8 transition-all hover:border-l-8">
              <div className="mb-2 font-['IBM_Plex_Mono'] text-xs text-white/40">
                48px / Heading 1
              </div>
              <h3 className="font-['Syne'] text-5xl font-semibold text-white">
                Seções Principais
              </h3>
            </div>
            
            <div className="group border-l-4 border-[#bacfa3] pl-8 transition-all hover:border-l-8">
              <div className="mb-2 font-['IBM_Plex_Mono'] text-xs text-white/40">
                36px / Heading 2
              </div>
              <h4 className="font-['DM_Sans'] text-4xl font-medium text-white">
                Subseções e Divisões
              </h4>
            </div>
            
            <div className="group border-l-4 border-[#e9e778] pl-8 transition-all hover:border-l-8">
              <div className="mb-2 font-['IBM_Plex_Mono'] text-xs text-white/40">
                20px / Body Large
              </div>
              <p className="font-['DM_Sans'] text-xl leading-relaxed text-white/80">
                Texto de destaque para chamar atenção em parágrafos importantes e introduções de conteúdo.
              </p>
            </div>
            
            <div className="group border-l-4 border-white/20 pl-8 transition-all hover:border-l-8">
              <div className="mb-2 font-['IBM_Plex_Mono'] text-xs text-white/40">
                16px / Body Regular
              </div>
              <p className="font-['DM_Sans'] text-base leading-relaxed text-white/70">
                Texto padrão para corpo de conteúdo, descrições e informações gerais. 
                Otimizado para legibilidade e conforto de leitura prolongada.
              </p>
            </div>
            
            <div className="group border-l-4 border-white/10 pl-8 transition-all hover:border-l-8">
              <div className="mb-2 font-['IBM_Plex_Mono'] text-xs text-white/40">
                14px / Caption
              </div>
              <p className="font-['DM_Sans'] text-sm text-white/50">
                Legendas, labels e informações secundárias de suporte ao conteúdo principal.
              </p>
            </div>
          </div>
        </div>
        
        {/* Code Font Section */}
        <div className="mt-24 border-2 border-white/10 bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] p-10">
          <div className="mb-8">
            <h3 className="font-['Syne'] text-3xl font-bold text-white">
              IBM Plex Mono
            </h3>
            <p className="mt-2 font-['IBM_Plex_Mono'] text-xs uppercase tracking-wider text-white/40">
              Monospace / Code
            </p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-2">
            <div className="space-y-4">
              <div className="font-['IBM_Plex_Mono'] text-sm text-white/60">
                // CSS Variables
              </div>
              <pre className="overflow-x-auto rounded border border-white/10 bg-black/30 p-4 font-['IBM_Plex_Mono'] text-sm text-white">
{`--color-red: #ff004d;
--color-blue: #85a1c5;
--font-display: 'Syne';
--spacing-md: 2rem;`}
              </pre>
            </div>
            
            <div className="space-y-4">
              <div className="font-['IBM_Plex_Mono'] text-sm text-white/60">
                // Tokens Usage
              </div>
              <pre className="overflow-x-auto rounded border border-white/10 bg-black/30 p-4 font-['IBM_Plex_Mono'] text-sm text-white">
{`color: var(--color-red);
font-family: var(--font-display);
padding: var(--spacing-md);`}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
