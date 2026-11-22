import { useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  MessageCircle,
  Clock,
  Instagram,
  Facebook,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { SEO } from "@/components/SEO";
import { ADMIN_PHONE_DISPLAY, ADMIN_EMAIL, whatsappLink } from "@/lib/whatsapp";
import toast from "react-hot-toast";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.message) return toast.error("Please write a message.");
    const { error } = await supabase.from("feedback").insert(form);
    if (error) return toast.error("Could not send. Please try again.");
    toast.success("Message sent! We'll get back to you soon.");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <>
      <SEO
        title="Contact Vedaqur — Andhra Pradesh, India"
        description="Reach Vedaqur in Naidupeta, Andhra Pradesh. WhatsApp, phone, email, or write to us directly."
      />

      <section className="gradient-soft py-16 border-b border-border">
        <div className="container text-center">
          <h1 className="font-serif text-5xl font-bold">Get in Touch</h1>
          <p className="text-muted-foreground mt-2">
            We'd love to hear from you — orders, partnerships, or just questions
            about ayurveda.
          </p>
        </div>
      </section>

      <section className="container py-14 grid lg:grid-cols-2 gap-10">
        <div className="space-y-4">
          <ContactCard
            icon={MapPin}
            title="Visit Us"
            lines={["Naidupeta, Tirupati, Andhra Pradesh", "India - 524126"]}
          />
          <ContactCard
            icon={Phone}
            title="Call Us"
            lines={[ADMIN_PHONE_DISPLAY]}
            href={`tel:${ADMIN_PHONE_DISPLAY.replace(/\s/g, "")}`}
          />
          <ContactCard
            icon={Mail}
            title="Email Us"
            lines={[ADMIN_EMAIL]}
            href={`mailto:${ADMIN_EMAIL}`}
          />
          <ContactCard
            icon={MessageCircle}
            title="WhatsApp"
            lines={["Chat directly with our team"]}
            href={whatsappLink()}
            accent
          />
          <ContactCard
            icon={Clock}
            title="Business Hours"
            lines={["24/7 Support", "Office: Mon-Fri, 9am-6pm IST"]}
          />

          <div className="flex gap-3 pt-2">
            <a
              href="#"
              aria-label="Instagram"
              className="p-3 rounded-full bg-card border border-border hover:bg-primary hover:text-primary-foreground transition-smooth"
            >
              <Instagram className="h-5 w-5" />
            </a>
            <a
              href="#"
              aria-label="Facebook"
              className="p-3 rounded-full bg-card border border-border hover:bg-primary hover:text-primary-foreground transition-smooth"
            >
              <Facebook className="h-5 w-5" />
            </a>
          </div>
        </div>

        <div>
          <form
            onSubmit={submit}
            className="bg-card border border-border rounded-2xl p-8 shadow-soft space-y-4"
          >
            <h2 className="font-serif text-3xl font-bold">Send us a message</h2>
            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Your name"
              className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
            />
            <input
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              type="email"
              placeholder="Your email"
              className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
            />
            <textarea
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              rows={5}
              required
              placeholder="How can we help?"
              className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
            />
            <Button type="submit" size="lg" className="w-full">
              Send Message
            </Button>
          </form>

          <div className="mt-6 space-y-4">
            <div className="rounded-2xl overflow-hidden border border-border h-64">
              <iframe
                title="Vedaqur Tirupati"
                src="https://www.google.com/maps?q=Naidupeta,+Tirupati,+Andhra+Pradesh,+India+524126&z=15&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <Button asChild variant="outline" className="w-full">
              <a
                href="https://maps.app.goo.gl/o6ihHCbY9Y1sMMJH9"
                target="_blank"
                rel="noopener noreferrer"
              >
                View Exact Location on Google Maps
              </a>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

const ContactCard = ({
  icon: Icon,
  title,
  lines,
  href,
  accent,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  lines: string[];
  href?: string;
  accent?: boolean;
}) => {
  const Inner = (
    <div
      className={`p-5 rounded-2xl border flex gap-4 transition-smooth ${accent ? "bg-primary text-primary-foreground border-primary" : "bg-card border-border hover:border-primary/40"}`}
    >
      <div
        className={`h-11 w-11 rounded-full flex items-center justify-center shrink-0 ${accent ? "bg-primary-foreground/15" : "bg-primary-soft"}`}
      >
        <Icon
          className={`h-5 w-5 ${accent ? "text-primary-foreground" : "text-primary"}`}
        />
      </div>
      <div>
        <p
          className={`font-semibold ${accent ? "text-primary-foreground" : "text-foreground"}`}
        >
          {title}
        </p>
        {lines.map((l) => (
          <p
            key={l}
            className={`text-sm ${accent ? "text-primary-foreground/85" : "text-muted-foreground"}`}
          >
            {l}
          </p>
        ))}
      </div>
    </div>
  );
  return href ? (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel="noopener noreferrer"
    >
      {Inner}
    </a>
  ) : (
    Inner
  );
};

export default Contact;
