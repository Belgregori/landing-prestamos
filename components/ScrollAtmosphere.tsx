"use client";

import { motion, useScroll, useTransform } from "framer-motion";

export default function ScrollAtmosphere() {
  const { scrollYProgress } = useScroll();
  const veil = useTransform(scrollYProgress, [0, 1], [0.18, 0.42]);
  const yA = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const yB = useTransform(scrollYProgress, [0, 1], [20, -70]);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden>
      <div className="absolute inset-0 bg-[#05070e]" />
      <div
        className="absolute inset-0 opacity-[0.055]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.85) 1px, transparent 0)",
          backgroundSize: "22px 22px",
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_50%_0%,rgba(28,42,72,0.45),transparent_70%)]" />
      <motion.div
        className="absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(4,6,12,0.55))]"
        style={{ opacity: veil }}
      />
      <motion.div
        className="absolute left-[-12%] top-[8%] h-[420px] w-[420px] rounded-full bg-[#1a2a4a]/25 blur-[110px]"
        style={{ y: yA }}
      />
      <motion.div
        className="absolute right-[-10%] top-[42%] h-[380px] w-[380px] rounded-full bg-[#c6a15b]/6 blur-[120px]"
        style={{ y: yB }}
      />
    </div>
  );
}
