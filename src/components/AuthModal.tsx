import { useState, FormEvent } from "react";
import { useAuth } from "../context/AuthContext";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function AuthModal({ open, onClose }: Props) {
  const { login, register, loginWithGoogle } = useAuth();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  if (!open) return null;

  const reset = () => {
    setEmail("");
    setPassword("");
    setName("");
    setError(null);
  };

  const switchMode = (m: "login" | "register") => {
    setMode(m);
    setError(null);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!email || !password) {
      setError("Email dan password wajib diisi.");
      return;
    }
    if (password.length < 6) {
      setError("Password minimal 6 karakter.");
      return;
    }
    if (mode === "register" && !name.trim()) {
      setError("Nama lengkap wajib diisi.");
      return;
    }
    setLoading(true);
    try {
      if (mode === "login") {
        await login(email, password);
      } else {
        await register(email, password, name.trim());
      }
      setLoading(false);
      reset();
      onClose();
    } catch (err: any) {
      setLoading(false);
      setError(err?.message || "Terjadi kesalahan, silakan coba lagi.");
    }
  };

  const handleGoogle = async () => {
    setError(null);
    setLoading(true);
    try {
      await loginWithGoogle();
      setLoading(false);
      reset();
      onClose();
    } catch (err: any) {
      setLoading(false);
      setError(err?.message || "Gagal masuk dengan Google.");
    }
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/50 animate-fade-in">
      <div
        className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl animate-pop"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative bg-gradient-to-br from-orange-500 to-orange-600 px-6 py-8 text-white text-center">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition"
            aria-label="Tutup"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center mx-auto mb-3 text-2xl font-black">
            T
          </div>
          <h2 className="text-2xl font-black">
            {mode === "login" ? "Selamat Datang" : "Buat Akun Baru"}
          </h2>
          <p className="text-white/80 text-sm mt-1">
            {mode === "login"
              ? "Masuk untuk mulai belanja di TUMBAS"
              : "Daftar dan nikmati promo menarik"}
          </p>
        </div>

        <div className="p-6">
          {/* Tab switcher */}
          <div className="flex bg-orange-50 rounded-full p-1 mb-5">
            <button
              onClick={() => switchMode("login")}
              className={`flex-1 py-2 rounded-full text-sm font-semibold transition ${
                mode === "login"
                  ? "bg-white text-orange-600 shadow-sm"
                  : "text-gray-600 hover:text-orange-600"
              }`}
            >
              Login
            </button>
            <button
              onClick={() => switchMode("register")}
              className={`flex-1 py-2 rounded-full text-sm font-semibold transition ${
                mode === "register"
                  ? "bg-white text-orange-600 shadow-sm"
                  : "text-gray-600 hover:text-orange-600"
              }`}
            >
              Register
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            {mode === "register" && (
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Masukkan nama kamu"
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition"
                />
              </div>
            )}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nama@email.com"
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Minimal 6 karakter"
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition"
              />
            </div>

            {error && (
              <div className="text-xs bg-red-50 text-red-600 p-2.5 rounded-lg border border-red-200">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-orange-500 hover:bg-orange-600 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold shadow-md shadow-orange-200 transition flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" opacity="0.25" />
                    <path fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                  </svg>
                  Memproses...
                </>
              ) : mode === "login" ? (
                "Masuk"
              ) : (
                "Daftar"
              )}
            </button>
          </form>

          <div className="flex items-center gap-3 my-4">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-xs text-gray-500 font-medium">ATAU</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          <button
            onClick={handleGoogle}
            disabled={loading}
            className="w-full py-3 rounded-xl bg-white hover:bg-gray-50 border border-gray-200 text-gray-800 font-semibold text-sm transition flex items-center justify-center gap-2 disabled:opacity-60"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Lanjutkan dengan Google
          </button>

          <p className="text-center text-xs text-gray-500 mt-4 leading-relaxed">
            Dengan melanjutkan, kamu menyetujui{" "}
            <span className="text-orange-600 font-semibold cursor-pointer hover:underline">
              Syarat & Ketentuan
            </span>{" "}
            TUMBAS.
          </p>
        </div>
      </div>
    </div>
  );
}
