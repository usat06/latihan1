export interface Project {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  tools: string[];
  imageUrl: string;
  githubUrl?: string;
  demoUrl?: string;
  status: string; // e.g., "Mata Kuliah: Pemrograman Web", "Proyek Pribadi", "Tugas Akhir"
  category: 'Web Dev' | 'UI/UX Design' | 'Mobile App' | 'Data & AI' | 'Lainnya';
  featured?: boolean;
}

export interface ExperienceItem {
  id: string;
  role: string;
  organization: string;
  period: string;
  type: 'Magang / Kerja' | 'Organisasi Kampus' | 'Kepanitiaan' | 'Sertifikasi & Pelatihan';
  description: string;
  skillsGained: string[];
  credentialUrl?: string;
}

export interface SkillCategory {
  category: 'Programming' | 'Design' | 'Tools' | 'Soft Skill';
  items: {
    name: string;
    levelPercentage: number; // 0 to 100
    iconName?: string;
  }[];
}

export interface BlogArticle {
  id: string;
  title: string;
  summary: string;
  content: string;
  date: string;
  readTime: string;
  tags: string[];
  coverImage?: string;
}

export interface ProfileInfo {
  name: string;
  nickname: string;
  headlineGreeting: string;
  tagline: string;
  university: string;
  major: string;
  currentSemester: string;
  bioParagraph: string;
  passions: string[];
  softSkills: string[];
  email: string;
  whatsapp: string;
  linkedinUrl: string;
  githubUrl: string;
  instagramUrl: string;
  behanceUrl?: string;
  profilePhotoUrl: string;
  customLogoUrl?: string;
  location: string;
}

export interface UISettings {
  navigationMode: 'paginated' | 'scroll'; // 'paginated' = Halaman terpisah dengan tombol "Lanjut", 'scroll' = Single page scroll
  themeMode: 'neo-brutalist' | 'modern-dark' | 'warm-amber' | 'emerald-clean' | 'sunset-violet';
  cardBorderRadius: 'none' | 'rounded-md' | 'rounded-2xl';
  fontStyle: 'mono-sans' | 'sans-inter' | 'serif-editorial';
}

export interface PortfolioData {
  profile: ProfileInfo;
  projects: Project[];
  experiences: ExperienceItem[];
  skills: SkillCategory[];
  articles: BlogArticle[];
  uiSettings?: UISettings;
}
