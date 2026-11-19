"use client";

import { useMemo, useState } from "react";
import EnlaceWhatsApp from "@/components/EnlaceWhatsApp";
import PanelServicio from "@/components/PanelServicio";
import { formatARS } from "@/lib/formato";

const TASA_MENSUAL = 0.2;
const CUOTAS_MAX = 10;

function calcularPrestamo(monto: number, cuotas: number) {
  const interesTotal = monto * TASA_MENSUAL * cuotas;
  const total = monto + interesTotal;
  const cuota = total / cuotas;

  return { interesTotal, total, cuota };
}

function agruparMiles(valor: string) {
  return valor.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

export default function Simulador() {
  const [montoTexto, setMontoTexto] = useState("100000");
  const [cuotas, setCuotas] = useState(6);

  const monto = Number(montoTexto.replace(/\D/g, "")) || 0;
  const resultado = useMemo(() => calcularPrestamo(monto, cuotas), [monto, cuotas]);

  const handleMontoChange = (valor: string) => {
    setMontoTexto(valor.replace(/\D/g, ""));
  };

  const mensajeWhatsApp = [
    "Hola, deseo solicitar un préstamo.",
    "",
    `Monto: ${formatARS(monto)}`,
    `Cuotas: ${cuotas}`,
    `Cuota mensual: ${formatARS(resultado.cuota)}`,
    `Intereses: ${formatARS(resultado.interesTotal)}`,
    `Total a devolver: ${formatARS(resultado.total)}`,
  ].join("\n");

  const progreso = ((cuotas - 1) / (CUOTAS_MAX - 1)) * 100;

  return (
    <PanelServicio
      etiqueta="Préstamos"
      titulo="Simulación de préstamo"
      descripcion={`Operatoria en pesos argentinos. Interés mensual del ${TASA_MENSUAL * 100}%. La simulación es orientativa.`}
    >
      <form className="space-y-7" onSubmit={(event) => event.preventDefault()}>
        <label className="block">
          <span className="mb-2 block text-[10px] font-medium uppercase tracking-[0.22em] text-slate-400">
            Monto solicitado
          </span>
          <div className="relative">
            <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
              $
            </span>
            <input
              type="text"
              inputMode="numeric"
              value={montoTexto ? agruparMiles(montoTexto) : ""}
              onChange={(event) => handleMontoChange(event.target.value)}
              placeholder="100.000"
              className="w-full border border-white/10 bg-black/25 py-3.5 pl-8 pr-16 text-lg tracking-wide text-white outline-none transition placeholder:text-slate-600 focus:border-[#c6a15b]/40"
            />
            <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[10px] uppercase tracking-[0.18em] text-slate-500">
              ARS
            </span>
          </div>
        </label>

        <label className="block">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-[10px] font-medium uppercase tracking-[0.22em] text-slate-400">
              Plazo
            </span>
            <span className="text-sm text-[#e4d4ae]">
              {cuotas} {cuotas === 1 ? "cuota" : "cuotas"}
            </span>
          </div>
          <input
            type="range"
            min={1}
            max={CUOTAS_MAX}
            value={cuotas}
            onChange={(event) => setCuotas(Number(event.target.value))}
            className="simulador-rango w-full"
            style={{
              background: `linear-gradient(to right, #c6a15b ${progreso}%, rgba(255,255,255,0.12) ${progreso}%)`,
            }}
          />
          <div className="mt-2 flex justify-between text-[10px] uppercase tracking-[0.16em] text-slate-500">
            <span>1</span>
            <span>10</span>
          </div>
        </label>
      </form>

      {monto > 0 ? (
        <>
          <div className="mt-8 border border-white/10">
            <div className="px-5 py-5">
              <p className="text-[10px] uppercase tracking-[0.22em] text-slate-500">
                Cuota mensual
              </p>
              <p className="font-display mt-1 text-[2rem] font-medium tracking-tight text-white">
                {formatARS(resultado.cuota)}
              </p>
            </div>
            <div className="space-y-2 border-t border-white/10 bg-black/20 px-5 py-4 text-sm">
              <div className="flex justify-between gap-4">
                <span className="text-slate-500">
                  Intereses ({cuotas} × {TASA_MENSUAL * 100}%)
                </span>
                <span className="tabular-nums text-slate-200">
                  {formatARS(resultado.interesTotal)}
                </span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-slate-500">Total a devolver</span>
                <span className="tabular-nums text-[#e4d4ae]">
                  {formatARS(resultado.total)}
                </span>
              </div>
            </div>
          </div>

          <EnlaceWhatsApp mensaje={mensajeWhatsApp} className="mt-6 w-full">
            Solicitar evaluación
          </EnlaceWhatsApp>
        </>
      ) : (
        <p className="mt-8 border border-dashed border-white/10 px-4 py-6 text-center text-sm text-slate-500">
          Indicá un monto para calcular la cuota.
        </p>
      )}
    </PanelServicio>
  );
}
