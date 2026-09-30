import { Link } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";
const logo = { url: "/velora-logo.jpg" };

export function Footer() {
  return (
    <footer className="mt-20 bg-wine-gradient text-primary-foreground">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <img
            src={logo.url}
            alt="Velora Élise"
            className="h-16 w-16 rounded-full object-cover"
            loading="lazy"
          />
          <h3 className="mt-4 font-display text-2xl">Velora Élise</h3>
          <p className="mt-3 text-sm leading-relaxed text-primary-foreground/75">
            We source genuine British products — chocolates, nuts, tea, cosmetics, bags, watches and
            electronics — and deliver them safely from the UK to Sri Lanka and India.
          </p>
        </div>

        <div>
          <h4 className="eyebrow">Quick Links</h4>
          <ul className="mt-4 space-y-2 text-sm">
            {[
              { to: "/", label: "Home" },
              { to: "/about", label: "About Us" },
              { to: "/shop", label: "Shop" },
              { to: "/cart", label: "Cart" },
              { to: "/checkout", label: "Checkout" },
              { to: "/contact", label: "Contact" },
            ].map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  className="text-primary-foreground/75 transition-colors hover:text-accent"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="eyebrow">Categories</h4>
          <ul className="mt-4 space-y-2 text-sm text-primary-foreground/75">
            <li>Chocolates &amp; Biscuits</li>
            <li>Nuts &amp; Snacks</li>
            <li>Tea &amp; Pantry</li>
            <li>Cosmetics &amp; Fragrance</li>
            <li>Bags, Watches &amp; Electronics</li>
          </ul>
        </div>

        <div>
          <h4 className="eyebrow">Contact</h4>
          <ul className="mt-4 space-y-3 text-sm text-primary-foreground/75">
            <li className="flex gap-3">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
              <a href="tel:+447587414396" className="hover:text-accent">
                +44 7587 414396
              </a>
            </li>
            <li className="flex gap-3">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
              <a href="mailto:veloraelise@gmail.com" className="break-all hover:text-accent">
                veloraelise@gmail.com
              </a>
            </li>
            <li className="flex gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
              <span>
                11, Marsh Street North
                <br />
                Dartford, DA1 5WF
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-primary-foreground/15 px-4 py-5 text-center text-xs text-primary-foreground/60">
        © {new Date().getFullYear()} Velora Élise. All rights reserved.
      </div>
    </footer>
  );
}
