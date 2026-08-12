import React from 'react';
import { ProfileInfo } from '../types';
import { Heart, ArrowUp, Github, Linkedin, Instagram, Code2 } from 'lucide-react';

interface FooterProps {
  profile: ProfileInfo;
  onOpenAdminLoginModal?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ profile, onOpenAdminLoginModal }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-black text-white border-t-2 border-black py-12 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-neutral-800">
          
          {/* Brand Info */}
          <div className="flex items-center gap-3 text-center md:text-left">
            <div className="w-10 h-10 bg-white text-black flex items-center justify-center font-bold text-base border border-white overflow-hidden">
              {profile.customLogoUrl ? (
                <img
                  src={profile.customLogoUrl}
                  alt="Logo"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
              ) : (
                <Code2 className="w-5 h-5 text-black" />
              )}
            </div>
            <div>
              <p className="text-base font-black text-white leading-tight uppercase">{profile.name}</p>
              <p className="text-xs font-mono text-neutral-400 uppercase">{profile.major} • {profile.university}</p>
            </div>
          </div>

          {/* Social Links Repeat */}
          <div className="flex items-center gap-2">
            {profile.githubUrl && (
              <a
                href={profile.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 bg-neutral-900 hover:bg-white hover:text-black text-white border border-neutral-700 transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
            )}
            {profile.linkedinUrl && (
              <a
                href={profile.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 bg-neutral-900 hover:bg-white hover:text-black text-white border border-neutral-700 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            )}
            {profile.instagramUrl && (
              <a
                href={profile.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 bg-neutral-900 hover:bg-white hover:text-black text-white border border-neutral-700 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
            )}

            {/* Back To Top Button */}
            <button
              id="btn-back-to-top"
              onClick={scrollToTop}
              className="p-2.5 bg-white text-black hover:bg-neutral-200 transition-all ml-2 cursor-pointer border border-white font-bold"
              title="Kembali ke Atas"
            >
              <ArrowUp className="w-4 h-4 text-black" />
            </button>
          </div>
        </div>

        {/* Copyright Text */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-neutral-400 gap-4 uppercase">
          <p
            onClick={onOpenAdminLoginModal}
            className="cursor-pointer select-none hover:text-neutral-200 transition-colors"
            title="Sistem Admin Tersembunyi"
          >
            © {new Date().getFullYear()} {profile.name}. Hak Cipta Dilindungi.
          </p>
          <p className="flex items-center gap-1.5">
            <span>Dibuat dengan</span>
            <Heart className="w-3.5 h-3.5 text-white fill-white" />
            <span>Tema Geometric Balance</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
