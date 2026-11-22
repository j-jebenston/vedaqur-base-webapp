// FontAwesome Icons
import { FaVenusMars } from "react-icons/fa";
// Game Icons
import { GiHairStrands } from "react-icons/gi";

// FontAwesome Icons
import { FaVenus, FaShieldVirus } from "react-icons/fa";
import { MdFaceRetouchingNatural } from "react-icons/md";

// Material Design Icons
import { MdBloodtype } from "react-icons/md";
import {
  Droplet,
  HeartPulse,
  Sparkles,
  Bone,
  Heart,
  Leaf,
  ShieldCheck,
  Wind,
  Activity,
  Scissors,
  Flower,
  Zap,
} from "lucide-react";
import {
  GiKidneys,
  GiLiver,
  GiLungs,
  GiHeartOrgan,
  GiStomach,
} from "react-icons/gi";
import { FaBone } from "react-icons/fa";

export const CATEGORIES = [
  { name: "Urinary & Kidney Health", icon: GiKidneys, slug: "kidney" },
  { name: "Sexual Wellness & Vitality", icon: FaVenusMars, slug: "vitality" },
  { name: "Rectal Health", icon: GiStomach, slug: "rectal" },
  { name: "Bone & Joint Health", icon: FaBone, slug: "bone" },
  { name: "Heart & Cardiovascular Health", icon: GiHeartOrgan, slug: "heart" },
  { name: "Liver Function", icon: GiLiver, slug: "liver" },
  { name: "Blood Detoxification", icon: MdBloodtype, slug: "detox" },
  { name: "Respiratory Health", icon: GiLungs, slug: "respiratory" },
  { name: "Immune System Support", icon: FaShieldVirus, slug: "immunity" },
  { name: "Hair & Scalp Health", icon: MdFaceRetouchingNatural, slug: "hair" },
  { name: "Genital Health (Women)", icon: FaVenus, slug: "genital" },
] as const;

export type Product = {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  discount_percentage: number;
  discount_valid_until: string | null;
  short_description: string;
  full_description: string;
  key_benefits: string[];
  ingredients: string | null;
  dosage: string | null;
  available_forms: string[];
  images: string[];
  video_url: string | null;
  is_featured: boolean;
  in_stock: boolean;
  created_at: string;
};

/** Returns the effective discounted price (rounded to whole ₹).
 *  Returns the original price if no discount or if discount has expired. */
export function getDiscountedPrice(product: Pick<Product, "price" | "discount_percentage" | "discount_valid_until">): number {
  const pct = product.discount_percentage ?? 0;
  if (pct <= 0) return product.price;
  if (product.discount_valid_until && new Date() > new Date(product.discount_valid_until)) {
    return product.price; // discount expired
  }
  return Math.round(product.price * (1 - pct / 100));
}

/** Returns the rounded display discount percentage (integer, no decimals). */
export function getDisplayDiscount(product: Pick<Product, "discount_percentage" | "discount_valid_until">): number {
  const pct = product.discount_percentage ?? 0;
  if (pct <= 0) return 0;
  if (product.discount_valid_until && new Date() > new Date(product.discount_valid_until)) {
    return 0; // expired
  }
  return Math.round(pct);
}

export type Blog = {
  id: string;
  title: string;
  slug: string;
  category: string;
  content: string;
  cover_image_url: string | null;
  meta_description: string | null;
  is_published: boolean;
  created_at: string;
};
