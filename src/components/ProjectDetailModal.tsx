import React from 'react';
import { Project } from '../types';
import { X, ExternalLink, Github, CheckCircle2, Tag, Calendar, Layers } from 'lucide-react';

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  onClose
}) => {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white border-2 border-black geo-shadow text-black p-6 sm:p-8 space-y-6">
        
        {/* Close Button */}
        <button
          id="btn-close-project-modal"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-black text-white hover:bg-neutral-800 transition-colors cursor-pointer border border-black"
        >
          <X className="w-5 h-5 text-white" />
        </button>

        {/* Status Badge */}
        <div>
          <span className="inline-block px-3 py-1 bg-black text-white text-xs font-mono font-bold uppercase tracking-wider mb-2 border border-black geo-shadow-sm">
            {project.status}
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-black uppercase pr-8">
            {project.title}
          </h2>
        </div>

        {/* Image Screenshot */}
        <div className="aspect-video w-full bg-neutral-200 border-2 border-black overflow-hidden">
          <img
            src={project.imageUrl}
            alt={project.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Detailed Description */}
        <div className="space-y-3 bg-[#f4f4f2] border-2 border-black p-5 geo-shadow-sm">
          <h3 className="text-xs font-mono font-bold text-black uppercase tracking-wider border-b border-black pb-2">
            Deskripsi & Kasus Penggunaan Proyek
          </h3>
          <p className="text-neutral-900 text-xs sm:text-sm leading-relaxed whitespace-pre-line font-medium">
            {project.fullDescription || project.shortDescription}
          </p>
        </div>

        {/* Tools Tech Stack */}
        <div className="space-y-3">
          <h3 className="text-xs font-mono font-bold text-black uppercase tracking-wider">
            Teknologi & Tools Yang Digunakan
          </h3>
          <div className="flex flex-wrap gap-2">
            {project.tools.map((tool, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#f4f4f2] border border-black text-xs font-mono font-bold text-black uppercase"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-black" />
                <span>{tool}</span>
              </span>
            ))}
          </div>
        </div>

        {/* Links Footer */}
        <div className="pt-4 border-t-2 border-black flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-black hover:bg-neutral-800 text-white text-xs font-bold uppercase flex items-center gap-2 border border-black geo-shadow-sm"
              >
                <Github className="w-4 h-4 text-white" />
                <span>Source Code GitHub</span>
              </a>
            )}
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-black hover:bg-neutral-800 text-white text-xs font-bold uppercase flex items-center gap-2 border border-black geo-shadow-sm"
              >
                <ExternalLink className="w-4 h-4 text-white" />
                <span>Kunjungi Demo Aplikasi</span>
              </a>
            )}
          </div>

          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#f4f4f2] hover:bg-neutral-200 text-black text-xs font-bold uppercase border border-black cursor-pointer"
          >
            Tutup
          </button>
        </div>

      </div>
    </div>
  );
};
