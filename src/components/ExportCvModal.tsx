import React from 'react';
import { PortfolioData } from '../types';
import { X, Printer, Download, Mail, Phone, MapPin, GraduationCap, Github, Linkedin, Briefcase, Award, CheckCircle } from 'lucide-react';

interface ExportCvModalProps {
  data: PortfolioData;
  onClose: () => void;
}

export const ExportCvModal: React.FC<ExportCvModalProps> = ({ data, onClose }) => {
  const { profile, projects, experiences, skills } = data;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto bg-white text-slate-900 rounded-2xl shadow-2xl p-6 sm:p-10 space-y-6">
        
        {/* Header bar controls (hidden in print) */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-4 print:hidden">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Pratinjau CV Akademis & Profesional</h2>
            <p className="text-xs text-slate-500">Format ringkas siap cetak atau simpan sebagai PDF</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              id="btn-print-cv"
              onClick={handlePrint}
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-2 shadow-md shadow-indigo-600/20 cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Cetak / Simpan PDF</span>
            </button>
            <button
              id="btn-close-cv-modal"
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* CV Printable Document */}
        <div className="space-y-6 text-slate-800 text-sm font-sans" id="printable-cv">
          
          {/* Header CV */}
          <div className="border-b-2 border-indigo-600 pb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                {profile.name}
              </h1>
              <p className="text-sm font-semibold text-indigo-700">
                {profile.tagline}
              </p>
            </div>
            
            <div className="text-xs space-y-1 text-slate-600 sm:text-right">
              <p className="flex items-center sm:justify-end gap-1.5">
                <Mail className="w-3.5 h-3.5 text-indigo-600" />
                <span>{profile.email}</span>
              </p>
              <p className="flex items-center sm:justify-end gap-1.5">
                <Phone className="w-3.5 h-3.5 text-emerald-600" />
                <span>{profile.whatsapp}</span>
              </p>
              <p className="flex items-center sm:justify-end gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-rose-600" />
                <span>{profile.location}</span>
              </p>
            </div>
          </div>

          {/* Education */}
          <div className="space-y-2">
            <h2 className="text-sm font-extrabold text-indigo-900 uppercase tracking-wider border-b border-slate-200 pb-1 flex items-center gap-1.5">
              <GraduationCap className="w-4 h-4 text-indigo-600" />
              <span>Pendidikan Utama</span>
            </h2>
            <div className="flex justify-between items-start text-xs">
              <div>
                <p className="font-bold text-slate-900 text-sm">{profile.university}</p>
                <p className="text-slate-600">{profile.major} • {profile.currentSemester}</p>
              </div>
              <span className="font-semibold text-slate-500">2022 - Sekarang</span>
            </div>
          </div>

          {/* About Summary */}
          <div className="space-y-1.5">
            <h2 className="text-sm font-extrabold text-indigo-900 uppercase tracking-wider border-b border-slate-200 pb-1">
              Ringkasan Profil
            </h2>
            <p className="text-xs leading-relaxed text-slate-700">
              {profile.bioParagraph}
            </p>
          </div>

          {/* Experience & Organizations */}
          <div className="space-y-3">
            <h2 className="text-sm font-extrabold text-indigo-900 uppercase tracking-wider border-b border-slate-200 pb-1 flex items-center gap-1.5">
              <Briefcase className="w-4 h-4 text-indigo-600" />
              <span>Pengalaman Organisasi & Magang</span>
            </h2>
            <div className="space-y-3">
              {experiences.map((exp) => (
                <div key={exp.id} className="text-xs space-y-1">
                  <div className="flex justify-between font-bold text-slate-900">
                    <span>{exp.role} - {exp.organization}</span>
                    <span className="text-slate-500 font-normal">{exp.period}</span>
                  </div>
                  <p className="text-slate-600 leading-relaxed">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Featured Projects */}
          <div className="space-y-3">
            <h2 className="text-sm font-extrabold text-indigo-900 uppercase tracking-wider border-b border-slate-200 pb-1 flex items-center gap-1.5">
              <Award className="w-4 h-4 text-indigo-600" />
              <span>Portofolio Proyek Unggulan</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {projects.map((proj) => (
                <div key={proj.id} className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-1">
                  <p className="font-bold text-slate-900">{proj.title}</p>
                  <p className="text-slate-600 text-[11px]">{proj.shortDescription}</p>
                  <p className="text-[10px] font-semibold text-indigo-700">Tools: {proj.tools.join(', ')}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Skills Summary */}
          <div className="space-y-2">
            <h2 className="text-sm font-extrabold text-indigo-900 uppercase tracking-wider border-b border-slate-200 pb-1">
              Keahlian & Hard Skills
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
              {skills.flatMap(s => s.items).slice(0, 9).map((item, i) => (
                <div key={i} className="flex items-center gap-1.5 text-slate-700">
                  <CheckCircle className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                  <span className="font-medium">{item.name}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
