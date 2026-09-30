import { createFileRoute, Link } from "@tanstack/react-router";
import { Globe2, PackageCheck, ShieldCheck, Truck } from "lucide-react";
import heroImg from "@/assets/hero.jpg";
import { products } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Velora Élise — Authentic UK Products to Sri Lanka & India" },
      {
        name: "description",
        content:
          "Shop genuine British chocolates, pistachios, cashews, tea, cosmetics, soaps, bags, watches and phones. Carefully packed in the UK and delivered to your door.",
      },
      { property: "og:title", content: "Velora Élise — Authentic UK Products" },
      {
        property: "og:description",
        content: "Genuine UK products packed in Dartford and delivered to Sri Lanka and India.",
      },
    ],
  }),
  component: Home,
});

const steps = [
  {
    icon: Globe2,
    title: "You choose from the UK",
    text: "Browse our curated shelf of British brands, or tell us the exact item you want from any UK store.",
  },
  {
    icon: PackageCheck,
    title: "We buy &amp; verify",
    text: "Every item is purchased from an authorised UK retailer, checked for authenticity and expiry, then repacked safely.",
  },
  {
    icon: Truck,
    title: "We ship to your door",
    text: "Consolidated parcels fly out weekly with tracking, customs paperwork handled and door delivery in Sri Lanka and India.",
  },
  {
    icon: ShieldCheck,
    title: "You receive it intact",
    text: "Fragile chocolates travel in insulated packing and electronics stay sealed with warranty documents inside.",
  },
];

const testimonials = [
  {
    name: "Nirosha F.",
    place: "Colombo, Sri Lanka",
    text: "My mother's birthday hamper arrived in four days and the chocolates were still perfectly firm. Velora Élise packs like a gift shop, not a courier.",
  },
  {
    name: "Arjun R.",
    place: "Chennai, India",
    text: "I ordered a watch and a handbag. Both were sealed, genuine and cheaper than buying them locally. The WhatsApp updates were brilliant.",
  },
  {
    name: "Shanika P.",
    place: "Kandy, Sri Lanka",
    text: "I now order tea, cashews and soaps every month. Prices show in rupees which makes it so easy to plan my order.",
  },
];

function Home() {
  const signature = products.slice(0, 8);

  return (
    <>
      {/* Hero */}
      <section className="relative isolate">
        <img
          src={heroImg}
          alt="Luxury UK gift parcel with chocolates, tea and perfume"
          width={1600}
          height={1008}
          className="absolute inset-0 -z-10 h-full w-full object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-wine-gradient opacity-80" />
        <div className="mx-auto max-w-6xl px-4 py-24 text-primary-foreground sm:py-32">
          <p className="eyebrow">From the United Kingdom, with care</p>
          <h1 className="mt-4 max-w-3xl font-display text-4xl leading-tight sm:text-6xl">
            Genuine British products,{" "}
            <span className="text-gold-gradient">delivered to your doorstep</span>
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-primary-foreground/85">
            Velora Élise hand-picks chocolates, nuts, tea, cosmetics, soaps, bags, watches and
            electronics in the UK and ships them safely to Sri Lanka and India.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/shop" className="btn-base btn-gold">
              Shop the collection
            </Link>
            <Link
              to="/about"
              className="btn-base border border-primary-foreground/50 text-primary-foreground hover:bg-primary-foreground/10"
            >
              How it works
            </Link>
          </div>
          <dl className="mt-12 grid max-w-2xl grid-cols-2 gap-6 sm:grid-cols-4">
            {[
              ["3", "Countries served"],
              ["100%", "Authentic UK stock"],
              ["£30", "Minimum order"],
              ["7 days", "Typical delivery"],
            ].map(([v, l]) => (
              <div key={l}>
                <dt className="font-display text-2xl text-accent">{v}</dt>
                <dd className="text-[0.7rem] uppercase tracking-[0.16em] text-primary-foreground/70">
                  {l}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* How we sell */}
      <section className="mx-auto max-w-6xl px-4 py-20">
        <p className="eyebrow">How we sell</p>
        <h2 className="mt-3 max-w-2xl font-display text-3xl text-foreground sm:text-4xl rule-gold">
          A simple four-step route from a British shelf to your home
        </h2>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <div
              key={s.title}
              className="rounded-sm border border-border bg-card p-6 shadow-soft transition-shadow hover:shadow-lift"
            >
              <s.icon className="h-7 w-7 text-accent" />
              <p className="mt-4 text-[0.65rem] tracking-[0.2em] text-muted-foreground">
                STEP 0{i + 1}
              </p>
              <h3 className="mt-1 font-display text-xl text-primary">
                {s.title.replace("&amp;", "&")}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Signature products */}
      <section className="bg-secondary/60 py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow">Signature products</p>
              <h2 className="mt-3 font-display text-3xl text-foreground sm:text-4xl">
                Our most requested UK favourites
              </h2>
            </div>
            <Link to="/shop" className="btn-base btn-outline">
              View all products
            </Link>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {signature.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="mx-auto max-w-6xl px-4 py-20">
        <p className="eyebrow">Testimonials</p>
        <h2 className="mt-3 font-display text-3xl text-foreground sm:text-4xl rule-gold">
          Families who trust us with their parcels
        </h2>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {testimonials.map((t) => (
            <figure
              key={t.name}
              className="flex h-full flex-col rounded-sm border border-border bg-card p-6 shadow-soft"
            >
              <div className="text-accent">★★★★★</div>
              <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">
                "{t.text}"
              </blockquote>
              <figcaption className="mt-5 border-t border-border pt-4">
                <span className="block font-display text-lg text-primary">{t.name}</span>
                <span className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
                  {t.place}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>
    </>
  );
}
