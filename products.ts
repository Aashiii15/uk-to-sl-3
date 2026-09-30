import chocolateBox from "@/assets/p-chocolate-box.jpg";
import pistachios from "@/assets/p-pistachios.jpg";
import watch from "@/assets/p-watch.jpg";
import handbag from "@/assets/p-handbag.jpg";
import phone from "@/assets/p-phone.jpg";
import truffles from "@/assets/p-truffles.jpg";
import cosmetics from "@/assets/p-cosmetics.jpg";
import tea from "@/assets/p-tea.jpg";
import cashews from "@/assets/p-cashews.jpg";
import soap from "@/assets/p-soap.jpg";
import oil from "@/assets/p-oil.jpg";
import perfume from "@/assets/p-perfume.jpg";
import biscuits from "@/assets/p-biscuits.jpg";

export type Product = {
  id: string;
  name: string;
  category: string;
  price: number; // base price in GBP
  image: string;
  description: string;
  highlights: string[];
};

export const products: Product[] = [
  {
    id: "milk-chocolate-gift-box",
    name: "Fine Milk Chocolate Gift Box",
    category: "Chocolates",
    price: 24.5,
    image: chocolateBox,
    description:
      "A 24-piece selection of British milk chocolates, hand-finished in London and presented in a ribboned keepsake box. A timeless gift for birthdays, weddings and festive seasons.",
    highlights: ["24 assorted pieces", "Made in the UK", "Gift-ready presentation box"],
  },
  {
    id: "chocolate-truffle-tray",
    name: "Cocoa Dusted Truffle Collection",
    category: "Chocolates",
    price: 19.0,
    image: truffles,
    description:
      "Soft-centred truffles rolled in cocoa, praline and toasted hazelnut, served on a gold tray. Rich, slow-melting and made in small batches.",
    highlights: ["Small-batch truffles", "Hazelnut & praline centres", "Temperature-protected shipping"],
  },
  {
    id: "butter-shortbread-tin",
    name: "British Butter Shortbread Tin",
    category: "Chocolates",
    price: 15.5,
    image: biscuits,
    description:
      "All-butter shortbread fingers baked to a traditional recipe and packed in a reusable burgundy and gold tin.",
    highlights: ["All-butter recipe", "Reusable keepsake tin", "Perfect with tea"],
  },
  {
    id: "roasted-pistachios",
    name: "Premium Roasted Pistachios",
    category: "Nuts & Snacks",
    price: 12.0,
    image: pistachios,
    description:
      "Plump, lightly salted pistachios roasted in small batches and sealed in a resealable pouch to keep every kernel crisp.",
    highlights: ["250g resealable pouch", "Lightly salted", "No artificial additives"],
  },
  {
    id: "roasted-cashews",
    name: "Premium Roasted Cashew Nuts",
    category: "Nuts & Snacks",
    price: 13.5,
    image: cashews,
    description:
      "Whole golden cashews, slow roasted for an even crunch. A wholesome everyday snack and a favourite in gift hampers.",
    highlights: ["250g resealable pouch", "Whole grade kernels", "Rich in protein"],
  },
  {
    id: "english-breakfast-tea",
    name: "English Breakfast Tea Caddy",
    category: "Tea & Pantry",
    price: 14.0,
    image: tea,
    description:
      "Fifty tea bags of full-bodied English Breakfast blend in a decorative caddy. Strong, malty and perfect with milk.",
    highlights: ["50 tea bags", "Classic British blend", "Decorative gift caddy"],
  },
  {
    id: "botanical-soap-set",
    name: "Botanical Handmade Soap Set",
    category: "Bath & Body",
    price: 16.5,
    image: soap,
    description:
      "Three cold-pressed soap bars scented with rose, olive leaf and vetiver, wrapped in gold-printed botanical paper.",
    highlights: ["Set of 3 bars", "Cold-pressed & vegetable based", "Gently scented"],
  },
  {
    id: "hair-body-oil",
    name: "Luxury Hair & Body Oil",
    category: "Bath & Body",
    price: 22.0,
    image: oil,
    description:
      "A featherlight blend of argan, jojoba and vitamin E that absorbs quickly, leaving hair glossy and skin soft.",
    highlights: ["100ml glass bottle", "Argan, jojoba & vitamin E", "Non-greasy finish"],
  },
  {
    id: "beauty-trio-set",
    name: "Radiant Beauty Trio Set",
    category: "Cosmetics",
    price: 48.0,
    image: cosmetics,
    description:
      "A matte lipstick, renewal serum and pressed powder compact in signature burgundy and gold casing. Our best-selling cosmetics gift.",
    highlights: ["3-piece set", "Dermatologically tested", "Signature gold casing"],
  },
  {
    id: "eau-de-parfum",
    name: "London Eau de Parfum",
    category: "Cosmetics",
    price: 58.0,
    image: perfume,
    description:
      "An amber-floral fragrance with bergamot, jasmine and warm vanilla, blended and bottled in London.",
    highlights: ["50ml bottle", "Amber floral notes", "Blended in London"],
  },
  {
    id: "leather-handbag",
    name: "Two-Tone Leather Handbag",
    category: "Bags & Accessories",
    price: 149.0,
    image: handbag,
    description:
      "Grained tan leather with burgundy trim, gold hardware and a fully lined interior with laptop-friendly space.",
    highlights: ["Genuine grained leather", "Gold-tone hardware", "Fits a 13\" laptop"],
  },
  {
    id: "automatic-watch",
    name: "Gold Case Automatic Watch",
    category: "Watches",
    price: 265.0,
    image: watch,
    description:
      "A gold-plated automatic timepiece with a textured ivory dial, date window and hand-stitched leather strap.",
    highlights: ["Automatic movement", "200m water resistance", "Leather strap"],
  },
  {
    id: "flagship-smartphone",
    name: "Flagship Smartphone 256GB",
    category: "Electronics",
    price: 699.0,
    image: phone,
    description:
      "UK-stock unlocked flagship smartphone with a 6.7\" display, triple camera system and 256GB storage. Ships sealed with global warranty.",
    highlights: ["Unlocked UK stock", "256GB storage", "Sealed with warranty"],
  },
];

export const categories = Array.from(new Set(products.map((p) => p.category)));

export const getProduct = (id: string) => products.find((p) => p.id === id);

export const relatedProducts = (product: Product) =>
  products
    .filter((p) => p.id !== product.id && p.category === product.category)
    .concat(products.filter((p) => p.id !== product.id && p.category !== product.category))
    .slice(0, 4);
