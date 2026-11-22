import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Menu, X, Search } from "lucide-react";
import { Logo } from "./Logo";
import { Button } from "./ui/button";
import { whatsappLink } from "@/lib/whatsapp";

const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/products", label: "Products" },
  { to: "/about", label: "About" },
  { to: "/certifications", label: "Certifications" },
  { to: "/blog", label: "Blog" },
  { to: "/b2b-enquiry", label: "B2B Enquiry" },
  { to: "/contact", label: "Contact" },
];

export const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [location]);

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-smooth ${
        scrolled ? "bg-background/95 backdrop-blur-md shadow-soft border-b border-border" : "bg-background/80 backdrop-blur-sm"
      }`}
    >
      <div className="container flex items-center justify-between py-3">
        <Logo compact={scrolled} />

        <nav className="hidden lg:flex items-center gap-1">
          {NAV_LINKS.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === "/"}
              className={({ isActive }) =>
                `px-3 py-2 text-sm font-medium rounded-md transition-smooth ${
                  isActive ? "text-primary bg-primary-soft" : "text-foreground/80 hover:text-primary hover:bg-primary-soft/50"
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-2">
          <Button asChild size="sm" className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold">
            <a href={whatsappLink("Hi Vedaqur, I'd like to place an order.")} target="_blank" rel="noopener noreferrer">
              Order on WhatsApp
            </a>
          </Button>
        </div>

        <button
          className="lg:hidden p-2 rounded-md hover:bg-primary-soft transition-smooth"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile drawer */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 bg-background border-t border-border ${
          open ? "max-h-[80vh]" : "max-h-0"
        }`}
      >
        <div className="container py-4 flex flex-col gap-1">
          {NAV_LINKS.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === "/"}
              className={({ isActive }) =>
                `px-4 py-3 rounded-md font-medium transition-smooth ${
                  isActive ? "text-primary bg-primary-soft" : "text-foreground hover:bg-primary-soft/50"
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
          <Button asChild className="mt-3 bg-accent hover:bg-accent/90 text-accent-foreground font-semibold">
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer">
              Order on WhatsApp
            </a>
          </Button>
        </div>
      </div>
    </header>
  );
};
