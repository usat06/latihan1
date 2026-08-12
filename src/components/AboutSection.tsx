import React from 'react';
import { ProfileInfo } from '../types';
import { User, Heart, Users, CheckCircle2, Award, BookOpen, Laptop } from 'lucide-react';

interface AboutSectionProps {
  profile: ProfileInfo;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ profile }) => {
  return (
    <section id="about" className="py-20 bg-white border-b-2 border-black text-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-black text-white text-xs font-mono font-bold tracking-widest uppercase mb-3 geo-shadow-sm">
            <User className="w-3.5 h-3.5 text-white" />
            <span>02 / TENTANG SAYA</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-black tracking-tight uppercase">
            Mengenal Lebih Dekat Perjalanan Akademis & Passion Saya
          </h2>
          <p className="mt-4 text-neutral-700 text-sm sm:text-base font-medium">
            Kenapa orang harus percaya dan bekerja sama dengan saya? Berikut adalah latar belakang, minat utama, dan fondasi soft skill yang saya bina.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Bio Card (Left 7 Cols) */}
          <div className="lg:col-span-7 bg-[#f4f4f2] border-2 border-black p-6 sm:p-8 geo-shadow space-y-6">
            <div className="flex items-center gap-3 border-b-2 border-black pb-4">
              <div className="p-3 bg-black text-white font-bold">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-black text-black uppercase">Profil Akademis & Perkenalan</h3>
                <p className="text-xs font-mono text-neutral-700 font-bold">
                  {profile.university} • {profile.major}
                </p>
              </div>
            </div>

            <p className="text-neutral-900 text-sm sm:text-base leading-relaxed whitespace-pre-line font-medium">
              {profile.bioParagraph}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="p-3.5 bg-white border border-black geo-shadow-sm">
                <span className="text-[10px] font-mono text-neutral-600 uppercase tracking-wider block font-bold">Universitas</span>
                <span className="text-xs font-bold text-black uppercase">{profile.university}</span>
              </div>
              <div className="p-3.5 bg-white border border-black geo-shadow-sm">
                <span className="text-[10px] font-mono text-neutral-600 uppercase tracking-wider block font-bold">Program Studi</span>
                <span className="text-xs font-bold text-black uppercase">{profile.major}</span>
              </div>
              <div className="p-3.5 bg-white border border-black geo-shadow-sm">
                <span className="text-[10px] font-mono text-neutral-600 uppercase tracking-wider block font-bold">Status Akademis</span>
                <span className="text-xs font-bold text-black uppercase">{profile.currentSemester} (Aktif)</span>
              </div>
              <div className="p-3.5 bg-white border border-black geo-shadow-sm">
                <span className="text-[10px] font-mono text-neutral-600 uppercase tracking-wider block font-bold">Domisili</span>
                <span className="text-xs font-bold text-black uppercase">{profile.location}</span>
              </div>
            </div>
          </div>

          {/* Right 5 Cols: Passion & Soft Skills */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Passion / Minat Box */}
            <div className="bg-[#f4f4f2] border-2 border-black p-6 geo-shadow space-y-4">
              <div className="flex items-center gap-2.5 text-black font-black text-sm uppercase border-b-2 border-black pb-3">
                <Heart className="w-5 h-5 text-black fill-black" />
                <h3 className="text-black">Passion & Bidang Minat Utama</h3>
              </div>
              <div className="grid grid-cols-1 gap-2">
                {profile.passions.map((passion, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-3 bg-white border border-black geo-shadow-sm"
                  >
                    <div className="w-6 h-6 bg-black text-white flex items-center justify-center font-mono font-bold text-xs shrink-0">
                      0{index + 1}
                    </div>
                    <span className="text-xs font-bold text-black uppercase">{passion}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Soft Skill Box */}
            <div className="bg-[#f4f4f2] border-2 border-black p-6 geo-shadow space-y-4">
              <div className="flex items-center gap-2.5 text-black font-black text-sm uppercase border-b-2 border-black pb-3">
                <Users className="w-5 h-5 text-black" />
                <h3 className="text-black">Soft Skill (Keahlian Non-Teknis)</h3>
              </div>
              <div className="grid grid-cols-1 gap-2">
                {profile.softSkills.map((skill, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2.5 p-3 bg-white border border-black geo-shadow-sm text-black text-xs font-bold uppercase"
                  >
                    <CheckCircle2 className="w-4 h-4 text-black shrink-0" />
                    <span>{skill}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
