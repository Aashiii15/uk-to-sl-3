import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Check, Minus, Plus } from "lucide-react";
import { toast } from "sonner";
import { getProduct, relatedProducts } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/product/$productId")({
  loader: ({ params }) => {
    const product = getProduct(params.productId);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Product not found — Velora Élise" }, { name: "robots", content: "noindex" }],
      };
    }
    const { product } = loaderData;
    return {
      meta: [
        { title: `${product.name} — Velora Élise` },
        { name: "description", content: product.description.slice(0, 160) },
        { property: "og:title", content: `${product.name} — Velora Élise` },
        { property: "og:description", content: product.description.slice(0, 160) },
      ],
    };
  },
  component: ProductPage,
});

function ProductPage() {
  const { product } = Route.useLoaderData();
  const { add, format } = useStore();
  const navigate = useNavigate();
  const [qty, setQty] = useState(1);
  const related = relatedProducts(product);

  return (
    <>
      <div className="mx-auto max-w-6xl px-4 py-8">
        <nav className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
          <Link to="/" className="hover:text-primary">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link to="/shop" className="hover:text-primary">
            Shop
          </Link>
          <span className="mx-2">/</span>
          <span className="text-primary">{product.name}</span>
        </nav>

        <div className="mt-6 grid gap-8 lg:grid-cols-2">
          <div className="overflow-hidden rounded-sm border border-border bg-card">
            <img
              src={product.image}
              alt={product.name}
              width={816}
              height={816}
              className="aspect-square w-full object-cover"
            />
          </div>

          <div>
            <p className="eyebrow">{product.category}</p>
            <h1 className="mt-3 font-display text-3xl text-foreground sm:text-4xl">
              {product.name}
            </h1>
            <p className="mt-4 font-display text-3xl text-primary">{format(product.price)}</p>
            <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
              {product.description}
            </p>

            <ul className="mt-6 space-y-2">
              {product.highlights.map((h) => (
                <li key={h} className="flex items-center gap-2 text-sm text-foreground">
                  <Check className="h-4 w-4 text-accent" /> {h}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex items-center gap-4">
              <span className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
                Quantity
              </span>
              <div className="flex items-center rounded-sm border border-border bg-card">
                <button
                  className="p-2 text-primary"
                  aria-label="Decrease quantity"
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-10 text-center text-sm">{qty}</span>
                <button
                  className="p-2 text-primary"
                  aria-label="Increase quantity"
                  onClick={() => setQty((q) => q + 1)}
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <button
                className="btn-base btn-outline flex-1"
                onClick={() => {
                  add(product.id, qty);
                  toast.success(`${product.name} added to cart`);
                }}
              >
                Add to Cart
              </button>
              <button
                className="btn-base btn-primary flex-1"
                onClick={() => {
                  add(product.id, qty);
                  navigate({ to: "/checkout" });
                }}
              >
                Buy Now
              </button>
            </div>

            <p className="mt-5 text-xs text-muted-foreground">
              Minimum order value is £30. Shipped from Dartford, UK to Sri Lanka and India with
              tracking.
            </p>
          </div>
        </div>
      </div>

      <section className="bg-secondary/60 py-16">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="font-display text-2xl text-foreground sm:text-3xl rule-gold">
            Related products
          </h2>
          <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
