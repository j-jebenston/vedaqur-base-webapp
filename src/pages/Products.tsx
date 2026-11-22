import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, Filter, X, SlidersHorizontal } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { ProductCard } from "@/components/ProductCard";
import { ProductCardSkeleton } from "@/components/ProductCardSkeleton";
import { CATEGORIES, type Product } from "@/lib/categories";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const Products = () => {
  const [params, setParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("newest");
  const [brand, setBrand] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  const category = params.get("category") || "all";

  useEffect(() => {
    (async () => {
      setLoading(true);
      const { data } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });
      setProducts((data ?? []) as Product[]);
      setLoading(false);
    })();
  }, []);

  const brands = useMemo(
    () => Array.from(new Set(products.map((p) => p.brand))).sort(),
    [products],
  );

  const filtered = useMemo(() => {
    let list = products;
    if (category !== "all") list = list.filter((p) => p.category === category);
    if (brand !== "all") list = list.filter((p) => p.brand === brand);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.short_description.toLowerCase().includes(q),
      );
    }
    if (sort === "price-asc")
      list = [...list].sort((a, b) => Number(a.price) - Number(b.price));
    if (sort === "price-desc")
      list = [...list].sort((a, b) => Number(b.price) - Number(a.price));
    return list;
  }, [products, category, brand, search, sort]);

  const setCat = (c: string) => {
    if (c === "all") params.delete("category");
    else params.set("category", c);
    setParams(params);
  };

  const clearFilters = () => {
    setSearch("");
    setBrand("all");
    setSort("newest");
    setCat("all");
  };

  const activeFiltersCount = [
    category !== "all",
    brand !== "all",
    search.trim(),
  ].filter(Boolean).length;

  return (
    <>
      <SEO
        title="All Products — Authentic Ayurvedic Medicines"
        description="Browse Vedaqur's full catalog of AYUSH-approved ayurvedic medicines for kidney, liver, immunity, joints, hair and more."
      />

      {/* Hero Section */}
      <section className="gradient-soft py-12 md:py-16 border-b border-border">
        <div className="container">
          <h1 className="font-serif text-4xl md:text-5xl font-bold">
            Our Products
          </h1>
          <p className="text-muted-foreground mt-3 max-w-2xl text-lg">
            Authentic ayurvedic formulations sourced from licensed manufacturers
            across India.
          </p>
        </div>
      </section>

      <section className="py-8 md:py-12">
        <div className="container">
          {/* Mobile Search Bar */}
          <div className="lg:hidden mb-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search products..."
                className="w-full pl-12 pr-4 py-4 rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring text-base"
              />
            </div>
          </div>

          {/* Category Dropdown */}
          <div className="mb-6">
            <div className="relative inline-block w-full sm:w-auto">
              <Filter className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-primary" />
              <select
                id="category-filter"
                value={category}
                onChange={(e) => setCat(e.target.value)}
                className="w-full sm:w-80 pl-10 pr-10 py-3 rounded-xl border border-input bg-card text-foreground shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary appearance-none font-medium text-sm cursor-pointer transition-all hover:border-primary/40 hover:shadow-md"
              >
                <option value="all">All Health Categories</option>
                {CATEGORIES.map((c) => (
                  <option key={c.name} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>
              <SlidersHorizontal className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            </div>
            {category !== "all" && (
              <button
                onClick={() => setCat("all")}
                className="ml-3 inline-flex items-center gap-1 text-xs font-medium text-primary hover:text-primary/80 transition-colors mt-2 sm:mt-0"
              >
                <X className="h-3.5 w-3.5" /> Clear
              </button>
            )}
          </div>

          {/* Desktop Controls */}
          <div className="hidden lg:grid lg:grid-cols-3 gap-4 mb-8">
            <div className="relative lg:col-span-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <select
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="all">All Brands</option>
              {brands.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="newest">Newest First</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>

          {/* Mobile Filter Button */}
          <div className="lg:hidden flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Sheet open={showFilters} onOpenChange={setShowFilters}>
                <SheetTrigger asChild>
                  <Button variant="outline" className="relative">
                    <SlidersHorizontal className="h-4 w-4 mr-2" />
                    Filters
                    {activeFiltersCount > 0 && (
                      <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {activeFiltersCount}
                      </span>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent side="bottom" className="h-[80vh]">
                  <SheetHeader>
                    <SheetTitle>Filters</SheetTitle>
                  </SheetHeader>
                  <div className="space-y-6 mt-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Brand
                      </label>
                      <select
                        value={brand}
                        onChange={(e) => setBrand(e.target.value)}
                        className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                      >
                        <option value="all">All Brands</option>
                        {brands.map((b) => (
                          <option key={b} value={b}>
                            {b}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Sort By
                      </label>
                      <select
                        value={sort}
                        onChange={(e) => setSort(e.target.value)}
                        className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                      >
                        <option value="newest">Newest First</option>
                        <option value="price-asc">Price: Low to High</option>
                        <option value="price-desc">Price: High to Low</option>
                      </select>
                    </div>
                    <Button
                      onClick={clearFilters}
                      variant="outline"
                      className="w-full"
                    >
                      <X className="h-4 w-4 mr-2" />
                      Clear All Filters
                    </Button>
                  </div>
                </SheetContent>
              </Sheet>
              {activeFiltersCount > 0 && (
                <Button onClick={clearFilters} variant="ghost" size="sm">
                  <X className="h-4 w-4 mr-2" />
                  Clear ({activeFiltersCount})
                </Button>
              )}
            </div>
            <p className="text-sm text-muted-foreground">
              {loading
                ? "Loading..."
                : `${filtered.length} product${filtered.length !== 1 ? "s" : ""}`}
            </p>
          </div>

          {/* Desktop Results Count */}
          <p className="hidden lg:block text-sm text-muted-foreground mb-4">
            {loading
              ? "Loading..."
              : `${filtered.length} product${filtered.length !== 1 ? "s" : ""}`}
          </p>

          {/* Products Grid - Responsive */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {loading
              ? Array.from({ length: 8 }).map((_, i) => (
                  <ProductCardSkeleton key={i} />
                ))
              : filtered.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>

          {/* No Results */}
          {!loading && filtered.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="font-serif text-2xl font-bold mb-2">
                No products found
              </h3>
              <p className="text-muted-foreground mb-6">
                Try adjusting your search or filters
              </p>
              <Button onClick={clearFilters}>Clear Filters</Button>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Products;
