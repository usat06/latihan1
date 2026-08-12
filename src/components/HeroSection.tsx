import React from 'react';
import { ProfileInfo } from '../types';
import { ArrowRight, Mail, Github, Linkedin, Instagram, MapPin, GraduationCap, Sparkles } from 'lucide-react';

interface HeroSectionProps {
  profile: ProfileInfo;
  projectCount: number;
  onNavigateToPortfolio: () => void;
  onNavigateToContact: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  profile,
  projectCount,
  onNavigateToPortfolio,
  onNavigateToContact
}) => {
  return (
    <section id="home" className="relative min-h-screen pt-28 pb-16 md:pt-36 md:pb-24 flex items-center justify-center overflow-hidden bg-[#f4f4f2] text-black border-b-2 border-black">
      
      {/* Background Subtle Grid lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0000000a_1px,transparent_1px),linear-gradient(to_bottom,#0000000a_1px,transparent_1px)] bg-[size:2rem_2rem] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Text Content */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Index Label Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-black text-white text-xs font-mono font-bold tracking-widest uppercase geo-shadow-sm">
              <span className="w-2 h-2 bg-emerald-400 inline-block animate-pulse"></span>
              <span>01 / BERANDA • TERBUKA UNTUK MAGANG & PROYEK</span>
            </div>

            {/* Headline Sapaan */}
            <div className="space-y-2">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-black leading-tight uppercase">
                {profile.headlineGreeting}
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-neutral-800 font-bold max-w-2xl">
                {profile.tagline}
              </p>
            </div>

            {/* Location & University Tag */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 text-xs font-bold uppercase">
              <div className="flex items-center gap-2 bg-white px-3.5 py-2 border border-black geo-shadow-sm">
                <GraduationCap className="w-4 h-4 text-black" />
                <span>{profile.university} • {profile.currentSemester}</span>
              </div>
              <div className="flex items-center gap-2 bg-white px-3.5 py-2 border border-black geo-shadow-sm">
                <MapPin className="w-4 h-4 text-black" />
                <span>{profile.location}</span>
              </div>
            </div>

            {/* Short Introduction Teaser */}
            <p className="text-sm sm:text-base text-neutral-800 max-w-2xl leading-relaxed font-medium bg-white p-4 border border-black geo-shadow-sm">
              Selamat datang di portofolio digital saya! Di sini Anda dapat mengeksplorasi proyek pengembangan web, desain UI/UX, pengalaman organisasi, serta artikel seputar teknologi yang telah saya selesaikan selama perkuliahan.
            </p>

            {/* Call To Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-2">
              <button
                id="btn-cta-portfolio"
                onClick={onNavigateToPortfolio}
                className="w-full sm:w-auto px-6 py-3.5 bg-black hover:bg-neutral-800 text-white font-bold text-xs uppercase tracking-wider geo-shadow transition-transform active:translate-x-0.5 active:translate-y-0.5 flex items-center justify-center gap-2 group cursor-pointer border border-black"
              >
                <span>Lihat Portofolio Proyek</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                id="btn-cta-contact"
                onClick={onNavigateToContact}
                className="w-full sm:w-auto px-6 py-3.5 bg-white hover:bg-neutral-100 text-black border border-black font-bold text-xs uppercase tracking-wider geo-shadow transition-transform active:translate-x-0.5 active:translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Mail className="w-4 h-4 text-black" />
                <span>Hubungi Saya</span>
              </button>
            </div>

            {/* Social Links Bar */}
            <div className="pt-4 border-t border-black flex items-center justify-center lg:justify-start gap-2.5">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-black mr-2">
                SOSIAL MEDIA:
              </span>
              {profile.githubUrl && (
                <a
                  href={profile.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 bg-white hover:bg-black hover:text-white text-black border border-black geo-shadow-sm transition-colors"
                  aria-label="GitHub Profile"
                >
                  <Github className="w-4 h-4" />
                </a>
              )}
              {profile.linkedinUrl && (
                <a
                  href={profile.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 bg-white hover:bg-black hover:text-white text-black border border-black geo-shadow-sm transition-colors"
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              )}
              {profile.instagramUrl && (
                <a
                  href={profile.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 bg-white hover:bg-black hover:text-white text-black border border-black geo-shadow-sm transition-colors"
                  aria-label="Instagram Profile"
                >
                  <Instagram className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>

          {/* Right Image Showcase Card */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative group">
              
              {/* Profile Image Frame with Geometric Balance Shadow */}
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-88 md:h-88 overflow-hidden bg-white border-2 border-black geo-shadow">
                <img
                  src={profile.profilePhotoUrl}
                  alt={profile.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center grayscale hover:grayscale-0 transition-all duration-300"
                />
              </div>

              {/* Floating Stat Card Left */}
              <div className="absolute -bottom-4 -left-4 bg-white border border-black p-3.5 geo-shadow flex items-center gap-3">
                <div className="p-2 bg-black text-white font-bold">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-[10px] text-neutral-600 font-mono font-bold uppercase">Proyek Selesai</p>
                  <p className="text-xs font-black uppercase text-black">{projectCount}+ Proyek Kuliah & Mandiri</p>
                </div>
              </div>

              {/* Floating Stat Card Right */}
              <div className="absolute -top-4 -right-4 bg-black text-white border border-black px-3.5 py-2 geo-shadow-sm flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-white" />
                <span className="text-xs font-mono font-bold uppercase">{profile.major}</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
