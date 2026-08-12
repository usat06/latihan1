import React, { useState, useEffect } from 'react';
import { Menu, X, FileDown, Edit3, Code2, Lock, LogOut, ShieldCheck } from 'lucide-react';

interface NavbarProps {
  name: string;
  customLogoUrl?: string;
  isAdminLoggedIn: boolean;
  onOpenAdminLoginModal: () => void;
  onAdminLogout: () => void;
  onOpenEditModal: () => void;
  onOpenCvModal: () => void;
  activeSection?: string;
  onSelectSection?: (id: string) => void;
  navigationMode?: 'paginated' | 'scroll';
  currentPageStep?: number;
  totalPages?: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  name,
  customLogoUrl,
  isAdminLoggedIn,
  onOpenAdminLoginModal,
  onAdminLogout,
  onOpenEditModal,
  onOpenCvModal,
  activeSection: externalActiveSection,
  onSelectSection,
  navigationMode = 'paginated',
  currentPageStep = 0,
  totalPages = 7
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [internalActiveSection, setInternalActiveSection] = useState('home');

  const activeSection = externalActiveSection || internalActiveSection;

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      if (navigationMode === 'scroll') {
        const sections = ['home', 'about', 'portfolio', 'experience', 'skills', 'blog', 'contact'];
        const scrollPosition = window.scrollY + 100;

        for (const sectionId of sections) {
          const el = document.getElementById(sectionId);
          if (el) {
            const top = el.offsetTop;
            const height = el.offsetHeight;
            if (scrollPosition >= top && scrollPosition < top + height) {
              setInternalActiveSection(sectionId);
              break;
            }
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [navigationMode]);

  const navLinks = [
    { id: 'home', label: 'Beranda' },
    { id: 'about', label: 'Tentang' },
    { id: 'portfolio', label: 'Portofolio' },
    { id: 'experience', label: 'Pengalaman' },
    { id: 'skills', label: 'Skill' },
    { id: 'blog', label: 'Artikel' },
    { id: 'contact', label: 'Kontak' }
  ];

  const handleNavClick = (id: string) => {
    setMobileMenuOpen(false);
    if (onSelectSection) {
      onSelectSection(id);
    }
    if (navigationMode === 'scroll') {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <header
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-200 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md border-b-2 border-black text-black py-2.5 shadow-md'
          : 'bg-[#f4f4f2]/90 backdrop-blur-sm text-black py-3 border-b border-black'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo / Name */}
          <button
            id="nav-logo-button"
            onClick={() => handleNavClick('home')}
            onDoubleClick={onOpenAdminLoginModal}
            className="flex items-center gap-2.5 group text-left cursor-pointer focus:outline-none"
            title="Double-click untuk Portal Admin"
          >
            <div className="w-9 h-9 bg-black text-white flex items-center justify-center font-black geo-shadow-sm transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5 overflow-hidden border border-black">
              {customLogoUrl ? (
                <img
                  src={customLogoUrl}
                  alt="Logo"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Fallback if image fails to load
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
              ) : (
                <Code2 className="w-5 h-5 text-white" />
              )}
            </div>
            <div>
              <span className="text-base font-black tracking-tight text-black block leading-tight uppercase">
                {name || 'PORTOFOLIO'}
              </span>
              <span className="text-[10px] text-neutral-600 font-mono tracking-widest uppercase block">
                01 / WEB PORTFOLIO
              </span>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 bg-white p-1 border border-black geo-shadow-sm">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  id={`nav-link-${link.id}`}
                  onClick={() => handleNavClick(link.id)}
                  className={`px-3 py-1.5 text-xs font-bold uppercase transition-all duration-150 ${
                    isActive
                      ? 'bg-black text-white'
                      : 'text-neutral-800 hover:bg-neutral-200 hover:text-black'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Action Buttons */}
          <div className="hidden sm:flex items-center gap-2">
            {isAdminLoggedIn && (
              <>
                <button
                  id="btn-admin-cms-edit"
                  onClick={onOpenEditModal}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-black hover:bg-neutral-800 text-white border border-black text-xs font-mono font-bold uppercase transition-all geo-shadow-sm cursor-pointer"
                  title="Buka CMS Editor Admin untuk mengedit seluruh isi website"
                >
                  <Edit3 className="w-3.5 h-3.5 text-white" />
                  <span>Edit Web (Admin CMS)</span>
                </button>

                <button
                  id="btn-admin-logout"
                  onClick={onAdminLogout}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1.5 bg-[#f4f4f2] hover:bg-black hover:text-white text-black border border-black text-xs font-mono font-bold uppercase transition-all cursor-pointer"
                  title="Logout dari Mode Admin"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Logout</span>
                </button>
              </>
            )}

            <button
              id="btn-open-cv-modal"
              onClick={onOpenCvModal}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-black hover:bg-neutral-800 text-white text-xs font-bold uppercase transition-all geo-shadow-sm cursor-pointer active:translate-x-0.5 active:translate-y-0.5"
            >
              <FileDown className="w-3.5 h-3.5 text-white" />
              <span>CV</span>
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center gap-2 lg:hidden">
            {isAdminLoggedIn && (
              <button
                id="btn-mobile-admin-cms"
                onClick={onOpenEditModal}
                className="p-2 bg-black text-white border border-black sm:hidden geo-shadow-sm text-xs font-bold uppercase"
                title="Edit Website"
              >
                <Edit3 className="w-4 h-4 text-white" />
              </button>
            )}

            <button
              id="btn-mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 bg-black text-white border border-black focus:outline-none geo-shadow-sm"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-white" /> : <Menu className="w-5 h-5 text-white" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b-2 border-black px-4 pt-3 pb-5 space-y-2 shadow-lg">
          <div className="grid grid-cols-2 gap-2 mb-3">
            {navLinks.map((link) => (
              <button
                key={link.id}
                id={`mobile-nav-${link.id}`}
                onClick={() => handleNavClick(link.id)}
                className={`text-left px-3 py-2 text-xs font-bold uppercase border ${
                  activeSection === link.id
                    ? 'bg-black text-white border-black'
                    : 'text-neutral-800 bg-neutral-100 border-black hover:bg-neutral-200'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="pt-2 border-t border-black flex flex-col gap-2">
            {isAdminLoggedIn && (
              <>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenEditModal();
                  }}
                  className="w-full flex items-center justify-center gap-2 py-2 bg-black text-white font-mono font-bold text-xs uppercase border border-black"
                >
                  <Edit3 className="w-4 h-4 text-white" />
                  <span>Edit Data Website (CMS Admin)</span>
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onAdminLogout();
                  }}
                  className="w-full flex items-center justify-center gap-2 py-2 bg-[#f4f4f2] text-black font-mono font-bold text-xs uppercase border border-black"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout Admin</span>
                </button>
              </>
            )}

            <button
              id="btn-mobile-cv"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenCvModal();
              }}
              className="w-full flex items-center justify-center gap-2 py-2 bg-[#f4f4f2] text-black font-bold text-xs uppercase border border-black"
            >
              <FileDown className="w-4 h-4 text-black" />
              <span>Pratinjau & Unduh CV</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
