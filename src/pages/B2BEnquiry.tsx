import { useState } from "react";
import { CheckCircle2, MessageCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { SEO } from "@/components/SEO";
import { whatsappLink } from "@/lib/whatsapp";
import toast from "react-hot-toast";

const initial = {
  full_name: "",
  business_name: "",
  business_type: "Pharmacy",
  phone: "",
  email: "",
  city_state: "",
  products_interest: "",
  quantity: "",
  special_requirements: "",
};

const B2BEnquiry = () => {
  const [form, setForm] = useState(initial);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const set = (k: keyof typeof initial, v: string) =>
    setForm({ ...form, [k]: v });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.from("b2b_enquiries").insert(form);
    setLoading(false);
    if (error) return toast.error("Submission failed. Please try again.");
    setSubmitted(true);
    toast.success("Enquiry received! We'll contact you within 24 hours.");
  };

  const waMessage = `B2B Enquiry from ${form.full_name} (${form.business_name}, ${form.business_type})\nPhone: ${form.phone}\nEmail: ${form.email}\nLocation: ${form.city_state}\nInterested in: ${form.products_interest}\nMonthly qty: ${form.quantity}\nNotes: ${form.special_requirements}`;

  if (submitted) {
    return (
      <>
        <SEO title="Enquiry Received — Thank You" />
        <section className="container py-24 text-center max-w-xl">
          <CheckCircle2 className="h-16 w-16 mx-auto text-primary" />
          <h1 className="font-serif text-4xl font-bold mt-4">
            Thank you, {form.full_name}!
          </h1>
          <p className="text-muted-foreground mt-3">
            We've received your enquiry and will contact you within 24 hours at{" "}
            {form.phone}.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              asChild
              className="bg-[#25D366] hover:bg-[#1ebe5a] text-white"
            >
              <a
                href={whatsappLink(waMessage)}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="h-4 w-4 mr-1" /> Send via WhatsApp too
              </a>
            </Button>
            <Button variant="outline" onClick={() => window.print()}>
              Print confirmation
            </Button>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <SEO
        title="B2B & Bulk Orders Welcome"
        description="Pharmacies, clinics, distributors and resellers — partner with Vedaqur for authentic ayurvedic medicine supply across India."
      />

      <section className="gradient-soft py-16 border-b border-border">
        <div className="container max-w-3xl text-center">
          <span className="inline-block px-3 py-1 rounded-full bg-accent text-accent-foreground text-xs font-semibold uppercase tracking-widest">
            B2B Partners
          </span>
          <h1 className="font-serif text-5xl font-bold mt-4">
            Bulk & B2B Orders Welcome
          </h1>
          <p className="text-muted-foreground mt-3 text-lg">
            We supply pharmacies, Ayurvedic clinics, hospitals, distributors and
            resellers across India — at honest wholesale rates.
          </p>
        </div>
      </section>

      <section className="container py-12 max-w-3xl">
        <form
          onSubmit={submit}
          className="bg-card border border-border rounded-2xl p-8 shadow-soft space-y-4"
        >
          <div className="grid sm:grid-cols-2 gap-4">
            <Field
              label="Full Name *"
              value={form.full_name}
              onChange={(v) => set("full_name", v)}
              required
            />
            <Field
              label="Business Name *"
              value={form.business_name}
              onChange={(v) => set("business_name", v)}
              required
            />
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1.5">
                Business Type *
              </label>
              <select
                value={form.business_type}
                onChange={(e) => set("business_type", e.target.value)}
                required
                className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
              >
                {[
                  "Pharmacy",
                  "Clinic",
                  "Hospital",
                  "Distributor",
                  "Reseller",
                  "Other",
                ].map((b) => (
                  <option key={b}>{b}</option>
                ))}
              </select>
            </div>
            <Field
              label="Phone (with +91) *"
              value={form.phone}
              onChange={(v) => set("phone", v)}
              required
              type="tel"
            />
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <Field
              label="Email Address *"
              value={form.email}
              onChange={(v) => set("email", v)}
              required
              type="email"
            />
            <Field
              label="City & State *"
              value={form.city_state}
              onChange={(v) => set("city_state", v)}
              required
            />
          </div>
          <Area
            label="Products of Interest"
            value={form.products_interest}
            onChange={(v) => set("products_interest", v)}
            placeholder="List products or health categories you're interested in stocking"
          />
          <Field
            label="Approximate Monthly Order Quantity"
            value={form.quantity}
            onChange={(v) => set("quantity", v)}
            placeholder="e.g. 100-200 units / month"
          />
          <Area
            label="Any special requirements"
            value={form.special_requirements}
            onChange={(v) => set("special_requirements", v)}
          />

          <Button
            type="submit"
            disabled={loading}
            size="lg"
            className="w-full bg-primary hover:bg-primary-dark text-primary-foreground font-semibold"
          >
            {loading ? "Sending..." : "Send Enquiry"}
          </Button>
        </form>
      </section>
    </>
  );
};

const Field = ({
  label,
  value,
  onChange,
  ...rest
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
} & React.InputHTMLAttributes<HTMLInputElement>) => (
  <div>
    <label className="block text-sm font-medium mb-1.5">{label}</label>
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      {...rest}
      className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
    />
  </div>
);

const Area = ({
  label,
  value,
  onChange,
  ...rest
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>) => (
  <div>
    <label className="block text-sm font-medium mb-1.5">{label}</label>
    <textarea
      rows={3}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      {...rest}
      className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
    />
  </div>
);

export default B2BEnquiry;
