import React, { useState } from 'react';
import { PortfolioData, ProfileInfo, Project, ExperienceItem, SkillCategory, BlogArticle, UISettings } from '../types';
import { X, Save, RotateCcw, Sparkles, Check, Trash2, Plus, User, FolderPlus, Briefcase, Cpu, BookOpen, Palette, ArrowRight, Layout } from 'lucide-react';

interface EditProfileModalProps {
  data: PortfolioData;
  onSave: (newData: PortfolioData) => void;
  onReset: () => void;
  onClose: () => void;
}

export const EditProfileModal: React.FC<EditProfileModalProps> = ({
  data,
  onSave,
  onReset,
  onClose
}) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'projects' | 'experiences' | 'skills' | 'articles' | 'uiSettings'>('profile');
  
  // Local editable states
  const [profile, setProfile] = useState<ProfileInfo>({ ...data.profile });
  const [projects, setProjects] = useState<Project[]>([...data.projects]);
  const [experiences, setExperiences] = useState<ExperienceItem[]>([...data.experiences]);
  const [skills, setSkills] = useState<SkillCategory[]>([...data.skills]);
  const [articles, setArticles] = useState<BlogArticle[]>([...data.articles]);
  const [uiSettings, setUiSettings] = useState<UISettings>(
    data.uiSettings || {
      navigationMode: 'paginated',
      themeMode: 'neo-brutalist',
      cardBorderRadius: 'none',
      fontStyle: 'mono-sans'
    }
  );
  
  const [showSavedToast, setShowSavedToast] = useState(false);

  const handleSaveAll = () => {
    onSave({
      profile,
      projects,
      experiences,
      skills,
      articles,
      uiSettings
    });
    setShowSavedToast(true);
    setTimeout(() => {
      setShowSavedToast(false);
      onClose();
    }, 1200);
  };

  // Handlers for Passions & SoftSkills
  const [newPassion, setNewPassion] = useState('');
  const [newSoftSkill, setNewSoftSkill] = useState('');

  const handleAddPassion = () => {
    if (!newPassion.trim()) return;
    setProfile({ ...profile, passions: [...profile.passions, newPassion.trim()] });
    setNewPassion('');
  };

  const handleRemovePassion = (index: number) => {
    setProfile({ ...profile, passions: profile.passions.filter((_, i) => i !== index) });
  };

  const handleAddSoftSkill = () => {
    if (!newSoftSkill.trim()) return;
    setProfile({ ...profile, softSkills: [...profile.softSkills, newSoftSkill.trim()] });
    setNewSoftSkill('');
  };

  const handleRemoveSoftSkill = (index: number) => {
    setProfile({ ...profile, softSkills: profile.softSkills.filter((_, i) => i !== index) });
  };

  // Handlers for Projects
  const handleAddProject = () => {
    const newProj: Project = {
      id: `proj-${Date.now()}`,
      title: 'Proyek Baru Admin',
      shortDescription: 'Deskripsi singkat proyek baru yang dapat Anda sesuaikan.',
      fullDescription: 'Detail cerita lengkap mengenai teknologi dan fungsionalitas proyek ini.',
      tools: ['React', 'Tailwind CSS'],
      imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80',
      status: 'Proyek Baru',
      category: 'Web Dev',
      githubUrl: 'https://github.com/user/new-project',
      demoUrl: 'https://example.com'
    };
    setProjects([newProj, ...projects]);
  };

  const handleDeleteProject = (id: string) => {
    setProjects(projects.filter(p => p.id !== id));
  };

  // Handlers for Experiences
  const handleAddExperience = () => {
    const newExp: ExperienceItem = {
      id: `exp-${Date.now()}`,
      role: 'Posisi / Peran Baru',
      organization: 'Nama Organisasi / Perusahaan',
      period: '2025 - Sekarang',
      type: 'Organisasi Kampus',
      description: 'Deskripsi tugas, tanggung jawab, dan pencapaian Anda selama menjabat.',
      skillsGained: ['Leadership', 'Teamwork', 'Communication']
    };
    setExperiences([newExp, ...experiences]);
  };

  const handleDeleteExperience = (id: string) => {
    setExperiences(experiences.filter(e => e.id !== id));
  };

  // Handlers for Skills
  const handleAddSkillItem = (categoryIndex: number) => {
    const updated = [...skills];
    updated[categoryIndex].items.push({
      name: 'Skill Baru',
      levelPercentage: 80
    });
    setSkills(updated);
  };

  const handleDeleteSkillItem = (categoryIndex: number, itemIndex: number) => {
    const updated = [...skills];
    updated[categoryIndex].items = updated[categoryIndex].items.filter((_, i) => i !== itemIndex);
    setSkills(updated);
  };

  // Handlers for Blog Articles
  const handleAddArticle = () => {
    const newArt: BlogArticle = {
      id: `art-${Date.now()}`,
      title: 'Judul Artikel Baru Admin',
      summary: 'Ringkasan singkat mengenai topik artikel yang ditulis.',
      content: '## Pendahuluan\nTuliskan isi artikel lengkap di sini menggunakan sintaks Markdown sederhana.\n\n### Subtopik Utama\nJelaskan pembahasan secara mendalam.\n\n* Poin pertama\n* Poin kedua',
      date: 'Okt 2025',
      readTime: '3 Menit',
      tags: ['Teknologi', 'Tutorial'],
      coverImage: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop&q=80'
    };
    setArticles([newArt, ...articles]);
  };

  const handleDeleteArticle = (id: string) => {
    setArticles(articles.filter(a => a.id !== id));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl max-h-[92vh] flex flex-col bg-white border-2 border-black geo-shadow text-black p-6 sm:p-8 space-y-6">
        
        {/* Header bar */}
        <div className="flex items-center justify-between border-b-2 border-black pb-4 shrink-0">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-black text-white text-[10px] font-mono font-bold uppercase tracking-widest mb-1">
              <Sparkles className="w-3.5 h-3.5 text-white" />
              <span>ADMIN CMS PANEL</span>
            </div>
            <h2 className="text-2xl font-black text-black uppercase">
              ADMIN CONTROL CENTER - EDIT SEMUA DATA WEBSITE
            </h2>
            <p className="text-xs font-mono font-bold text-neutral-700">
              Ubah data profil, portofolio, pengalaman, skill, dan blog secara langsung.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              id="btn-reset-default-data"
              onClick={onReset}
              className="px-3 py-1.5 bg-[#f4f4f2] hover:bg-black hover:text-white text-black border border-black text-xs font-mono font-bold uppercase flex items-center gap-1.5 transition-colors cursor-pointer geo-shadow-sm"
              title="Kembalikan ke data sampel awal"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Sample</span>
            </button>
            <button
              id="btn-close-edit-modal"
              onClick={onClose}
              className="p-2 bg-black text-white hover:bg-neutral-800 transition-colors cursor-pointer border border-black"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>

        {/* Tab switcher */}
        <div className="flex flex-wrap items-center gap-1.5 border-b-2 border-black pb-3 shrink-0">
          <button
            onClick={() => setActiveTab('profile')}
            className={`px-3.5 py-2 text-xs font-mono font-bold uppercase transition-all cursor-pointer border border-black geo-shadow-sm flex items-center gap-1.5 ${
              activeTab === 'profile'
                ? 'bg-black text-white'
                : 'bg-white text-black hover:bg-neutral-200'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>1. Profil & Bio</span>
          </button>

          <button
            onClick={() => setActiveTab('projects')}
            className={`px-3.5 py-2 text-xs font-mono font-bold uppercase transition-all cursor-pointer border border-black geo-shadow-sm flex items-center gap-1.5 ${
              activeTab === 'projects'
                ? 'bg-black text-white'
                : 'bg-white text-black hover:bg-neutral-200'
            }`}
          >
            <FolderPlus className="w-3.5 h-3.5" />
            <span>2. Proyek ({projects.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('experiences')}
            className={`px-3.5 py-2 text-xs font-mono font-bold uppercase transition-all cursor-pointer border border-black geo-shadow-sm flex items-center gap-1.5 ${
              activeTab === 'experiences'
                ? 'bg-black text-white'
                : 'bg-white text-black hover:bg-neutral-200'
            }`}
          >
            <Briefcase className="w-3.5 h-3.5" />
            <span>3. Pengalaman ({experiences.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('skills')}
            className={`px-3.5 py-2 text-xs font-mono font-bold uppercase transition-all cursor-pointer border border-black geo-shadow-sm flex items-center gap-1.5 ${
              activeTab === 'skills'
                ? 'bg-black text-white'
                : 'bg-white text-black hover:bg-neutral-200'
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>4. Skill Teknis</span>
          </button>

          <button
            onClick={() => setActiveTab('articles')}
            className={`px-3.5 py-2 text-xs font-mono font-bold uppercase transition-all cursor-pointer border border-black geo-shadow-sm flex items-center gap-1.5 ${
              activeTab === 'articles'
                ? 'bg-black text-white'
                : 'bg-white text-black hover:bg-neutral-200'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>5. Blog Artikel ({articles.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('uiSettings')}
            className={`px-3.5 py-2 text-xs font-mono font-bold uppercase transition-all cursor-pointer border border-black geo-shadow-sm flex items-center gap-1.5 ${
              activeTab === 'uiSettings'
                ? 'bg-black text-white'
                : 'bg-white text-black hover:bg-neutral-200'
            }`}
          >
            <Palette className="w-3.5 h-3.5" />
            <span>6. Tampilan UI/UX & Tema</span>
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="flex-1 overflow-y-auto pr-1 space-y-6">
          
          {/* TAB 1: PROFILE & BIO */}
          {activeTab === 'profile' && (
            <div className="space-y-6 text-xs sm:text-sm">
              <div className="bg-[#f4f4f2] border-2 border-black p-5 geo-shadow-sm space-y-4">
                <h3 className="text-xs font-mono font-bold text-black uppercase border-b border-black pb-2">
                  Informasi Identitas Diri & Akademis
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="font-mono font-bold uppercase text-black text-[11px]">Nama Lengkap</label>
                    <input
                      type="text"
                      value={profile.name}
                      onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                      className="w-full px-3 py-2 bg-white border border-black text-black font-medium"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-mono font-bold uppercase text-black text-[11px]">Nama Panggilan</label>
                    <input
                      type="text"
                      value={profile.nickname}
                      onChange={(e) => setProfile({ ...profile, nickname: e.target.value })}
                      className="w-full px-3 py-2 bg-white border border-black text-black font-medium"
                    />
                  </div>

                  <div className="space-y-1 sm:col-span-2">
                    <label className="font-mono font-bold uppercase text-black text-[11px]">Sapaan Beranda (Headline Greeting)</label>
                    <input
                      type="text"
                      value={profile.headlineGreeting}
                      onChange={(e) => setProfile({ ...profile, headlineGreeting: e.target.value })}
                      className="w-full px-3 py-2 bg-white border border-black text-black font-medium"
                    />
                  </div>

                  <div className="space-y-1 sm:col-span-2">
                    <label className="font-mono font-bold uppercase text-black text-[11px]">Tagline / Sub-Headline Hero</label>
                    <input
                      type="text"
                      value={profile.tagline}
                      onChange={(e) => setProfile({ ...profile, tagline: e.target.value })}
                      className="w-full px-3 py-2 bg-white border border-black text-black font-medium"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-mono font-bold uppercase text-black text-[11px]">Universitas</label>
                    <input
                      type="text"
                      value={profile.university}
                      onChange={(e) => setProfile({ ...profile, university: e.target.value })}
                      className="w-full px-3 py-2 bg-white border border-black text-black font-medium"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-mono font-bold uppercase text-black text-[11px]">Program Studi / Jurusan</label>
                    <input
                      type="text"
                      value={profile.major}
                      onChange={(e) => setProfile({ ...profile, major: e.target.value })}
                      className="w-full px-3 py-2 bg-white border border-black text-black font-medium"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-mono font-bold uppercase text-black text-[11px]">Semester Status</label>
                    <input
                      type="text"
                      value={profile.currentSemester}
                      onChange={(e) => setProfile({ ...profile, currentSemester: e.target.value })}
                      className="w-full px-3 py-2 bg-white border border-black text-black font-medium"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-mono font-bold uppercase text-black text-[11px]">Domisili</label>
                    <input
                      type="text"
                      value={profile.location}
                      onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                      className="w-full px-3 py-2 bg-white border border-black text-black font-medium"
                    />
                  </div>

                  <div className="space-y-1 sm:col-span-2">
                    <label className="font-mono font-bold uppercase text-black text-[11px]">URL Foto Profil (Image Link)</label>
                    <input
                      type="text"
                      value={profile.profilePhotoUrl}
                      onChange={(e) => setProfile({ ...profile, profilePhotoUrl: e.target.value })}
                      className="w-full px-3 py-2 bg-white border border-black text-black font-mono text-xs"
                    />
                  </div>

                  {/* Custom Logo Photo Settings */}
                  <div className="space-y-2 sm:col-span-2 p-3.5 bg-white border-2 border-black geo-shadow-sm">
                    <div className="flex items-center justify-between">
                      <label className="font-mono font-bold uppercase text-black text-[11px] flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-black" />
                        <span>URL Logo Foto Kustom (Logo Website / Navbar & Footer)</span>
                      </label>
                      {profile.customLogoUrl && (
                        <button
                          type="button"
                          onClick={() => setProfile({ ...profile, customLogoUrl: '' })}
                          className="text-[10px] font-mono font-bold text-rose-600 hover:underline uppercase"
                        >
                          [ Reset ke Logo Default ]
                        </button>
                      )}
                    </div>

                    <div className="flex gap-3 items-center">
                      <div className="w-12 h-12 bg-black text-white shrink-0 border border-black geo-shadow-sm flex items-center justify-center overflow-hidden">
                        {profile.customLogoUrl ? (
                          <img
                            src={profile.customLogoUrl}
                            alt="Logo Preview"
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLElement).style.display = 'none';
                            }}
                          />
                        ) : (
                          <span className="font-mono text-xs font-bold uppercase">CODE</span>
                        )}
                      </div>
                      <div className="flex-1 space-y-1">
                        <input
                          type="text"
                          placeholder="Masukkan URL foto/gambar logo (http://... atau https://...)"
                          value={profile.customLogoUrl || ''}
                          onChange={(e) => setProfile({ ...profile, customLogoUrl: e.target.value })}
                          className="w-full px-3 py-1.5 bg-neutral-50 border border-black text-black font-mono text-xs"
                        />
                        <p className="text-[10px] font-mono text-neutral-600">
                          *Foto ini akan tampil di sudut kiri Navbar dan Footer sebagai identitas visual website Anda. Kosongkan untuk menggunakan logo ikon default.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1 sm:col-span-2">
                    <label className="font-mono font-bold uppercase text-black text-[11px]">Paragraf Perkenalan (Tentang Saya)</label>
                    <textarea
                      rows={4}
                      value={profile.bioParagraph}
                      onChange={(e) => setProfile({ ...profile, bioParagraph: e.target.value })}
                      className="w-full px-3 py-2 bg-white border border-black text-black font-medium resize-none"
                    />
                  </div>
                </div>
              </div>

              {/* Contact & Social Links */}
              <div className="bg-[#f4f4f2] border-2 border-black p-5 geo-shadow-sm space-y-4">
                <h3 className="text-xs font-mono font-bold text-black uppercase border-b border-black pb-2">
                  Kontak & Tautan Media Sosial
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="font-mono font-bold uppercase text-black text-[11px]">Email Utama</label>
                    <input
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                      className="w-full px-3 py-2 bg-white border border-black text-black font-medium"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-mono font-bold uppercase text-black text-[11px]">Nomor WhatsApp</label>
                    <input
                      type="text"
                      value={profile.whatsapp}
                      onChange={(e) => setProfile({ ...profile, whatsapp: e.target.value })}
                      className="w-full px-3 py-2 bg-white border border-black text-black font-medium"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-mono font-bold uppercase text-black text-[11px]">LinkedIn URL</label>
                    <input
                      type="text"
                      value={profile.linkedinUrl}
                      onChange={(e) => setProfile({ ...profile, linkedinUrl: e.target.value })}
                      className="w-full px-3 py-2 bg-white border border-black text-black font-mono text-xs"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-mono font-bold uppercase text-black text-[11px]">GitHub URL</label>
                    <input
                      type="text"
                      value={profile.githubUrl}
                      onChange={(e) => setProfile({ ...profile, githubUrl: e.target.value })}
                      className="w-full px-3 py-2 bg-white border border-black text-black font-mono text-xs"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-mono font-bold uppercase text-black text-[11px]">Instagram URL</label>
                    <input
                      type="text"
                      value={profile.instagramUrl}
                      onChange={(e) => setProfile({ ...profile, instagramUrl: e.target.value })}
                      className="w-full px-3 py-2 bg-white border border-black text-black font-mono text-xs"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-mono font-bold uppercase text-black text-[11px]">Behance Portfolio URL</label>
                    <input
                      type="text"
                      value={profile.behanceUrl || ''}
                      onChange={(e) => setProfile({ ...profile, behanceUrl: e.target.value })}
                      className="w-full px-3 py-2 bg-white border border-black text-black font-mono text-xs"
                    />
                  </div>
                </div>
              </div>

              {/* Passions & Soft Skills Lists */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-[#f4f4f2] border-2 border-black p-5 geo-shadow-sm space-y-3">
                  <h3 className="text-xs font-mono font-bold text-black uppercase border-b border-black pb-2">
                    Minat & Passion Utama
                  </h3>
                  <div className="space-y-2">
                    {profile.passions.map((p, idx) => (
                      <div key={idx} className="flex items-center justify-between p-2 bg-white border border-black text-xs font-bold uppercase">
                        <span>{p}</span>
                        <button
                          onClick={() => handleRemovePassion(idx)}
                          className="p-1 bg-black text-white hover:bg-neutral-800"
                        >
                          <Trash2 className="w-3 h-3 text-white" />
                        </button>
                      </div>
                    ))}
                    <div className="flex items-center gap-2 pt-1">
                      <input
                        type="text"
                        placeholder="Tambah minat baru..."
                        value={newPassion}
                        onChange={(e) => setNewPassion(e.target.value)}
                        className="flex-1 px-2.5 py-1.5 bg-white border border-black text-xs font-medium"
                      />
                      <button
                        onClick={handleAddPassion}
                        className="px-3 py-1.5 bg-black text-white text-xs font-bold uppercase border border-black"
                      >
                        Tambah
                      </button>
                    </div>
                  </div>
                </div>

                <div className="bg-[#f4f4f2] border-2 border-black p-5 geo-shadow-sm space-y-3">
                  <h3 className="text-xs font-mono font-bold text-black uppercase border-b border-black pb-2">
                    Daftar Soft Skill
                  </h3>
                  <div className="space-y-2">
                    {profile.softSkills.map((s, idx) => (
                      <div key={idx} className="flex items-center justify-between p-2 bg-white border border-black text-xs font-bold uppercase">
                        <span>{s}</span>
                        <button
                          onClick={() => handleRemoveSoftSkill(idx)}
                          className="p-1 bg-black text-white hover:bg-neutral-800"
                        >
                          <Trash2 className="w-3 h-3 text-white" />
                        </button>
                      </div>
                    ))}
                    <div className="flex items-center gap-2 pt-1">
                      <input
                        type="text"
                        placeholder="Tambah soft skill..."
                        value={newSoftSkill}
                        onChange={(e) => setNewSoftSkill(e.target.value)}
                        className="flex-1 px-2.5 py-1.5 bg-white border border-black text-xs font-medium"
                      />
                      <button
                        onClick={handleAddSoftSkill}
                        className="px-3 py-1.5 bg-black text-white text-xs font-bold uppercase border border-black"
                      >
                        Tambah
                      </button>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: PROJECTS */}
          {activeTab === 'projects' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between bg-[#f4f4f2] border-2 border-black p-4 geo-shadow-sm">
                <div>
                  <p className="text-xs font-mono font-bold text-black uppercase">Kelola Daftar Proyek ({projects.length} Proyek Aktif)</p>
                  <p className="text-[11px] text-neutral-700">Tambah, ubah deskripsi, tools, atau tautan demo proyek.</p>
                </div>
                <button
                  onClick={handleAddProject}
                  className="px-3.5 py-2 bg-black hover:bg-neutral-800 text-white text-xs font-bold uppercase flex items-center gap-1.5 border border-black cursor-pointer"
                >
                  <Plus className="w-4 h-4 text-white" />
                  <span>Tambah Proyek Baru</span>
                </button>
              </div>

              <div className="space-y-4">
                {projects.map((proj, idx) => (
                  <div key={proj.id} className="p-5 bg-white border-2 border-black geo-shadow-sm space-y-3 relative">
                    <div className="flex items-center justify-between border-b-2 border-black pb-2">
                      <span className="font-mono font-bold text-xs uppercase bg-black text-white px-2 py-0.5">
                        Proyek #{idx + 1} • {proj.category}
                      </span>
                      <button
                        onClick={() => handleDeleteProject(proj.id)}
                        className="px-2.5 py-1 bg-black text-white hover:bg-neutral-800 text-xs font-mono font-bold uppercase flex items-center gap-1 border border-black"
                        title="Hapus proyek"
                      >
                        <Trash2 className="w-3.5 h-3.5 text-white" />
                        <span>Hapus</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div>
                        <label className="font-mono font-bold uppercase block mb-1">Judul Proyek</label>
                        <input
                          type="text"
                          value={proj.title}
                          onChange={(e) => {
                            const updated = [...projects];
                            updated[idx].title = e.target.value;
                            setProjects(updated);
                          }}
                          className="w-full px-2.5 py-1.5 bg-[#f4f4f2] border border-black font-medium"
                        />
                      </div>

                      <div>
                        <label className="font-mono font-bold uppercase block mb-1">Status Badge</label>
                        <input
                          type="text"
                          value={proj.status}
                          onChange={(e) => {
                            const updated = [...projects];
                            updated[idx].status = e.target.value;
                            setProjects(updated);
                          }}
                          className="w-full px-2.5 py-1.5 bg-[#f4f4f2] border border-black font-medium"
                        />
                      </div>

                      <div>
                        <label className="font-mono font-bold uppercase block mb-1">Kategori</label>
                        <select
                          value={proj.category}
                          onChange={(e) => {
                            const updated = [...projects];
                            updated[idx].category = e.target.value as any;
                            setProjects(updated);
                          }}
                          className="w-full px-2.5 py-1.5 bg-[#f4f4f2] border border-black font-medium"
                        >
                          <option value="Web Dev">Web Dev</option>
                          <option value="UI/UX Design">UI/UX Design</option>
                          <option value="Mobile App">Mobile App</option>
                          <option value="Data & AI">Data & AI</option>
                          <option value="Lainnya">Lainnya</option>
                        </select>
                      </div>

                      <div>
                        <label className="font-mono font-bold uppercase block mb-1">Tools (Pisahkan koma)</label>
                        <input
                          type="text"
                          value={proj.tools.join(', ')}
                          onChange={(e) => {
                            const updated = [...projects];
                            updated[idx].tools = e.target.value.split(',').map(s => s.trim()).filter(Boolean);
                            setProjects(updated);
                          }}
                          className="w-full px-2.5 py-1.5 bg-[#f4f4f2] border border-black font-mono text-xs"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="font-mono font-bold uppercase block mb-1">Image Screenshot URL</label>
                        <input
                          type="text"
                          value={proj.imageUrl}
                          onChange={(e) => {
                            const updated = [...projects];
                            updated[idx].imageUrl = e.target.value;
                            setProjects(updated);
                          }}
                          className="w-full px-2.5 py-1.5 bg-[#f4f4f2] border border-black font-mono text-xs"
                        />
                      </div>

                      <div>
                        <label className="font-mono font-bold uppercase block mb-1">GitHub Link</label>
                        <input
                          type="text"
                          value={proj.githubUrl || ''}
                          onChange={(e) => {
                            const updated = [...projects];
                            updated[idx].githubUrl = e.target.value;
                            setProjects(updated);
                          }}
                          className="w-full px-2.5 py-1.5 bg-[#f4f4f2] border border-black font-mono text-xs"
                        />
                      </div>

                      <div>
                        <label className="font-mono font-bold uppercase block mb-1">Demo / Live Link</label>
                        <input
                          type="text"
                          value={proj.demoUrl || ''}
                          onChange={(e) => {
                            const updated = [...projects];
                            updated[idx].demoUrl = e.target.value;
                            setProjects(updated);
                          }}
                          className="w-full px-2.5 py-1.5 bg-[#f4f4f2] border border-black font-mono text-xs"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="font-mono font-bold uppercase block mb-1">Deskripsi Singkat</label>
                        <input
                          type="text"
                          value={proj.shortDescription}
                          onChange={(e) => {
                            const updated = [...projects];
                            updated[idx].shortDescription = e.target.value;
                            setProjects(updated);
                          }}
                          className="w-full px-2.5 py-1.5 bg-[#f4f4f2] border border-black font-medium"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="font-mono font-bold uppercase block mb-1">Deskripsi Detail Lanjutan</label>
                        <textarea
                          rows={3}
                          value={proj.fullDescription}
                          onChange={(e) => {
                            const updated = [...projects];
                            updated[idx].fullDescription = e.target.value;
                            setProjects(updated);
                          }}
                          className="w-full px-2.5 py-1.5 bg-[#f4f4f2] border border-black font-medium resize-none"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: EXPERIENCES */}
          {activeTab === 'experiences' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between bg-[#f4f4f2] border-2 border-black p-4 geo-shadow-sm">
                <div>
                  <p className="text-xs font-mono font-bold text-black uppercase">Kelola Pengalaman & Organisasi ({experiences.length} Item)</p>
                  <p className="text-[11px] text-neutral-700">Atur riwayat kepengurusan, proyek magang, atau sertifikasi.</p>
                </div>
                <button
                  onClick={handleAddExperience}
                  className="px-3.5 py-2 bg-black hover:bg-neutral-800 text-white text-xs font-bold uppercase flex items-center gap-1.5 border border-black cursor-pointer"
                >
                  <Plus className="w-4 h-4 text-white" />
                  <span>Tambah Pengalaman</span>
                </button>
              </div>

              <div className="space-y-4">
                {experiences.map((exp, idx) => (
                  <div key={exp.id} className="p-5 bg-white border-2 border-black geo-shadow-sm space-y-3">
                    <div className="flex items-center justify-between border-b-2 border-black pb-2">
                      <span className="font-mono font-bold text-xs uppercase bg-black text-white px-2 py-0.5">
                        Item #{idx + 1} • {exp.type}
                      </span>
                      <button
                        onClick={() => handleDeleteExperience(exp.id)}
                        className="px-2.5 py-1 bg-black text-white hover:bg-neutral-800 text-xs font-mono font-bold uppercase flex items-center gap-1 border border-black"
                      >
                        <Trash2 className="w-3.5 h-3.5 text-white" />
                        <span>Hapus</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div>
                        <label className="font-mono font-bold uppercase block mb-1">Peran / Jabatan / Sertifikat</label>
                        <input
                          type="text"
                          value={exp.role}
                          onChange={(e) => {
                            const updated = [...experiences];
                            updated[idx].role = e.target.value;
                            setExperiences(updated);
                          }}
                          className="w-full px-2.5 py-1.5 bg-[#f4f4f2] border border-black font-medium"
                        />
                      </div>

                      <div>
                        <label className="font-mono font-bold uppercase block mb-1">Organisasi / Perusahaan</label>
                        <input
                          type="text"
                          value={exp.organization}
                          onChange={(e) => {
                            const updated = [...experiences];
                            updated[idx].organization = e.target.value;
                            setExperiences(updated);
                          }}
                          className="w-full px-2.5 py-1.5 bg-[#f4f4f2] border border-black font-medium"
                        />
                      </div>

                      <div>
                        <label className="font-mono font-bold uppercase block mb-1">Kategori Tipe</label>
                        <select
                          value={exp.type}
                          onChange={(e) => {
                            const updated = [...experiences];
                            updated[idx].type = e.target.value as any;
                            setExperiences(updated);
                          }}
                          className="w-full px-2.5 py-1.5 bg-[#f4f4f2] border border-black font-medium"
                        >
                          <option value="Organisasi Kampus">Organisasi Kampus</option>
                          <option value="Kepanitiaan">Kepanitiaan</option>
                          <option value="Magang / Kerja">Magang / Kerja</option>
                          <option value="Sertifikasi & Pelatihan">Sertifikasi & Pelatihan</option>
                        </select>
                      </div>

                      <div>
                        <label className="font-mono font-bold uppercase block mb-1">Periode Waktu</label>
                        <input
                          type="text"
                          value={exp.period}
                          onChange={(e) => {
                            const updated = [...experiences];
                            updated[idx].period = e.target.value;
                            setExperiences(updated);
                          }}
                          className="w-full px-2.5 py-1.5 bg-[#f4f4f2] border border-black font-medium"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="font-mono font-bold uppercase block mb-1">Skill & Pencapaian (Pisahkan Koma)</label>
                        <input
                          type="text"
                          value={exp.skillsGained.join(', ')}
                          onChange={(e) => {
                            const updated = [...experiences];
                            updated[idx].skillsGained = e.target.value.split(',').map(s => s.trim()).filter(Boolean);
                            setExperiences(updated);
                          }}
                          className="w-full px-2.5 py-1.5 bg-[#f4f4f2] border border-black font-mono text-xs"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="font-mono font-bold uppercase block mb-1">URL Sertifikat Verifikasi (Opsional)</label>
                        <input
                          type="text"
                          value={exp.credentialUrl || ''}
                          onChange={(e) => {
                            const updated = [...experiences];
                            updated[idx].credentialUrl = e.target.value;
                            setExperiences(updated);
                          }}
                          className="w-full px-2.5 py-1.5 bg-[#f4f4f2] border border-black font-mono text-xs"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="font-mono font-bold uppercase block mb-1">Deskripsi Kegiatan</label>
                        <textarea
                          rows={3}
                          value={exp.description}
                          onChange={(e) => {
                            const updated = [...experiences];
                            updated[idx].description = e.target.value;
                            setExperiences(updated);
                          }}
                          className="w-full px-2.5 py-1.5 bg-[#f4f4f2] border border-black font-medium resize-none"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: SKILLS */}
          {activeTab === 'skills' && (
            <div className="space-y-6">
              <div className="bg-[#f4f4f2] border-2 border-black p-4 geo-shadow-sm">
                <p className="text-xs font-mono font-bold text-black uppercase">Kelola Skill Teknis & Persentase Penguasaan</p>
                <p className="text-[11px] text-neutral-700">Sesuaikan daftar skill dan tingkat persentase kemahiran Anda (0-100%).</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {skills.map((catGroup, cIdx) => (
                  <div key={cIdx} className="bg-white border-2 border-black p-5 geo-shadow-sm space-y-4">
                    <div className="flex items-center justify-between border-b-2 border-black pb-2">
                      <h4 className="font-mono font-bold text-sm uppercase text-black">
                        Kategori: {catGroup.category}
                      </h4>
                      <button
                        onClick={() => handleAddSkillItem(cIdx)}
                        className="px-2.5 py-1 bg-black text-white hover:bg-neutral-800 text-[11px] font-mono font-bold uppercase flex items-center gap-1 border border-black"
                      >
                        <Plus className="w-3 h-3 text-white" />
                        <span>Tambah Item</span>
                      </button>
                    </div>

                    <div className="space-y-3">
                      {catGroup.items.map((skill, sIdx) => (
                        <div key={sIdx} className="p-3 bg-[#f4f4f2] border border-black space-y-2">
                          <div className="flex items-center justify-between gap-2">
                            <input
                              type="text"
                              value={skill.name}
                              onChange={(e) => {
                                const updated = [...skills];
                                updated[cIdx].items[sIdx].name = e.target.value;
                                setSkills(updated);
                              }}
                              className="flex-1 px-2 py-1 bg-white border border-black text-xs font-bold uppercase"
                            />
                            <div className="flex items-center gap-1">
                              <input
                                type="number"
                                min={0}
                                max={100}
                                value={skill.levelPercentage}
                                onChange={(e) => {
                                  const updated = [...skills];
                                  updated[cIdx].items[sIdx].levelPercentage = Math.min(100, Math.max(0, parseInt(e.target.value) || 0));
                                  setSkills(updated);
                                }}
                                className="w-16 px-2 py-1 bg-white border border-black text-xs font-mono font-bold text-center"
                              />
                              <span className="text-xs font-mono font-bold">%</span>
                            </div>
                            <button
                              onClick={() => handleDeleteSkillItem(cIdx, sIdx)}
                              className="p-1 bg-black text-white hover:bg-neutral-800"
                            >
                              <Trash2 className="w-3 h-3 text-white" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: ARTICLES */}
          {activeTab === 'articles' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between bg-[#f4f4f2] border-2 border-black p-4 geo-shadow-sm">
                <div>
                  <p className="text-xs font-mono font-bold text-black uppercase">Kelola Artikel Blog & Catatan ({articles.length} Artikel)</p>
                  <p className="text-[11px] text-neutral-700">Tulis artikel baru atau sunting artikel edukasi yang dipublikasikan.</p>
                </div>
                <button
                  onClick={handleAddArticle}
                  className="px-3.5 py-2 bg-black hover:bg-neutral-800 text-white text-xs font-bold uppercase flex items-center gap-1.5 border border-black cursor-pointer"
                >
                  <Plus className="w-4 h-4 text-white" />
                  <span>Tulis Artikel Baru</span>
                </button>
              </div>

              <div className="space-y-4">
                {articles.map((art, idx) => (
                  <div key={art.id} className="p-5 bg-white border-2 border-black geo-shadow-sm space-y-3">
                    <div className="flex items-center justify-between border-b-2 border-black pb-2">
                      <span className="font-mono font-bold text-xs uppercase bg-black text-white px-2 py-0.5">
                        Artikel #{idx + 1} • {art.date}
                      </span>
                      <button
                        onClick={() => handleDeleteArticle(art.id)}
                        className="px-2.5 py-1 bg-black text-white hover:bg-neutral-800 text-xs font-mono font-bold uppercase flex items-center gap-1 border border-black"
                      >
                        <Trash2 className="w-3.5 h-3.5 text-white" />
                        <span>Hapus</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div className="sm:col-span-2">
                        <label className="font-mono font-bold uppercase block mb-1">Judul Artikel</label>
                        <input
                          type="text"
                          value={art.title}
                          onChange={(e) => {
                            const updated = [...articles];
                            updated[idx].title = e.target.value;
                            setArticles(updated);
                          }}
                          className="w-full px-2.5 py-1.5 bg-[#f4f4f2] border border-black font-bold uppercase"
                        />
                      </div>

                      <div>
                        <label className="font-mono font-bold uppercase block mb-1">Tanggal Rilis</label>
                        <input
                          type="text"
                          value={art.date}
                          onChange={(e) => {
                            const updated = [...articles];
                            updated[idx].date = e.target.value;
                            setArticles(updated);
                          }}
                          className="w-full px-2.5 py-1.5 bg-[#f4f4f2] border border-black font-medium"
                        />
                      </div>

                      <div>
                        <label className="font-mono font-bold uppercase block mb-1">Estimasi Waktu Baca</label>
                        <input
                          type="text"
                          value={art.readTime}
                          onChange={(e) => {
                            const updated = [...articles];
                            updated[idx].readTime = e.target.value;
                            setArticles(updated);
                          }}
                          className="w-full px-2.5 py-1.5 bg-[#f4f4f2] border border-black font-medium"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="font-mono font-bold uppercase block mb-1">Tags (Pisahkan koma)</label>
                        <input
                          type="text"
                          value={art.tags.join(', ')}
                          onChange={(e) => {
                            const updated = [...articles];
                            updated[idx].tags = e.target.value.split(',').map(s => s.trim()).filter(Boolean);
                            setArticles(updated);
                          }}
                          className="w-full px-2.5 py-1.5 bg-[#f4f4f2] border border-black font-mono text-xs"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="font-mono font-bold uppercase block mb-1">Cover Image URL</label>
                        <input
                          type="text"
                          value={art.coverImage || ''}
                          onChange={(e) => {
                            const updated = [...articles];
                            updated[idx].coverImage = e.target.value;
                            setArticles(updated);
                          }}
                          className="w-full px-2.5 py-1.5 bg-[#f4f4f2] border border-black font-mono text-xs"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="font-mono font-bold uppercase block mb-1">Ringkasan Singkat</label>
                        <input
                          type="text"
                          value={art.summary}
                          onChange={(e) => {
                            const updated = [...articles];
                            updated[idx].summary = e.target.value;
                            setArticles(updated);
                          }}
                          className="w-full px-2.5 py-1.5 bg-[#f4f4f2] border border-black font-medium"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="font-mono font-bold uppercase block mb-1">Isi Artikel Lengkap (Markdown Format)</label>
                        <textarea
                          rows={6}
                          value={art.content}
                          onChange={(e) => {
                            const updated = [...articles];
                            updated[idx].content = e.target.value;
                            setArticles(updated);
                          }}
                          className="w-full px-2.5 py-1.5 bg-[#f4f4f2] border border-black font-mono text-xs resize-y"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: UI/UX & THEME SETTINGS */}
          {activeTab === 'uiSettings' && (
            <div className="space-y-6 text-xs sm:text-sm">
              {/* Theme Color Presets */}
              <div className="bg-[#f4f4f2] border-2 border-black p-5 geo-shadow-sm space-y-4">
                <div className="flex items-center gap-2 border-b border-black pb-2">
                  <Palette className="w-4 h-4 text-black" />
                  <h3 className="text-xs font-mono font-bold text-black uppercase">
                    1. Tema Warna & Palet Visual Website
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {/* Preset 1: Neo-Brutalist Light */}
                  <div
                    onClick={() => setUiSettings({ ...uiSettings, themeMode: 'neo-brutalist' })}
                    className={`p-3 border-2 border-black cursor-pointer transition-all space-y-2 ${
                      uiSettings.themeMode === 'neo-brutalist' ? 'bg-black text-white geo-shadow' : 'bg-white text-black hover:bg-neutral-100'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono font-bold text-xs uppercase">1. Neo-Brutalist Minimal</span>
                      <div className="flex gap-1">
                        <div className="w-3 h-3 bg-[#f4f4f2] border border-black"></div>
                        <div className="w-3 h-3 bg-black border border-white"></div>
                      </div>
                    </div>
                    <p className={`text-[11px] ${uiSettings.themeMode === 'neo-brutalist' ? 'text-neutral-300' : 'text-neutral-600'}`}>
                      Kontras tinggi hitam putih dengan batas tegas & bayangan geometris retro.
                    </p>
                  </div>

                  {/* Preset 2: Modern Dark Slate */}
                  <div
                    onClick={() => setUiSettings({ ...uiSettings, themeMode: 'modern-dark' })}
                    className={`p-3 border-2 border-black cursor-pointer transition-all space-y-2 ${
                      uiSettings.themeMode === 'modern-dark' ? 'bg-black text-white geo-shadow' : 'bg-white text-black hover:bg-neutral-100'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono font-bold text-xs uppercase">2. Modern Dark Slate</span>
                      <div className="flex gap-1">
                        <div className="w-3 h-3 bg-slate-900 border border-slate-700"></div>
                        <div className="w-3 h-3 bg-indigo-500 border border-slate-700"></div>
                      </div>
                    </div>
                    <p className={`text-[11px] ${uiSettings.themeMode === 'modern-dark' ? 'text-neutral-300' : 'text-neutral-600'}`}>
                      Nuansa gelap elegan Slate/Indigo yang nyaman di mata untuk malam hari.
                    </p>
                  </div>

                  {/* Preset 3: Warm Amber */}
                  <div
                    onClick={() => setUiSettings({ ...uiSettings, themeMode: 'warm-amber' })}
                    className={`p-3 border-2 border-black cursor-pointer transition-all space-y-2 ${
                      uiSettings.themeMode === 'warm-amber' ? 'bg-black text-white geo-shadow' : 'bg-white text-black hover:bg-neutral-100'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono font-bold text-xs uppercase">3. Warm Cream & Amber</span>
                      <div className="flex gap-1">
                        <div className="w-3 h-3 bg-[#fefae0] border border-amber-900"></div>
                        <div className="w-3 h-3 bg-[#bc6c25] border border-amber-900"></div>
                      </div>
                    </div>
                    <p className={`text-[11px] ${uiSettings.themeMode === 'warm-amber' ? 'text-neutral-300' : 'text-neutral-600'}`}>
                      Perpaduan warna krem hangat dan aksen amber cokelat yang ramah & ramah lingkungan.
                    </p>
                  </div>

                  {/* Preset 4: Emerald Clean */}
                  <div
                    onClick={() => setUiSettings({ ...uiSettings, themeMode: 'emerald-clean' })}
                    className={`p-3 border-2 border-black cursor-pointer transition-all space-y-2 ${
                      uiSettings.themeMode === 'emerald-clean' ? 'bg-black text-white geo-shadow' : 'bg-white text-black hover:bg-neutral-100'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono font-bold text-xs uppercase">4. Emerald Green Clean</span>
                      <div className="flex gap-1">
                        <div className="w-3 h-3 bg-emerald-50 border border-emerald-800"></div>
                        <div className="w-3 h-3 bg-emerald-600 border border-emerald-800"></div>
                      </div>
                    </div>
                    <p className={`text-[11px] ${uiSettings.themeMode === 'emerald-clean' ? 'text-neutral-300' : 'text-neutral-600'}`}>
                      Warna hijau zamrud segar dengan estetika modern yang bersih.
                    </p>
                  </div>

                  {/* Preset 5: Sunset Violet */}
                  <div
                    onClick={() => setUiSettings({ ...uiSettings, themeMode: 'sunset-violet' })}
                    className={`p-3 border-2 border-black cursor-pointer transition-all space-y-2 ${
                      uiSettings.themeMode === 'sunset-violet' ? 'bg-black text-white geo-shadow' : 'bg-white text-black hover:bg-neutral-100'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono font-bold text-xs uppercase">5. Sunset Violet & Coral</span>
                      <div className="flex gap-1">
                        <div className="w-3 h-3 bg-[#0f0e17] border border-violet-500"></div>
                        <div className="w-3 h-3 bg-[#ff8906] border border-violet-500"></div>
                      </div>
                    </div>
                    <p className={`text-[11px] ${uiSettings.themeMode === 'sunset-violet' ? 'text-neutral-300' : 'text-neutral-600'}`}>
                      Aksen violet malam dipadu oranye coral yang kontras & ekspresif.
                    </p>
                  </div>
                </div>
              </div>

              {/* Card Style & Typography Settings */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-[#f4f4f2] border-2 border-black p-5 geo-shadow-sm space-y-3">
                  <h3 className="text-xs font-mono font-bold text-black uppercase border-b border-black pb-2">
                    3. Gaya Sudut Kartu (Border Radius)
                  </h3>
                  <div className="space-y-2">
                    {[
                      { id: 'none', label: 'Tajam Siku (Sharp Geometric 0px)', desc: 'Tampilan tegas ala majalah arsitektur.' },
                      { id: 'rounded-md', label: 'Sudut Halus Medium (Rounded 8px)', desc: 'Gaya modern seimbang dan rapi.' },
                      { id: 'rounded-2xl', label: 'Sudut Sangat Halus (Rounded 16px)', desc: 'Kesan ramah & kontemporer.' },
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setUiSettings({ ...uiSettings, cardBorderRadius: opt.id as any })}
                        className={`w-full text-left p-2.5 border border-black font-mono text-xs flex flex-col transition-all ${
                          uiSettings.cardBorderRadius === opt.id ? 'bg-black text-white' : 'bg-white text-black hover:bg-neutral-100'
                        }`}
                      >
                        <span className="font-bold uppercase">{opt.label}</span>
                        <span className={`text-[10px] ${uiSettings.cardBorderRadius === opt.id ? 'text-neutral-300' : 'text-neutral-600'}`}>{opt.desc}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="bg-[#f4f4f2] border-2 border-black p-5 geo-shadow-sm space-y-3">
                  <h3 className="text-xs font-mono font-bold text-black uppercase border-b border-black pb-2">
                    4. Gaya Typografi Font Website
                  </h3>
                  <div className="space-y-2">
                    {[
                      { id: 'mono-sans', label: 'Monospace & Bold Sans (Default)', desc: 'Kesan tech, coding, dan mahasiswa IT.' },
                      { id: 'sans-inter', label: 'Clean Modern Sans (Helvetica Style)', desc: 'Sangat bersih, mudah dibaca, profesional.' },
                      { id: 'serif-editorial', label: 'Classy Editorial Serif', desc: 'Gaya majalah, koran, dan majalah desain.' },
                    ].map((fOpt) => (
                      <button
                        key={fOpt.id}
                        type="button"
                        onClick={() => setUiSettings({ ...uiSettings, fontStyle: fOpt.id as any })}
                        className={`w-full text-left p-2.5 border border-black font-mono text-xs flex flex-col transition-all ${
                          uiSettings.fontStyle === fOpt.id ? 'bg-black text-white' : 'bg-white text-black hover:bg-neutral-100'
                        }`}
                      >
                        <span className="font-bold uppercase">{fOpt.label}</span>
                        <span className={`text-[10px] ${uiSettings.fontStyle === fOpt.id ? 'text-neutral-300' : 'text-neutral-600'}`}>{fOpt.desc}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          )}

        </div>

        {/* Footer save action */}
        <div className="pt-4 border-t-2 border-black flex items-center justify-between shrink-0">
          {showSavedToast ? (
            <span className="text-xs text-black font-bold flex items-center gap-1.5 bg-emerald-200 px-3 py-1 border border-black">
              <Check className="w-4 h-4 text-emerald-800" />
              <span>Semua Perubahan Berhasil Disimpan Ke Website!</span>
            </span>
          ) : (
            <span className="text-xs font-mono font-bold uppercase text-neutral-600">Tersimpan otomatis di penyimpanan lokal browser.</span>
          )}

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-[#f4f4f2] text-black hover:bg-neutral-200 text-xs font-mono font-bold uppercase border border-black cursor-pointer"
            >
              Batal
            </button>
            <button
              id="btn-save-profile-data"
              onClick={handleSaveAll}
              className="px-6 py-2 bg-black hover:bg-neutral-800 text-white text-xs font-mono font-bold uppercase flex items-center gap-1.5 geo-shadow border border-black cursor-pointer"
            >
              <Save className="w-3.5 h-3.5 text-white" />
              <span>SIMPAN PERUBAHAN</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
