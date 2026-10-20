import { useEffect, useRef } from 'react';

interface StatementPreviewProps {
  active: boolean;
  coords: { x: number; y: number };
}

export default function StatementPreview({ active, coords }: StatementPreviewProps) {
  const previewRef = useRef<HTMLDivElement>(null);
  const currentPos = useRef({ x: 0, y: 0 });
  const rafRef = useRef(0);

  useEffect(() => {
    if (!active) {
      if (rafRef.current) {
        window.cancelAnimationFrame(rafRef.current);
        rafRef.current = 0;
      }
      return;
    }

    const preview = previewRef.current;
    if (!preview) return;

    if (!rafRef.current) {
      currentPos.current = { x: coords.x, y: coords.y };
    }

    const animate = () => {
      currentPos.current.x += (coords.x - currentPos.current.x) * 0.18;
      currentPos.current.y += (coords.y - currentPos.current.y) * 0.18;

      if (previewRef.current) {
        previewRef.current.style.left = `${currentPos.current.x}px`;
        previewRef.current.style.top = `${currentPos.current.y}px`;
      }

      if (
        Math.abs(coords.x - currentPos.current.x) > 0.2 ||
        Math.abs(coords.y - currentPos.current.y) > 0.2
      ) {
        rafRef.current = window.requestAnimationFrame(animate);
      } else {
        rafRef.current = 0;
      }
    };

    rafRef.current = window.requestAnimationFrame(animate);

    return () => {
      if (rafRef.current) window.cancelAnimationFrame(rafRef.current);
    };
  }, [active, coords]);

  return (
    <div
      id="statementPreview"
      ref={previewRef}
      className={`statement-logo-cursor ${active ? 'active' : ''}`}
      aria-hidden="true"
    >
      <svg
        className="statement-logo-svg"
        viewBox="0 0 239 127"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M24.994 0C64.4582 21.8017 107.2 47.2097 146.666 69.0149C125.956 55.0928 107.375 37.7733 105.398 23.8364L193.759 24.4224L150.831 100.303L35.1483 99.6328L0 126.26L169.788 127L239 0.175029C238.946 0.181648 25.9391 0.134652 24.994 0Z"
          fillRule="evenodd"
          clipRule="evenodd"
        />
      </svg>
    </div>
  );
}
