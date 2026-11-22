export const ProductCardSkeleton = () => (
  <div className="rounded-2xl border border-border bg-card overflow-hidden animate-pulse">
    <div className="aspect-square bg-muted" />
    <div className="p-4 space-y-3">
      <div className="h-3 w-20 bg-muted rounded" />
      <div className="h-5 w-3/4 bg-muted rounded" />
      <div className="h-3 w-full bg-muted rounded" />
      <div className="h-3 w-2/3 bg-muted rounded" />
      <div className="h-6 w-24 bg-muted rounded mt-2" />
    </div>
  </div>
);
