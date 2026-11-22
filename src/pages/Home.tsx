import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ShieldCheck,
  Package,
  Truck,
  Star,
  BadgeCheck,
  Leaf,
  Award,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/ProductCard";
import { ProductCardSkeleton } from "@/components/ProductCardSkeleton";
import { CATEGORIES, type Product } from "@/lib/categories";
import { SEO } from "@/components/SEO";
import heroImg from "@/assets/hero-herbs.jpg";
import toast from "react-hot-toast";
import { whatsappLink } from "@/lib/whatsapp";

const TRUST_BADGES = [
  "Drug Licensed",
  "GST Registered",
  "AYUSH Approved",
  "Startup India",
  "500+ Products",
  "Pan India Delivery",
];

const STATS = [
  { icon: Package, value: "500+", label: "Authentic Products" },
  { icon: ShieldCheck, value: "100%", label: "Licensed & Authentic" },
  { icon: Truck, value: "24hr", label: "Order Processing" },
  { icon: Award, value: "B2B", label: "Bulk Orders Welcome" },
];

const TESTIMONIALS = [
  {
    name: "Priya S.",
    city: "Mumbai",
    rating: 5,
    quote:
      "The Stone Kill capsules truly worked. My ultrasound came back clean in 3 months. Genuine ayurvedic quality.",
  },
  {
    name: "Rajesh K.",
    city: "Bengaluru",
    rating: 5,
    quote:
      "I run a small Ayurvedic clinic and source bulk from Vedaqur. Authentic, well-packed and on-time delivery every single time.",
  },
  {
    name: "Anita M.",
    city: "Delhi",
    rating: 5,
    quote:
      "Finally a trusted seller for Shilajit. The resin texture and taste tell you it's the real thing. Highly recommended!",
  },
];

