import { PortfolioData } from '../types';
import profileImg from '../assets/images/profile_photo_1786121666468.jpg';
import umkmImg from '../assets/images/project_umkm_pos_1786121681239.jpg';
import healthImg from '../assets/images/project_uiux_health_1786121694121.jpg';
import dataImg from '../assets/images/project_data_dashboard_1786121706779.jpg';

export const INITIAL_PORTFOLIO_DATA: PortfolioData = {
  profile: {
    name: 'M. Rizky Ramadhan',
    nickname: 'Rizky',
    headlineGreeting: 'Halo, saya Rizky Ramadhan 👋',
    tagline: 'Mahasiswa Teknik Informatika Universitas Gadjah Mada | Tertarik pada UI/UX & Web Development',
    university: 'Universitas Gadjah Mada',
    major: 'Teknik Informatika',
    currentSemester: 'Semester 5',
    location: 'Yogyakarta, Indonesia',
    profilePhotoUrl: profileImg,
    customLogoUrl: '',
    bioParagraph: 'Saya adalah mahasiswa aktif Teknik Informatika di Universitas Gadjah Mada yang berdedikasi dalam mengembangkan aplikasi web berkinerja tinggi serta mendesain antarmuka pengguna (UI/UX) yang intuitif. Fokus utama saya saat ini adalah menguasai ekosistem modern web (React, TypeScript, Tailwind CSS, Node.js) dan mengeksplorasi integrasi kecerdasan buatan untuk meningkatkan pengalaman pengguna.',
    passions: [
      'Front-End Web Development',
      'UI/UX Design & Prototyping',
      'Database Architecture',
      'AI & Machine Learning Basics'
    ],
    softSkills: [
      'Problem Solving & Berpikir Kritis',
      'Public Speaking & Presentasi',
      'Kerja Sama Tim (Teamwork)',
      'Manajemen Waktu & Adaptabilitas'
    ],
    email: 'm.rizky.ramadhan@mail.ugm.ac.id',
    whatsapp: '+62 812-3456-7890',
    linkedinUrl: 'https://linkedin.com/in/m-rizky-ramadhan',
    githubUrl: 'https://github.com/rizky-ramadhan-dev',
    instagramUrl: 'https://instagram.com/rizky.code',
    behanceUrl: 'https://behance.net/rizky-design'
  },
  projects: [
    {
      id: 'proj-1',
      title: 'Sistem Informasi Penjualan UMKM "WarungKita"',
      shortDescription: 'Aplikasi manajemen stok dan kasir digital berbasis web untuk membantu UMKM memantau transaksi secara realtime.',
      fullDescription: 'Proyek ini dirancang untuk mengatasi permasalahan pencatatan manual pada UMKM kuliner lokal. Sistem ini dilengkapi fitur kasir POS (Point of Sales), rekap bulanan otomatis, cetak struk digital, serta peringatan stok barang menipis.',
      tools: ['React', 'Laravel', 'MySQL', 'Tailwind CSS', 'Chart.js'],
      imageUrl: umkmImg,
      githubUrl: 'https://github.com/rizky-ramadhan-dev/umkm-pos-system',
      demoUrl: 'https://warungkita-demo.vercel.app',
      status: 'Mata Kuliah: Pemrograman Web Lanjut',
      category: 'Web Dev',
      featured: true
    },
    {
      id: 'proj-2',
      title: 'Desain UI/UX Mobile App "FitJourney"',
      shortDescription: 'Prototype aplikasi pemantau aktivitas harian, pelacak hidrasi, dan panduan olah raga interaktif untuk mahasiswa.',
      fullDescription: 'Rancangan desain antarmuka pengguna berbasis Design Thinking. Melalui tahap user research, wireframing, hingga usabilitas testing dengan 15 responden mahasiswa. Menghasilkan skor System Usability Scale (SUS) sebesar 84.5 (Excellent).',
      tools: ['Figma', 'FigJam', 'Canva', 'User Testing'],
      imageUrl: healthImg,
      githubUrl: 'https://github.com/rizky-ramadhan-dev/fitjourney-uiux-prototype',
      demoUrl: 'https://figma.com/@fitjourney-case-study',
      status: 'Proyek Pribadi / Study Case',
      category: 'UI/UX Design',
      featured: true
    },
    {
      id: 'proj-3',
      title: 'Dashboard Analisis Performa Mahasiswa',
      shortDescription: 'Web visualisasi data akademis untuk menganalisis tren nilai, kehadiran, dan rekomendasi jalur peminatan skripsi.',
      fullDescription: 'Aplikasi berbasis Python Flask dan Chart.js yang mengolah data akumulatif nilai perkuliahan mahasiswa untuk memprediksi ketepatan lulus serta merekomendasikan topik riset yang relevan berdasarkan nilai mata kuliah.',
      tools: ['Python', 'Flask', 'Pandas', 'Chart.js', 'Bootstrap'],
      imageUrl: dataImg,
      githubUrl: 'https://github.com/rizky-ramadhan-dev/academic-performance-dashboard',
      demoUrl: 'https://academic-dashboard.streamlit.app',
      status: 'Mata Kuliah: Basis Data & Analisis Data',
      category: 'Data & AI',
      featured: true
    },
    {
      id: 'proj-4',
      title: 'Portal Event Kampus "CampusEvent.id"',
      shortDescription: 'Platform pendaftaran web webinar, lomba, dan kepanitiaan organisasi mahasiswa di lingkungan kampus.',
      fullDescription: 'Portal terintegrasi dengan Google Form API & Midtrans Payment Gateway sandbox untuk memfasilitasi tiket webinar kampus dan pengiriman tiket QR-code otomatis ke WhatsApp peserta.',
      tools: ['React', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS'],
      imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop&q=80',
      githubUrl: 'https://github.com/rizky-ramadhan-dev/campusevent-id',
      demoUrl: 'https://campusevent.id',
      status: 'Proyek Organisasi Himpunan',
      category: 'Web Dev',
      featured: false
    }
  ],
  experiences: [
    {
      id: 'exp-1',
      role: 'Staff Departemen Pengembangan Sumber Daya Mahasiswa (PSDM)',
      organization: 'Himpunan Mahasiswa Teknik Informatika (HM TI)',
      period: '2024 - Sekarang',
      type: 'Organisasi Kampus',
      description: 'Mengelola program kerja pelatihan skill coding mahasiswa baru (Bootcamp Internal) yang diikuti oleh lebih dari 120 peserta. Bertindak sebagai fasilitator workshop dasar HTML, CSS, dan Git.',
      skillsGained: ['Leadership', 'Event Planning', 'Public Speaking', 'Mentoring']
    },
    {
      id: 'exp-2',
      role: 'Ketua Pelaksana IT National Seminar & Competition 2024',
      organization: 'Kepanitiaan Kampus UGM',
      period: 'Juli 2024 - November 2024',
      type: 'Kepanitiaan',
      description: 'Memimpin tim beranggota 35 mahasiswa dalam mengorganisir seminar nasional teknologi yang menghadirkan speaker dari unicorn IT Indonesia dan diikuti 450+ peserta dari seluruh Indonesia.',
      skillsGained: ['Project Management', 'Negosiasi Sponsor', 'Team Coordination', 'Problem Solving']
    },
    {
      id: 'exp-3',
      role: 'Front-End Web Development Apprentice',
      organization: 'Program Magang Studi Independen (MSIB / Kampus Merdeka)',
      period: 'Agustus 2024 - Desember 2024',
      type: 'Magang / Kerja',
      description: 'Mengembangkan komponen UI reusable mengggunakan React & Tailwind CSS untuk platform edutech. Mengoptimalkan performa halaman awal hingga peningkatan skor Lighthouse 25%.',
      skillsGained: ['React.js', 'Rest API', 'Git Flow', 'Agile Scrum']
    },
    {
      id: 'exp-4',
      role: 'Peserta Bangkit Academy 2024 - Cloud Computing Path',
      organization: 'Google, Tokopedia, Gojek & Traveloka Academy',
      period: 'Februari 2024 - Juli 2024',
      type: 'Sertifikasi & Pelatihan',
      description: 'Lulus dengan predikat Distinction. Mempelajari arsitektur Google Cloud Platform (GCP), pembuatan REST API dengan Node.js, dan deployment microservices.',
      skillsGained: ['GCP', 'Node.js Express', 'Docker', 'REST API Architecture'],
      credentialUrl: 'https://coursera.org/verify/professional-cert/bangkit-cloud'
    }
  ],
  skills: [
    {
      category: 'Programming',
      items: [
        { name: 'HTML5 & CSS3 / Tailwind', levelPercentage: 90 },
        { name: 'JavaScript (ES6+) & TypeScript', levelPercentage: 85 },
        { name: 'React.js & Next.js', levelPercentage: 80 },
        { name: 'PHP & Laravel Basics', levelPercentage: 70 },
        { name: 'Python & SQL (MySQL/PostgreSQL)', levelPercentage: 75 },
        { name: 'Node.js & Express API', levelPercentage: 72 }
      ]
    },
    {
      category: 'Design',
      items: [
        { name: 'Figma (UI/UX Design & Wireframing)', levelPercentage: 88 },
        { name: 'Design Systems & Prototyping', levelPercentage: 82 },
        { name: 'Canva & Media Graphics', levelPercentage: 90 },
        { name: 'User Research & Personas', levelPercentage: 78 }
      ]
    },
    {
      category: 'Tools',
      items: [
        { name: 'VS Code & Git / GitHub', levelPercentage: 92 },
        { name: 'Postman (API Testing)', levelPercentage: 80 },
        { name: 'Vercel / Netlify / Cloud Deployment', levelPercentage: 85 },
        { name: 'Microsoft Excel / Google Sheets', levelPercentage: 88 }
      ]
    },
    {
      category: 'Soft Skill',
      items: [
        { name: 'Problem Solving & Analytics', levelPercentage: 90 },
        { name: 'Komunikasi & Public Speaking', levelPercentage: 88 },
        { name: 'Kerja Sama Tim (Teamwork)', levelPercentage: 95 },
        { name: 'Manajemen Waktu & Ketelitian', levelPercentage: 85 }
      ]
    }
  ],
  articles: [
    {
      id: 'art-1',
      title: 'Cara Membuat Navbar Responsive dengan React & Tailwind CSS v4',
      summary: 'Panduan langkah demi langkah membuat bilah navigasi yang rapi, adaptif di layar smartphone maupun desktop, lengkap dengan animasi menu hamburger.',
      content: `## Pendahuluan

Navbar adalah komponen pertama yang dilihat oleh pengunjung website. Sebagai mahasiswa yang baru belajar web development, membuat navbar yang indah dan responsive sering kali menjadi tantangan awal.

Di artikel ini, kita akan membahas cara mudah membangun navbar responsive menggunakan **React** dan **Tailwind CSS**.

---

### Langkah 1: Merancang Struktur Komponen

Pertama, siapkan state untuk menyimpan status hamburger menu di perangkat seluler:

\`\`\`tsx
const [isOpen, setIsOpen] = useState(false);
\`\`\`

### Langkah 2: Menggunakan Flexbox Tailwind

Gunakan class \`flex items-center justify-between\` pada kontainer utama agar logo di sebelah kiri dan link navigasi berada di sebelah kanan.

\`\`\`tsx
<nav className="flex items-center justify-between px-6 py-4 bg-white shadow-sm">
  <div className="text-xl font-bold">LogoSaya</div>
  {/* Menu Desktop */}
  <div className="hidden md:flex gap-6">
    <a href="#home">Beranda</a>
    <a href="#about">Tentang</a>
    <a href="#projects">Proyek</a>
  </div>
</nav>
\`\`\`

---

### Kesimpulan

Dengan Tailwind CSS, kita tidak perlu menulis puluhan baris media query CSS manual. Cukup manfaatkan modifier breakpoint seperti \`md:\` dan \`lg:\` untuk mengontrol visibilitas elemen!`,
      date: '15 Juli 2026',
      readTime: '3 menit baca',
      tags: ['React', 'Tailwind CSS', 'Tutorial Web'],
      coverImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80'
    },
    {
      id: 'art-2',
      title: 'Penerapan Prinsip Design Thinking dalam Perancangan Aplikasi FitJourney',
      summary: 'Ulasan mengenai bagaimana metodologi Empathize, Define, Ideate, Prototype, dan Test membantu menciptakan UI aplikasi yang disukai user.',
      content: `## Mengapa Design Thinking Sangat Penting untuk UI/UX?

Saat mengerjakan proyek perkuliahan *FitJourney*, saya menyadari bahwa desain yang bagus bukan sekadar tampilan yang estetik, melainkan desain yang **menyelesaikan masalah nyata penggunanya**.

---

### 5 Tahapan yang Saya Jalani:

1. **Empathize (Empati)**  
   Saya melakukan wawancara singkat dengan 10 rekan mahasiswa mengenai kendala mereka mempertahankan pola hidup sehat di sela jadwal kuliah yang padat.

2. **Define (Mendefinisikan Masalah)**  
   Mayoritas responden lupa minum air putih dan merasa aplikasi kesehatan yang ada di pasaran terlalu rumit dengan banyak tombol bertebaran.

3. **Ideate (Sumbang Saran)**  
   Solusinya: Fitur "1-Tap Water Logger" di halaman utama tanpa harus membuka menu bertingkat.

4. **Prototype (Pembuatan Prototipe)**  
   Dibuat menggunakan Figma dengan sistem komponen yang rapi dan interaktif.

5. **Testing (Pengujian Usabilitas)**  
   Menghasilkan skor SUS (System Usability Scale) 84.5 dengan respon positif dari calon pengguna.

---

### Pembelajaran Utama

Selalu dengarkan pengguna terlebih dahulu sebelum membuat asumsi desain!`,
      date: '28 Juni 2026',
      readTime: '5 menit baca',
      tags: ['UI/UX', 'Design Thinking', 'Figma', 'Case Study'],
      coverImage: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=800&auto=format&fit=crop&q=80'
    },
    {
      id: 'art-3',
      title: 'Tips Membangun Portofolio Pertama untuk Mahasiswa IT Tanpa Pengalaman Kerja',
      summary: 'Pengalaman pribadi merangkum proyek tugas kuliah dan proyek mandiri agar dilirik perekrut dan siap bersaing di dunia profesional.',
      content: `## Jangan Tunggu Punya Pengalaman Kerja Dulu!

Banyak teman-teman mahasiswa merasa pesimis saat hendak membuat portofolio karena merasa "belum pernah magang" atau "belum punya klien".

Padahal, **tugas akhir mata kuliah** dan **proyek latihan pribadi** adalah modal yang sangat bernilai!

---

### 4 Strategi Mengemas Proyek Kuliah Jadi Portofolio Menarik:

* **Tuliskan Cerita Masalahnya:** Jelaskan mengapa proyek tersebut dibuat, bukan cuma screenshot gambarnya.
* **Tampilkan Tools Secara Spesifik:** Sebutkan apakah kamu memakai React, MySQL, Figma, atau Python.
* **Jelaskan Peranmu:** Jika dikerjakan secara tim, tuliskan dengan jujur bagian mana yang menjadi tanggung jawabmu.
* **Sediakan Dokumentasi:** Cantumkan link repository GitHub atau link live demo agar HR/Tech Lead bisa langsung mencoba.

Semoga artikel ini menginspirasi teman-teman sesama mahasiswa untuk mulai memamerkan karyanya hari ini!`,
      date: '10 Mei 2026',
      readTime: '4 menit baca',
      tags: ['Karir Mahasiswa', 'Portofolio', 'Tips IT'],
      coverImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop&q=80'
    }
  ],
  uiSettings: {
    navigationMode: 'scroll',
    themeMode: 'neo-brutalist',
    cardBorderRadius: 'none',
    fontStyle: 'mono-sans'
  }
};
