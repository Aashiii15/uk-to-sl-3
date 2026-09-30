import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Velora Élise — UK Sourcing Enquiries" },
      {
        name: "description",
        content:
          "Call +44 7587 414396, email veloraelise@gmail.com or message us to source any UK product for delivery to Sri Lanka and India.",
      },
      { property: "og:title", content: "Contact Velora Élise" },
      {
        property: "og:description",
        content: "Phone, email and address for Velora Élise in Dartford, UK.",
      },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [sent, setSent] = useState(false);

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSent(true);
    e.currentTarget.reset();
    toast.success("Thank you — we'll reply within 24 hours.");
  };

  return (
    <>
      <section className="bg-wine-gradient py-16 text-primary-foreground">
        <div className="mx-auto max-w-6xl px-4">
          <p className="eyebrow">Get in touch</p>
          <h1 className="mt-4 font-display text-4xl sm:text-5xl">We'd love to hear from you</h1>
          <p className="mt-4 max-w-2xl leading-relaxed text-primary-foreground/85">
            Questions about an order, shipping times, or a UK product you cannot find on our shop?
            Send us a message and a member of our Dartford team will reply within 24 hours.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr]">
          <form onSubmit={submit} className="rounded-sm border border-border bg-card p-6 shadow-soft">
            <h2 className="font-display text-2xl text-primary">Send a message</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <label className="text-sm">
                <span className="mb-1 block text-muted-foreground">Your name</span>
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
                <span className="mb-1 block text-muted-foreground">Subject</span>
                <input required className="field" name="subject" />
              </label>
              <label className="text-sm sm:col-span-2">
                <span className="mb-1 block text-muted-foreground">Message</span>
                <textarea required rows={5} className="field" name="message" />
              </label>
            </div>
            <button type="submit" className="btn-base btn-primary mt-6">
              Send message
            </button>
            {sent && (
              <p className="mt-4 text-sm text-primary">
                Thank you — your message has been recorded and we will reply shortly.
              </p>
            )}
          </form>

          <div className="space-y-4">
            {[
              {
                icon: Phone,
                title: "Phone & WhatsApp",
                lines: ["+44 7587 414396"],
                href: "tel:+447587414396",
              },
              {
                icon: Mail,
                title: "Email",
                lines: ["veloraelise@gmail.com"],
                href: "mailto:veloraelise@gmail.com",
              },
              {
                icon: MapPin,
                title: "Location",
                lines: ["11, Marsh Street North", "Dartford, DA1 5WF", "United Kingdom"],
              },
              {
                icon: Clock,
                title: "Opening hours",
                lines: ["Mon – Sat, 9:00am – 7:00pm (UK time)"],
              },
            ].map((c) => (
              <div key={c.title} className="rounded-sm border border-border bg-card p-5 shadow-soft">
                <c.icon className="h-6 w-6 text-accent" />
                <h3 className="mt-3 font-display text-lg text-primary">{c.title}</h3>
                <div className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  {c.href ? (
                    <a href={c.href} className="hover:text-primary">
                      {c.lines[0]}
                    </a>
                  ) : (
                    c.lines.map((l) => <div key={l}>{l}</div>)
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
