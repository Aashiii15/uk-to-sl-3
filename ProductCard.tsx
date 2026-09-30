import { Link, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import type { Product } from "@/lib/products";
import { useStore } from "@/lib/store";

export function ProductCard({ product }: { product: Product }) {
  const { add, format } = useStore();
  const navigate = useNavigate();

  const buyNow = () => {
    add(product.id);
    navigate({ to: "/checkout" });
  };

  return (
    <article className="group flex flex-col overflow-hidden rounded-sm border border-border bg-card shadow-soft transition-shadow hover:shadow-lift">
      <Link
        to="/product/$productId"
        params={{ productId: product.id }}
        className="block overflow-hidden bg-secondary"
      >
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          width={816}
          height={816}
          className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </Link>

      <div className="flex flex-1 flex-col p-3 sm:p-4">
        <p className="text-[0.62rem] uppercase tracking-[0.18em] text-muted-foreground">
          {product.category}
        </p>
        <Link to="/product/$productId" params={{ productId: product.id }}>
          <h3 className="mt-1 font-display text-base leading-snug text-foreground sm:text-lg">
            {product.name}
          </h3>
        </Link>
        <p className="mt-2 font-display text-lg text-primary">{format(product.price)}</p>

        <div className="mt-3 flex flex-col gap-2 sm:mt-4">
          <button
            className="btn-base btn-outline w-full"
            onClick={() => {
              add(product.id);
              toast.success(`${product.name} added to cart`);
            }}
          >
            Add to Cart
          </button>
          <button className="btn-base btn-primary w-full" onClick={buyNow}>
            Buy Now
          </button>
        </div>
      </div>
    </article>
  );
}
