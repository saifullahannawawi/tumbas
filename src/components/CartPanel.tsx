import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

function formatRupiah(n: number) {
  return "Rp" + n.toLocaleString("id-ID");
}

type Props = {
  onRequireLogin: () => void;
};

export default function CartPanel({ onRequireLogin }: Props) {
  const {
    items,
    isOpen,
    closeCart,
    totalItems,
    subtotal,
    incQty,
    decQty,
    removeItem,
    clearCart,
  } = useCart();
  const { user } = useAuth();
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);
  const [processing, setProcessing] = useState(false);

  const handleCheckout = () => {
    if (!user) {
      closeCart();
      onRequireLogin();
      return;
    }
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setCheckoutSuccess(true);
    }, 900);
  };

  const handleCloseSuccess = () => {
    setCheckoutSuccess(false);
    clearCart();
    closeCart();
  };

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={closeCart}
        className={`fixed inset-0 bg-black/40 z-50 transition-opacity ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Panel */}
      <aside
        className={`fixed top-0 right-0 h-full w-full sm:w-[440px] bg-white z-50 shadow-2xl flex flex-col transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-orange-100 bg-orange-50">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-orange-500 flex items-center justify-center text-white">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.3 4.6c-.5.9.2 2 1.2 2H19" />
              </svg>
            </div>
            <div>
              <h2 className="font-black text-lg text-gray-900 leading-tight">Keranjang</h2>
              <p className="text-xs text-gray-600">{totalItems} item</p>
            </div>
          </div>
          <button
            onClick={closeCart}
            className="w-9 h-9 rounded-full hover:bg-white flex items-center justify-center text-gray-600 transition"
            aria-label="Tutup"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-5 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-10">
              <div className="w-20 h-20 rounded-full bg-orange-50 flex items-center justify-center text-4xl mb-4">
                🛒
              </div>
              <p className="font-bold text-gray-900">Keranjang masih kosong</p>
              <p className="text-sm text-gray-500 mt-1 max-w-xs">
                Yuk mulai pilih produk favoritmu dan tambahkan ke keranjang!
              </p>
              <button
                onClick={closeCart}
                className="mt-5 px-5 py-2 rounded-full bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold transition"
              >
                Mulai Belanja
              </button>
            </div>
          ) : (
            <ul className="space-y-3">
              {items.map((item) => (
                <li
                  key={item.id}
                  className="flex gap-3 p-3 bg-orange-50/50 rounded-xl border border-orange-100"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 rounded-lg object-cover bg-white shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm text-gray-900 line-clamp-2 leading-tight">
                      {item.name}
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5">{item.category}</p>
                    <p className="font-black text-orange-600 text-sm mt-1">
                      {formatRupiah(item.price)}
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-1 bg-white rounded-lg border border-orange-200">
                        <button
                          onClick={() => decQty(item.id)}
                          className="w-7 h-7 flex items-center justify-center text-orange-600 hover:bg-orange-100 rounded-l-lg transition"
                          aria-label="Kurangi"
                        >
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                            <path strokeLinecap="round" d="M20 12H4" />
                          </svg>
                        </button>
                        <span className="w-7 text-center text-sm font-bold text-gray-900">
                          {item.qty}
                        </span>
                        <button
                          onClick={() => incQty(item.id)}
                          className="w-7 h-7 flex items-center justify-center text-orange-600 hover:bg-orange-100 rounded-r-lg transition"
                          aria-label="Tambah"
                        >
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                            <path strokeLinecap="round" d="M12 4v16m8-8H4" />
                          </svg>
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-xs font-medium text-red-500 hover:text-red-700 hover:underline transition"
                      >
                        Hapus
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-orange-100 px-5 py-4 space-y-3 bg-white">
            <div className="flex items-center justify-between text-sm text-gray-600">
              <span>Subtotal</span>
              <span>{formatRupiah(subtotal)}</span>
            </div>
            <div className="flex items-center justify-between text-sm text-gray-600">
              <span>Ongkos kirim</span>
              <span className="text-green-600 font-semibold">GRATIS</span>
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-dashed border-orange-200">
              <span className="font-bold text-gray-900">Total</span>
              <span className="text-xl font-black text-orange-600">
                {formatRupiah(subtotal)}
              </span>
            </div>
            {!user && (
              <div className="text-xs text-center p-2 bg-orange-50 rounded-lg text-orange-700 border border-orange-200">
                🔒 Silakan <button onClick={onRequireLogin} className="font-bold underline">login</button> untuk melanjutkan checkout.
              </div>
            )}
            <button
              onClick={handleCheckout}
              disabled={processing}
              className="w-full py-3 rounded-xl bg-orange-500 hover:bg-orange-600 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold shadow-lg shadow-orange-200 transition flex items-center justify-center gap-2"
            >
              {processing ? (
                <>
                  <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" opacity="0.25" />
                    <path fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                  </svg>
                  Memproses...
                </>
              ) : (
                <>
                  Checkout Sekarang
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </>
              )}
            </button>
          </div>
        )}
      </aside>

      {/* Success Modal */}
      {checkoutSuccess && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 animate-fade-in">
          <div className="bg-white rounded-3xl max-w-sm w-full p-8 text-center shadow-2xl animate-pop">
            <div className="w-20 h-20 mx-auto rounded-full bg-green-100 flex items-center justify-center mb-5">
              <svg className="w-12 h-12 text-green-500" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-2xl font-black text-gray-900">Pesanan Berhasil!</h3>
            <p className="text-gray-600 mt-2 text-sm leading-relaxed">
              Terima kasih, <span className="font-semibold text-orange-600">{user?.displayName}</span>!
              Pesananmu sedang diproses dan akan segera dikirim.
            </p>
            <div className="mt-5 p-3 bg-orange-50 rounded-xl border border-orange-100">
              <p className="text-xs text-gray-500">Total pembayaran</p>
              <p className="text-lg font-black text-orange-600">{formatRupiah(subtotal)}</p>
            </div>
            <button
              onClick={handleCloseSuccess}
              className="w-full mt-5 py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold transition"
            >
              Selesai
            </button>
          </div>
        </div>
      )}
    </>
  );
}
