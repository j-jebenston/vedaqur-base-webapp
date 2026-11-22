import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

type Item = { id: string; name: string | null; email: string | null; message: string; created_at: string };

const AdminFeedback = () => {
  const [items, setItems] = useState<Item[]>([]);
  const load = async () => { const { data } = await supabase.from("feedback").select("*").order("created_at", { ascending: false }); setItems((data ?? []) as Item[]); };
  useEffect(() => { load(); }, []);
  const remove = async (id: string) => { if (!confirm("Delete?")) return; await supabase.from("feedback").delete().eq("id", id); load(); };

  return (
    <div>
      <h1 className="font-serif text-3xl font-bold mb-6">Feedback ({items.length})</h1>
      <div className="space-y-3">
        {items.map((f) => (
          <div key={f.id} className="bg-card border border-border rounded-xl p-4 flex items-start justify-between gap-4">
            <div className="flex-1">
              <p className="text-foreground">{f.message}</p>
              <p className="text-xs text-muted-foreground mt-2">
                {f.name || "Anonymous"}{f.email ? ` · ${f.email}` : ""} · {new Date(f.created_at).toLocaleString()}
              </p>
            </div>
            <Button size="sm" variant="ghost" onClick={() => remove(f.id)}><Trash2 className="h-3 w-3 text-destructive" /></Button>
          </div>
        ))}
        {items.length === 0 && <p className="text-muted-foreground text-center py-10">No feedback yet.</p>}
      </div>
    </div>
  );
};
export default AdminFeedback;
