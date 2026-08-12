import React from 'react';
import { SkillCategory } from '../types';
import { Cpu, Code, Palette, Wrench, Sparkles } from 'lucide-react';

interface SkillsSectionProps {
  skills: SkillCategory[];
}

export const SkillsSection: React.FC<SkillsSectionProps> = ({ skills }) => {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Programming':
        return <Code className="w-5 h-5 text-black" />;
      case 'Design':
        return <Palette className="w-5 h-5 text-black" />;
      case 'Tools':
        return <Wrench className="w-5 h-5 text-black" />;
      default:
        return <Sparkles className="w-5 h-5 text-black" />;
    }
  };

  return (
    <section id="skills" className="py-20 bg-[#f4f4f2] text-black border-b-2 border-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-black text-white text-xs font-mono font-bold tracking-widest uppercase mb-3 geo-shadow-sm">
            <Cpu className="w-3.5 h-3.5 text-white" />
            <span>05 / KEMAMPUAN TEKNIS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-black tracking-tight uppercase">
            Peta Kemampuan Teknis & Penguasaan Tools
          </h2>
          <p className="mt-4 text-neutral-700 text-sm sm:text-base font-medium">
            Gambaran komprehensif tingkat penguasaan bahasa pemrograman, perangkat lunak desain, serta tools pendukung pengembangan yang biasa saya gunakan.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skills.map((categoryGroup, index) => (
            <div
              key={index}
              className="bg-white border-2 border-black p-6 sm:p-8 geo-shadow space-y-6"
            >
              {/* Category Title Header */}
              <div className="flex items-center justify-between border-b-2 border-black pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-black text-white font-bold">
                    {getCategoryIcon(categoryGroup.category)}
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-black uppercase">
                      {categoryGroup.category === 'Programming' && 'Programming & Web Tech'}
                      {categoryGroup.category === 'Design' && 'UI/UX & Graphics Design'}
                      {categoryGroup.category === 'Tools' && 'Developer & Office Tools'}
                      {categoryGroup.category === 'Soft Skill' && 'Keahlian Non-Teknis'}
                    </h3>
                    <p className="text-xs font-mono font-bold text-neutral-600 uppercase">
                      {categoryGroup.items.length} Keahlian Terdaftar
                    </p>
                  </div>
                </div>
              </div>

              {/* Progress Bars & Skill Items */}
              <div className="space-y-4">
                {categoryGroup.items.map((skill, sIdx) => (
                  <div key={sIdx} className="space-y-1.5">
                    <div className="flex justify-between items-center text-xs font-mono font-bold uppercase">
                      <span className="text-black">{skill.name}</span>
                      <span className="text-black bg-neutral-200 px-1.5 py-0.5 border border-black">{skill.levelPercentage}%</span>
                    </div>

                    {/* Progress Bar Container */}
                    <div className="w-full h-3 bg-[#f4f4f2] border border-black p-0.5">
                      <div
                        className="h-full bg-black transition-all duration-1000 ease-out"
                        style={{ width: `${skill.levelPercentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
