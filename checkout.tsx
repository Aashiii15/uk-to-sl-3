import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { CheckCircle2 } from "lucide-react";
import { COUNTRIES, MIN_ORDER_GBP, useStore } from "@/lib/store";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout — Velora Élise" },
      {
        name: "description",
        content: "Complete your Velora Élise order for authentic UK products delivered to your door.",
      },
      { property: "og:title", content: "Checkout — Velora Élise" },
      { property: "og:description", content: "Complete your Velora Élise order." },
    ],
  }),
  component: Checkout,
});

function Checkout() {
  const { detailed, subtotalGBP, format, meetsMinimum, clear, country, setCountry } = useStore();
  const [placed, setPlaced] = useState<string | null>(null);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!meetsMinimum) return;
    setPlaced("VE-" + Math.random().toString(36).slice(2, 8).toUpperCase());
    clear();
  };

  if (placed) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center">
        <CheckCircle2 className="mx-auto h-12 w-12 text-accent" />
        <h1 className="mt-5 font-display text-3xl text-foreground">Thank you for your order</h1>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          Your order reference is <strong className="text-primary">{placed}</strong>. Our team will
          message you within 24 hours to confirm shipping cost and payment for your parcel.
        </p>
        <Link to="/shop" className="btn-base btn-primary mt-8">
          Continue shopping
        </Link>
      </div>
    );
  }

  if (detailed.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center">
        <h1 className="font-display text-3xl text-foreground">Your cart is empty</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Add products worth at least £30 to place an order.
        </p>
        <Link to="/shop" className="btn-base btn-primary mt-8">
          Browse the shop
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="font-display text-3xl text-foreground sm:text-4xl rule-gold">Checkout</h1>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_22rem]">
        <form onSubmit={submit} className="rounded-sm border border-border bg-card p-6 shadow-soft">
          <h2 className="font-display text-xl text-primary">Delivery details</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <label className="text-sm">
              <span className="mb-1 block text-muted-foreground">Full name</span>
              <input required className="field" name="name" />
            </label>
            <label className="text-sm">
              <span className="mb-1 block text-muted-foreground">Phone / WhatsApp</span>
              <input required className="field" name="phone" type="tel" />
            </label>
            <label className="text-sm sm:col-span-2">
              <span className="mb-1 block text-muted-foreground">Email</span>
              <input required className="field" name="email" type="email" />
            </label>
            <label className="text-sm sm:col-span-2">
              <span className="mb-1 block text-muted-foreground">Delivery address</span>
              <textarea required rows={3} className="field" name="address" />
            </label>
            <label className="text-sm">
              <span className="mb-1 block text-muted-foreground">City</span>
              <input required className="field" name="city" />
            </label>
            <label className="text-sm">
              <span className="mb-1 block text-muted-foreground">Delivery country</span>
              <select
                className="field"
                value={country}
                onChange={(e) => setCountry(e.target.value as typeof country)}
              >
                {Object.values(COUNTRIES).map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.label}
                  </option>
                ))}
              </select>
            </label>
            <label className="text-sm sm:col-span-2">
              <span className="mb-1 block text-muted-foreground">Order notes (optional)</span>
              <textarea rows={2} className="field" name="notes" />
            </label>
          </div>

          {!meetsMinimum && (
            <p className="mt-5 rounded-sm border border-destructive/40 bg-destructive/10 p-3 text-xs text-destructive">
              Minimum order value is £{MIN_ORDER_GBP}. Add {format(MIN_ORDER_GBP - subtotalGBP)} more
              before placing your order.
            </p>
          )}

          <button type="submit" className="btn-base btn-primary mt-6 w-full" disabled={!meetsMinimum}>
            Place order
          </button>
          <p className="mt-3 text-xs text-muted-foreground">
            We confirm shipping cost and payment by WhatsApp or email before dispatch.
          </p>
        </form>

        <aside className="h-fit rounded-sm border border-border bg-card p-6 shadow-soft">
          <h2 className="font-display text-xl text-primary">Your order</h2>
          <ul className="mt-4 space-y-3 text-sm">
            {detailed.map(({ product, qty }) => (
              <li key={product.id} className="flex justify-between gap-3">
                <span className="text-muted-foreground">
                  {product.name} × {qty}
                </span>
                <span className="shrink-0 font-medium">{format(product.price * qty)}</span>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex justify-between border-t border-border pt-4">
            <span className="text-sm text-muted-foreground">Subtotal</span>
            <span className="font-display text-xl text-primary">{format(subtotalGBP)}</span>
          </div>
          <Link to="/cart" className="btn-base btn-outline mt-5 w-full">
            Edit cart
          </Link>
        </aside>
      </div>
    </div>
  );
}
