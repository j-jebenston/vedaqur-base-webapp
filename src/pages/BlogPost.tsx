import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Calendar, ChevronLeft } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { type Blog } from "@/lib/categories";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";

const renderContent = (content: string) =>
  content.split(/\n+/).map((line, i) => {
    if (line.startsWith("## ")) return <h2 key={i} className="font-serif text-3xl font-bold mt-8 mb-3">{line.slice(3)}</h2>;
    if (line.startsWith("- ")) return <li key={i} className="ml-5 list-disc">{line.slice(2)}</li>;
    return <p key={i} className="text-foreground/85 leading-relaxed mb-4" dangerouslySetInnerHTML={{ __html: line.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>") }} />;
  });

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    (async () => {
      const { data } = await supabase.from("blogs").select("*").eq("slug", slug).maybeSingle();
      setBlog(data as Blog | null);
      setLoading(false);
    })();
  }, [slug]);

  if (loading) return <div className="container py-20 text-center text-muted-foreground">Loading...</div>;
  if (!blog) return (
    <div className="container py-20 text-center">
      <h1 className="font-serif text-3xl font-bold">Article not found</h1>
      <Button asChild className="mt-6"><Link to="/blog">Back to Blog</Link></Button>
    </div>
  );

  return (
    <>
      <SEO title={blog.title} description={blog.meta_description ?? undefined} />

      <article className="container max-w-3xl py-12">
        <Button asChild variant="ghost" size="sm" className="mb-6"><Link to="/blog"><ChevronLeft className="h-4 w-4 mr-1" /> All articles</Link></Button>

        <span className="text-xs uppercase font-semibold text-accent tracking-widest">{blog.category}</span>
        <h1 className="font-serif text-4xl md:text-5xl font-bold mt-3">{blog.title}</h1>
        <div className="flex items-center gap-2 text-sm text-muted-foreground mt-4">
          <Calendar className="h-4 w-4" />
          {new Date(blog.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
        </div>

        {blog.cover_image_url && (
          <img src={blog.cover_image_url} alt={blog.title} className="w-full rounded-2xl mt-8 aspect-[16/9] object-cover" />
        )}

        <div className="mt-8 prose prose-lg max-w-none">
          {renderContent(blog.content)}
        </div>
      </article>
    </>
  );
};

export default BlogPost;
