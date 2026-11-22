import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Trash2, Mail } from "lucide-react";
import toast from "react-hot-toast";

type Enquiry = { id: string; full_name: string; business_name: string; business_type: string; phone: string; email: string; city_state: string; products_interest: string | null; quantity: string | null; special_requirements: string | null; is_read: boolean; created_at: string };

export const AdminEnquiries = () => {
  const [items, setItems] = useState<Enquiry[]>([]);
  const [open, setOpen] = useState<Enquiry | null>(null);
  const load = async () => { const { data } = await supabase.from("b2b_enquiries").select("*").order("created_at", { ascending: false }); setItems(data as Enquiry[] ?? []); };
  useEffect(() => { load(); }, []);
  const toggleRead = async (e: Enquiry) => { await supabase.from("b2b_enquiries").update({ is_read: !e.is_read }).eq("id", e.id); load(); };
  const remove = async (id: string) => { if (!confirm("Delete?")) return; await supabase.from("b2b_enquiries").delete().eq("id", id); toast.success("Deleted"); load(); };

  return (
    <div>
      <h1 className="font-serif text-3xl font-bold mb-6">B2B Enquiries ({items.length})</h1>
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted/50 text-left"><tr><th className="p-3"></th><th className="p-3">Name</th><th className="p-3">Business</th><th className="p-3">Phone</th><th className="p-3">Date</th><th className="p-3 text-right">Actions</th></tr></thead>
          <tbody>
            {items.map((e) => (
              <tr key={e.id} className={`border-t border-border ${!e.is_read ? "font-semibold bg-primary-soft/30" : ""}`}>
                <td className="p-3"><button onClick={() => toggleRead(e)} title="Toggle read" className={`h-2 w-2 rounded-full ${!e.is_read ? "bg-primary" : "bg-muted"}`} /></td>
                <td className="p-3 cursor-pointer" onClick={() => setOpen(e)}>{e.full_name}</td>
                <td className="p-3 text-muted-foreground">{e.business_name} <span className="text-xs">({e.business_type})</span></td>
                <td className="p-3"><a href={`tel:${e.phone}`} className="text-primary hover:underline">{e.phone}</a></td>
                <td className="p-3 text-muted-foreground">{new Date(e.created_at).toLocaleDateString()}</td>
                <td className="p-3 text-right">
                  <Button size="sm" variant="ghost" asChild><a href={`mailto:${e.email}`}><Mail className="h-3 w-3" /></a></Button>
                  <Button size="sm" variant="ghost" onClick={() => remove(e.id)}><Trash2 className="h-3 w-3 text-destructive" /></Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4" onClick={() => setOpen(null)}>
          <div className="bg-card rounded-2xl max-w-lg w-full p-6" onClick={(e) => e.stopPropagation()}>
            <h2 className="font-serif text-2xl font-bold">{open.full_name}</h2>
            <p className="text-sm text-muted-foreground">{open.business_name} · {open.business_type}</p>
            <dl className="mt-4 space-y-2 text-sm">
              <div><dt className="text-muted-foreground">Phone</dt><dd>{open.phone}</dd></div>
              <div><dt className="text-muted-foreground">Email</dt><dd>{open.email}</dd></div>
              <div><dt className="text-muted-foreground">Location</dt><dd>{open.city_state}</dd></div>
              <div><dt className="text-muted-foreground">Products of interest</dt><dd>{open.products_interest || "-"}</dd></div>
              <div><dt className="text-muted-foreground">Monthly quantity</dt><dd>{open.quantity || "-"}</dd></div>
              <div><dt className="text-muted-foreground">Notes</dt><dd>{open.special_requirements || "-"}</dd></div>
            </dl>
            <Button onClick={() => setOpen(null)} className="mt-4 w-full">Close</Button>
          </div>
        </div>
      )}
    </div>
  );
};
export default AdminEnquiries;
