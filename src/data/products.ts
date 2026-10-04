import type { Product } from "../context/CartContext";

export const products: Product[] = [
  {
    id: 1,
    name: "Sepatu Sneakers Kasual Pria",
    price: 459000,
    category: "Fashion",
    rating: 4.7,
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format&fit=crop&q=70",
  },
  {
    id: 2,
    name: "Jam Tangan Digital Sport",
    price: 235000,
    category: "Aksesoris",
    rating: 4.5,
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=70",
  },
  {
    id: 3,
    name: "Headphone Wireless Premium",
    price: 899000,
    category: "Elektronik",
    rating: 4.9,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=70",
  },
  {
    id: 4,
    name: "Tas Ransel Laptop Minimalis",
    price: 325000,
    category: "Fashion",
    rating: 4.6,
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&auto=format&fit=crop&q=70",
  },
  {
    id: 5,
    name: "Kacamata Hitam Aviator",
    price: 179000,
    category: "Aksesoris",
    rating: 4.3,
    image:
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600&auto=format&fit=crop&q=70",
  },
  {
    id: 6,
    name: "Kamera Mirrorless 24MP",
    price: 7250000,
    category: "Elektronik",
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=600&auto=format&fit=crop&q=70",
  },
  {
    id: 7,
    name: "Jaket Hoodie Oversize",
    price: 215000,
    category: "Fashion",
    rating: 4.4,
    image:
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&auto=format&fit=crop&q=70",
  },
  {
    id: 8,
    name: "Smartwatch Fitness Tracker",
    price: 549000,
    category: "Elektronik",
    rating: 4.6,
    image:
      "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=600&auto=format&fit=crop&q=70",
  },
  {
    id: 9,
    name: "Botol Minum Tumbler 500ml",
    price: 89000,
    category: "Rumah Tangga",
    rating: 4.2,
    image:
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=600&auto=format&fit=crop&q=70",
  },
  {
    id: 10,
    name: "Parfum Pria Aroma Kayu",
    price: 385000,
    category: "Kecantikan",
    rating: 4.5,
    image:
      "https://images.unsplash.com/photo-1541643600914-78b084683601?w=600&auto=format&fit=crop&q=70",
  },
  {
    id: 11,
    name: "Mouse Wireless Ergonomis",
    price: 159000,
    category: "Elektronik",
    rating: 4.4,
    image:
      "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=600&auto=format&fit=crop&q=70",
  },
  {
    id: 12,
    name: "Topi Baseball Classic",
    price: 99000,
    category: "Aksesoris",
    rating: 4.3,
    image:
      "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=600&auto=format&fit=crop&q=70",
  },
];

export const categories = [
  "Semua",
  ...Array.from(new Set(products.map((p) => p.category))),
];
