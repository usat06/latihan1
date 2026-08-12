import React, { useState } from 'react';
import { X, Lock, User, KeyRound, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';

interface AdminLoginModalProps {
  onClose: () => void;
  onLoginSuccess: () => void;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({
  onClose,
  onLoginSuccess
}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    // Default admin credentials: admin / admin123
    if (username.trim() === 'admin' && password === 'admin123') {
      onLoginSuccess();
    } else {
      setErrorMsg('Username atau Password Admin tidak valid.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white border-2 border-black geo-shadow text-black p-6 sm:p-8 space-y-6">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-black text-white hover:bg-neutral-800 transition-colors cursor-pointer border border-black"
          title="Tutup Modal"
        >
          <X className="w-5 h-5 text-white" />
        </button>

        {/* Modal Header */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-black text-white text-xs font-mono font-bold tracking-widest uppercase geo-shadow-sm">
            <Lock className="w-3.5 h-3.5 text-white" />
            <span>ADMIN AUTHENTICATION</span>
          </div>
          <h2 className="text-2xl font-black uppercase text-black">
            LOGIN PORTAL ADMIN
          </h2>
          <p className="text-xs font-medium text-neutral-700">
            Masukkan kredensial otorisasi admin untuk mengedit konten website secara penuh.
          </p>
        </div>

        {/* Error Alert */}
        {errorMsg && (
          <div className="p-3 bg-rose-100 border border-black text-rose-900 text-xs font-medium flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-700 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Form Login */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-mono font-bold uppercase text-black flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-black" />
              <span>Username Admin</span>
            </label>
            <input
              type="text"
              required
              placeholder="Masukkan username admin"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-[#f4f4f2] border border-black text-black text-sm font-medium focus:bg-white focus:outline-none"
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-mono font-bold uppercase text-black flex items-center gap-1.5">
                <KeyRound className="w-3.5 h-3.5 text-black" />
                <span>Password</span>
              </label>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-[10px] font-mono font-bold uppercase text-black underline cursor-pointer"
              >
                {showPassword ? 'Sembunyikan' : 'Tampilkan'}
              </button>
            </div>
            <input
              type={showPassword ? 'text' : 'password'}
              required
              placeholder="Masukkan password admin"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-[#f4f4f2] border border-black text-black text-sm font-medium focus:bg-white focus:outline-none"
            />
          </div>

          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 bg-[#f4f4f2] hover:bg-neutral-200 text-black text-xs font-bold uppercase border border-black cursor-pointer"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-black hover:bg-neutral-800 text-white text-xs font-bold uppercase border border-black geo-shadow cursor-pointer flex items-center gap-2"
            >
              <span>Login Sekarang</span>
              <ArrowRight className="w-4 h-4 text-white" />
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
