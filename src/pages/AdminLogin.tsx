import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/Logo";
import { SEO } from "@/components/SEO";
import toast from "react-hot-toast";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate("/admin");
    });
  }, [navigate]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) return toast.error(error.message);
    if (data.user) {
      const { data: roleRow } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", data.user.id)
        .eq("role", "admin")
        .maybeSingle();
      if (!roleRow) {
        await supabase.auth.signOut();
        return toast.error("Not an admin account.");
      }
      toast.success("Welcome back!");
      navigate("/admin");
    }
  };

  return (
    <>
      <SEO title="Admin Login" />
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <div className="w-full max-w-md">
          <div className="flex justify-center mb-8"><Logo /></div>
          <div className="bg-card border border-border rounded-2xl p-8 shadow-elegant">
            <h1 className="font-serif text-3xl font-bold text-center">Admin Login</h1>
            <p className="text-sm text-muted-foreground text-center mt-1">Restricted access</p>
            <form onSubmit={submit} className="mt-6 space-y-3">
              <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required placeholder="Admin mail" className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring" />
              <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" required placeholder="Password" className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring" />
              <Button type="submit" disabled={loading} className="w-full" size="lg">{loading ? "Signing in..." : "Sign In"}</Button>
            </form>
            <p className="text-xs text-muted-foreground mt-6 text-center">
              Need admin access? Contact the site owner to be added in the database.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminLogin;
