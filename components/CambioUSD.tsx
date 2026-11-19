"use client";

import { useEffect, useState } from "react";
import EnlaceWhatsApp from "@/components/EnlaceWhatsApp";
import PanelServicio from "@/components/PanelServicio";
import { formatARS } from "@/lib/formato";

type DolarBlue = {
  venta: number;
  compra: number;
};

export default function CambioUSD() {
  const [dolar, setDolar] = useState<DolarBlue | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("https://dolarapi.com/v1/dolares/blue", { cache: "no-store" })
      .then((res) => {
        if (!res.ok) throw new Error("No se pudo obtener la cotización");
        return res.json();
      })
      .then(setDolar)
      .catch(() =>
        setError("No fue posible obtener la cotización. Intente nuevamente en unos minutos."),
      );
  }, []);

  const spread = dolar ? dolar.venta - dolar.compra : 0;

  return (
    <PanelServicio
      etiqueta="Cotización"
      titulo="Dólar blue"
      descripcion="Valores de referencia para consulta. La operación se confirma al momento de la atención."
    >
      {error && (
        <p className="border border-white/10 bg-black/25 px-4 py-4 text-center text-sm text-slate-300">
          {error}
        </p>
      )}

      {!error && !dolar && (
        <div className="space-y-3" aria-busy="true" aria-label="Cargando cotización">
          <div className="h-24 animate-pulse bg-white/5" />
          <div className="h-24 animate-pulse bg-white/5" />
        </div>
      )}

      {dolar && (
        <div className="space-y-5">
          <div className="grid grid-cols-2 gap-px bg-white/10">
            <div className="bg-[#080c16] px-4 py-6">
              <p className="text-[10px] uppercase tracking-[0.22em] text-slate-500">Venta</p>
              <p className="font-display mt-2 text-[1.85rem] font-medium tracking-tight text-white">
                {formatARS(dolar.venta)}
              </p>
            </div>
            <div className="bg-[#080c16] px-4 py-6">
              <p className="text-[10px] uppercase tracking-[0.22em] text-slate-500">Compra</p>
              <p className="font-display mt-2 text-[1.85rem] font-medium tracking-tight text-white">
                {formatARS(dolar.compra)}
              </p>
            </div>
          </div>
          <p className="text-center text-[11px] uppercase tracking-[0.16em] text-slate-500">
            Diferencia {formatARS(spread)} · referencia no vinculante
          </p>
          <EnlaceWhatsApp
            mensaje={`Hola, deseo consultar una operación de cambio. Referencia venta ${formatARS(dolar.venta)} y compra ${formatARS(dolar.compra)}.`}
            className="w-full"
          >
            Consultar operación
          </EnlaceWhatsApp>
        </div>
      )}
    </PanelServicio>
  );
}
