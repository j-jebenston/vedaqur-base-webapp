import { MessageCircle } from "lucide-react";
import { whatsappLink } from "@/lib/whatsapp";

export const WhatsAppFloat = () => (
  <a
    href={whatsappLink("Hi Vedaqur, I'd like to know more about your products.")}
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Chat with us on WhatsApp"
    className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-elegant transition-smooth hover:scale-110 hover:shadow-glow animate-float"
  >
    <MessageCircle className="h-7 w-7 fill-white" />
    <span className="absolute -top-1 -right-1 flex h-3 w-3">
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-75"></span>
      <span className="relative inline-flex rounded-full h-3 w-3 bg-[#25D366]"></span>
    </span>
  </a>
);
