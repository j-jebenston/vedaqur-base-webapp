import { BadgeCheck, ShieldCheck, FileText } from "lucide-react";
import { SEO } from "@/components/SEO";

const CERTS = [
  { name: "Startup India Certificate", authority: "Department for Promotion of Industry & Internal Trade, GoI", note: "Recognized as a registered startup advancing healthcare innovation in India." },
  { name: "GST Registration Certificate", authority: "Government of India", note: "Active GSTIN — fully compliant for B2B and B2C transactions across India." },
  { name: "Drug License (Retail & Wholesale)", authority: "State Drug Authority, Karnataka", note: "Authorized to sell and distribute Ayurvedic medicines across India." },
  { name: "AYUSH Retail License", authority: "Ministry of AYUSH, Government of India", note: "Licensed to retail authentic ayurvedic, siddha and unani medicines." },
  { name: "ISO 9001 Quality Standards", authority: "ISO Certification Body", note: "Quality management practices in product handling and customer service." },
  { name: "WHO-GMP Sourced Products", authority: "Manufacturer-side certification", note: "All products sourced exclusively from WHO-GMP compliant manufacturers." },
];

const Certifications = () => (
  <>
    <SEO title="Licenses & Certifications" description="Vedaqur is fully licensed and AYUSH-certified. View our Drug License, GST, AYUSH and Startup India certifications." />

    <section className="gradient-soft py-16 border-b border-border">
      <div className="container text-center">
        <ShieldCheck className="h-12 w-12 mx-auto text-primary mb-4" />
        <h1 className="font-serif text-5xl font-bold">Our Licenses & Certifications</h1>
        <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">
          Every product Vedaqur sells is backed by full regulatory compliance. Here's the proof.
        </p>
      </div>
    </section>

    <section className="container py-16">
      <div className="grid md:grid-cols-2 gap-6">
        {CERTS.map((c) => (
          <div key={c.name} className="p-7 rounded-2xl bg-card border border-border hover:border-primary/40 transition-smooth shadow-soft">
            <div className="flex items-start gap-4">
              <div className="h-12 w-12 rounded-full gradient-saffron flex items-center justify-center shrink-0">
                <FileText className="h-6 w-6 text-accent-foreground" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-serif text-2xl font-bold">{c.name}</h3>
                  <BadgeCheck className="h-5 w-5 text-primary" />
                </div>
                <p className="text-sm text-primary-dark font-semibold">{c.authority}</p>
                <p className="text-sm text-foreground/75 mt-2 leading-relaxed">{c.note}</p>
                <p className="text-xs text-muted-foreground mt-3">✓ Valid & Active</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 p-6 rounded-2xl bg-primary-soft border border-primary/20 text-center">
        <p className="text-foreground font-medium">
          📜 All products sold by Vedaqur are sourced exclusively from AYUSH-licensed manufacturers in India.
        </p>
      </div>
    </section>
  </>
);

export default Certifications;
