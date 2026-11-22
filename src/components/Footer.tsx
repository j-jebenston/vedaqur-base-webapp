import { Link } from "react-router-dom";
import {
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  Instagram,
  Facebook,
} from "lucide-react";
import { Logo } from "./Logo";
import { ADMIN_PHONE_DISPLAY, ADMIN_EMAIL, whatsappLink } from "@/lib/whatsapp";

export const Footer = () => (
  <footer className="bg-primary-dark text-primary-foreground mt-20">
    <div className="container py-14 grid gap-10 md:grid-cols-4">
      <div className="space-y-4">
        <div className="bg-background rounded-lg p-3 inline-block">
          <Logo compact />
        </div>
        <p className="text-sm text-primary-foreground/80 leading-relaxed">
          Pure Roots. Proven Results. Authentic AYUSH-approved Ayurvedic
          medicines, sourced from India's most trusted manufacturers.
        </p>
      </div>

      <div>
        <h4 className="font-serif text-xl mb-4">Quick Links</h4>
        <ul className="space-y-2 text-sm text-primary-foreground/80">
          {[
            ["Home", "/"],
            ["Products", "/products"],
            ["About", "/about"],
            ["Certifications", "/certifications"],
            ["Blog", "/blog"],
            ["B2B Enquiry", "/b2b-enquiry"],
            ["Contact", "/contact"],
          ].map(([label, to]) => (
            <li key={to}>
              <Link to={to} className="hover:text-accent transition-smooth">
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h4 className="font-serif text-xl mb-4">Get in Touch</h4>
        <ul className="space-y-3 text-sm text-primary-foreground/80">
          <li className="flex gap-2">
            <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-accent" />{" "}
            Naidupeta, Tirupati, Andhra Pradesh, India
          </li>
          <li className="flex gap-2">
            <Phone className="h-4 w-4 mt-0.5 shrink-0 text-accent" />{" "}
            {ADMIN_PHONE_DISPLAY}
          </li>
          <li className="flex gap-2">
            <Mail className="h-4 w-4 mt-0.5 shrink-0 text-accent" />{" "}
            {ADMIN_EMAIL}
          </li>
          <li>
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 hover:text-accent transition-smooth"
            >
              <MessageCircle className="h-4 w-4 text-accent" /> Chat on WhatsApp
            </a>
          </li>
        </ul>
      </div>

      <div>
        <h4 className="font-serif text-xl mb-4">Certified & Licensed</h4>
        <div className="flex flex-wrap gap-2 text-xs">
          {[
            "Startup India",
            "GST",
            "Drug License",
            "AYUSH",
            "ISO 9001",
            "WHO-GMP",
          ].map((c) => (
            <span
              key={c}
              className="px-3 py-1 rounded-full bg-primary-foreground/10 border border-primary-foreground/20"
            >
              {c}
            </span>
          ))}
        </div>
        {/* <p className="text-xs text-primary-foreground/60 mt-4">Drug License No: KA-XXXX-XXXXX</p> */}
        <div className="flex gap-3 mt-4">
          <a
            href="#"
            aria-label="Instagram"
            className="p-2 rounded-full bg-primary-foreground/10 hover:bg-accent hover:text-accent-foreground transition-smooth"
          >
            <Instagram className="h-4 w-4" />
          </a>
          <a
            href="#"
            aria-label="Facebook"
            className="p-2 rounded-full bg-primary-foreground/10 hover:bg-accent hover:text-accent-foreground transition-smooth"
          >
            <Facebook className="h-4 w-4" />
          </a>
        </div>
      </div>
    </div>

    <div className="border-t border-primary-foreground/10">
      <div className="container py-5 flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-primary-foreground/60">
        <p>© {new Date().getFullYear()} Vedaqur. All rights reserved.</p>
        <p>Pure Roots. Proven Results.</p>
      </div>
    </div>
  </footer>
);
