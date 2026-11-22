import { Link } from "react-router-dom";
import { Sparkles } from "lucide-react";
import type { Product } from "@/lib/categories";
import { getDiscountedPrice, getDisplayDiscount } from "@/lib/categories";
import { Badge } from "./ui/badge";

const productPlaceholder = (name: string) => {
  // Soft herbal gradient placeholder using initials
  const initial = name.charAt(0).toUpperCase();
  return (
    <div className="aspect-square w-full bg-gradient-to-br from-primary-soft via-background to-accent/10 flex items-center justify-center">
      <span className="font-serif text-7xl text-primary/40">{initial}</span>
    </div>
  );
};

export const ProductCard = ({ product }: { product: Product }) => {
  const isNew = (Date.now() - new Date(product.created_at).getTime()) < 30 * 24 * 60 * 60 * 1000;
  const img = product.images?.[0];
  const discountedPrice = getDiscountedPrice(product);
  const displayDiscount = getDisplayDiscount(product);
  const hasDiscount = displayDiscount > 0;

  return (
    <Link
      to={`/products/${product.id}`}
      className="group relative flex flex-col overflow-hidden rounded-2xl bg-card border border-border transition-smooth hover:shadow-elegant hover:border-primary/40 hover:-translate-y-1"
    >
      <div className="relative overflow-hidden">
        {img ? (
          <img src={img} alt={product.name} loading="lazy" className="aspect-square w-full object-cover transition-smooth group-hover:scale-105" />
        ) : productPlaceholder(product.name)}
        <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-background/90 backdrop-blur text-primary-dark border border-primary/20">
          {product.brand}
        </span>
        {/* Top-right badge: discount takes priority, then "New" */}
        {hasDiscount ? (
          <span className="absolute top-3 right-3 inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-red-500 text-white shadow">
            {displayDiscount}% OFF
          </span>
        ) : isNew ? (
          <span className="absolute top-3 right-3 inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-accent text-accent-foreground">
            <Sparkles className="h-3 w-3" /> New
          </span>
        ) : null}
        {!product.in_stock && (
          <div className="absolute inset-0 bg-background/60 backdrop-blur-sm flex items-center justify-center">
            <span className="px-4 py-1.5 rounded-full bg-foreground text-background text-sm font-semibold">Out of Stock</span>
          </div>
        )}
      </div>
      <div className="p-4 flex flex-col flex-1 gap-2">
        <Badge variant="secondary" className="self-start text-[10px] bg-primary-soft text-primary-dark hover:bg-primary-soft">
          {product.category}
        </Badge>
        <h3 className="font-serif text-xl font-semibold text-foreground line-clamp-1">{product.name}</h3>
        <p className="text-sm text-muted-foreground line-clamp-2 flex-1">{product.short_description}</p>
        <div className="flex items-center justify-between pt-2 mt-auto">
          {hasDiscount ? (
            <div className="flex items-baseline gap-2 flex-wrap">
              <span className="text-xl font-bold text-primary-dark">
                ₹{discountedPrice.toLocaleString("en-IN")}
              </span>
              <span className="text-sm text-muted-foreground line-through">
                ₹{Number(product.price).toLocaleString("en-IN")}
              </span>
            </div>
          ) : (
            <span className="text-xl font-bold text-primary-dark">
              ₹{Number(product.price).toLocaleString("en-IN")}
            </span>
          )}
          <span className="text-sm font-semibold text-primary group-hover:text-accent transition-smooth">View →</span>
        </div>
      </div>
    </Link>
  );
};
