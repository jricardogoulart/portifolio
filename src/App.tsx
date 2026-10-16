import About from './components/About';

/**
 * Production single-version entry point for Vercel deployment.
 * Directly renders the complete portfolio experience without Design System toggle.
 */
export default function App() {
  return (
    <>
      <div className="viewport-frame" aria-hidden="true" />
      <About />
    </>
  );
}

