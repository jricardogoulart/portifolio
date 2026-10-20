# José Goulart Dev

<p align="left">
  <strong>Desenvolvedor Full Stack & Analista de Sistemas</strong> focado em arquiteturas escaláveis, engenharia de front-end de alta fidelidade e interfaces interativas.
</p>

<p align="left">
  <a href="https://jricardogoulart.github.io"><strong>Ver Demonstração Online ↗</strong></a> &nbsp;•&nbsp;
  <a href="https://www.linkedin.com/in/jricardogoulart/">LinkedIn</a> &nbsp;•&nbsp;
  <a href="https://github.com/jricardogoulart">GitHub</a> &nbsp;•&nbsp;
  <a href="mailto:jricardogoulart@gmail.com">Contato</a>
</p>

<p align="left">
  <img src="https://img.shields.io/badge/status-production-10b981?style=flat-square" alt="Status" />
  <img src="https://img.shields.io/badge/react-19-06b6d4?style=flat-square" alt="React 19" />
  <img src="https://img.shields.io/badge/typescript-5.9-3b82f6?style=flat-square" alt="TypeScript" />
  <img src="https://img.shields.io/badge/vite-7-6366f1?style=flat-square" alt="Vite" />
  <img src="https://img.shields.io/badge/tailwind-v4-0ea5e9?style=flat-square" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/gsap-3.15-22c55e?style=flat-square" alt="GSAP" />
</p>

---

## Visão Geral

Repositório oficial do meu portfólio pessoal. Desenvolvido para apresentar minha trajetória, competências técnicas e projetos em produção, unindo precisão visual, performance máxima e microinterações cinematográficas sem o uso de templates genéricos.

- **Stack Moderna**: Desenvolvido com React 19, TypeScript estrito e Vite.
- **Microinterações com Física**: GSAP 3 orquestrando botões magnéticos, paralaxe multi-camadas e cursor responsivo.
- **Canvas & Shaders**: Simulação de fluidos por pixels reativa ao mouse (*Pixel Liquid*) e Aurora Bars em tempo real.
- **Design System Autoral**: Tipografia editorial (*Syne*, *DM Sans*, *IBM Plex Mono*), tokens cromáticos e cortes angulares.
- **Otimização de GPU**: Renderização a 60fps sustentada com composição via transforms e `will-change`, prevenindo *layout reflows*.

---

## Stack Técnica

```
Camada                Tecnologias
────────────────────────────────────────────────────────────────────────
Core                  React 19 · TypeScript 5.9 · Vite 7
Estilização           Tailwind CSS v4 · Custom CSS Tokens
Animações & Shaders   GSAP 3 · Three.js · Motion
Ícones & Tipografia   Lucide Icons · Syne · DM Sans · IBM Plex Mono
Qualidade & Deploy    ESLint · Vercel · GitHub Actions
```

---

## Destaques de Engenharia & Interatividade

- **Cursor Dinâmico Inercial**: Dot central e anel orbital com suavização via interpolação linear (`lerp`), desativado automaticamente em telas touch.
- **Botões Magnéticos**: Zona de atração com cálculo dinâmico de distância euclidiana (`Math.hypot`).
- **Paralaxe por Profundidade**: Deslocamento desacoplado entre títulos, cartões flutuantes 3D e formas orgânicas.
- **Acessibilidade Nativa**: Navegação por teclado com atalho *skip to content*, semântica HTML5 e contraste validado WCAG.

---

## Projetos em Destaque

| Projeto | Descrição | Stack | Links |
| :--- | :--- | :--- | :--- |
| **Cardápio SummerBeach SportsBat** | Cardápio digital responsivo com categorização fluida e experiência mobile-first para beach sports & bar. | JavaScript, CSS3 | [Deploy](https://jricardogoulart.github.io/summer-cardapio/) · [Repo](https://github.com/jricardogoulart/summer-cardapio) |
| **Tyller Finance** | Plataforma para gestão Financeira pessoal com tipagem estrita e dashboard financeiro. | TypeScript, React, Tailwind | [Repo](https://github.com/jricardogoulart/tyller-finance) |
| **Mars Gallery** | Aplicação interativa consumindo a API oficial da NASA para exploração de imagens dos rovers em Marte. | Vue.js, NASA API, REST | [Repo](https://github.com/jricardogoulart/mars-photos) |
| **Pokédex** | Interface com filtros rápidos por categoria, busca reativa e layout com CSS Grid. | JavaScript, CSS3 | [Repo](https://github.com/jricardogoulart/pokedex) |
| **Calculadora Vue** | Estudo de  VUE Aplicação de cálculo com manipulação reativa de estado e modularização de componentes. | Vue.js, Components | [Repo](https://github.com/jricardogoulart/CalculadoraVue) |

---

## Estrutura do Projeto

```
Portifólio/
├── public/
│   ├── curriculo-jose-ricardo-goulart.pdf   # Currículo para download
│   └── summer-cardápio.webp                # Assets estáticos
├── src/
│   ├── components/
│   │   ├── About.tsx                       # Componente principal do portfólio
│   │   ├── AuroraBars.tsx                  # Shader de barras em canvas
│   │   ├── pixel-liquid-bg.tsx             # Shader interativo de pixel liquid
│   │   └── ...                             # Componentes do design system
│   ├── index.css                           # Configuração Tailwind v4 e tokens
│   ├── main.tsx                            # Ponto de montagem React 19
│   └── App.tsx                             # Entry point da aplicação
├── package.json
└── vite.config.ts
```

---

## Executando Localmente

Requisitos: Node.js 18+ e npm.

```bash
# Clone o repositório
git clone https://github.com/jricardogoulart/portifolio.git

# Acesse a pasta
cd portifolio

# Instale os pacotes
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

Build de produção:

```bash
npm run build
npm run preview
```

---

## Sobre o Autor

**José Ricardo Goulart Silva**  
Analista de TI e Desenvolvedor Full Stack na R Raimundo Da Silva, responsável pela arquitetura e sustentação de ecossistemas digitais que atendem +40 indústrias parceiras. Graduado em Análise e Desenvolvimento de Sistemas pela FATEC Franca.

- **LinkedIn**: [/in/jricardogoulart](https://www.linkedin.com/in/jricardogoulart/)
- **GitHub**: [@jricardogoulart](https://github.com/jricardogoulart)
- **Email**: [jricardogoulart@gmail.com](mailto:jricardogoulart@gmail.com)

---

<p align="center">
  <small>© 2026 José Ricardo Goulart ·</small>
</p>
