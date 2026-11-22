import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Plus, Pencil, Trash2, Star, X } from "lucide-react";
import { CATEGORIES, type Product } from "@/lib/categories";
import toast from "react-hot-toast";

const blank = {
  name: "",
  brand: "",
  category: CATEGORIES[0].name,
  price: 0,
  short_description: "",
  full_description: "",
  key_benefits: [] as string[],
  ingredients: "",
  dosage: "",
  available_forms: [] as string[],
  video_url: "",
  is_featured: false,
  in_stock: true,
};

const FORMS = ["Tablet", "Syrup", "Powder", "Capsule", "Oil", "Other"];

const AdminProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [editing, setEditing] = useState<Partial<Product> | null>(null);
  const [benefitText, setBenefitText] = useState("");
  const [imageFiles, setImageFiles] = useState<File[]>([]);

  const load = async () => {
    const { data } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });
    setProducts((data ?? []) as Product[]);
  };
  useEffect(() => {
    load();
  }, []);

  const open = (p?: Product) => {
    setBenefitText("");
    setImageFiles([]);
    setEditing(p ? { ...p } : { ...blank });
  };

  const save = async () => {
    if (!editing) return;
    let images = editing.images ?? [];

    // Upload all selected image files
    for (const imageFile of imageFiles) {
      const path = `${Date.now()}-${Math.random()}-${imageFile.name}`;
      const { error: upErr } = await supabase.storage
        .from("product-media")
        .upload(path, imageFile);
      if (upErr) {
        toast.error(`Image upload failed: ${imageFile.name}`);
        continue;
      }
      const { data: pub } = supabase.storage
        .from("product-media")
        .getPublicUrl(path);
      images = [pub.publicUrl, ...images];
    }

    const payload = { ...editing, images };
    let res;
    if (editing.id)
      res = await supabase
        .from("products")
        .update(payload as never)
        .eq("id", editing.id);
    else res = await supabase.from("products").insert(payload as never);
    if (res.error) return toast.error(res.error.message);
    toast.success("Saved");
    setEditing(null);
    load();
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this product?")) return;
    const { error } = await supabase.from("products").delete().eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("Deleted");
    load();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-serif text-3xl font-bold">
          Products ({products.length})
        </h1>
        <Button onClick={() => open()}>
          <Plus className="h-4 w-4 mr-1" /> New Product
        </Button>
      </div>

      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted/50 text-left">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Brand</th>
              <th className="p-3">Category</th>
              <th className="p-3">Price</th>
              <th className="p-3">Status</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="border-t border-border">
                <td className="p-3 font-medium">{p.name}</td>
                <td className="p-3 text-muted-foreground">{p.brand}</td>
                <td className="p-3 text-muted-foreground text-xs">
                  {p.category}
                </td>
                <td className="p-3">₹{Number(p.price)}</td>
                <td className="p-3">
                  {p.is_featured && (
                    <Star className="h-3 w-3 inline fill-accent text-accent mr-1" />
                  )}
                  <span
                    className={p.in_stock ? "text-primary" : "text-destructive"}
                  >
                    {p.in_stock ? "In stock" : "Out"}
                  </span>
                </td>
                <td className="p-3 text-right">
                  <Button size="sm" variant="ghost" onClick={() => open(p)}>
                    <Pencil className="h-3 w-3" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => remove(p.id)}
                  >
                    <Trash2 className="h-3 w-3 text-destructive" />
                  </Button>
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
              <h2 className="font-serif text-2xl font-bold">
                {editing.id ? "Edit" : "New"} Product
              </h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setEditing(null)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="p-5 space-y-3 max-h-[70vh] overflow-y-auto">
              <Inp
                label="Name *"
                value={editing.name ?? ""}
                onChange={(v) => setEditing({ ...editing, name: v })}
              />
              <div className="grid grid-cols-2 gap-3">
                <Inp
                  label="Brand *"
                  value={editing.brand ?? ""}
                  onChange={(v) => setEditing({ ...editing, brand: v })}
                />
                <div>
                  <label className="block text-xs font-medium mb-1">
                    Category *
                  </label>
                  <select
                    value={editing.category}
                    onChange={(e) =>
                      setEditing({ ...editing, category: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-lg border border-input bg-background text-sm"
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c.name}>{c.name}</option>
                    ))}
                  </select>
                </div>
              </div>
              <Inp
                label="Price (₹) *"
                type="number"
                value={String(editing.price ?? 0)}
                onChange={(v) => setEditing({ ...editing, price: Number(v) })}
              />
              <Area
                label="Short Description *"
                value={editing.short_description ?? ""}
                onChange={(v) =>
                  setEditing({ ...editing, short_description: v })
                }
              />
              <Area
                label="Full Description *"
                rows={4}
                value={editing.full_description ?? ""}
                onChange={(v) =>
                  setEditing({ ...editing, full_description: v })
                }
              />

              <div>
                <label className="block text-xs font-medium mb-1">
                  Key Benefits
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    value={benefitText}
                    onChange={(e) => setBenefitText(e.target.value)}
                    placeholder="Add a benefit"
                    className="flex-1 px-3 py-2 rounded-lg border border-input bg-background text-sm"
                  />
                  <Button
                    size="sm"
                    type="button"
                    onClick={() => {
                      if (benefitText) {
                        setEditing({
                          ...editing,
                          key_benefits: [
                            ...(editing.key_benefits ?? []),
                            benefitText,
                          ],
                        });
                        setBenefitText("");
                      }
                    }}
                  >
                    Add
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {(editing.key_benefits ?? []).map((b, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-primary-soft text-primary-dark text-xs rounded-full flex items-center gap-1"
                    >
                      {b}{" "}
                      <button
                        onClick={() =>
                          setEditing({
                            ...editing,
                            key_benefits: editing.key_benefits!.filter(
                              (_, j) => j !== i,
                            ),
                          })
                        }
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              <Area
                label="Ingredients"
                value={editing.ingredients ?? ""}
                onChange={(v) => setEditing({ ...editing, ingredients: v })}
              />
              <Area
                label="Dosage & Usage"
                value={editing.dosage ?? ""}
                onChange={(v) => setEditing({ ...editing, dosage: v })}
              />

              <div>
                <label className="block text-xs font-medium mb-1">
                  Available Forms
                </label>
                <div className="flex flex-wrap gap-2">
                  {FORMS.map((f) => (
                    <label
                      key={f}
                      className="flex items-center gap-1 px-3 py-1 border border-border rounded-full cursor-pointer text-sm"
                    >
                      <input
                        type="checkbox"
                        checked={editing.available_forms?.includes(f) ?? false}
                        onChange={(e) => {
                          const cur = editing.available_forms ?? [];
                          setEditing({
                            ...editing,
                            available_forms: e.target.checked
                              ? [...cur, f]
                              : cur.filter((x) => x !== f),
                          });
                        }}
                      />
                      {f}
                    </label>
                  ))}
                </div>
              </div>

              <Inp
                label="Video URL (YouTube or direct)"
                value={editing.video_url ?? ""}
                onChange={(v) => setEditing({ ...editing, video_url: v })}
              />

              <div>
                <label className="block text-xs font-medium mb-1">
                  Add Images (select multiple)
                </label>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) => {
                    const newFiles = Array.from(e.target.files ?? []);
                    setImageFiles((prev) => [...prev, ...newFiles]);
                  }}
                  className="text-sm"
                />
                {imageFiles.length > 0 && (
                  <p className="text-xs text-muted-foreground mt-1">
                    {imageFiles.length} file(s) ready to upload
                  </p>
                )}
                {imageFiles.length > 0 && (
                  <div className="mt-2 flex gap-2 flex-wrap">
                    <p className="w-full text-xs font-medium">
                      Files to upload:
                    </p>
                    {imageFiles.map((file, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-1 px-2 py-1 bg-muted rounded text-xs"
                      >
                        <span>{file.name}</span>
                        <button
                          onClick={() =>
                            setImageFiles((prev) =>
                              prev.filter((_, j) => j !== i),
                            )
                          }
                          className="text-destructive hover:font-bold"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                {(editing.images ?? []).length > 0 && (
                  <div className="mt-3">
                    <p className="text-xs font-medium mb-2">Current Images:</p>
                    <div className="flex gap-2 flex-wrap">
                      {editing.images!.map((img, i) => (
                        <div key={i} className="relative">
                          <img
                            src={img}
                            alt=""
                            className="h-16 w-16 object-cover rounded"
                          />
                          <button
                            onClick={() =>
                              setEditing({
                                ...editing,
                                images: editing.images!.filter(
                                  (_, j) => j !== i,
                                ),
                              })
                            }
                            className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground rounded-full p-0.5"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex gap-4">
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={editing.is_featured ?? false}
                    onChange={(e) =>
                      setEditing({ ...editing, is_featured: e.target.checked })
                    }
                  />{" "}
                  Featured
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={editing.in_stock ?? true}
                    onChange={(e) =>
                      setEditing({ ...editing, in_stock: e.target.checked })
                    }
                  />{" "}
                  In Stock
                </label>
              </div>
            </div>
            <div className="p-5 border-t border-border flex justify-end gap-2">
              <Button variant="outline" onClick={() => setEditing(null)}>
                Cancel
              </Button>
              <Button onClick={save}>Save Product</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const Inp = ({
  label,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
}) => (
  <div>
    <label className="block text-xs font-medium mb-1">{label}</label>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-3 py-2 rounded-lg border border-input bg-background text-sm"
    />
  </div>
);
const Area = ({
  label,
  value,
  onChange,
  rows = 2,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  rows?: number;
}) => (
  <div>
    <label className="block text-xs font-medium mb-1">{label}</label>
    <textarea
      rows={rows}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-3 py-2 rounded-lg border border-input bg-background text-sm"
    />
  </div>
);

export default AdminProducts;
