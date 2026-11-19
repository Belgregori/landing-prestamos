"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect } from "react";
import type { IrisOrigin } from "@/hooks/useIrisTransition";

type Phase = "idle" | "covering" | "revealing";

type Props = {
  phase: Phase;
  origin: IrisOrigin;
  onCoverComplete: () => void;
  onRevealComplete: () => void;
};

function clipAt(origin: IrisOrigin, radius: string) {
  return `circle(${radius} at ${origin.x}% ${origin.y}%)`;
}

export default function IrisCurtain({
  phase,
  origin,
  onCoverComplete,
  onRevealComplete,
}: Props) {
  const prefersReducedMotion = useReducedMotion();
  const isCovering = phase === "covering";

  useEffect(() => {
    if (phase === "idle" || !prefersReducedMotion) return;
    if (isCovering) onCoverComplete();
    else onRevealComplete();
  }, [phase, isCovering, prefersReducedMotion, onCoverComplete, onRevealComplete]);

  if (phase === "idle" || prefersReducedMotion) return null;

  return (
    <motion.div
      className="fixed inset-0 z-50 bg-[#05070e]"
      aria-hidden
      initial={{ clipPath: clipAt(origin, isCovering ? "0%" : "150%") }}
      animate={{ clipPath: clipAt(origin, isCovering ? "150%" : "0%") }}
      transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
      onAnimationComplete={() => {
        if (isCovering) onCoverComplete();
        else onRevealComplete();
      }}
    />
  );
}
