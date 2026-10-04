import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  ReactNode,
} from "react";
import { useAuth } from "./AuthContext";

export type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  rating: number;
};

export type CartItem = Product & { qty: number };

type CartContextType = {
  items: CartItem[];
  isOpen: boolean;
  totalItems: number;
  subtotal: number;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addItem: (p: Product) => void;
  removeItem: (id: number) => void;
  incQty: (id: number) => void;
  decQty: (id: number) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const storageKey = user ? `tumbas_cart_${user.uid}` : "tumbas_cart_guest";

  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  // Load cart from localStorage on mount / user change.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      setItems(raw ? (JSON.parse(raw) as CartItem[]) : []);
    } catch {
      setItems([]);
    }
  }, [storageKey]);

  // Persist cart whenever items change.
  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(items));
    } catch {
      // ignore
    }
  }, [items, storageKey]);

  const totalItems = useMemo(
    () => items.reduce((sum, i) => sum + i.qty, 0),
    [items]
  );
  const subtotal = useMemo(
    () => items.reduce((sum, i) => sum + i.qty * i.price, 0),
    [items]
  );

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);
  const toggleCart = () => setIsOpen((v) => !v);

  const addItem = (p: Product) => {
    setItems((prev) => {
      const exists = prev.find((i) => i.id === p.id);
      if (exists) {
        return prev.map((i) => (i.id === p.id ? { ...i, qty: i.qty + 1 } : i));
      }
      return [...prev, { ...p, qty: 1 }];
    });
    openCart();
  };

  const removeItem = (id: number) =>
    setItems((prev) => prev.filter((i) => i.id !== id));

  const incQty = (id: number) =>
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, qty: i.qty + 1 } : i))
    );

  const decQty = (id: number) =>
    setItems((prev) =>
      prev
        .map((i) => (i.id === id ? { ...i, qty: Math.max(1, i.qty - 1) } : i))
        .filter((i) => i.qty > 0)
    );

  const clearCart = () => setItems([]);

  return (
    <CartContext.Provider
      value={{
        items,
        isOpen,
        totalItems,
        subtotal,
        openCart,
        closeCart,
        toggleCart,
        addItem,
        removeItem,
        incQty,
        decQty,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
