import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { categories, products } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Shop UK Products — Velora Élise" },
      {
        name: "description",
        content:
          "Browse chocolates, pistachios, cashews, tea, cosmetics, soaps, oils, bags, watches and phones sourced in the UK and shipped to Sri Lanka and India.",
      },
      { property: "og:title", content: "Shop UK Products — Velora Élise" },
      {
        property: "og:description",
        content: "Our full range of authentic British products with local pricing.",
      },
    ],
  }),
  component: Shop,
});

function Shop() {
  const [active, setActive] = useState<string>("All");
  const list = active === "All" ? products : products.filter((p) => p.category === active);

  return (
    <>
      <section className="bg-wine-gradient py-16 text-primary-foreground">
        <div className="mx-auto max-w-6xl px-4">
          <p className="eyebrow">The collection</p>
          <h1 className="mt-4 font-display text-4xl sm:text-5xl">Shop authentic UK products</h1>
          <p className="mt-4 max-w-2xl leading-relaxed text-primary-foreground/85">
            Chocolates, pistachios, cashews, English tea, handmade soaps, oils, cosmetics, leather
            bags, watches, phones and more — bought in Britain, packed in Dartford and delivered to
            Sri Lanka and India. Prices update automatically for your country.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="flex flex-wrap gap-2">
          {["All", ...categories].map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={`rounded-full border px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] transition-colors ${
                active === c
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card text-muted-foreground hover:border-accent hover:text-primary"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <p className="mt-6 text-xs uppercase tracking-[0.16em] text-muted-foreground">
          {list.length} products
        </p>

        <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {list.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </>
  );
}
