// Default WhatsApp number for Vedaqur. Override via VITE_ADMIN_WHATSAPP env var.
export const ADMIN_WHATSAPP =
  (import.meta.env.VITE_ADMIN_WHATSAPP as string) || "919392781596";
export const ADMIN_PHONE_DISPLAY = "+91 93927 81596";
export const ADMIN_EMAIL = "svproductionhouse0@gmail.com";

export function whatsappLink(message?: string) {
  const base = `https://wa.me/${ADMIN_WHATSAPP}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export function productOrderLink(productName: string, price?: number) {
  const msg = `Hi Vedaqur, I'm interested in ordering *${productName}*${price ? ` (₹${price})` : ""}. Please share availability and delivery details.`;
  return whatsappLink(msg);
}
