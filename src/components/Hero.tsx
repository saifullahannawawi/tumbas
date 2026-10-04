type Props = {
  onShopNow: () => void;
};

export default function Hero({ onShopNow }: Props) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-orange-50 via-white to-orange-100">
      <div className="absolute inset-0 opacity-40 pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-orange-300 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-orange-200 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="space-y-6 text-center md:text-left">
            <span className="inline-block px-4 py-1.5 bg-white text-orange-600 text-xs font-bold rounded-full shadow-sm border border-orange-200 uppercase tracking-wider">
              ⚡ Flash Sale Hari Ini
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-gray-900 leading-tight">
              Belanja Mudah,{" "}
              <span className="bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
                Cepat & Hemat
              </span>
            </h1>
            <p className="text-base md:text-lg text-gray-600 max-w-lg mx-auto md:mx-0 leading-relaxed">
              Temukan ribuan produk berkualitas dengan harga terbaik. Diskon
              hingga <span className="font-bold text-orange-600">70%</span> untuk
              pembelian pertama!
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
              <button
                onClick={onShopNow}
                className="px-8 py-3.5 rounded-full bg-orange-500 hover:bg-orange-600 text-white font-bold text-base shadow-lg shadow-orange-300 hover:shadow-xl hover:shadow-orange-300 transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
              >
                Belanja Sekarang
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </button>
              <button
                onClick={onShopNow}
                className="px-8 py-3.5 rounded-full bg-white hover:bg-gray-50 text-gray-900 font-bold text-base shadow-sm border border-gray-200 transition"
              >
                Lihat Katalog
              </button>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-6 pt-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-orange-600"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <span className="font-medium">Gratis Ongkir</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-orange-600"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <span className="font-medium">24 Jam Delivery</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-orange-600"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                </div>
                <span className="font-medium">100% Original</span>
              </div>
            </div>
          </div>

          {/* Hero Image / Visual */}
          <div className="relative">
            <div className="relative aspect-square max-w-md mx-auto">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-400 to-orange-600 rounded-[2.5rem] rotate-6 shadow-2xl shadow-orange-200" />
              <div className="absolute inset-0 bg-white rounded-[2.5rem] -rotate-3 shadow-xl overflow-hidden border-4 border-white">
                <img
                  src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800&auto=format&fit=crop&q=80"
                  alt="Belanja di TUMBAS"
                  className="w-full h-full object-cover"
                  loading="eager"
                />
              </div>
              {/* Floating cards */}
              <div className="absolute -left-4 top-8 bg-white rounded-2xl shadow-lg p-3 flex items-center gap-3 animate-bounce-slow">
                <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center text-xl">
                  🛍️
                </div>
                <div>
                  <p className="text-xs text-gray-500">Pesanan</p>
                  <p className="text-sm font-bold text-gray-900">+1,234 hari ini</p>
                </div>
              </div>
              <div className="absolute -right-4 bottom-12 bg-white rounded-2xl shadow-lg p-3 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center text-xl">
                  ⭐
                </div>
                <div>
                  <p className="text-xs text-gray-500">Rating</p>
                  <p className="text-sm font-bold text-gray-900">4.9 / 5.0</p>
                </div>
              </div>
              <div className="absolute left-4 -bottom-4 bg-orange-500 rounded-2xl shadow-lg p-3 flex items-center gap-3 text-white">
                <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center text-xl">
                  💰
                </div>
                <div>
                  <p className="text-xs opacity-80">Diskon</p>
                  <p className="text-sm font-bold">Hingga 70%</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
