# ARCHETYPE — Interactive Design Tokens System

Um sistema de design tokens **totalmente interativo** com GSAP, componentes únicos e efeitos exclusivos. Sem templates genéricos — cada elemento responde ao movimento do mouse.

## 🎯 HERO INTERATIVO COM GSAP

### ✨ Efeitos Únicos e Interativos

**Parallax Mouse Tracking:**
- Título segue o movimento do mouse
- Cards 3D com parallax individual
- Cada elemento responde com velocidade diferente

**Magnetic Buttons:**
- Botões são "puxados" pelo cursor quando próximos
- Efeito magnético suave com GSAP
- Zona de atração de 100px de raio

**Custom Cursor:**
- Cursor personalizado em tempo real
- Anel externo segue com delay
- Ponto central mais rápido
- Escala quando hovering em elementos interativos

**Morphing Blobs:**
- Formas orgânicas que se transformam
- Seguem o mouse com inércia
- Mix-blend-mode para efeitos de luz
- Animação contínua 24/7

**3D Floating Cards:**
- Cards flutuam verticalmente (loop infinito)
- Rotação ao hover com GSAP
- Parallax individual por profundidade
- Reset suave ao sair do hover

**Entrada Cinemática:**
- Stagger animation nos títulos
- Text reveal com clip-path
- Stats aparecem com bounce
- Timing orquestrado perfeitamente

## 🔤 Tipografia Premium

### **Syne** - Display/Headings
- Variable font (400-800)
- Bold, moderna, geométrica
- Perfeita para títulos impactantes

### **DM Sans** - Body/Interface  
- Variable font (300-500)
- Altamente legível com itálico
- Interface e textos longos

### **IBM Plex Mono** - Code/Monospace
- 4 pesos disponíveis (400-700)
- Para código e dados técnicos
- Tracking expandido

## 🎨 Paleta de Cores (24 cores únicas)

**Cores Primárias:**
```css
--color-red: #ff004d        /* Passion Red */
--color-coral: #f76c46      /* Urban Coral */
--color-yellow: #e9e778     /* Fleur Yellow */
```

**Cores Secundárias:**
```css
--color-vista-blue: #85a1c5
--color-primary-blue: #4a90e2
--color-celadon: #bacfa3
--color-forest: #2d4a3e
```

**Tons Neutros:**
```css
--color-ivory: #fcf9f2
--color-creme: #f4efd7
--color-kraft: #c6af88
--color-stone: #7a6656
```

## 🧩 Componentes Únicos

### Botões Personalizados (6 estilos)
- ✂️ **Diagonal Cut** - ClipPath angular moderno
- 🔄 **Rotating Border** - Borda com gradiente animado
- 🌈 **Split Color** - Divisão de cores horizontal
- ⭕ **Hollow Effect** - Borda grossa vazada
- ✨ **Neon Glow** - Text-shadow neon pulsante
- 📐 **Layered** - Profundidade 3D com sombra

### Cards Únicos
- **Angular** - Cortes diagonais com clipPath
- **Layered** - Sobreposição 3D no hover
- **Gradient Border** - Wrapper com gradiente fluido

### Form Elements
- **Underline Style** - Input minimalista
- **Diagonal Cut Input** - Shape angular
- **Custom Toggle** - Switch diagonal único
- **Angular Progress** - Barra inclinada animada

### Navegação
- Tabs com indicador deslizante
- Menu expansível com símbolos (◆ ◇ ◈ ◊)
- Indicadores diagonais ativos

## 🎭 Animações GSAP Customizadas

```javascript
// Text Reveal Stagger
gsap.from('.hero-title-line', {
  y: 100,
  opacity: 0,
  duration: 1.2,
  stagger: 0.2,
  ease: 'power4.out',
});

// Floating Loop
gsap.to('.hero-card', {
  y: -20,
  duration: 2,
  repeat: -1,
  yoyo: true,
  ease: 'power1.inOut',
});

// Magnetic Effect
const deltaX = (mouseX - centerX) / 3;
const deltaY = (mouseY - centerY) / 3;
gsap.to(button, {
  x: deltaX,
  y: deltaY,
  duration: 0.3,
});

// Morphing Blobs
gsap.to(blob, {
  x: gsap.utils.random(-50, 50),
  y: gsap.utils.random(-50, 50),
  scale: gsap.utils.random(0.8, 1.2),
  duration: gsap.utils.random(4, 6),
  repeat: -1,
  yoyo: true,
});
```

## 🌀 CSS Animations Exclusivas

```css
@keyframes blobMove          /* Morphing orgânico */
@keyframes rotateBorder      /* Rotação de borda */
@keyframes glitch            /* Efeito glitch */
@keyframes diagonalWipe      /* Transição diagonal */
@keyframes textReveal        /* Reveal cinemático */
@keyframes float             /* Flutuação suave */
@keyframes pulseGlow         /* Brilho pulsante */
```

## 🏗️ Estrutura

```
src/
├── components/
│   ├── Hero.tsx              # GSAP + Parallax + Magnetic
│   ├── Navigation.tsx        # Indicadores diagonais
│   ├── Typography.tsx        # Showcase com bordas animadas
│   ├── ColorPalette.tsx      # Shapes únicos por cor
│   ├── Components.tsx        # Biblioteca de UI
│   └── FloatingActions.tsx   # FABs diagonais
├── index.css                 # Tokens + animations + cursor
└── App.tsx                   # Composição principal
```

## 🚀 Tecnologias

- **React 18** + **TypeScript**
- **GSAP 3** - Animações profissionais
- **Vite** - Build ultra-rápido
- **Tailwind CSS** - Utility-first

## 🎯 Interatividade vs Estático

| Estático | ARCHETYPE (Interativo) |
|----------|------------------------|
| Hero fixo | Parallax mouse tracking |
| Botões hover simples | Efeito magnético com zona |
| Cursor padrão | Cursor customizado animado |
| Cards estáticos | Floating 3D com parallax |
| Entrada básica | Stagger cinemático |
| Blobs fixos | Morphing + mouse follower |

## 🎨 Features Exclusivas

✅ **Cursor Customizado** - Anel + dot com física real  
✅ **Parallax Multi-layer** - Diferentes velocidades  
✅ **Magnetic Buttons** - Zona de atração dinâmica  
✅ **3D Card Stack** - Rotação e flutuação  
✅ **Morphing Blobs** - Formas orgânicas vivas  
✅ **Text Reveal** - Clip-path animado  
✅ **Stagger Timing** - Entrada orquestrada  
✅ **Mouse Tracking** - Elementos seguem cursor  

## 📦 Build & Run

```bash
npm install
npm run dev      # Development
npm run build    # Production (360KB → 106KB gzip)
```

## 🔥 Performance

- **GSAP** com `will-change` otimizado
- **Transforms** em GPU (translateX/Y, scale, rotate)
- **Blend modes** via CSS
- **Debounce** nos mouse events
- **RAF** para smooth animations

## 🎯 Inspiração

Extraído e reimaginado:
- **Floema** → Cores e warmth
- **Tribe** → Energia e tipografia
- **Archidomo** → Minimalismo e luxo

---

**100% Interativo** — Todo elemento responde ao mouse 🖱️  
**GSAP Powered** — Animações profissionais de cinema 🎬  
**Zero Templates** — Cada componente é único e original ✨  
**Cursor Customizado** — Experiência diferenciada 🎯

Build size: **360KB (106KB gzipped)** com GSAP incluso!
