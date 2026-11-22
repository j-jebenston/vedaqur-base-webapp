import { Heart, Leaf, Shield, Star, Award, Sparkles } from "lucide-react";
import { SEO } from "@/components/SEO";

const VALUES = [
  {
    icon: Shield,
    title: "Authenticity",
    desc: "Every product sourced from AYUSH-licensed manufacturers. No compromises.",
  },
  {
    icon: Award,
    title: "Quality",
    desc: "Stringent vetting of every batch — purity, potency and packaging.",
  },
  {
    icon: Heart,
    title: "Trust",
    desc: "Transparent ingredients, honest dosage guidance, real customer support.",
  },
  {
    icon: Leaf,
    title: "Natural Healing",
    desc: "Time-tested ayurvedic principles — heal the root, not just the symptom.",
  },
];

const About = () => (
  <>
    <SEO
      title="About Vedaqur — Our Story & Mission"
      description="Vedaqur is a 3rd party ayurvedic medicine seller bringing authentic AYUSH-approved products to every Indian household."
    />

    <section className="gradient-soft py-20 border-b border-border">
      <div className="container max-w-4xl text-center">
        <span className="inline-block px-3 py-1 rounded-full bg-primary-soft text-primary-dark text-xs font-semibold uppercase tracking-widest">
          Our Story
        </span>
        <h1 className="font-serif text-5xl md:text-6xl font-bold mt-4">
          Healing the Roots, Not Just the Pain
        </h1>
        <p className="text-muted-foreground mt-5 text-lg leading-relaxed">
          Vedaqur was born from a simple frustration — finding genuinely
          authentic ayurvedic medicines in India is harder than it should be. We
          bridge that gap as a trusted 3rd-party seller, sourcing only from
          AYUSH-licensed manufacturers and delivering across India.
        </p>
      </div>
    </section>

    <section className="container py-16 grid md:grid-cols-2 gap-10 items-start">
      <div>
        <h2 className="font-serif text-4xl font-bold">What We Do</h2>
        <p className="text-foreground/80 mt-4 leading-relaxed">
          Headquartered in Naidupeta, Vedaqur is a fully-licensed 3rd party
          seller of ayurvedic medicines. We don't manufacture — we curate. We
          source authentic products from India's top AYUSH-approved makers,
          verify every batch, and ship pan-India to households, clinics,
          pharmacies, and distributors.
        </p>
        <p className="text-foreground/80 mt-4 leading-relaxed">
          Whether you need a single bottle of Liver Care or wholesale quantities
          for your clinic, we make authentic ayurveda accessible — at honest
          prices, with honest guidance.
        </p>
      </div>
      <div className="p-8 rounded-2xl bg-primary-dark text-primary-foreground">
        <Sparkles className="h-8 w-8 text-accent mb-3" />
        <h3 className="font-serif text-3xl font-bold">Our Mission</h3>
        <p className="text-primary-foreground/85 mt-3 leading-relaxed">
          To make authentic Ayurvedic healthcare accessible to every household
          in India — backed by science, rooted in tradition.
        </p>
        <h3 className="font-serif text-3xl font-bold mt-6">Our Vision</h3>
        <p className="text-primary-foreground/85 mt-3 leading-relaxed">
          A future where natural, time-tested healing is the first choice — not
          the last resort.
        </p>
      </div>
    </section>

    <section className="py-16 bg-card border-y border-border">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="font-serif text-4xl font-bold">Our Values</h2>
          <p className="text-muted-foreground mt-2">
            The principles behind every product we sell.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {VALUES.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="p-6 rounded-2xl bg-background border border-border text-center hover:border-primary/40 hover:shadow-soft transition-smooth"
            >
              <div className="h-12 w-12 mx-auto rounded-full bg-primary-soft flex items-center justify-center mb-3">
                <Icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-serif text-xl font-bold">{title}</h3>
              <p className="text-sm text-muted-foreground mt-2">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="container py-16">
      <div className="text-center mb-10">
        <h2 className="font-serif text-4xl font-bold">Why Ayurveda?</h2>
      </div>
      <div className="max-w-3xl mx-auto text-foreground/80 leading-relaxed space-y-4">
        <p>
          Ayurveda is one of the world's oldest holistic healing systems — over
          5,000 years old, born in India. Unlike approaches that treat symptoms
          in isolation, Ayurveda addresses the root causes by balancing the
          body, mind and spirit.
        </p>
        <p>
          From immunity to digestion, from kidney health to skin radiance, every
          ayurvedic formulation in our catalog draws on classical preparations
          refined over centuries — and produced today in modern AYUSH-compliant
          facilities. Pure roots. Proven results.
        </p>
      </div>
    </section>

    <section className="container pb-16">
      <div className="p-8 rounded-2xl gradient-soft border border-border text-center">
        <h3 className="font-serif text-3xl font-bold">Certified & Licensed</h3>
        <p className="text-muted-foreground mt-2">
          Drug License (India) · GST · AYUSH Retail · Startup India
        </p>
      </div>
    </section>
  </>
);

export default About;
