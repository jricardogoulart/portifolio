import { useEffect } from 'react';

export function useScrollMotion() {
  useEffect(() => {
    // Marcador de inicialização do sistema de animação
    document.body.classList.add('motion-ready');

    if (!('IntersectionObserver' in window)) {
      // Fallback gracioso para navegadores legados
      document.querySelectorAll('.motion-item, .motion-section, .reveal-item, .motion-divider').forEach((el) => {
        el.classList.add('is-entered', 'visible');
        el.classList.remove('pending');
      });
      return;
    }

    const observedSet = new WeakSet<Element>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = entry.target as HTMLElement;
            target.classList.add('is-entered');
            target.classList.add('visible');
            target.classList.remove('pending');
            // Remove do observer para economizar recursos após entrar
            observer.unobserve(target);
          }
        });
      },
      {
        threshold: 0.08,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    const observeElements = () => {
      const targets = document.querySelectorAll<HTMLElement>(
        '.motion-item, .motion-section, .reveal-item, .motion-divider, .motion-title, .motion-card'
      );

      const windowH = window.innerHeight;

      targets.forEach((el) => {
        if (observedSet.has(el)) return;

        const rect = el.getBoundingClientRect();
        // Se já está visível ou acima da dobra na tela, entra imediatamente sem atraso
        if (rect.top < windowH - 30 && rect.bottom > 0) {
          el.classList.add('is-entered', 'visible');
          el.classList.remove('pending');
        } else {
          observer.observe(el);
          observedSet.add(el);
        }
      });
    };

    observeElements();

    // Observa mutações caso componentes sejam injetados dinamicamente
    const mutationObserver = new MutationObserver(() => {
      observeElements();
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, []);
}
