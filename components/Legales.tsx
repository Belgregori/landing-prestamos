import EnlaceWhatsApp from "@/components/EnlaceWhatsApp";
import PanelServicio from "@/components/PanelServicio";

const puntos = [
  "Los préstamos personales están sujetos a evaluación crediticia y al cumplimiento de los requisitos de la operatoria.",
  "La simulación no constituye una oferta vinculante. Tasa, plazo y monto pueden variar según el perfil del solicitante.",
  "Las condiciones finales se confirman de forma expresa antes de avanzar con cualquier solicitud.",
];

export default function Legales() {
  return (
    <PanelServicio
      etiqueta="Transparencia"
      titulo="Condiciones generales"
      descripcion="Información esencial previa a una solicitud de préstamo o cotización."
    >
      <ol className="space-y-px bg-white/10">
        {puntos.map((punto, index) => (
          <li key={punto} className="flex gap-4 bg-[#080c16] px-4 py-4">
            <span className="mt-0.5 w-6 shrink-0 text-[11px] tabular-nums text-[#c6a15b]/80">
              0{index + 1}
            </span>
            <p className="text-sm leading-relaxed text-slate-300">{punto}</p>
          </li>
        ))}
      </ol>
      <EnlaceWhatsApp
        mensaje="Hola, deseo consultar las condiciones de un préstamo."
        className="mt-6 w-full"
      >
        Consultar condiciones
      </EnlaceWhatsApp>
    </PanelServicio>
  );
}
