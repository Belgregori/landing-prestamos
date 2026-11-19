export const WHATSAPP_NUMERO = "5493515906607";
export const WHATSAPP_VISIBLE = "351 590-6607";

export function urlWhatsApp(mensaje: string) {
  return `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(mensaje)}`;
}
