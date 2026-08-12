import React, { useState } from 'react';
import { Project } from '../types';
import { FolderGit2, ExternalLink, Github, Layers, ArrowUpRight, Filter, Eye, Search } from 'lucide-react';

interface ProjectsSectionProps {
  projects: Project[];
  onSelectProject: (project: Project) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  projects,
  onSelectProject
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['Semua', 'Web Dev', 'UI/UX Design', 'Data & AI'];

  const filteredProjects = projects.filter((p) => {
    const matchesCategory = selectedCategory === 'Semua' || p.category === selectedCategory;
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tools.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="portfolio" className="py-20 bg-[#f4f4f2] text-black border-b-2 border-black relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-black text-white text-xs font-mono font-bold tracking-widest uppercase mb-3 geo-shadow-sm">
              <FolderGit2 className="w-3.5 h-3.5 text-white" />
              <span>03 / PORTOFOLIO & PROYEK</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-black tracking-tight uppercase">
              Koleksi Karya, Tugas Perkuliahan & Case Study
            </h2>
            <p className="mt-2 text-neutral-700 text-sm sm:text-base max-w-2xl font-medium">
              Eksplorasi proyek nyata yang telah saya selesaikan. Klik pada kartu proyek untuk melihat dokumentasi lengkap, peran, serta analisis kasus.
            </p>
          </div>

          {/* Search & Filter Controls */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 text-black absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Cari proyek / teknologi (React, UI/UX...)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-3 py-1.5 text-xs font-mono font-bold bg-white border border-black text-black placeholder:text-neutral-500 geo-shadow-sm focus:outline-none focus:ring-1 focus:ring-black w-full sm:w-60"
              />
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap items-center gap-1.5 bg-white p-1.5 border border-black geo-shadow-sm">
              {categories.map((cat) => (
                <button
                  key={cat}
                  id={`filter-${cat.toLowerCase().replace(/\s+/g, '-')}`}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 text-xs font-bold uppercase transition-all cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-black text-white'
                      : 'text-black hover:bg-neutral-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Empty Search Result State */}
        {filteredProjects.length === 0 && (
          <div className="bg-white border-2 border-black p-8 text-center space-y-3 geo-shadow my-8">
            <p className="font-mono text-sm font-bold uppercase text-black">
              Tidak ada proyek yang cocok dengan kata kunci "{searchQuery}"
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('Semua');
              }}
              className="px-4 py-2 bg-black text-white font-mono text-xs font-bold uppercase border border-black cursor-pointer hover:bg-neutral-800"
            >
              Reset Pencarian & Filter
            </button>
          </div>
        )}

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group bg-white border-2 border-black geo-shadow geo-shadow-hover transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                {/* Image & Status Badge Container */}
                <div className="relative aspect-video overflow-hidden bg-neutral-200 border-b-2 border-black">
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-300"
                  />
                  
                  {/* Status Overlay Badge */}
                  <div className="absolute top-3 left-3 bg-black text-white px-2.5 py-1 text-[10px] font-mono font-bold uppercase border border-black geo-shadow-sm">
                    {project.status}
                  </div>

                  {/* Hover Quick View Overlay */}
                  <div
                    onClick={() => onSelectProject(project)}
                    className="absolute inset-0 bg-black/75 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer p-4"
                  >
                    <span className="inline-flex items-center gap-2 px-4 py-2 bg-white text-black text-xs font-bold uppercase border border-black geo-shadow-sm">
                      <Eye className="w-4 h-4 text-black" />
                      <span>Lihat Dokumentasi</span>
                    </span>
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-5 space-y-3">
                  {/* Category Tag */}
                  <div className="flex items-center justify-between text-[11px] font-mono font-bold">
                    <span className="text-black uppercase bg-neutral-200 px-2 py-0.5 border border-black">
                      {project.category}
                    </span>
                  </div>

                  {/* Title */}
                  <h3
                    onClick={() => onSelectProject(project)}
                    className="text-base font-black text-black group-hover:underline transition-colors cursor-pointer line-clamp-2 uppercase leading-snug"
                  >
                    {project.title}
                  </h3>

                  {/* Short Description */}
                  <p className="text-neutral-700 text-xs leading-relaxed line-clamp-2 font-medium">
                    {project.shortDescription}
                  </p>

                  {/* Tools / Tech Stack */}
                  <div className="flex flex-wrap gap-1 pt-1">
                    {project.tools.map((tool, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 bg-[#f4f4f2] border border-black text-[10px] font-mono font-bold text-black uppercase"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="px-5 pb-5 pt-3 border-t-2 border-black flex items-center justify-between bg-[#f4f4f2]">
                <button
                  id={`btn-detail-${project.id}`}
                  onClick={() => onSelectProject(project)}
                  className="text-xs font-bold text-black hover:underline flex items-center gap-1 cursor-pointer uppercase"
                >
                  <span>Detail Proyek</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>

                <div className="flex items-center gap-1.5">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 bg-white hover:bg-black hover:text-white text-black border border-black transition-colors"
                      title="Lihat Kode di GitHub"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                  )}
                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 bg-white hover:bg-black hover:text-white text-black border border-black transition-colors"
                      title="Buka Demo Aplikasi"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
