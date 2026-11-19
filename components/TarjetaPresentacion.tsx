"use client";

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { useRef, type MouseEvent } from "react";
import Marca from "@/components/Marca";

const MAX_TILT = 18;
const springConfig = { stiffness: 260, damping: 22, mass: 0.6 };

const servicios = [
  "Préstamos Personales",
  "Cotización de Monedas",
  "Asesoramiento",
];

function ChipIcon() {
  return (
    <div
      className="relative h-9 w-11 rounded-md border border-amber-400/30 bg-gradient-to-br from-amber-200/20 via-amber-500/10 to-amber-700/20 shadow-inner"
      aria-hidden
    >
      <div className="absolute inset-1 grid grid-cols-3 grid-rows-2 gap-px">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="rounded-[1px] bg-amber-300/15" />
        ))}
      </div>
    </div>
  );
}

export default function TarjetaPresentacion() {
  const cardRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const rotateXRaw = useTransform(mouseY, [0, 1], [MAX_TILT, -MAX_TILT]);
  const rotateYRaw = useTransform(mouseX, [0, 1], [-MAX_TILT, MAX_TILT]);

  const rotateX = useSpring(rotateXRaw, springConfig);
  const rotateY = useSpring(rotateYRaw, springConfig);

  const glareX = useTransform(mouseX, [0, 1], [0, 100]);
  const glareY = useTransform(mouseY, [0, 1], [0, 100]);

  const glareBackground = useMotionTemplate`radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.38) 0%, rgba(255,255,255,0.08) 18%, transparent 52%)`;
  const sheenBackground = useMotionTemplate`linear-gradient(115deg, transparent 35%, rgba(255,255,255,0.06) 48%, rgba(255,255,255,0.14) 50%, rgba(255,255,255,0.06) 52%, transparent 65%)`;

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;

    mouseX.set((event.clientX - rect.left) / rect.width);
    mouseY.set((event.clientY - rect.top) / rect.height);
  };

  const handleMouseLeave = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  return (
    <div style={{ perspective: "1200px" }}>
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="surface-card relative aspect-[1.586/1] w-full max-w-[420px] cursor-default select-none overflow-hidden rounded-[1.35rem]"
      >
        <div className="surface-dots pointer-events-none absolute inset-0" aria-hidden />
        <div
          className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[#c6a15b]/8 blur-3xl"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -bottom-20 -left-10 h-56 w-56 rounded-full bg-[#1a2a4a]/40 blur-3xl"
          aria-hidden
        />

        <div className="relative z-10 flex h-full flex-col justify-between p-7">
          <div className="flex items-start justify-between">
            <Marca className="h-10 w-10" />
            <ChipIcon />
          </div>

          <div className="space-y-4">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-[#c6a15b]/85">
                Premium Finance
              </p>
              <h2 className="font-display mt-1 text-[1.85rem] font-medium tracking-tight text-white sm:text-[2rem]">
                Soluciones Financieras
              </h2>
            </div>

            <div className="flex flex-wrap gap-2">
              {servicios.map((servicio) => (
                <span
                  key={servicio}
                  className="border border-white/10 bg-white/[0.03] px-3 py-1 text-[10px] font-medium uppercase tracking-[0.12em] text-slate-300/90"
                >
                  {servicio}
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-end justify-between">
            <p className="text-[10px] uppercase tracking-[0.22em] text-slate-500">
              Confianza · Claridad · Resultados
            </p>
            <svg viewBox="0 0 48 24" className="h-6 w-12 text-white/20" aria-hidden>
              <path
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                d="M8 12c6-8 12-8 18 0s12 8 18 0"
              />
              <path
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                d="M14 12c4-5 8-5 12 0s8 5 12 0"
              />
            </svg>
          </div>
        </div>

        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-20 mix-blend-soft-light"
          style={{ background: sheenBackground }}
        />
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-30 mix-blend-overlay"
          style={{ background: glareBackground }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-40 rounded-[1.35rem] ring-1 ring-inset ring-white/10"
        />
      </motion.div>
    </div>
  );
}
