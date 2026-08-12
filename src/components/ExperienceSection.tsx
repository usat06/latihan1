import React, { useState } from 'react';
import { ExperienceItem } from '../types';
import { Briefcase, Building2, Award, Calendar, CheckCircle, ExternalLink } from 'lucide-react';

interface ExperienceSectionProps {
  experiences: ExperienceItem[];
}

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({ experiences }) => {
  const [activeTab, setActiveTab] = useState<string>('Semua');

  const tabs = ['Semua', 'Organisasi Kampus', 'Kepanitiaan', 'Magang / Kerja', 'Sertifikasi & Pelatihan'];

  const filtered = activeTab === 'Semua'
    ? experiences
    : experiences.filter(e => e.type === activeTab);

  return (
    <section id="experience" className="py-20 bg-white border-b-2 border-black text-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-black text-white text-xs font-mono font-bold tracking-widest uppercase mb-3 geo-shadow-sm">
            <Briefcase className="w-3.5 h-3.5 text-white" />
            <span>04 / PENGALAMAN & ORGANISASI</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-black tracking-tight uppercase">
            Rekam Jejak Organisasi, Magang & Sertifikasi
          </h2>
          <p className="mt-4 text-neutral-700 text-sm sm:text-base font-medium">
            Meskipun masih berstatus mahasiswa, saya aktif terlibat dalam kepengurusan himpunan, ketua event nasional, serta program sertifikasi IT terakreditasi.
          </p>
        </div>

        {/* Filter Categories */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {tabs.map((tab) => (
            <button
              key={tab}
              id={`tab-exp-${tab.toLowerCase().replace(/\s+/g, '-')}`}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-xs font-bold uppercase transition-all cursor-pointer border border-black geo-shadow-sm ${
                activeTab === tab
                  ? 'bg-black text-white'
                  : 'bg-white text-black hover:bg-neutral-100'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Timeline Items */}
        <div className="max-w-4xl mx-auto space-y-6">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="bg-[#f4f4f2] border-2 border-black p-6 sm:p-8 geo-shadow transition-all relative overflow-hidden group"
            >
              {/* Vertical Accent Strip */}
              <div className="absolute top-0 left-0 bottom-0 w-2 bg-black" />

              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 pl-2">
                <div className="space-y-2">
                  {/* Category Type Badge */}
                  <span className="inline-block px-2.5 py-1 bg-black text-white text-[10px] font-mono font-bold uppercase border border-black">
                    {item.type}
                  </span>

                  {/* Role Title */}
                  <h3 className="text-xl font-black text-black uppercase">
                    {item.role}
                  </h3>

                  {/* Organization & Location */}
                  <p className="text-xs font-bold text-neutral-800 flex items-center gap-2 uppercase font-mono">
                    <Building2 className="w-4 h-4 text-black" />
                    <span>{item.organization}</span>
                  </p>
                </div>

                {/* Period Badge */}
                <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase text-black bg-white px-3 py-1.5 border border-black geo-shadow-sm shrink-0 self-start">
                  <Calendar className="w-3.5 h-3.5 text-black" />
                  <span>{item.period}</span>
                </div>
              </div>

              {/* Description */}
              <p className="mt-4 text-neutral-800 text-xs sm:text-sm leading-relaxed font-medium pl-2">
                {item.description}
              </p>

              {/* Skills Gained Tags */}
              {item.skillsGained && item.skillsGained.length > 0 && (
                <div className="mt-5 pt-4 border-t-2 border-black flex flex-wrap items-center gap-2 pl-2">
                  <span className="text-xs font-mono font-bold uppercase text-black mr-2">PENCAPAIAN & SKILL:</span>
                  {item.skillsGained.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="inline-flex items-center gap-1 px-2.5 py-1 bg-white border border-black text-[11px] font-mono font-bold text-black uppercase"
                    >
                      <CheckCircle className="w-3 h-3 text-black" />
                      <span>{skill}</span>
                    </span>
                  ))}
                </div>
              )}

              {/* Credential Link if any */}
              {item.credentialUrl && (
                <div className="mt-3 pl-2">
                  <a
                    href={item.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-black hover:underline uppercase"
                  >
                    <Award className="w-4 h-4" />
                    <span>Lihat Sertifikat Verifikasi</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
