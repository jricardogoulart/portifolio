# ARCHETYPE — Design System v2.0
> Living documentation. Every rule here has a live demo on the Design System page.

---

## 01 · Color Tokens

### Primárias
| Token | Hex | RGB | Uso |
|---|---|---|---|
| `--color-red` | `#ff004d` | 255, 0, 77 | CTAs, alertas, destaques |
| `--color-urbanCoral` | `#f76c46` | 247, 108, 70 | Gradientes quentes, hover |
| `--color-flourYellow` | `#e9e778` | 233, 231, 120 | Warning, acento luminoso |

### Secundárias
| Token | Hex | RGB | Uso |
|---|---|---|---|
| `--color-replasticVistaBlue` | `#85a1c5` | 133, 161, 197 | Info, links, secundário |
| `--color-primary-blue` | `#4a90e2` | 74, 144, 226 | Interativo, progress |
| `--color-golfCeladon` | `#bacfa3` | 186, 207, 163 | Success, natureza |
| `--color-forestGreen` | `#2d4a3e` | 45, 74, 62 | Fundos escuros verdes |

### Neutros
| Token | Hex | Uso |
|---|---|---|
| `--color-brightIvory` | `#fcf9f2` | Textos claros sobre escuro |
| `--color-creme` | `#f4efd7` | Superfícies quentes |
| `--color-natureKraft` | `#c6af88` | Bordas, elementos terciários |
| `--color-stoneBrown` | `#7a6656` | Scrollbar, ícones inativos |

### Fundo (Dark Theme)
| Token | Hex | Uso |
|---|---|---|
| `--color-bg-dark` | `#0a0a0a` | Fundo principal |
| `--color-bg-dark-secondary` | `#141414` | Seções alternadas |
| `--color-bg-dark-tertiary` | `#1a1a1a` | Cards, modais |

### Gradientes Padrão
```css
/* Energia — Red → Coral */
background: linear-gradient(135deg, #ff004d 0%, #f76c46 100%);

/* Foco — Blue → Vista */
background: linear-gradient(135deg, #85a1c5 0%, #4a90e2 100%);

/* Natureza — Celadon → Forest */
background: linear-gradient(135deg, #bacfa3 0%, #2d4a3e 100%);

/* Hero Title */
background: linear-gradient(135deg, #ff004d 0%, #f76c46 50%, #e9e778 100%);
```

---

## 02 · Tipografia

### Famílias
| Família | Font | Uso |
|---|---|---|
| Display | `'Syne'` | Títulos, headings, botões, labels de destaque |
| Body | `'DM Sans'` | Parágrafos, descrições, UI geral |
| Mono | `'IBM Plex Mono'` | Código, labels técnicos, overlines, badges |

### Escala de Tamanhos
```css
/* Display — hero */
font-size: clamp(3rem, 8vw, 7rem);
line-height: 0.85;
letter-spacing: -0.02em;

/* H1 section */
font-size: clamp(3rem, 6vw, 5rem);
line-height: 1;

/* H2 */
font-size: 2rem; /* text-3xl */

/* Body Large */
font-size: 1.25rem; /* text-xl */
line-height: 1.75;

/* Body */
font-size: 1rem;
line-height: 1.625;

/* Mono Label */
font-size: 0.625rem; /* text-[10px] */
text-transform: uppercase;
letter-spacing: 0.3em;
```

### Padrão de Overline
```html
<div class="font-['JetBrains_Mono'] text-xs uppercase tracking-[0.3em] text-[#ff004d]">
  / 01 Section Name
</div>
```

---

## 03 · Espaçamento

| Token | Valor | Classe TW |
|---|---|---|
| `xs` | 0.5rem | `p-2` |
| `sm` | 1rem | `p-4` |
| `md` | 2rem | `p-8` |
| `lg` | 4rem | `p-16` |
| `xl` | 6rem | `p-24` |
| `section` | 8rem | `py-32` |

### Container Padrão
```css
max-width: 80rem; /* max-w-7xl */
padding: 0 1.5rem; /* px-6 */
margin: 0 auto;
```

---

## 04 · Formas & Clip-Paths

```css
/* Diagonal Simples — botões, inputs */
clip-path: polygon(0 0, 100% 0, 95% 100%, 0% 100%);

/* Diagonal Reversa */
clip-path: polygon(5% 0, 100% 0, 100% 100%, 0% 100%);

/* Corte Angular Card */
clip-path: polygon(0 0, 100% 0, 100% 90%, 0 100%);

/* Paralelogramo */
clip-path: polygon(15% 0, 100% 0, 85% 100%, 0 100%);

/* Losango — timeline markers */
clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);

/* Canto Cortado */
clip-path: polygon(0 0, 100% 0, 100% 88%, 88% 100%, 0 100%);

/* Profile Card */
clip-path: polygon(0 0, 100% 0, 100% 94%, 94% 100%, 0 100%);
```

