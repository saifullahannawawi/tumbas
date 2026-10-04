import { useMemo } from "react";
import { products } from "../data/products";
import { useCart, type Product } from "../context/CartContext";

type Props = {
  searchQuery: string;
  activeCategory: string;
  catalogRef: React.RefObject<HTMLDivElement | null>;
};

function formatRupiah(n: number) {
  return "Rp" + n.toLocaleString("id-ID");
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      <svg className="w-3.5 h-3.5 text-orange-400" fill="currentColor" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.966a1 1 0 00.95.69h4.168c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.37-2.448a1 1 0 00-1.176 0l-3.37 2.448c-.784.57-1.838-.196-1.539-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.05 9.393c-.783-.57-.38-1.81.588-1.81h4.169a1 1 0 00.95-.69l1.286-3.966z" />
      </svg>
      <span className="text-xs font-semibold text-gray-600">{rating}</span>
    </div>
  );
}

function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-orange-100 hover:border-orange-300 hover:shadow-xl hover:shadow-orange-100 transition-all duration-300">
      <div className="relative aspect-square overflow-hidden bg-orange-50">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <span className="absolute top-3 left-3 px-2.5 py-1 bg-white/90 backdrop-blur text-[10px] font-bold text-orange-600 rounded-full uppercase tracking-wide">
          {product.category}
        </span>
        <button
          className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur flex items-center justify-center text-gray-600 hover:text-red-500 transition"
          aria-label="Wishlist"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>
      </div>
      <div className="p-4 space-y-3">
        <div>
          <h3 className="font-semibold text-gray-900 text-sm line-clamp-2 min-h-[2.5rem] leading-tight">
            {product.name}
          </h3>
          <div className="mt-1.5">
            <StarRating rating={product.rating} />
          </div>
        </div>
        <div className="flex items-end justify-between gap-2">
          <div>
            <p className="text-lg font-black text-orange-600 leading-none">
              {formatRupiah(product.price)}
            </p>
          </div>
          <button
            onClick={() => addItem(product)}
            className="shrink-0 w-10 h-10 rounded-xl bg-orange-500 hover:bg-orange-600 text-white flex items-center justify-center shadow-md shadow-orange-200 hover:shadow-lg hover:shadow-orange-300 transition transform hover:scale-105 active:scale-95"
            aria-label="Tambah ke keranjang"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ProductCatalog({
  searchQuery,
  activeCategory,
  catalogRef,
}: Props) {
  const filtered = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return products.filter((p) => {
      const matchCat = activeCategory === "Semua" || p.category === activeCategory;
      const matchQ =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q);
      return matchCat && matchQ;
    });
  }, [searchQuery, activeCategory]);

  return (
    <section ref={catalogRef} className="bg-gray-50 py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-black text-gray-900">
              Produk Unggulan
            </h2>
            <p className="text-gray-600 mt-1 text-sm md:text-base">
              {filtered.length} produk tersedia
              {activeCategory !== "Semua" && (
                <span className="text-orange-600 font-semibold">
                  {" "}
                  dalam {activeCategory}
                </span>
              )}
            </p>
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-orange-100">
            <div className="text-6xl mb-4">🔍</div>
            <p className="text-lg font-semibold text-gray-900">Produk tidak ditemukan</p>
            <p className="text-gray-500 mt-1 text-sm">Coba kata kunci atau kategori lain.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
            {filtered.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
