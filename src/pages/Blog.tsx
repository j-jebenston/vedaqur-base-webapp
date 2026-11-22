import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Calendar, ArrowRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { type Blog } from "@/lib/categories";
import { SEO } from "@/components/SEO";

const Blog = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from("blogs")
        .select("*")
        .eq("is_published", true)
        .order("created_at", { ascending: false });
      setBlogs((data ?? []) as Blog[]);
      setLoading(false);
    })();
  }, []);

  return (
    <>
      <SEO title="Ayurvedic Wellness Blog" description="Articles on ayurvedic herbs, immunity, digestion, stress and natural healing — from the Vedaqur team." />

      <section className="gradient-soft py-16 border-b border-border">
        <div className="container">
          <h1 className="font-serif text-5xl font-bold">Ayurvedic Wellness Journal</h1>
          <p className="text-muted-foreground mt-2 max-w-2xl">Tips, herbs, and ancient wisdom — translated for modern life.</p>
        </div>
      </section>

      <section className="container py-12">
        {loading ? (
          <p className="text-center text-muted-foreground">Loading articles...</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map((b) => (
              <Link key={b.id} to={`/blog/${b.slug}`} className="group rounded-2xl bg-card border border-border overflow-hidden transition-smooth hover:shadow-elegant hover:-translate-y-1 hover:border-primary/40 flex flex-col">
                <div className="aspect-[16/10] gradient-soft flex items-center justify-center border-b border-border">
                  {b.cover_image_url ? (
                    <img src={b.cover_image_url} alt={b.title} className="h-full w-full object-cover" />
                  ) : (
                    <span className="font-serif text-6xl text-primary/30">{b.title.charAt(0)}</span>
                  )}
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <span className="text-xs uppercase font-semibold text-accent tracking-widest">{b.category}</span>
                  <h2 className="font-serif text-2xl font-bold mt-2 group-hover:text-primary-dark transition-smooth">{b.title}</h2>
                  <p className="text-sm text-muted-foreground mt-2 line-clamp-3 flex-1">{b.meta_description}</p>
                  <div className="flex items-center justify-between pt-4 mt-4 border-t border-border">
                    <span className="text-xs text-muted-foreground inline-flex items-center gap-1">
                      <Calendar className="h-3 w-3" /> {new Date(b.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                    </span>
                    <span className="text-sm font-semibold text-primary inline-flex items-center gap-1 group-hover:text-accent transition-smooth">
                      Read <ArrowRight className="h-3 w-3" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </>
  );
};

export default Blog;
