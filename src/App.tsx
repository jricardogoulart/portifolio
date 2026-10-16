import HeroBrutalist from './components/HeroBrutalist';
import About from './components/About';

/**
 * Production single-version entry point.
 * Features the Brutalist Hero, fixed 8px viewport blueprint frame,
 * and comprehensive portfolio experience.
 */
export default function App() {
  return (
    <>
      <div className="viewport-frame" aria-hidden="true" />
      <HeroBrutalist />
      <About />
    </>
  );
}

