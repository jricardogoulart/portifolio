import { useEffect, useRef, useState } from 'react';

interface CustomCursorProps {
  featuredActive: boolean;
}

export default function CustomCursor({ featuredActive }: CustomCursorProps) {
  const cursorRef = useRef<HTMLDivElement>(null);
  const featuredCursorRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const isTouch = window.matchMedia('(hover: none), (pointer: coarse)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isTouch || reduced) return;

    let rafId = 0;
    const target = { x: -100, y: -100 };
    const current = { x: -100, y: -100 };

    const onPointerMove = (e: PointerEvent) => {
      if (e.pointerType === 'touch') return;
      target.x = e.clientX;
      target.y = e.clientY;
      setIsVisible(true);
      document.body.classList.add('cursor-enabled');

      if (!rafId) {
        rafId = window.requestAnimationFrame(function animate() {
          current.x += (target.x - current.x) * 0.25;
          current.y += (target.y - current.y) * 0.25;

          if (cursorRef.current) {
            cursorRef.current.style.left = `${current.x}px`;
            cursorRef.current.style.top = `${current.y}px`;
          }

          if (featuredCursorRef.current) {
            featuredCursorRef.current.style.left = `${current.x}px`;
            featuredCursorRef.current.style.top = `${current.y}px`;
          }

          if (
            Math.abs(target.x - current.x) > 0.1 ||
            Math.abs(target.y - current.y) > 0.1
          ) {
            rafId = window.requestAnimationFrame(animate);
          } else {
            rafId = 0;
          }
        });
      }
    };

    const onPointerLeave = () => {
      setIsVisible(false);
      document.body.classList.remove('cursor-enabled');
      if (rafId) {
        window.cancelAnimationFrame(rafId);
        rafId = 0;
      }
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    document.addEventListener('pointerleave', onPointerLeave);

    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      document.removeEventListener('pointerleave', onPointerLeave);
      document.body.classList.remove('cursor-enabled');
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      <div
        id="cursor"
        ref={cursorRef}
        className={`cursor ${isVisible && !featuredActive ? 'visible' : ''}`}
        aria-hidden="true"
      />

      <div
        id="featuredCursor"
        ref={featuredCursorRef}
        className={`featured-cursor ${featuredActive ? 'active' : ''}`}
        aria-hidden="true"
      >
        <span>Ver</span>
        <span>projeto</span>
      </div>
    </>
  );
}
