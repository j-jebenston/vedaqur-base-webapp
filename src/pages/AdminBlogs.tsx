import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Plus, Pencil, Trash2, X } from "lucide-react";
import { type Blog } from "@/lib/categories";
import toast from "react-hot-toast";

const blank = { title: "", slug: "", category: "Wellness", content: "", cover_image_url: "", meta_description: "", is_published: false };

const AdminBlogs = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [editing, setEditing] = useState<Partial<Blog> | null>(null);

  const load = async () => {
    const { data } = await supabase.from("blogs").select("*").order("created_at", { ascending: false });
    setBlogs((data ?? []) as Blog[]);
  };
  useEffect(() => { load(); }, []);

  const save = async () => {
    if (!editing) return;
    const slug = (editing.slug || editing.title?.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")) ?? "";
    const payload = { ...editing, slug };
    const res = editing.id
      ? await supabase.from("blogs").update(payload as never).eq("id", editing.id)
      : await supabase.from("blogs").insert(payload as never);
    if (res.error) return toast.error(res.error.message);
    toast.success("Saved"); setEditing(null); load();
  };

  const remove = async (id: string) => {
    if (!confirm("Delete?")) return;
    await supabase.from("blogs").delete().eq("id", id);
    toast.success("Deleted"); load();
  };

  return (
    <div>
      <div className="flex justify-between mb-6">
        <h1 className="font-serif text-3xl font-bold">Blog Posts</h1>
        <Button onClick={() => setEditing({ ...blank })}><Plus className="h-4 w-4 mr-1" /> New Post</Button>
      </div>
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted/50 text-left"><tr><th className="p-3">Title</th><th className="p-3">Category</th><th className="p-3">Date</th><th className="p-3">Status</th><th className="p-3 text-right">Actions</th></tr></thead>
          <tbody>
            {blogs.map((b) => (
              <tr key={b.id} className="border-t border-border">
                <td className="p-3 font-medium">{b.title}</td>
                <td className="p-3 text-muted-foreground">{b.category}</td>
                <td className="p-3 text-muted-foreground">{new Date(b.created_at).toLocaleDateString()}</td>
                <td className="p-3"><span className={b.is_published ? "text-primary" : "text-muted-foreground"}>{b.is_published ? "Published" : "Draft"}</span></td>
                <td className="p-3 text-right">
                  <Button size="sm" variant="ghost" onClick={() => setEditing(b)}><Pencil className="h-3 w-3" /></Button>
                  <Button size="sm" variant="ghost" onClick={() => remove(b.id)}><Trash2 className="h-3 w-3 text-destructive" /></Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editing && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-start justify-center overflow-y-auto p-4">
          <div className="bg-card rounded-2xl max-w-2xl w-full my-8 shadow-elegant">
            <div className="p-5 border-b border-border flex justify-between items-center">
              <h2 className="font-serif text-2xl font-bold">{editing.id ? "Edit" : "New"} Post</h2>
              <Button variant="ghost" size="sm" onClick={() => setEditing(null)}><X className="h-4 w-4" /></Button>
            </div>
            <div className="p-5 space-y-3 max-h-[70vh] overflow-y-auto">
              <Inp label="Title *" value={editing.title ?? ""} onChange={(v) => setEditing({ ...editing, title: v })} />
              <Inp label="Slug (auto from title if blank)" value={editing.slug ?? ""} onChange={(v) => setEditing({ ...editing, slug: v })} />
              <Inp label="Category" value={editing.category ?? ""} onChange={(v) => setEditing({ ...editing, category: v })} />
              <Inp label="Cover Image URL" value={editing.cover_image_url ?? ""} onChange={(v) => setEditing({ ...editing, cover_image_url: v })} />
              <Area label="Meta Description" value={editing.meta_description ?? ""} onChange={(v) => setEditing({ ...editing, meta_description: v })} />
              <Area label="Content (use ## for headings, ** for bold, - for lists)" rows={10} value={editing.content ?? ""} onChange={(v) => setEditing({ ...editing, content: v })} />
              <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={editing.is_published ?? false} onChange={(e) => setEditing({ ...editing, is_published: e.target.checked })} /> Published</label>
            </div>
            <div className="p-5 border-t border-border flex justify-end gap-2">
              <Button variant="outline" onClick={() => setEditing(null)}>Cancel</Button>
              <Button onClick={save}>Save</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const Inp = ({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) => (
  <div><label className="block text-xs font-medium mb-1">{label}</label><input value={value} onChange={(e) => onChange(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-input bg-background text-sm" /></div>
);
const Area = ({ label, value, onChange, rows = 2 }: { label: string; value: string; onChange: (v: string) => void; rows?: number }) => (
  <div><label className="block text-xs font-medium mb-1">{label}</label><textarea rows={rows} value={value} onChange={(e) => onChange(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-input bg-background text-sm" /></div>
);

export default AdminBlogs;
