import { useRef, useState } from "react";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ProductCatalog from "./components/ProductCatalog";
import CartPanel from "./components/CartPanel";
import AuthModal from "./components/AuthModal";
import Footer from "./components/Footer";

function AppShell() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [authOpen, setAuthOpen] = useState(false);
  const catalogRef = useRef<HTMLDivElement>(null);

  const scrollToCatalog = () => {
    catalogRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar
        onLoginClick={() => setAuthOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        activeCategory={activeCategory}
        onCategorySelect={(c) => {
          setActiveCategory(c);
          if (c !== "Semua") {
            setTimeout(() => scrollToCatalog(), 50);
          }
        }}
      />

      <main className="flex-1">
        <Hero onShopNow={scrollToCatalog} />
        <ProductCatalog
          searchQuery={searchQuery}
          activeCategory={activeCategory}
          catalogRef={catalogRef}
        />

        {/* Feature banner */}
        <section className="bg-orange-500 text-white py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: "🚚", title: "Gratis Ongkir", desc: "Min. belanja Rp0" },
              { icon: "⚡", title: "24 Jam Delivery", desc: "Kirim cepat" },
              { icon: "🔒", title: "Pembayaran Aman", desc: "100% Terproteksi" },
              { icon: "💬", title: "CS 24/7", desc: "Selalu siap bantu" },
            ].map((f) => (
              <div key={f.title} className="flex items-center gap-3">
                <div className="text-3xl">{f.icon}</div>
                <div>
                  <p className="font-bold text-sm md:text-base">{f.title}</p>
                  <p className="text-xs md:text-sm text-white/80">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />

      <CartPanel onRequireLogin={() => setAuthOpen(true)} />
      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <AppShell />
      </CartProvider>
    </AuthProvider>
  );
}
