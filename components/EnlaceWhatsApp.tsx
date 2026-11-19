import IconoWhatsApp from "@/components/IconoWhatsApp";
import { urlWhatsApp } from "@/lib/whatsapp";

type Props = {
  mensaje: string;
  children: React.ReactNode;
  className?: string;
};

export default function EnlaceWhatsApp({ mensaje, children, className = "" }: Props) {
  return (
    <a
      href={urlWhatsApp(mensaje)}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-2.5 bg-[#c6a15b] px-6 py-3 text-[11px] font-medium uppercase tracking-[0.22em] text-[#0b0f18] transition hover:bg-[#d4b36d] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c6a15b]/60 ${className}`}
    >
      <IconoWhatsApp className="h-4 w-4 opacity-80" />
      {children}
    </a>
  );
}