---

## 05 · Botões

### Primário — Diagonal Cut
```css
background: #ff004d;
clip-path: polygon(0 0, 100% 0, 95% 100%, 0% 100%);
font-family: 'Syne'; font-weight: 700; text-transform: uppercase;
padding: 1rem 2.25rem;
```

### Secundário — Ghost
```css
border: 2px solid rgba(255,255,255,0.2);
background: transparent;
color: white;
/* hover: border-white/40 + bg-white/5 */
```

### Terciário — Neon Glow
```css
border: 2px solid rgba(186, 207, 163, 0.5);
color: #bacfa3;
text-shadow: 0 0 10px rgba(186, 207, 163, 0.5);
```

### Magnetic Button
```css
/* CSS custom properties atualizadas via rAF */
transform: translate(var(--mx, 0px), var(--my, 0px));
will-change: transform;
/* Raio de atração: 110px */
```

### Layered Button
```html
<!-- Shadow layer offset -->
<div class="absolute left-2 top-2 h-full w-full border-2 border-white/20" />
<button class="relative bg-[#4a90e2] hover:-translate-x-1 hover:-translate-y-1 transition-transform">
  Depth
</button>
```

### Estado Loading
```html
<button disabled class="flex items-center gap-3 opacity-70 cursor-not-allowed">
  <div class="h-4 w-4 animate-spin rounded-full border-2 border-white/20 border-t-[#ff004d]" />
  Processando...
</button>
```

---

## 06 · Cards

### Angular Card
```css
clip-path: polygon(0 0, 100% 0, 100% 90%, 0 100%);
background: linear-gradient(135deg, #ff004d, #f76c46);
padding: 2rem;
```

### Layered Card
```html
<div class="group relative">
  <!-- Shadow layer -->
  <div class="absolute left-3 top-3 h-full w-full border-2 border-white/10" />
  <!-- Content -->
  <div class="relative border-2 border-[#85a1c5] bg-[#0a0a0a] p-8
              transition-transform group-hover:-translate-x-2 group-hover:-translate-y-2">
    ...
  </div>
</div>
```

### Gradient Border Card
```html
<div class="p-[2px]" style="background: linear-gradient(135deg, #bacfa3, #2d4a3e)">
  <div class="h-full bg-[#0a0a0a] p-8">...</div>
</div>
```

### Glass Card
```css
background: rgba(255, 255, 255, 0.05);
backdrop-filter: blur(20px);
-webkit-backdrop-filter: blur(20px);
border: 1px solid rgba(255, 255, 255, 0.1);
```

### Stat Card
```html
<div class="border border-white/10 bg-[#0f0f0f] p-6">
  <div class="font-['IBM_Plex_Mono'] text-[10px] uppercase tracking-widest text-white/40">Label</div>
  <div class="font-['Syne'] text-5xl font-bold text-white mt-2">42</div>
  <div class="h-[2px] w-8 bg-[#ff004d] mt-4" />
</div>
```

---

## 07 · Inputs & Controles

### Underline Input
```css
border-bottom: 2px solid rgba(255,255,255,0.2);
background: transparent;
padding-bottom: 0.75rem;
/* focus: border-[#ff004d] */
```

### Diagonal Input
```css
border: 2px solid rgba(255,255,255,0.2);
background: rgba(255,255,255,0.05);
clip-path: polygon(0 0, 100% 0, 98% 100%, 0% 100%);
/* focus: border-[#85a1c5] */
```

### Custom Toggle
```html
<button class="relative h-12 w-24 border-2 border-white/20 bg-white/5 transition-all
               data-[on=true]:border-[#bacfa3] data-[on=true]:bg-[#bacfa3]/20">
  <div class="absolute top-1 left-1 h-8 w-8 bg-white/30 transition-all
              data-[on=true]:left-[calc(100%-2.5rem)] data-[on=true]:bg-[#bacfa3]"
       style="clip-path: polygon(0 0, 100% 0, 85% 100%, 0 100%)" />
</button>
```

### Progress Bar
```css
.progress-track {
  height: 0.75rem;
  border: 1px solid rgba(255,255,255,0.2);
  overflow: hidden;
}
.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #ff004d, #f76c46);
  clip-path: polygon(0 0, 100% 0, 95% 100%, 0% 100%);
  transition: width 500ms ease;
}
```

---

## 08 · Modais & Alerts

