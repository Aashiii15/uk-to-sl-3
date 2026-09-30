import { createFileRoute, Link } from "@tanstack/react-router";
import { BadgeCheck, Boxes, HandHeart, Snowflake, Sparkles, Wallet } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Velora Élise — UK Sourcing & Safe Shipping" },
      {
        name: "description",
        content:
          "Learn how Velora Élise sources authentic UK products, handles and packs every order, and why families in Sri Lanka and India choose us.",
      },
      { property: "og:title", content: "About Velora Élise" },
      {
        property: "og:description",
        content: "Our sourcing, handling and delivery promise for authentic UK products.",
      },
    ],
  }),
  component: About,
});

const reasons = [
  {
    icon: BadgeCheck,
    title: "Authentic stock only",
    text: "Everything is bought from authorised UK retailers and brand outlets. No grey imports, no replicas, receipts kept on file.",
  },
  {
    icon: Wallet,
    title: "Transparent local pricing",
    text: "Prices switch between pounds, Sri Lankan rupees and Indian rupees so you always know the real cost before checkout.",
  },
  {
    icon: Boxes,
    title: "Anything from the UK",
    text: "Beyond our shelf, we can source almost any UK item on request — send us a link and we will quote it.",
  },
  {
    icon: HandHeart,
    title: "A personal service",
    text: "A small family team answers every message, sends photos of your parcel before dispatch and tracks it to your door.",
  },
];

const handling = [
  {
    icon: Snowflake,
    title: "Temperature-aware packing",
    text: "Chocolates and cosmetics travel in insulated liners with protective wrap so they arrive firm and unmarked.",
  },
  {
    icon: Sparkles,
    title: "Sealed and checked",
    text: "Expiry dates, batch codes and seals are photographed before packing. Electronics stay factory-sealed with warranty papers inside.",
  },
  {
    icon: Boxes,
    title: "Consolidated shipping",
    text: "Multiple items combine into one secure parcel, which keeps shipping fair and reduces the risk of loss in transit.",
  },
];

function About() {
  return (
    <>
      <section className="bg-wine-gradient py-20 text-primary-foreground">
        <div className="mx-auto max-w-6xl px-4">
          <p className="eyebrow">About us</p>
          <h1 className="mt-4 max-w-3xl font-display text-4xl sm:text-5xl">
            A UK shopping service built for families back home
          </h1>
          <p className="mt-5 max-w-2xl leading-relaxed text-primary-foreground/85">
            Velora Élise is a Dartford-based e-commerce and personal shopping service. We buy
            genuine British products, pack them with care and ship them to Sri Lanka and India —
            from a single box of chocolates to a sealed smartphone.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <p className="eyebrow">What kind of store is this?</p>
            <h2 className="mt-3 font-display text-3xl text-foreground rule-gold">
              Part curated shop, part personal shopper
            </h2>
            <div className="mt-6 space-y-4 text-sm leading-relaxed text-muted-foreground">
              <p>
                Our shelf holds the items people ask for most: British chocolates and shortbread,
                roasted pistachios and cashews, English tea, handmade soaps, hair and body oils,
                cosmetics and fragrance, leather bags, watches and unlocked phones.
              </p>
              <p>
                If what you want is not listed, we still find it. Send a link or a photo of any UK
                product and we will source it, quote the landed price and add it to your next
                parcel. That is the difference between an ordinary storefront and Velora Élise.
              </p>
              <p>
                Orders start at £30 so shipping stays worthwhile for you, and every parcel is
                tracked from our Dartford address to your door.
              </p>
            </div>
            <Link to="/shop" className="btn-base btn-primary mt-8">
              Browse the shop
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {reasons.map((r) => (
              <div key={r.title} className="rounded-sm border border-border bg-card p-5 shadow-soft">
                <r.icon className="h-6 w-6 text-accent" />
                <h3 className="mt-3 font-display text-lg text-primary">{r.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{r.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-secondary/60 py-20">
        <div className="mx-auto max-w-6xl px-4">
          <p className="eyebrow">How we handle your products</p>
          <h2 className="mt-3 font-display text-3xl text-foreground sm:text-4xl rule-gold">
            Every parcel is treated like a gift
          </h2>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {handling.map((h) => (
              <div key={h.title} className="rounded-sm border border-border bg-card p-6 shadow-soft">
                <h.icon className="h-7 w-7 text-accent" />
                <h3 className="mt-4 font-display text-xl text-primary">{h.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{h.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
