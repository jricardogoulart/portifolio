# Portfólio Pessoal — José Ricardo Goulart

## What This Is

Portfólio pessoal e plataforma autoral de apresentação profissional do desenvolvedor de software e analista de sistemas José Ricardo Goulart. Apresenta projetos reais desenvolvidos, stack tecnológica, trajetória acadêmica/profissional e canais diretos de contato e contratação.

## Core Value

Apresentar as competências técnicas e projetos em produção de José Ricardo Goulart com máxima clareza, rigor estético editorial, experiência interativa premium e canais diretos de conversão.

## Current Milestone: v1.0 Evolução de Projetos, Áreas em Foco e Contato

**Goal:** Destaque do Summer Cardápio (GitHub Pages), scroll horizontal de tecnologias e acordeons animados em Áreas em Foco, e seção de Contato com e-mail prioritário e headline com efeito de digitação dinâmico.

**Target features:**
- [x] Remover repositório portifolio das listagens e colocar Summer Cardápio como projeto em destaque principal (com link do GitHub Pages)
- [ ] Scroll horizontal infinito de marcas/tecnologias utilizadas na seção Áreas em Foco
- [ ] Animação suave e fluida de abertura/fechamento nos acordeons de Áreas em Foco
- [ ] Seção Contato com e-mail principal em evidência e links de redes sociais / LinkedIn
- [ ] Efeito de digitação (typing effect) com rotação contínua de frases na headline de Contato

## Requirements

### Validated

- ✓ Identidade visual autoral, tipografia editorial e animação do logo com vetor em rotação — v1.0
- ✓ Seções Sobre, Apresentação Pessoal com timeline e download de currículo — v1.0
- ✓ Efeito WebGL fluido e interativo com shader no Hero — v1.0

### Active

- [ ] **PROJ-01**: Substituição do projeto em destaque no Hero e Featured pelo Summer Cardápio com link do GitHub Pages (https://jricardogoulart.github.io/summer-cardapio/) e remoção do repositório 'portifolio' da listagem.
- [ ] **FOCUS-01**: Marquee / horizontal scrolling com ícones e marcas das tecnologias utilizadas (React, TypeScript, Node.js, JavaScript, Vue.js, Vite, Tailwind CSS, Python, SQLite, Docker, Git).
- [ ] **FOCUS-02**: Animação expansível e suave de abertura/fechamento dos acordeons de Áreas em Foco.
- [ ] **CONT-01**: E-mail profissional (jricardogoulart@gmail.com) posicionado como CTA primário destacado em Contato, seguido de LinkedIn e redes sociais.
- [ ] **CONT-02**: Headline da seção de contato com animação de digitação (typing / deleting / retyping) alternando frases de impacto:
  1. "Vamos criar algo que importa."
  2. "Vamos otimizar as suas operações."
  3. "Vamos superar os obstáculos."
  4. "Vamos otimizar as suas Métricas."
  5. "Vamos dar sentido ao que importa."

### Out of Scope

- Repositório 'portifolio' em destaque como projeto do portfólio — o portfólio é o próprio ambiente e não deve ser redundante nas seções de trabalho.
- Formulário backend complexo de disparo de mensagens — substituído por mailto direto e canais ágeis (email e LinkedIn).

## Context

- O deploy do Summer Cardápio está publicado e operacional em `https://jricardogoulart.github.io/summer-cardapio/`.
- O e-mail de contato verificado de José Ricardo Goulart é `jricardogoulart@gmail.com`.
- O projeto utiliza React 19, TypeScript e Tailwind CSS / Vanilla CSS moderno com suporte a micro-interações refinadas.

## Constraints

- **Tech stack**: React 19, TypeScript, CSS autoral com tokens e variáveis CSS.
- **Performance**: Animações a 60fps usando transitions CSS, CSS grid ou requestAnimationFrame, sem bibliotecas pesadas desnecessárias.

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Summer Cardápio como Featured | Demonstra produto real com catálogo digital e deploy ativo no GitHub Pages | ✓ Good |
| E-mail como canal primário de contato | Facilita comunicação corporativa formal e propostas diretas | ✓ Good |
| Typing effect no título de contato | Cria engajamento dinâmico e ressalta versatilidade e proposta de valor | ✓ Good |

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `/gsd-transition`):
1. Requirements invalidated? → Move to Out of Scope with reason
2. Requirements validated? → Move to Validated with phase reference
3. New requirements emerged? → Add to Active
4. Decisions to log? → Add to Key Decisions
5. "What This Is" still accurate? → Update if drifted

**After each milestone** (via `/gsd-complete-milestone`):
1. Full review of all sections
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?
4. Update Context with current state

---
*Last updated: 2026-10-19 after milestone initialization*
