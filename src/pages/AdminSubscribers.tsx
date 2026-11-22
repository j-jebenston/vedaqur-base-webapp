import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Trash2, Download } from "lucide-react";

type Sub = { id: string; email: string; created_at: string };

const AdminSubscribers = () => {
  const [items, setItems] = useState<Sub[]>([]);
  const load = async () => { const { data } = await supabase.from("subscribers").select("*").order("created_at", { ascending: false }); setItems((data ?? []) as Sub[]); };
  useEffect(() => { load(); }, []);
  const remove = async (id: string) => { if (!confirm("Delete?")) return; await supabase.from("subscribers").delete().eq("id", id); load(); };
  const exportCsv = () => {
    const csv = "email,date\n" + items.map((s) => `${s.email},${s.created_at}`).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "subscribers.csv";
    a.click();
  };

  return (
    <div>
      <div className="flex justify-between mb-6">
        <h1 className="font-serif text-3xl font-bold">Subscribers ({items.length})</h1>
        <Button onClick={exportCsv} variant="outline"><Download className="h-4 w-4 mr-1" /> Export CSV</Button>
      </div>
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted/50 text-left"><tr><th className="p-3">Email</th><th className="p-3">Subscribed</th><th className="p-3 text-right">Actions</th></tr></thead>
          <tbody>
            {items.map((s) => (
              <tr key={s.id} className="border-t border-border">
                <td className="p-3 font-medium">{s.email}</td>
                <td className="p-3 text-muted-foreground">{new Date(s.created_at).toLocaleDateString()}</td>
                <td className="p-3 text-right"><Button size="sm" variant="ghost" onClick={() => remove(s.id)}><Trash2 className="h-3 w-3 text-destructive" /></Button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default AdminSubscribers;
