import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { products, type Product } from "./products";

/* ---------------- Country / currency ---------------- */

export type CountryCode = "UK" | "SL" | "IN";

type CountryConfig = {
  code: CountryCode;
  label: string;
  symbol: string;
  rate: number; // multiplier from GBP
  decimals: number;
};

export const COUNTRIES: Record<CountryCode, CountryConfig> = {
  UK: { code: "UK", label: "United Kingdom (GBP)", symbol: "£", rate: 1, decimals: 2 },
  SL: { code: "SL", label: "Sri Lanka (LKR)", symbol: "Rs ", rate: 395, decimals: 0 },
  IN: { code: "IN", label: "India (INR)", symbol: "₹", rate: 108, decimals: 0 },
};

export const MIN_ORDER_GBP = 30;

/* ---------------- Cart ---------------- */

export type CartLine = { id: string; qty: number };

type StoreValue = {
  country: CountryCode;
  setCountry: (c: CountryCode) => void;
  format: (gbp: number) => string;
  items: CartLine[];
  detailed: { product: Product; qty: number }[];
  count: number;
  subtotalGBP: number;
  meetsMinimum: boolean;
  add: (id: string, qty?: number) => void;
  setQty: (id: string, qty: number) => void;
  remove: (id: string) => void;
  clear: () => void;
};

const StoreContext = createContext<StoreValue | null>(null);

const CART_KEY = "velora-cart";
const COUNTRY_KEY = "velora-country";

export function StoreProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartLine[]>([]);
  const [country, setCountryState] = useState<CountryCode>("UK");

  useEffect(() => {
    try {
      const raw = localStorage.getItem(CART_KEY);
      if (raw) setItems(JSON.parse(raw));
      const c = localStorage.getItem(COUNTRY_KEY) as CountryCode | null;
      if (c && COUNTRIES[c]) setCountryState(c);
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(items));
    } catch {
      /* ignore */
    }
  }, [items]);

  const setCountry = useCallback((c: CountryCode) => {
    setCountryState(c);
    try {
      localStorage.setItem(COUNTRY_KEY, c);
    } catch {
      /* ignore */
    }
  }, []);

  const format = useCallback(
    (gbp: number) => {
      const cfg = COUNTRIES[country];
      const value = gbp * cfg.rate;
      return (
        cfg.symbol +
        value.toLocaleString("en-GB", {
          minimumFractionDigits: cfg.decimals,
          maximumFractionDigits: cfg.decimals,
        })
      );
    },
    [country],
  );

  const add = useCallback((id: string, qty = 1) => {
    setItems((prev) => {
      const found = prev.find((l) => l.id === id);
      if (found) return prev.map((l) => (l.id === id ? { ...l, qty: l.qty + qty } : l));
      return [...prev, { id, qty }];
    });
  }, []);

  const setQty = useCallback((id: string, qty: number) => {
    setItems((prev) =>
      qty <= 0 ? prev.filter((l) => l.id !== id) : prev.map((l) => (l.id === id ? { ...l, qty } : l)),
    );
  }, []);

  const remove = useCallback((id: string) => {
    setItems((prev) => prev.filter((l) => l.id !== id));
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const detailed = useMemo(
    () =>
      items
        .map((l) => {
          const product = products.find((p) => p.id === l.id);
          return product ? { product, qty: l.qty } : null;
        })
        .filter((v): v is { product: Product; qty: number } => v !== null),
    [items],
  );

  const subtotalGBP = useMemo(
    () => detailed.reduce((sum, l) => sum + l.product.price * l.qty, 0),
    [detailed],
  );

  const value: StoreValue = {
    country,
    setCountry,
    format,
    items,
    detailed,
    count: items.reduce((n, l) => n + l.qty, 0),
    subtotalGBP,
    meetsMinimum: subtotalGBP >= MIN_ORDER_GBP,
    add,
    setQty,
    remove,
    clear,
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
}