### Modal Base
```html
<!-- Backdrop -->
<div class="fixed inset-0 z-[1000] bg-black/60 backdrop-blur-sm flex items-center justify-center">
  <!-- Modal container -->
  <div class="relative w-full max-w-lg border border-white/10 bg-[#141414] shadow-2xl"
       style="clip-path: polygon(0 0, 100% 0, 100% 96%, 96% 100%, 0 100%)">
    <!-- Top accent -->
    <div class="h-[3px] bg-gradient-to-r from-[#ff004d] to-[#85a1c5]" />
    <!-- Header -->
    <div class="flex items-center justify-between px-8 pt-8 pb-4">
      <h3 class="font-['Syne'] text-2xl font-bold text-white">Título</h3>
      <button class="text-white/40 hover:text-white transition-colors">✕</button>
    </div>
    <!-- Body -->
    <div class="px-8 pb-8 font-['DM_Sans'] text-white/60">...</div>
    <!-- Footer -->
    <div class="flex gap-4 border-t border-white/10 px-8 py-6">
      <button class="flex-1 bg-[#ff004d] py-3 font-['Syne'] text-sm font-bold uppercase text-white">
        Confirmar
      </button>
      <button class="flex-1 border border-white/20 py-3 font-['Syne'] text-sm font-bold uppercase text-white/70">
        Cancelar
      </button>
    </div>
  </div>
</div>
```

### Alerts Inline
```css
/* Estrutura base */
.alert {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  padding: 1rem 1.25rem;
  border-left: 3px solid;
  background: rgba(255,255,255,0.03);
  font-family: 'DM Sans';
}

/* Variantes */
.alert-success { border-color: #bacfa3; }
.alert-warning { border-color: #e9e778; }
.alert-danger  { border-color: #ff004d; }
.alert-info    { border-color: #85a1c5; }
```

### Toast Notification
```css
.toast {
  position: fixed;
  bottom: 1.5rem;
  right: 1.5rem;
  z-index: 9998;
  min-width: 280px;
  border: 1px solid rgba(255,255,255,0.1);
  background: #141414;
  padding: 1rem 1.25rem;
  animation: slideInRight 0.3s ease;
}

@keyframes slideInRight {
  from { transform: translateX(110%); opacity: 0; }
  to   { transform: translateX(0);    opacity: 1; }
}
```

---

## 09 · Animações de Loading

### Spinner
```html
<div class="h-8 w-8 animate-spin rounded-full border-2 border-white/10 border-t-[#ff004d]" />
```

### Spinner Clip-Path (DS style)
```css
.spinner-ds {
  width: 2rem; height: 2rem;
  border: 2px solid rgba(255,255,255,0.1);
  border-top-color: #ff004d;
  clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%); /* square */
  animation: spin 0.8s linear infinite;
}
```

### Skeleton Screen
```html
<div class="animate-pulse space-y-3">
  <div class="h-4 w-3/4 bg-white/5" />
  <div class="h-4 w-1/2 bg-white/5" />
  <div class="h-4 w-5/6 bg-white/5" />
</div>
```

### Progress Indeterminado
```css
.progress-indeterminate {
  position: relative;
  height: 2px;
  background: rgba(255,255,255,0.1);
  overflow: hidden;
}
.progress-indeterminate::after {
  content: '';
  position: absolute;
  top: 0; left: -40%;
  width: 40%; height: 100%;
  background: linear-gradient(90deg, transparent, #ff004d, transparent);
  animation: indeterminate 1.2s ease infinite;
}
@keyframes indeterminate {
  from { left: -40%; }
  to   { left: 100%; }
}
```

### Dots Loader
```css
.dots-loader span {
  display: inline-block;
  width: 6px; height: 6px;
  background: #ff004d;
  clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%); /* losango */
  animation: dotBounce 0.8s ease infinite;
}
.dots-loader span:nth-child(2) { animation-delay: 0.15s; }
.dots-loader span:nth-child(3) { animation-delay: 0.30s; }

@keyframes dotBounce {
  0%, 80%, 100% { transform: scale(0.8); opacity: 0.4; }
  40%           { transform: scale(1.2); opacity: 1;   }
}
```

### Glitch Text Loader
```css
@keyframes glitch {
  0%   { transform: translate(0); }
  20%  { transform: translate(-2px, 2px); }
  40%  { transform: translate(-2px, -2px); }
  60%  { transform: translate(2px, 2px); }
  80%  { transform: translate(2px, -2px); }
  100% { transform: translate(0); }
}
.glitch-loader {
  animation: glitch 0.4s ease infinite;
  font-family: 'IBM Plex Mono';
  color: #ff004d;
}
```

---

## 10 · Efeitos Visuais

### Glassmorphism
```css
.glass {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}
```

### Grain Overlay
```css
.grain-overlay::before {
  content: '';
  position: absolute; inset: 0;
  background-image: url("data:image/svg+xml,..."); /* SVG noise */
  opacity: 0.4;
  mix-blend-mode: overlay;
  pointer-events: none;
}
```

### Pulse Glow
```css
@keyframes pulseGlow {
  0%, 100% { box-shadow: 0 0 20px rgba(255, 0, 77, 0.3); }
  50%       { box-shadow: 0 0 40px rgba(255, 0, 77, 0.6); }
}
```

