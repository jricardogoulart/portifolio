import { useState, useCallback, useEffect } from 'react';
import { Project, PROJECTS, SERVICES } from './data/portfolioData';
import TopNav from './components/TopNav';
import Hero from './components/Hero';
import AboutSection from './components/AboutSection';
import AboutMeSection from './components/AboutMeSection';
import FeaturedProject from './components/FeaturedProject';
import SelectedProjects from './components/SelectedProjects';
import ServicesSection from './components/ServicesSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import ProjectModal from './components/ProjectModal';
import CustomCursor from './components/CustomCursor';
import StatementPreview from './components/StatementPreview';
import { useScrollMotion } from './hooks/useScrollMotion';

export default function App() {
  useScrollMotion();

  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [featuredActive, setFeaturedActive] = useState(false);
  const [statementPreview, setStatementPreview] = useState<{
    active: boolean;
    coords: { x: number; y: number };
  }>({
    active: false,
    coords: { x: 0, y: 0 }
  });

  const handleNavigate = useCallback((hash: string) => {
    setMenuOpen(false);
    setSelectedProject(null);
    const target = document.querySelector(hash);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  const handleStatementPointerMove = useCallback((e: React.PointerEvent) => {
    if (e.pointerType === 'touch') return;
    setStatementPreview({
      active: true,
      coords: { x: e.clientX, y: e.clientY }
    });
  }, []);

  const handleStatementPointerLeave = useCallback(() => {
    setStatementPreview((prev) => ({ ...prev, active: false }));
  }, []);

  const handleFeaturedPointerMove = useCallback((e: React.PointerEvent) => {
    if (e.pointerType === 'touch') return;
    setFeaturedActive(true);
    document.body.classList.add('case-cursor-active');
  }, []);

  const handleFeaturedPointerLeave = useCallback(() => {
    setFeaturedActive(false);
    document.body.classList.remove('case-cursor-active');
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (menuOpen) setMenuOpen(false);
        if (selectedProject) setSelectedProject(null);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [menuOpen, selectedProject]);

  return (
    <>
      <a className="skip" href="#work" onClick={(e) => { e.preventDefault(); handleNavigate('#work'); }}>
        Pular para os projetos
      </a>

      <TopNav
        menuOpen={menuOpen}
        onToggleMenu={() => setMenuOpen((prev) => !prev)}
        onCloseMenu={() => setMenuOpen(false)}
        onNavigate={handleNavigate}
      />

      <Hero onNavigate={handleNavigate} />

      <main id="mainContent">
        <AboutSection
          onStatementPointerMove={handleStatementPointerMove}
          onStatementPointerLeave={handleStatementPointerLeave}
          onNavigate={handleNavigate}
        />

        <AboutMeSection onNavigate={handleNavigate} />

        <FeaturedProject
          project={PROJECTS[0]}
          onOpenProject={(p) => setSelectedProject(p)}
          onFeaturedPointerMove={handleFeaturedPointerMove}
          onFeaturedPointerLeave={handleFeaturedPointerLeave}
        />

        <SelectedProjects
          projects={PROJECTS}
          onOpenProject={(p) => setSelectedProject(p)}
          onNavigate={handleNavigate}
        />

        <ServicesSection services={SERVICES} />

        <ContactSection />
      </main>

      <Footer onBackToTop={() => handleNavigate('#top')} />

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      <StatementPreview
        active={statementPreview.active}
        coords={statementPreview.coords}
      />

      <CustomCursor featuredActive={featuredActive} />
    </>
  );
}
