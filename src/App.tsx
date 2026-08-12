import React, { useState, useEffect } from 'react';
import { PortfolioData, Project, BlogArticle } from './types';
import { INITIAL_PORTFOLIO_DATA } from './data/defaultProfile';
import { subscribeToFirebasePortfolio, saveFirebasePortfolio, getFirebasePortfolio } from './lib/firebase';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { ProjectsSection } from './components/ProjectsSection';
import { ExperienceSection } from './components/ExperienceSection';
import { SkillsSection } from './components/SkillsSection';
import { BlogSection } from './components/BlogSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ProjectDetailModal } from './components/ProjectDetailModal';
import { ArticleReaderModal } from './components/ArticleReaderModal';
import { EditProfileModal } from './components/EditProfileModal';
import { ExportCvModal } from './components/ExportCvModal';
import { AdminLoginModal } from './components/AdminLoginModal';
import { ShieldCheck, Edit3, LogOut, Lock, Radio } from 'lucide-react';

export default function App() {
  const [portfolioData, setPortfolioData] = useState<PortfolioData>(() => {
    const saved = localStorage.getItem('user_portfolio_data_v1');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.uiSettings) {
          parsed.uiSettings.navigationMode = 'scroll';
        }
        return parsed;
      } catch (e) {
        console.error('Failed to parse saved portfolio data', e);
      }
    }
    return INITIAL_PORTFOLIO_DATA;
  });

  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    return localStorage.getItem('admin_logged_in_v1') === 'true';
  });

  const [isFirebaseSynced, setIsFirebaseSynced] = useState<boolean>(true);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<BlogArticle | null>(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [cvModalOpen, setCvModalOpen] = useState(false);
  const [adminLoginModalOpen, setAdminLoginModalOpen] = useState(false);

  // Subscribe to Firebase Firestore for Instant Real-Time Cross-Device Synchronization
  useEffect(() => {
    let unsubscribe: (() => void) | null = null;

    // First try fetching initial data or seeding Firebase if empty
    getFirebasePortfolio().then((firebaseData) => {
      if (firebaseData) {
        if (firebaseData.uiSettings) firebaseData.uiSettings.navigationMode = 'scroll';
        setPortfolioData(firebaseData);
        localStorage.setItem('user_portfolio_data_v1', JSON.stringify(firebaseData));
      } else {
        // Seed initial data to Firebase
        saveFirebasePortfolio(INITIAL_PORTFOLIO_DATA);
      }
    });

    // Start real-time snapshot listener
    unsubscribe = subscribeToFirebasePortfolio((newData) => {
      if (newData) {
        if (newData.uiSettings) newData.uiSettings.navigationMode = 'scroll';
        setPortfolioData(newData);
        localStorage.setItem('user_portfolio_data_v1', JSON.stringify(newData));
        setIsFirebaseSynced(true);
      }
    });

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  const uiSettings = portfolioData.uiSettings || {
    navigationMode: 'scroll',
    themeMode: 'neo-brutalist',
    cardBorderRadius: 'none',
    fontStyle: 'mono-sans'
  };

  const handleAdminLoginSuccess = () => {
    setIsAdminLoggedIn(true);
    localStorage.setItem('admin_logged_in_v1', 'true');
    setAdminLoginModalOpen(false);
    setEditModalOpen(true);
  };

  const handleAdminLogout = () => {
    setIsAdminLoggedIn(false);
    localStorage.removeItem('admin_logged_in_v1');
    setEditModalOpen(false);
  };

  const handleOpenEdit = () => {
    if (!isAdminLoggedIn) {
      setAdminLoginModalOpen(true);
    } else {
      setEditModalOpen(true);
    }
  };

  const handleSaveData = async (newData: PortfolioData) => {
    if (newData.uiSettings) {
      newData.uiSettings.navigationMode = 'scroll';
    }
    setPortfolioData(newData);
    localStorage.setItem('user_portfolio_data_v1', JSON.stringify(newData));

    // Save to Firebase Firestore (Instantly broadcasts to ALL devices connected anywhere)
    await saveFirebasePortfolio(newData);

    // Backup post to server
    try {
      await fetch('/api/portfolio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newData)
      });
    } catch (err) {
      console.error('Failed to post portfolio updates to server', err);
    }
  };

  const handleResetData = async () => {
    setPortfolioData(INITIAL_PORTFOLIO_DATA);
    localStorage.removeItem('user_portfolio_data_v1');
    await saveFirebasePortfolio(INITIAL_PORTFOLIO_DATA);
    try {
      await fetch('/api/portfolio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(INITIAL_PORTFOLIO_DATA)
      });
    } catch (err) {
      console.error('Failed to reset portfolio on server', err);
    }
  };

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToPortfolio = () => {
    scrollToSection('portfolio');
  };

  const scrollToContact = () => {
    scrollToSection('contact');
  };

  // Global keyboard shortcut for hidden admin login portal: Ctrl + Shift + A or Alt + A
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey && e.shiftKey && (e.key === 'A' || e.key === 'a')) || (e.altKey && (e.key === 'A' || e.key === 'a'))) {
        e.preventDefault();
        setAdminLoginModalOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const getThemeClass = () => {
    switch (uiSettings.themeMode) {
      case 'modern-dark':
        return 'bg-slate-950 text-slate-100';
      case 'warm-amber':
        return 'bg-[#fefae0] text-[#283618]';
      case 'emerald-clean':
        return 'bg-[#f0fdf4] text-[#064e3b]';
      case 'sunset-violet':
        return 'bg-[#0f0e17] text-[#fffffe]';
      case 'neo-brutalist':
      default:
        return 'bg-[#f4f4f2] text-neutral-900';
    }
  };

  const getFontClass = () => {
    switch (uiSettings.fontStyle) {
      case 'serif-editorial':
        return 'font-serif';
      case 'sans-inter':
        return 'font-sans';
      case 'mono-sans':
      default:
        return 'font-sans';
    }
  };

  return (
    <div className={`min-h-screen w-full overflow-x-hidden ${getThemeClass()} ${getFontClass()} selection:bg-black selection:text-white transition-colors duration-300`}>
      {/* 1. Navbar Navigation */}
      <Navbar
        name={portfolioData.profile.nickname || portfolioData.profile.name}
        customLogoUrl={portfolioData.profile.customLogoUrl}
        isAdminLoggedIn={isAdminLoggedIn}
        onOpenAdminLoginModal={() => setAdminLoginModalOpen(true)}
        onAdminLogout={handleAdminLogout}
        onOpenEditModal={handleOpenEdit}
        onOpenCvModal={() => setCvModalOpen(true)}
        navigationMode="scroll"
        onSelectSection={scrollToSection}
      />

      <main className="w-full">
        <HeroSection
          profile={portfolioData.profile}
          projectCount={portfolioData.projects.length}
          onNavigateToPortfolio={scrollToPortfolio}
          onNavigateToContact={scrollToContact}
        />
        <AboutSection profile={portfolioData.profile} />
        <ProjectsSection
          projects={portfolioData.projects}
          onSelectProject={(proj) => setSelectedProject(proj)}
        />
        <ExperienceSection experiences={portfolioData.experiences} />
        <SkillsSection skills={portfolioData.skills} />
        <BlogSection
          articles={portfolioData.articles}
          onSelectArticle={(art) => setSelectedArticle(art)}
        />
        <ContactSection profile={portfolioData.profile} />
      </main>

      {/* 8. Footer */}
      <Footer
        profile={portfolioData.profile}
        onOpenAdminLoginModal={() => setAdminLoginModalOpen(true)}
      />

      {/* Floating Admin Quick Bar when Logged In */}
      {isAdminLoggedIn && (
        <div className="fixed bottom-4 right-4 z-40 bg-black text-white border-2 border-black p-3 geo-shadow flex items-center gap-3 animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <div className="hidden sm:block text-left">
              <span className="text-[10px] font-mono font-bold uppercase text-emerald-400 block leading-none">MODE ADMIN AKTIF</span>
              <span className="text-xs font-black uppercase text-white leading-tight block">Akses Edit Website</span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 border-l border-neutral-700 pl-3">
            <button
              onClick={() => setEditModalOpen(true)}
              className="px-3 py-1.5 bg-white text-black hover:bg-neutral-200 text-xs font-mono font-bold uppercase border border-black cursor-pointer flex items-center gap-1.5"
              title="Buka Panel CMS Editor"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit Website</span>
            </button>
            <button
              onClick={handleAdminLogout}
              className="p-1.5 bg-neutral-900 hover:bg-rose-900 text-neutral-300 hover:text-white border border-neutral-700 cursor-pointer"
              title="Logout Admin"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Modals */}
      {selectedProject && (
        <ProjectDetailModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}

      {selectedArticle && (
        <ArticleReaderModal
          article={selectedArticle}
          onClose={() => setSelectedArticle(null)}
        />
      )}

      {adminLoginModalOpen && (
        <AdminLoginModal
          onClose={() => setAdminLoginModalOpen(false)}
          onLoginSuccess={handleAdminLoginSuccess}
        />
      )}

      {editModalOpen && (
        <EditProfileModal
          data={portfolioData}
          onSave={handleSaveData}
          onReset={handleResetData}
          onClose={() => setEditModalOpen(false)}
        />
      )}

      {cvModalOpen && (
        <ExportCvModal
          data={portfolioData}
          onClose={() => setCvModalOpen(false)}
        />
      )}
    </div>
  );
}