### Morphing Blob
```css
@keyframes blobMove {
  0%, 100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
  25%       { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; }
  50%       { border-radius: 50% 60% 30% 60% / 30% 60% 70% 40%; }
  75%       { border-radius: 60% 40% 60% 40% / 70% 30% 50% 60%; }
}
```

### Grid Patterns
```css
/* Diagonal Lines */
background-image: repeating-linear-gradient(
  45deg, transparent, transparent 50px,
  rgba(255,255,255,0.03) 50px, rgba(255,255,255,0.03) 51px
);

/* Dot Grid */
background-image: radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px);
background-size: 24px 24px;

/* Square Grid */
background-image:
  linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
  linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
background-size: 50px 50px;
```

---

## 11 · Cursor & Micro-interações

### Custom Cursor
```css
/* Anel (lerp suave via rAF) */
.custom-cursor {
  width: 20px; height: 20px;
  border: 2px solid #ff004d;
  border-radius: 50%;
  position: fixed; top: 0; left: 0;
  pointer-events: none;
  will-change: transform;
  mix-blend-mode: difference;
}

/* Dot (snap direto ao mouse) */
.custom-cursor-dot {
  width: 6px; height: 6px;
  background: #ff004d;
  border-radius: 50%;
  position: fixed; top: 0; left: 0;
  pointer-events: none;
  will-change: transform;
}

/* Hover state */
.cursor-hover { width: 40px; height: 40px; background: rgba(255,0,77,0.1); }
```

### Magnetic Button (rAF pattern)
```ts
// CSS vars --mx e --my atualizadas no loop rAF
// Raio de ativação: 110px
// Intensidade: deltaX / 3.5
button.style.setProperty('--mx', `${(mx - cx) / 3.5}px`);
button.style.setProperty('--my', `${(my - cy) / 3.5}px`);
```

### Hover Lift
```css
.hover-lift {
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}
.hover-lift:hover {
  transform: translateY(-4px);
  box-shadow: 0 16px 40px rgba(0,0,0,0.4);
}
```

### Focus Ring (Acessibilidade)
```css
:focus-visible {
  outline: 2px solid #ff004d;
  outline-offset: 3px;
}
```

---

## 12 · Motion Tokens

### Durações
| Token | Valor | Uso |
|---|---|---|
| `fast` | 150ms | Hover states, cores |
| `base` | 300ms | Transições padrão |
| `slow` | 600ms | Entradas de elementos |
| `xslow` | 1200ms | Animações de hero |

### Easings GSAP
| Nome | Valor | Uso |
|---|---|---|
| `power4.out` | Exponencial forte | Entrada de texto/títulos |
| `expo.out` | Exponencial suave | Cards, slides |
| `sine.inOut` | Senoidal | Float loops, blobs |
| `back.out(1.7)` | Com overshoot | Stats, badges |
| `power2.out` | Quadrática | Cursor, parallax |

### Padrões de Animação
```ts
// Fade-in-up (entrada padrão de seção)
gsap.from('.elemento', { y: 60, opacity: 0, duration: 1.2, ease: 'expo.out' });

// Stagger (lista de elementos)
gsap.from('.items', { y: 30, opacity: 0, stagger: 0.1, ease: 'power3.out' });

// Float loop (cards hero)
gsap.to('.card', { y: -16, duration: 2.4, repeat: -1, yoyo: true, ease: 'sine.inOut' });

// Reveal de texto
gsap.from('.texto', { clipPath: 'inset(0 100% 0 0)', duration: 1, ease: 'expo.out' });
```

### Regras de GPU (will-change)
```css
/* USAR quando o elemento for animado com transform/opacity frequentemente */
will-change: transform;

/* NUNCA usar em elementos estáticos — desperdiça memória */
/* REMOVER após animação com: element.style.willChange = 'auto' */
```

### Motion Reduced (Acessibilidade)
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 13 · Padrão de Seção (Template)

```html
<section id="secao" class="relative z-10 py-32 px-6 lg:px-24 border-t border-white/5 bg-[#0a0a0a]">
  <div class="max-w-7xl mx-auto">

    <!-- Overline -->
    <div class="mb-6 font-['JetBrains_Mono'] text-xs uppercase tracking-[0.3em] text-[#ff004d]">
      / 0X Section Name
    </div>

    <!-- Heading -->
    <h2 class="font-['Syne'] text-5xl md:text-7xl font-bold text-white mb-20 leading-none">
      Título<br><span class="text-[#85a1c5]">Seção</span>
    </h2>

    <!-- Content -->
    <div class="animate-on-scroll">
      <!-- ... -->
    </div>

  </div>
</section>
```

---

*ARCHETYPE Design System v2.0 — © 2024 José Ricardo Goulart*
