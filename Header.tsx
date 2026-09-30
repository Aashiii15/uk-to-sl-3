import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, ShoppingBag, X } from "lucide-react";
const logo = { url: "/velora-logo.jpg" };
import { COUNTRIES, useStore, type CountryCode } from "@/lib/store";

const nav = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/shop", label: "Shop" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  const { count, country, setCountry } = useStore();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/95 backdrop-blur">
      <div className="bg-wine-gradient text-center text-[0.68rem] tracking-[0.22em] uppercase text-primary-foreground py-2 px-4">
        Authentic UK products · Delivered across Sri Lanka &amp; India
      </div>
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link to="/" className="flex items-center gap-3">
          <img src={logo.url} alt="Velora Élise" className="h-11 w-11 rounded-full object-cover" />
          <span className="leading-tight">
            <span className="block font-display text-lg text-primary">Velora Élise</span>
            <span className="block text-[0.6rem] tracking-[0.24em] uppercase text-muted-foreground">
              UK to your doorstep
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              activeOptions={{ exact: n.to === "/" }}
              activeProps={{ className: "text-primary" }}
              inactiveProps={{ className: "text-muted-foreground" }}
              className="text-[0.78rem] font-semibold uppercase tracking-[0.16em] transition-colors hover:text-primary"
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <select
            aria-label="Select country"
            value={country}
            onChange={(e) => setCountry(e.target.value as CountryCode)}
            className="hidden rounded-sm border border-border bg-card px-2 py-1.5 text-xs text-foreground sm:block"
          >
            {Object.values(COUNTRIES).map((c) => (
              <option key={c.code} value={c.code}>
                {c.code} · {c.symbol.trim()}
              </option>
            ))}
          </select>

          <Link to="/cart" className="relative p-2 text-primary" aria-label="Cart">
            <ShoppingBag className="h-5 w-5" />
            {count > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-accent px-1 text-[0.6rem] font-bold text-accent-foreground">
                {count}
              </span>
            )}
          </Link>

          <button
            className="p-2 text-primary md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border bg-card px-4 py-3 md:hidden">
          <div className="flex flex-col gap-1">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="rounded-sm px-2 py-2 text-sm font-semibold uppercase tracking-[0.14em] text-foreground hover:bg-secondary"
              >
                {n.label}
              </Link>
            ))}
            <select
              aria-label="Select country"
              value={country}
              onChange={(e) => setCountry(e.target.value as CountryCode)}
              className="mt-2 field"
            >
              {Object.values(COUNTRIES).map((c) => (
                <option key={c.code} value={c.code}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}
    </header>
  );
}
