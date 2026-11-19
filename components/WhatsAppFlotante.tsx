import IconoWhatsApp from "@/components/IconoWhatsApp";
import { WHATSAPP_VISIBLE, urlWhatsApp } from "@/lib/whatsapp";

export default function WhatsAppFlotante() {
  return (
    <a
      href={urlWhatsApp("Hola, deseo una consulta sobre sus servicios.")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Contactar al ${WHATSAPP_VISIBLE}`}
      className="group fixed bottom-6 right-6 z-40"
    >
      <span className="flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-[#0b1220]/90 text-[#d7deea] shadow-[0_18px_40px_-18px_rgba(0,0,0,0.9)] backdrop-blur-md transition group-hover:border-[#c6a15b]/40 group-hover:text-white">
        <IconoWhatsApp className="h-5 w-5" />
      </span>
    </a>
  );
}