const Home = () => {
  const [featured, setFeatured] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [email, setEmail] = useState("");

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from("products")
        .select("*")
        .eq("is_featured", true)
        .order("created_at", { ascending: false })
        .limit(6);
      setFeatured((data ?? []) as Product[]);
      setLoading(false);
    })();
  }, []);

  const submitFeedback = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedback.message.trim())
      return toast.error("Please share your feedback first.");
    const { error } = await supabase.from("feedback").insert({
      name: feedback.name || null,
      email: feedback.email || null,
      message: feedback.message,
    });
    if (error) return toast.error("Could not submit. Please try again.");
    toast.success("Thank you! Your feedback has been received.");
    setFeedback({ name: "", email: "", message: "" });
  };

  const subscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    const { error } = await supabase.from("subscribers").insert({ email });
    if (error) {
      if (error.code === "23505") toast.success("You're already subscribed!");
      else toast.error("Could not subscribe. Try again.");
      return;
    }
    toast.success("Subscribed! Watch your inbox for ayurvedic tips.");
    setEmail("");
  };

  return (
    <>
      <SEO
        title="Vedaqur — Authentic AYUSH Ayurvedic Medicines | Pan India Delivery"
        description="Premium AYUSH-approved Ayurvedic medicines sourced from India's most trusted manufacturers. 500+ products. Pan India delivery from Andhra Pradesh."
      />

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImg}
            alt=""
            className="h-full w-full object-cover"
            width={1920}
            height={1080}
          />
          <div className="absolute inset-0 gradient-hero" />
        </div>
        <div className="container relative z-10 py-24 md:py-36 text-primary-foreground">
          <div className="max-w-3xl animate-fade-in-up">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-foreground/15 backdrop-blur text-xs font-semibold uppercase tracking-widest mb-6 border border-primary-foreground/20">
              <Leaf className="h-3.5 w-3.5" /> Pure Roots. Proven Results.
            </span>
            <h1 className="font-serif text-5xl md:text-7xl font-bold leading-[1.05] text-balance">
              Healing the Roots Not Just the Pain
            </h1>
            <p className="mt-6 text-lg md:text-xl text-primary-foreground/90 max-w-2xl leading-relaxed">
              Authentic AYUSH-approved medicines sourced from India's most
              trusted manufacturers. Delivered across India.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button
                asChild
                size="lg"
                className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold shadow-elegant"
              >
                <Link to="/products">
                  Explore Products <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="bg-primary-foreground/10 border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground hover:text-primary-dark backdrop-blur"
              >
                <Link to="/b2b-enquiry">B2B / Bulk Enquiry</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST BAR */}
      <section className="border-y border-border bg-card">
        <div className="container py-5 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          {TRUST_BADGES.map((b) => (
            <div
              key={b}
              className="flex items-center gap-2 text-sm text-foreground/80"
            >
              <BadgeCheck className="h-4 w-4 text-primary" />
              <span className="font-medium">{b}</span>
            </div>
          ))}
        </div>
      </section>

      {/* SHOP BY CONCERN */}
      <section className="py-20 gradient-soft">
        <div className="container">
          <div className="text-center mb-14">
            <p className="text-accent font-semibold uppercase text-sm tracking-widest">
              Shop by Concern
            </p>
            <h2 className="font-serif text-4xl md:text-5xl font-bold mt-2">
              Find What Heals You
            </h2>
            <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">
              Browse our complete range by health category — every product
              backed by classical ayurvedic formulations.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {CATEGORIES.map(({ name, icon: Icon }) => (
              <Link
                key={name}
                to={`/products?category=${encodeURIComponent(name)}`}
                className="group flex flex-col items-center gap-3 p-5 rounded-2xl bg-card border border-border transition-smooth hover:border-primary/50 hover:shadow-soft hover:-translate-y-1"
              >
                <div className="h-14 w-14 rounded-full gradient-soft border border-primary/20 flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-smooth">
                  <Icon className="h-6 w-6 text-primary group-hover:text-primary-foreground transition-smooth" />
                </div>
                <span className="text-sm font-medium text-center text-foreground/80 group-hover:text-primary-dark transition-smooth">
                  {name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="py-20">
        <div className="container">
          <div className="flex items-end justify-between flex-wrap gap-4 mb-10">
            <div>
              <p className="text-accent font-semibold uppercase text-sm tracking-widest">
                Best Sellers
              </p>
              <h2 className="font-serif text-4xl md:text-5xl font-bold mt-2">
                Featured Products
              </h2>
            </div>
            <Button
              asChild
              variant="outline"
              className="border-primary/30 text-primary-dark hover:bg-primary-soft"
            >
              <Link to="/products">
                View All <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading
              ? Array.from({ length: 6 }).map((_, i) => (
                  <ProductCardSkeleton key={i} />
                ))
              : featured.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE */}
      <section className="py-20 bg-primary-dark text-primary-foreground">
        <div className="container">
          <div className="text-center mb-14">
            <p className="text-accent font-semibold uppercase text-sm tracking-widest">
              Why Vedaqur
            </p>
            <h2 className="font-serif text-4xl md:text-5xl font-bold mt-2 text-primary-foreground">
              Trusted by Thousands
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {STATS.map(({ icon: Icon, value, label }) => (
              <div
                key={label}
                className="text-center p-6 rounded-2xl bg-primary-foreground/5 border border-primary-foreground/10 backdrop-blur"
              >
                <Icon className="h-9 w-9 mx-auto text-accent mb-3" />
                <div className="font-serif text-4xl font-bold text-accent">
                  {value}
                </div>
                <div className="text-sm text-primary-foreground/80 mt-1">
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CERTIFICATIONS STRIP */}
      <section className="py-14 bg-card border-y border-border">
        <div className="container">
          <p className="text-center text-sm uppercase tracking-widest text-muted-foreground mb-6">
            Certified & Compliant
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              "Startup India",
              "GST Registered",
              "Drug License",
              "AYUSH Retail",
              "ISO 9001",
              "WHO-GMP Sourced",
            ].map((c) => (
              <div
                key={c}
                className="px-5 py-2.5 rounded-full bg-primary-soft border border-primary/20 text-primary-dark font-semibold text-sm flex items-center gap-2"
              >
                <BadgeCheck className="h-4 w-4 text-primary" /> {c}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20 gradient-soft">
        <div className="container">
          <div className="text-center mb-14">
            <p className="text-accent font-semibold uppercase text-sm tracking-widest">
              What Our Customers Say
            </p>
            <h2 className="font-serif text-4xl md:text-5xl font-bold mt-2">
              Real Stories. Real Healing.
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => {
              const initials = t.name
                .split(" ")
                .map((n) => n[0])
                .join("");
              return (
                <div
                  key={t.name}
                  className="p-7 rounded-2xl bg-card border border-border shadow-soft"
                >
                  <div className="flex gap-0.5 mb-3">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 fill-accent text-accent"
                      />
                    ))}
                  </div>
                  <p className="text-foreground/85 italic leading-relaxed mb-5">
                    "{t.quote}"
                  </p>
                  <div className="flex items-center gap-3 pt-4 border-t border-border">
                    <div className="h-10 w-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold text-sm">
                      {initials}
                    </div>
                    <div>
                      <div className="font-semibold">{t.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {t.city}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FEEDBACK + SUBSCRIBE */}
      <section className="py-20">
        <div className="container grid lg:grid-cols-2 gap-8">
          <div className="p-8 rounded-2xl bg-card border border-border shadow-soft">
            <h3 className="font-serif text-3xl font-bold">Help Us Improve</h3>
            <p className="text-muted-foreground mt-2">
              Your suggestions shape our catalog. Share anything — anonymously
              if you prefer.
            </p>
            <form onSubmit={submitFeedback} className="mt-6 space-y-3">
              <div className="grid sm:grid-cols-2 gap-3">
                <input
                  value={feedback.name}
                  onChange={(e) =>
                    setFeedback({ ...feedback, name: e.target.value })
                  }
                  placeholder="Your name (optional)"
                  className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                />
                <input
                  value={feedback.email}
                  onChange={(e) =>
                    setFeedback({ ...feedback, email: e.target.value })
                  }
                  type="email"
                  placeholder="Email (optional)"
                  className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              <textarea
                value={feedback.message}
                onChange={(e) =>
                  setFeedback({ ...feedback, message: e.target.value })
                }
                placeholder="Your suggestion or feedback *"
                rows={4}
                required
                className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <div className="flex gap-2">
                <Button type="submit" className="flex-1">
                  Submit Feedback
                </Button>
                <Button type="button" variant="outline" asChild>
                  <a
                    href={whatsappLink(
                      `Feedback from website: ${feedback.message}`,
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    via WhatsApp
                  </a>
                </Button>
              </div>
            </form>
          </div>

          <div className="p-8 rounded-2xl gradient-saffron text-accent-foreground shadow-elegant">
            <h3 className="font-serif text-3xl font-bold">
              Get Ayurvedic Health Tips
            </h3>
            <p className="mt-2 text-accent-foreground/85">
              Monthly newsletter with herbal remedies, seasonal wellness tips,
              and exclusive offers.
            </p>
            <form
              onSubmit={subscribe}
              className="mt-6 flex flex-col sm:flex-row gap-3"
            >
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                required
                placeholder="your@email.com"
                className="flex-1 px-4 py-3 rounded-lg bg-background/95 text-foreground border-0 focus:outline-none focus:ring-2 focus:ring-primary-dark"
              />
              <Button
                type="submit"
                className="bg-primary-dark hover:bg-primary-dark/90 text-primary-foreground font-semibold"
              >
                Subscribe
              </Button>
            </form>
            <p className="text-xs text-accent-foreground/70 mt-4">
              We respect your privacy. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
