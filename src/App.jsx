import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import SelectedWork from './components/SelectedWork';
import CaseStudyModal from './components/CaseStudyModal';
import ServicesSection from './components/ServicesSection';
import AboutStudio from './components/AboutStudio';
import CustomerFeedback from './components/CustomerFeedback';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import ScrollProgressBar from './components/ScrollProgressBar';
import CinematicIntro from './components/CinematicIntro';
import PortfolioPage from './pages/PortfolioPage';
import ProjectDetailPage from './pages/ProjectDetailPage';

function HomePage({
  handleOpenEnquiry,
  workCategory,
  setWorkCategory,
  setSelectedProject,
  enquiryService,
}) {
  return (
    <main id="main-content">
      {/* 1. Cinematic, Crisp Hero */}
      <Hero onOpenEnquiry={() => handleOpenEnquiry()} />

      {/* 2. Selected Work — Two-Row Moving Marquee Showcase */}
      <SelectedWork
        activeCategory={workCategory}
        onCategoryChange={setWorkCategory}
        onSelectProject={(project) => setSelectedProject(project)}
      />

      {/* 3. Studio Services */}
      <ServicesSection onOpenEnquiryWithService={handleOpenEnquiry} />

      {/* 4. About the Studio & Visual Philosophy */}
      <AboutStudio />

      {/* 6. Customer Feedback & Testimonials (Placed immediately above Contact) */}
      <CustomerFeedback />

      {/* 7. Contact Section & Project Brief Enquiry */}
      <ContactSection preselectedService={enquiryService} />
    </main>
  );
}

export default function App() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [enquiryService, setEnquiryService] = useState('');
  const [workCategory, setWorkCategory] = useState('All');
  const [showIntro, setShowIntro] = useState(true);

  const location = useLocation();

  // Handle smooth scroll when navigating to hash anchors (e.g., from /portfolio to /#contact)
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const el = document.getElementById(id);
      if (el) {
        const timer = setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth' });
        }, 120);
        return () => clearTimeout(timer);
      }
    }
  }, [location.pathname, location.hash]);

  const handleOpenEnquiry = (serviceName = '') => {
    setEnquiryService(serviceName);
    const contactEl = document.getElementById('contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* ── Cinematic Intro Preloader ── */}
      {showIntro && <CinematicIntro onComplete={() => setShowIntro(false)} />}

      <div
        className="min-h-screen bg-transparent text-[var(--text-primary)] transition-colors duration-300 selection:bg-[#0066ff] selection:text-white"
        style={showIntro ? { visibility: 'hidden', pointerEvents: 'none' } : {}}
      >
        {/* Discreet Scroll Progress Indicator */}
        <ScrollProgressBar />

        {/* Header & Navigation */}
        <Header
          onOpenEnquiry={() => handleOpenEnquiry()}
          onSelectWorkCategory={(cat) => setWorkCategory(cat)}
          onSelectService={(srv) => handleOpenEnquiry(srv)}
        />

        {/* Application Routes */}
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                handleOpenEnquiry={handleOpenEnquiry}
                workCategory={workCategory}
                setWorkCategory={setWorkCategory}
                setSelectedProject={setSelectedProject}
                enquiryService={enquiryService}
              />
            }
          />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/portfolio/:slug" element={<ProjectDetailPage />} />
        </Routes>

        {/* Footer */}
        <Footer />

        {/* Case Study Modal / Quick-view Panel */}
        {selectedProject && (
          <CaseStudyModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
            onSelectProject={(proj) => setSelectedProject(proj)}
          />
        )}
      </div>
    </>
  );
}
