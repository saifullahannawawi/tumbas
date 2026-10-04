import { useState, useRef, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

type Props = {
  onLoginClick: () => void;
  searchQuery: string;
  onSearchChange: (v: string) => void;
  onCategorySelect: (c: string) => void;
  activeCategory: string;
};

export default function Navbar({
  onLoginClick,
  searchQuery,
  onSearchChange,
  onCategorySelect,
  activeCategory,
}: Props) {
  const { user, logout } = useAuth();
  const { totalItems, openCart } = useCart();
  const [profileOpen, setProfileOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const firstLetter = user?.displayName?.charAt(0).toUpperCase() || "U";

  return (
    <header className="sticky top-0 z-40 bg-white shadow-sm border-b border-orange-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top row */}
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => onCategorySelect("Semua")}
              className="flex items-center gap-2"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white font-black text-lg shadow-md shadow-orange-200">
                T
              </div>
              <span className="text-2xl font-black tracking-tight text-gray-900">
                TUMBAS
              </span>
            </button>
          </div>

          {/* Search (desktop) */}
          <div className="hidden md:flex flex-1 max-w-xl">
            <div className="relative w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Cari produk..."
                className="w-full pl-11 pr-4 py-2.5 bg-orange-50 border border-orange-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition"
              />
              <svg
                className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-orange-500"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" strokeLinecap="round" />
              </svg>
            </div>
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Cart */}
            <button
              onClick={openCart}
              className="relative p-2.5 rounded-full hover:bg-orange-50 transition-colors"
              aria-label="Keranjang"
            >
              <svg
                className="w-6 h-6 text-gray-800"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.3 4.6c-.5.9.2 2 1.2 2H19M9 21a1 1 0 100-2 1 1 0 000 2zm9 0a1 1 0 100-2 1 1 0 000 2z"
                />
              </svg>
              {totalItems > 0 && (
                <span className="absolute -top-0.5 -right-0.5 min-w-[20px] h-5 bg-orange-500 text-white text-xs font-bold rounded-full flex items-center justify-center px-1 shadow-sm ring-2 ring-white">
                  {totalItems > 99 ? "99+" : totalItems}
                </span>
              )}
            </button>

            {/* Auth / Profile */}
            {user ? (
              <div className="relative" ref={profileRef}>
                <button
                  onClick={() => setProfileOpen((v) => !v)}
                  className="flex items-center gap-2 pl-1 pr-3 py-1 rounded-full hover:bg-orange-50 transition"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white font-bold text-sm shadow-sm">
                    {user.photoURL ? (
                      <img
                        src={user.photoURL}
                        alt={user.displayName}
                        className="w-8 h-8 rounded-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = "none";
                          (e.target as HTMLImageElement).parentElement!.textContent =
                            firstLetter;
                        }}
                      />
                    ) : (
                      firstLetter
                    )}
                  </div>
                  <span className="hidden sm:inline text-sm font-semibold text-gray-800 max-w-[120px] truncate">
                    {user.displayName}
                  </span>
                </button>
                {profileOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-orange-100 overflow-hidden">
                    <div className="px-4 py-3 bg-orange-50 border-b border-orange-100">
                      <p className="text-sm font-semibold text-gray-900 truncate">
                        {user.displayName}
                      </p>
                      <p className="text-xs text-gray-600 truncate">
                        {user.email}
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        setProfileOpen(false);
                        logout();
                      }}
                      className="w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition flex items-center gap-2"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                        />
                      </svg>
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={onLoginClick}
                className="px-4 py-2 rounded-full bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold transition shadow-sm shadow-orange-200"
              >
                Login
              </button>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen((v) => !v)}
              className="md:hidden p-2 rounded-lg hover:bg-orange-50"
              aria-label="Menu"
            >
              <svg
                className="w-6 h-6 text-gray-800"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                {mobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Search (mobile) */}
        <div className="md:hidden pb-3">
          <div className="relative w-full">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Cari produk..."
              className="w-full pl-11 pr-4 py-2.5 bg-orange-50 border border-orange-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
            <svg
              className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-orange-500"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" strokeLinecap="round" />
            </svg>
          </div>
        </div>

        {/* Category menu */}
        <nav className="hidden md:flex items-center gap-1 pb-3 overflow-x-auto scrollbar-hide">
          {["Semua", "Fashion", "Elektronik", "Aksesoris", "Rumah Tangga", "Kecantikan"].map(
            (c) => (
              <button
                key={c}
                onClick={() => onCategorySelect(c)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition ${
                  activeCategory === c
                    ? "bg-orange-500 text-white shadow-sm"
                    : "text-gray-700 hover:bg-orange-50"
                }`}
              >
                {c}
              </button>
            )
          )}
        </nav>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-3 border-t border-orange-100 pt-2">
            <p className="text-xs font-semibold uppercase text-gray-500 px-2 mb-2">
              Kategori
            </p>
            <div className="flex flex-wrap gap-2">
              {["Semua", "Fashion", "Elektronik", "Aksesoris", "Rumah Tangga", "Kecantikan"].map(
                (c) => (
                  <button
                    key={c}
                    onClick={() => {
                      onCategorySelect(c);
                      setMobileMenuOpen(false);
                    }}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium ${
                      activeCategory === c
                        ? "bg-orange-500 text-white"
                        : "bg-orange-50 text-gray-700"
                    }`}
                  >
                    {c}
                  </button>
                )
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
