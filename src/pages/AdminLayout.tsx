import { useEffect, useState } from "react";
import { Navigate, NavLink, Outlet, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Package, FileText, Inbox, MessageSquare, Mail, LogOut } from "lucide-react";
import toast from "react-hot-toast";

const NAV = [
  { to: "/admin/products", label: "Products", icon: Package },
  { to: "/admin/blogs", label: "Blog Posts", icon: FileText },
  { to: "/admin/enquiries", label: "Enquiries", icon: Inbox },
  { to: "/admin/feedback", label: "Feedback", icon: MessageSquare },
  { to: "/admin/subscribers", label: "Subscribers", icon: Mail },
];

const AdminLayout = () => {
  const [checking, setChecking] = useState(true);
  const [authed, setAuthed] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const check = async (userId?: string) => {
      if (!userId) { setAuthed(false); setChecking(false); return; }
      const { data } = await supabase.from("user_roles").select("role").eq("user_id", userId).eq("role", "admin").maybeSingle();
      setAuthed(!!data);
      setChecking(false);
    };

    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      check(session?.user?.id);
    });
    supabase.auth.getSession().then(({ data }) => check(data.session?.user?.id));

    return () => sub.subscription.unsubscribe();
  }, []);

  if (checking) return <div className="min-h-screen flex items-center justify-center text-muted-foreground">Loading...</div>;
  if (!authed) return <Navigate to="/admin-login" replace />;

  const logout = async () => {
    await supabase.auth.signOut();
    toast.success("Signed out");
    navigate("/admin-login");
  };

  return (
    <div className="min-h-screen flex bg-muted/30">
      <aside className="w-64 bg-card border-r border-border flex flex-col">
        <div className="p-5 border-b border-border"><Logo compact /></div>
        <nav className="flex-1 p-3 space-y-1">
          {NAV.map((n) => (
            <NavLink key={n.to} to={n.to} className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-smooth ${isActive ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-primary-soft"}`
            }>
              <n.icon className="h-4 w-4" /> {n.label}
            </NavLink>
          ))}
        </nav>
        <div className="p-3 border-t border-border">
          <Button variant="ghost" className="w-full justify-start" onClick={logout}><LogOut className="h-4 w-4 mr-2" /> Logout</Button>
        </div>
      </aside>
      <main className="flex-1 p-6 overflow-auto"><Outlet /></main>
    </div>
  );
};

export default AdminLayout;
