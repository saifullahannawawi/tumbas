export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white font-black text-xl">
                T
              </div>
              <span className="text-2xl font-black text-white">TUMBAS</span>
            </div>
            <p className="text-sm text-gray-400 max-w-sm leading-relaxed">
              Platform e-commerce modern dengan produk berkualitas, harga terbaik,
              dan pengalaman belanja yang cepat dan aman.
            </p>
            <div className="flex gap-3 mt-5">
              {["FB", "IG", "TW", "YT"].map((s) => (
                <a
                  key={s}
                  href="#"
                  className="w-9 h-9 rounded-lg bg-gray-800 hover:bg-orange-500 flex items-center justify-center text-xs font-bold text-white transition"
                >
                  {s}
                </a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-bold text-white mb-3 text-sm">Kategori</h4>
            <ul className="space-y-2 text-sm">
              {["Fashion", "Elektronik", "Aksesoris", "Kecantikan"].map((c) => (
                <li key={c}>
                  <a href="#" className="hover:text-orange-400 transition">
                    {c}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-white mb-3 text-sm">Bantuan</h4>
            <ul className="space-y-2 text-sm">
              {["FAQ", "Hubungi Kami", "Kebijakan Privasi", "Syarat & Ketentuan"].map(
                (c) => (
                  <li key={c}>
                    <a href="#" className="hover:text-orange-400 transition">
                      {c}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} TUMBAS. All rights reserved.
          </p>
          <p className="text-xs text-gray-500">
            Dibuat dengan ❤️ di Indonesia
          </p>
        </div>
      </div>
    </footer>
  );
}
