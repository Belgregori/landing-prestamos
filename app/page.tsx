"use client";

import { type MouseEvent } from "react";
import { motion } from "framer-motion";
import Simulador from "@/components/Simulador";
import CambioUSD from "@/components/CambioUSD";
import Legales from "@/components/Legales";
import IrisCurtain from "@/components/IrisCurtain";
import TarjetaPresentacion from "@/components/TarjetaPresentacion";
import ScrollAtmosphere from "@/components/ScrollAtmosphere";
import EnlaceWhatsApp from "@/components/EnlaceWhatsApp";
import WhatsAppFlotante from "@/components/WhatsAppFlotante";
import Marca from "@/components/Marca";
import { WHATSAPP_VISIBLE } from "@/lib/whatsapp";
import { useIrisTransition } from "@/hooks/useIrisTransition";

type Seccion = "simulador" | "cambio" | "legales";

const menu: { id: Seccion; label: string }[] = [
  { id: "simulador", label: "Préstamos" },
  { id: "cambio", label: "Cotización" },
  { id: "legales", label: "Condiciones" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};

function originFromClick(event: MouseEvent<HTMLButtonElement>) {
  const rect = event.currentTarget.getBoundingClientRect();
  return {
    x: ((rect.left + rect.width / 2) / window.innerWidth) * 100,
    y: ((rect.top + rect.height / 2) / window.innerHeight) * 100,
  };
}

export default function Home() {
  const {
    value: seccionActiva,
    transition,
    phase,
    origin,
    isPending,
    onCoverComplete,
    onRevealComplete,
  } = useIrisTransition<Seccion>("simulador");

  const handleNavClick = (id: Seccion, event: MouseEvent<HTMLButtonElement>) => {
    transition(id, originFromClick(event));
  };

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#05070e] text-slate-200">
      <ScrollAtmosphere />

      <IrisCurtain
        phase={phase}
        origin={origin}
        onCoverComplete={onCoverComplete}
        onRevealComplete={onRevealComplete}
      />

      <header className="relative z-20 mx-auto flex w-full max-w-5xl items-center justify-between px-6 py-6 sm:px-8">
        <div className="flex items-center gap-3">
          <Marca className="h-8 w-8" />
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-[#e8edf5]">
              Premium Finance
            </p>
            <p className="text-[10px] uppercase tracking-[0.18em] text-slate-500">
              Soluciones financieras
            </p>
          </div>
        </div>
        <nav className="hidden items-center gap-8 text-[11px] uppercase tracking-[0.2em] text-slate-400 sm:flex">
          <a href="#servicios" className="transition hover:text-white">
            Operatoria
          </a>
          <a href="#contacto" className="transition hover:text-white">
            Contacto
          </a>
        </nav>
      </header>

      <section className="relative z-10 flex min-h-[calc(100vh-5.5rem)] flex-col items-center justify-center px-6 pb-20 pt-6">
        <div className="relative z-10 flex w-full max-w-5xl flex-col items-center gap-14 lg:flex-row lg:items-center lg:justify-between lg:gap-16">
          <motion.div
            className="order-2 max-w-lg text-center lg:order-1 lg:text-left"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-[11px] font-medium uppercase tracking-[0.34em] text-[#c6a15b]/85">
              Atención personalizada
            </p>
            <h1 className="font-display mt-4 text-4xl font-medium leading-[1.12] tracking-tight text-white sm:text-5xl">
              Claridad en cada operación.
            </h1>
            <p className="mx-auto mt-5 max-w-md text-[15px] leading-relaxed text-slate-400 lg:mx-0">
              Préstamos personales, cotización de monedas y asesoramiento.
              Condiciones informadas de antemano, sin ofertas agresivas ni
              promesas que no se puedan sostener.
            </p>
            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row lg:items-start">
              <EnlaceWhatsApp mensaje="Hola, deseo una consulta sobre sus servicios.">
                Solicitar consulta
              </EnlaceWhatsApp>
              <a
                href="#servicios"
                className="inline-flex items-center justify-center border border-transparent px-6 py-3 text-[11px] font-medium uppercase tracking-[0.22em] text-slate-400 transition hover:text-white"
              >
                Ver operatoria
              </a>
            </div>
          </motion.div>

          <div className="order-1 lg:order-2">
            <TarjetaPresentacion />
          </div>
        </div>

        <motion.a
          href="#servicios"
          className="absolute bottom-8 flex flex-col items-center gap-2 text-slate-600 transition-colors hover:text-slate-300"
          aria-label="Ir a operatoria"
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="text-[10px] uppercase tracking-[0.28em]">Continuar</span>
        </motion.a>
      </section>

      <section
        id="servicios"
        className="relative z-10 flex flex-col items-center px-6 py-24 text-slate-200"
      >
        <motion.header
          className="relative mb-14 max-w-xl text-center"
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.1 } },
          }}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.35 }}
        >
          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="mb-3 text-[11px] font-medium uppercase tracking-[0.34em] text-[#c6a15b]/80"
          >
            Operatoria
          </motion.p>
          <motion.h2
            variants={fadeUp}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="font-display mb-4 text-4xl font-medium tracking-tight text-white"
          >
            Tres servicios, un mismo criterio.
          </motion.h2>
          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mb-10 text-sm leading-relaxed text-slate-400"
          >
            Elegí el área que necesitás. Cada consulta se responde de forma directa.
          </motion.p>

          <nav className="flex flex-wrap justify-center gap-x-8 gap-y-3 border-b border-white/10">
            {menu.map(({ id, label }, index) => (
              <motion.button
                key={id}
                type="button"
                variants={fadeUp}
                transition={{
                  duration: 0.45,
                  delay: index * 0.04,
                  ease: [0.22, 1, 0.36, 1],
                }}
                disabled={isPending}
                onClick={(event) => handleNavClick(id, event)}
                className={`relative -mb-px pb-3 text-[11px] font-medium uppercase tracking-[0.22em] transition disabled:cursor-not-allowed disabled:opacity-60 ${
                  seccionActiva === id
                    ? "text-white after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-[#c6a15b]"
                    : "text-slate-500 hover:text-slate-200"
                }`}
              >
                {label}
              </motion.button>
            ))}
          </nav>
        </motion.header>

        <motion.div
          className="relative w-full max-w-lg"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          {seccionActiva === "simulador" && <Simulador />}
          {seccionActiva === "cambio" && <CambioUSD />}
          {seccionActiva === "legales" && <Legales />}
        </motion.div>
      </section>

      <footer
        id="contacto"
        className="relative z-10 border-t border-white/10 px-6 py-16"
      >
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-8 text-center sm:flex-row sm:text-left">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-[#c6a15b]/80">
              Contacto
            </p>
            <p className="font-display mt-2 text-3xl font-medium text-white">
              {WHATSAPP_VISIBLE}
            </p>
            <p className="mt-2 max-w-sm text-sm leading-relaxed text-slate-500">
              Consultas por préstamos, cotización y condiciones de operatoria.
            </p>
          </div>
          <EnlaceWhatsApp mensaje="Hola, deseo una consulta sobre sus servicios.">
            Iniciar consulta
          </EnlaceWhatsApp>
        </div>
        <p className="mx-auto mt-12 max-w-5xl text-center text-[10px] uppercase tracking-[0.2em] text-slate-600 sm:text-left">
          Premium Finance · Córdoba
        </p>
      </footer>

      <WhatsAppFlotante />
    </main>
  );
}
