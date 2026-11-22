import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Phone,
  Mail,
  MessageCircle,
  ChevronLeft,
  Check,
  Share2,
  Copy,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { type Product } from "@/lib/categories";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ProductCard } from "@/components/ProductCard";
import { SEO } from "@/components/SEO";
import {
  ADMIN_EMAIL,
  ADMIN_PHONE_DISPLAY,
  productOrderLink,
  whatsappLink,
} from "@/lib/whatsapp";
import toast from "react-hot-toast";

// Helper function to convert Google Drive link to embeddable format
const getGoogleDriveEmbedUrl = (url: string) => {
  const fileIdMatch = url.match(/\/d\/([a-zA-Z0-9-_]+)/);
  if (fileIdMatch) {
    return `https://drive.google.com/file/d/${fileIdMatch[1]}/preview`;
  }
  return null;
};

// Helper to detect if it's a Google Drive link
const isGoogleDriveLink = (url: string) => {
  return url.includes("drive.google.com") || url.includes("docs.google.com");
};

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [related, setRelated] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeImg, setActiveImg] = useState(0);

  useEffect(() => {
    if (!id) return;
    (async () => {
      setLoading(true);
      const { data } = await supabase
        .from("products")
        .select("*")
        .eq("id", id)
        .maybeSingle();
      setProduct(data as Product | null);
      if (data) {
        const { data: rel } = await supabase
          .from("products")
          .select("*")
          .eq("category", data.category)
          .neq("id", id)
          .limit(3);
        setRelated((rel ?? []) as Product[]);
      }
      setLoading(false);
      setActiveImg(0);
    })();
  }, [id]);

  if (loading) {
    return (
      <div className="container py-20 text-center text-muted-foreground">
        Loading product...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container py-20 text-center">
        <h1 className="font-serif text-3xl font-bold">Product not found</h1>
        <Button asChild className="mt-6">
          <Link to="/products">Back to Products</Link>
        </Button>
      </div>
    );
  }

  const images = product.images?.length ? product.images : [];

  // Create slides array combining images and video
  const slides = [
    ...images.map((img) => ({ type: "image" as const, src: img })),
    ...(product.video_url
      ? [{ type: "video" as const, src: product.video_url }]
      : []),
  ];

  const orderMsg = `Hi Vedaqur, I'm interested in ordering *${product.name}* (₹${product.price}). Please share availability and delivery details.`;

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Link copied!");
  };

  return (
    <>
      <SEO
        title={`${product.name} — ${product.brand}`}
        description={product.short_description}
      />

      <div className="container py-6 text-sm text-muted-foreground">
        <Link to="/" className="hover:text-primary">
          Home
        </Link>{" "}
        /{" "}
        <Link to="/products" className="hover:text-primary">
          Products
        </Link>{" "}
        / <span className="text-foreground">{product.name}</span>
      </div>

      <section className="container pb-12 grid lg:grid-cols-2 gap-10">
        {/* Image/Video gallery */}
        <div className="space-y-3">
          <div className="aspect-square w-full overflow-hidden rounded-2xl bg-gradient-to-br from-primary-soft to-background border border-border flex items-center justify-center">
            {slides.length > 0 ? (
              slides[activeImg]?.type === "image" ? (
                <img
                  src={slides[activeImg].src}
                  alt={product.name}
                  className="h-full w-full object-cover"
                />
              ) : isGoogleDriveLink(slides[activeImg].src) ? (
                <iframe
                  src={getGoogleDriveEmbedUrl(slides[activeImg].src) || ""}
                  className="h-full w-full border-0"
                  allow="autoplay"
                  title="Product Video"
                />
              ) : (
                <video
                  controls
                  className="h-full w-full"
                  src={slides[activeImg].src}
                />
              )
            ) : (
              <span className="font-serif text-9xl text-primary/30">
                {product.name.charAt(0)}
              </span>
            )}
          </div>
          {slides.length > 1 && (
            <div className="grid grid-cols-5 gap-2">
              {slides.map((slide, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImg(i)}
                  className={`aspect-square rounded-lg overflow-hidden border-2 transition-smooth flex items-center justify-center bg-muted ${i === activeImg ? "border-primary" : "border-border hover:border-primary/50"}`}
                >
                  {slide.type === "image" ? (
                    <img
                      src={slide.src}
                      alt=""
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <span className="text-xs font-semibold text-foreground">
                      ▶ Video
                    </span>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <Badge className="bg-primary-soft text-primary-dark hover:bg-primary-soft">
              {product.brand}
            </Badge>
            <Badge variant="outline">{product.category}</Badge>
            {product.in_stock ? (
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-primary">
                <Check className="h-3 w-3" /> In Stock
              </span>
            ) : (
              <span className="text-xs font-semibold text-destructive">
                Out of Stock
              </span>
            )}
          </div>

          <h1 className="font-serif text-4xl md:text-5xl font-bold leading-tight">
            {product.name}
          </h1>
          <p className="text-muted-foreground mt-3 text-lg leading-relaxed">
            {product.short_description}
          </p>

          <div className="mt-5 flex items-baseline gap-3">
            <span className="font-serif text-4xl font-bold text-primary-dark">
              ₹{Number(product.price).toLocaleString("en-IN")}
            </span>
            <span className="text-sm text-muted-foreground">
              incl. all taxes
            </span>
          </div>

          {product.available_forms?.length > 0 && (
            <div className="mt-5">
              <p className="text-sm font-semibold mb-2">Available as</p>
              <div className="flex flex-wrap gap-2">
                {product.available_forms.map((f) => (
                  <span
                    key={f}
                    className="px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-xs font-semibold"
                  >
                    {f}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Order box */}
          <div className="mt-7 p-6 rounded-2xl bg-primary-soft border border-primary/20">
            <h3 className="font-serif text-2xl font-bold text-primary-dark">
              Interested? Contact us to order
            </h3>
            <p className="text-sm text-foreground/70 mt-1">
              We'll confirm availability and arrange delivery anywhere in India.
            </p>
            <div className="mt-4 grid sm:grid-cols-3 gap-2">
              <Button
                asChild
                size="lg"
                className="bg-[#25D366] hover:bg-[#1ebe5a] text-white font-semibold"
              >
                <a
                  href={productOrderLink(product.name, Number(product.price))}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="h-4 w-4 mr-1" /> WhatsApp
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-primary/40"
              >
                <a href={`tel:${ADMIN_PHONE_DISPLAY.replace(/\s/g, "")}`}>
                  <Phone className="h-4 w-4 mr-1" /> Call
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-primary/40"
              >
                <a
                  href={`mailto:${ADMIN_EMAIL}?subject=Order: ${product.name}`}
                >
                  <Mail className="h-4 w-4 mr-1" /> Email
                </a>
              </Button>
            </div>
          </div>

          {/* Share */}
          <div className="mt-5 flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Share:</span>
            <Button size="sm" variant="ghost" onClick={copyLink}>
              <Copy className="h-4 w-4 mr-1" /> Copy link
            </Button>
            <Button size="sm" variant="ghost" asChild>
              <a
                href={whatsappLink(
                  `Check out ${product.name} on Vedaqur: ${window.location.href}`,
                )}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Share2 className="h-4 w-4 mr-1" /> WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Description sections */}
      <section className="container pb-16 grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div>
            <h2 className="font-serif text-3xl font-bold mb-3">
              About this medicine
            </h2>
            <p className="text-foreground/80 leading-relaxed whitespace-pre-line">
              {product.full_description}
            </p>
          </div>

          {product.key_benefits?.length > 0 && (
            <div>
              <h2 className="font-serif text-3xl font-bold mb-3">
                Key Benefits
              </h2>
              <ul className="space-y-2">
                {product.key_benefits.map((b, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="mt-1 h-5 w-5 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs shrink-0">
                      <Check className="h-3 w-3" />
                    </span>
                    <span className="text-foreground/80">{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <aside className="space-y-6">
          {product.ingredients && (
            <div className="p-5 rounded-2xl bg-card border border-border">
              <h3 className="font-serif text-xl font-bold mb-2">Ingredients</h3>
              <p className="text-sm text-foreground/80 leading-relaxed">
                {product.ingredients}
              </p>
            </div>
          )}
          {product.dosage && (
            <div className="p-5 rounded-2xl bg-card border border-border">
              <h3 className="font-serif text-xl font-bold mb-2">
                Dosage & Usage
              </h3>
              <p className="text-sm text-foreground/80 leading-relaxed">
                {product.dosage}
              </p>
            </div>
          )}
          <div className="p-5 rounded-2xl gradient-saffron text-accent-foreground">
            <h3 className="font-serif text-xl font-bold">
              Authenticity Promise
            </h3>
            <p className="text-sm mt-1 text-accent-foreground/85">
              Every product sourced from AYUSH-licensed manufacturers. Drug
              License verified.
            </p>
          </div>
        </aside>
      </section>

      {related.length > 0 && (
        <section className="container pb-20">
          <h2 className="font-serif text-3xl font-bold mb-6">
            Related Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      <div className="container pb-12">
        <Button asChild variant="ghost">
          <Link to="/products">
            <ChevronLeft className="h-4 w-4 mr-1" /> Back to all products
          </Link>
        </Button>
      </div>
    </>
  );
};

export default ProductDetail;
