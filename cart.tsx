import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Minus, Plus, Trash2 } from "lucide-react";
import { MIN_ORDER_GBP, useStore } from "@/lib/store";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Your Cart — Velora Élise" },
      {
        name: "description",
        content:
          "Review the UK products in your Velora Élise cart. Orders must reach a £30 minimum before checkout.",
      },
      { property: "og:title", content: "Your Cart — Velora Élise" },
      { property: "og:description", content: "Review your Velora Élise order before checkout." },
    ],
  }),
  component: CartPage,
});

function CartPage() {
  const { detailed, setQty, remove, subtotalGBP, format, meetsMinimum } = useStore();
  const navigate = useNavigate();
  const shortfall = MIN_ORDER_GBP - subtotalGBP;

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="font-display text-3xl text-foreground sm:text-4xl rule-gold">Your cart</h1>

      {detailed.length === 0 ? (
        <div className="mt-10 rounded-sm border border-border bg-card p-10 text-center shadow-soft">
          <p className="text-muted-foreground">Your cart is empty.</p>
          <Link to="/shop" className="btn-base btn-primary mt-6">
            Start shopping
          </Link>
        </div>
      ) : (
        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_20rem]">
          <div className="space-y-4">
            {detailed.map(({ product, qty }) => (
              <div
                key={product.id}
                className="flex gap-4 rounded-sm border border-border bg-card p-3 shadow-soft sm:p-4"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  loading="lazy"
                  width={816}
                  height={816}
                  className="h-24 w-24 shrink-0 rounded-sm object-cover"
                />
                <div className="flex flex-1 flex-col">
                  <Link
                    to="/product/$productId"
                    params={{ productId: product.id }}
                    className="font-display text-lg text-foreground hover:text-primary"
                  >
                    {product.name}
                  </Link>
                  <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
                    {product.category}
                  </p>
                  <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-3">
                    <div className="flex items-center rounded-sm border border-border">
                      <button
                        className="p-1.5 text-primary"
                        aria-label="Decrease quantity"
                        onClick={() => setQty(product.id, qty - 1)}
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="w-8 text-center text-sm">{qty}</span>
                      <button
                        className="p-1.5 text-primary"
                        aria-label="Increase quantity"
                        onClick={() => setQty(product.id, qty + 1)}
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="font-display text-lg text-primary">
                        {format(product.price * qty)}
                      </span>
                      <button
                        onClick={() => remove(product.id)}
                        aria-label={`Remove ${product.name}`}
                        className="text-muted-foreground hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <aside className="h-fit rounded-sm border border-border bg-card p-6 shadow-soft">
            <h2 className="font-display text-xl text-primary">Order summary</h2>
            <dl className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Subtotal</dt>
                <dd className="font-medium">{format(subtotalGBP)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Shipping</dt>
                <dd className="text-muted-foreground">Quoted after checkout</dd>
              </div>
            </dl>

            {!meetsMinimum && (
              <p className="mt-4 rounded-sm border border-destructive/40 bg-destructive/10 p-3 text-xs leading-relaxed text-destructive">
                Minimum order value is £30. Add {format(shortfall)} more to place your order.
              </p>
            )}

            <button
              className="btn-base btn-primary mt-5 w-full"
              disabled={!meetsMinimum}
              onClick={() => navigate({ to: "/checkout" })}
            >
              Proceed to checkout
            </button>
            <Link to="/shop" className="btn-base btn-outline mt-3 w-full">
              Continue shopping
            </Link>
          </aside>
        </div>
      )}
    </div>
  );
}
