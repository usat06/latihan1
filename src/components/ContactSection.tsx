import React, { useState } from 'react';
import { ProfileInfo } from '../types';
import { Mail, Phone, Linkedin, Github, Instagram, Send, Copy, Check, MessageSquare, Globe } from 'lucide-react';

interface ContactSectionProps {
  profile: ProfileInfo;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ profile }) => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profile.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormState({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setSubmitted(false), 5000);
    }, 1200);
  };

  const cleanWhatsappNumber = profile.whatsapp.replace(/[^0-9]/g, '');

  return (
    <section id="contact" className="py-20 bg-[#f4f4f2] text-black border-b-2 border-black relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-black text-white text-xs font-mono font-bold tracking-widest uppercase mb-3 geo-shadow-sm">
            <Mail className="w-3.5 h-3.5 text-white" />
            <span>07 / HUBUNGI SAYA</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-black tracking-tight uppercase">
            Mari Terhubung & Berdiskusi Lebih Lanjut
          </h2>
          <p className="mt-4 text-neutral-700 text-sm sm:text-base font-medium">
            Apakah Anda tertarik untuk merekrut saya sebagai magang, kolaborasi proyek web, atau ingin bertanya seputar studi? Silakan kirim pesan melalui kontak di bawah ini.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Direct Contact Badges & Social Links (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Email Card */}
            <div className="bg-white border-2 border-black p-6 geo-shadow space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-black text-white font-bold">
                    <Mail className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-[10px] font-mono font-bold text-neutral-600 uppercase">Email Utama</p>
                    <p className="text-sm font-black text-black uppercase">{profile.email}</p>
                  </div>
                </div>
                <button
                  id="btn-copy-email"
                  onClick={handleCopyEmail}
                  className="p-2.5 bg-[#f4f4f2] hover:bg-black hover:text-white text-black border border-black transition-colors cursor-pointer geo-shadow-sm"
                  title="Salin alamat email"
                >
                  {copiedEmail ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* WhatsApp Card */}
            <div className="bg-white border-2 border-black p-6 geo-shadow space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-black text-white font-bold">
                    <MessageSquare className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-[10px] font-mono font-bold text-neutral-600 uppercase">WhatsApp & Telepon</p>
                    <p className="text-sm font-black text-black uppercase">{profile.whatsapp}</p>
                  </div>
                </div>
                <a
                  href={`https://wa.me/${cleanWhatsappNumber}?text=Halo%20${encodeURIComponent(profile.nickname)},%20saya%20tertarik%20dengan%20portofolio%20Anda.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-2 bg-black hover:bg-neutral-800 text-white text-xs font-bold uppercase transition-colors flex items-center gap-1.5 border border-black geo-shadow-sm"
                >
                  <span>Chat WA</span>
                </a>
              </div>
            </div>

            {/* Social Media Grid */}
            <div className="bg-white border-2 border-black p-6 geo-shadow space-y-4">
              <h3 className="text-sm font-black text-black border-b-2 border-black pb-2 uppercase">
                08 / Jaringan Sosial & Profil
              </h3>

              <div className="grid grid-cols-1 gap-2">
                {profile.linkedinUrl && (
                  <a
                    href={profile.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 bg-[#f4f4f2] hover:bg-black hover:text-white border border-black text-black transition-all group font-bold text-xs uppercase"
                  >
                    <div className="flex items-center gap-3">
                      <Linkedin className="w-4 h-4" />
                      <span>LinkedIn Professional</span>
                    </div>
                    <span className="font-mono text-[10px]">&rarr;</span>
                  </a>
                )}

                {profile.githubUrl && (
                  <a
                    href={profile.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 bg-[#f4f4f2] hover:bg-black hover:text-white border border-black text-black transition-all group font-bold text-xs uppercase"
                  >
                    <div className="flex items-center gap-3">
                      <Github className="w-4 h-4" />
                      <span>GitHub Repository</span>
                    </div>
                    <span className="font-mono text-[10px]">&rarr;</span>
                  </a>
                )}

                {profile.instagramUrl && (
                  <a
                    href={profile.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 bg-[#f4f4f2] hover:bg-black hover:text-white border border-black text-black transition-all group font-bold text-xs uppercase"
                  >
                    <div className="flex items-center gap-3">
                      <Instagram className="w-4 h-4" />
                      <span>Instagram</span>
                    </div>
                    <span className="font-mono text-[10px]">&rarr;</span>
                  </a>
                )}

                {profile.behanceUrl && (
                  <a
                    href={profile.behanceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 bg-[#f4f4f2] hover:bg-black hover:text-white border border-black text-black transition-all group font-bold text-xs uppercase"
                  >
                    <div className="flex items-center gap-3">
                      <Globe className="w-4 h-4" />
                      <span>Behance Portfolio</span>
                    </div>
                    <span className="font-mono text-[10px]">&rarr;</span>
                  </a>
                )}
              </div>
            </div>

          </div>

          {/* Right Contact Form (7 cols) */}
          <div className="lg:col-span-7 bg-white border-2 border-black p-6 sm:p-8 geo-shadow">
            <h3 className="text-xl font-black text-black mb-2 uppercase">Formulir Pesan Direct</h3>
            <p className="text-neutral-700 text-xs sm:text-sm mb-6 font-medium">
              Isi formulir berikut untuk mengirim pesan langsung kepada saya.
            </p>

            {submitted ? (
              <div className="p-6 bg-[#f4f4f2] border-2 border-black text-center space-y-3 geo-shadow-sm">
                <div className="w-12 h-12 bg-black text-white flex items-center justify-center mx-auto">
                  <Check className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-lg font-black text-black uppercase">Pesan Berhasil Terkirim!</h4>
                <p className="text-xs sm:text-sm text-neutral-800 font-medium">
                  Terima kasih sudah menghubungi saya. Saya akan membalas pesan Anda sesegera mungkin via email.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono font-bold uppercase text-black">Nama Lengkap *</label>
                    <input
                      type="text"
                      required
                      placeholder="Masukkan nama Anda"
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      className="w-full px-4 py-2.5 bg-[#f4f4f2] border border-black text-black text-sm font-medium focus:outline-none focus:bg-white"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono font-bold uppercase text-black">Alamat Email *</label>
                    <input
                      type="email"
                      required
                      placeholder="nama@email.com"
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      className="w-full px-4 py-2.5 bg-[#f4f4f2] border border-black text-black text-sm font-medium focus:outline-none focus:bg-white"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono font-bold uppercase text-black">Subjek Pesan</label>
                  <input
                    type="text"
                    placeholder="Contoh: Penawaran Magang Front-End / Tanya Proyek"
                    value={formState.subject}
                    onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                    className="w-full px-4 py-2.5 bg-[#f4f4f2] border border-black text-black text-sm font-medium focus:outline-none focus:bg-white"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono font-bold uppercase text-black">Isi Pesan *</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Tuliskan pesan Anda secara lengkap..."
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    className="w-full px-4 py-2.5 bg-[#f4f4f2] border border-black text-black text-sm font-medium focus:outline-none focus:bg-white resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-6 bg-black hover:bg-neutral-800 disabled:opacity-50 text-white font-bold text-xs uppercase tracking-wider geo-shadow transition-all flex items-center justify-center gap-2 cursor-pointer border border-black"
                >
                  {isSubmitting ? (
                    <span>Mengirim Pesan...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4 text-white" />
                      <span>Kirim Pesan Sekarang</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
