"use client";

import { useCallback, useRef, useState } from "react";

type Phase = "idle" | "covering" | "revealing";

export type IrisOrigin = { x: number; y: number };

export function useIrisTransition<T>(initial: T) {
  const [value, setValue] = useState(initial);
  const [phase, setPhase] = useState<Phase>("idle");
  const [origin, setOrigin] = useState<IrisOrigin>({ x: 50, y: 50 });
  const pendingRef = useRef<T | null>(null);

  const isPending = phase !== "idle";

  const transition = useCallback(
    (next: T, originPercent?: IrisOrigin) => {
      if (next === value || phase !== "idle") return;

      if (originPercent) setOrigin(originPercent);
      pendingRef.current = next;
      setPhase("covering");
    },
    [value, phase],
  );

  const onCoverComplete = useCallback(() => {
    if (pendingRef.current !== null) {
      setValue(pendingRef.current);
      pendingRef.current = null;
      setPhase("revealing");
    }
  }, []);

  const onRevealComplete = useCallback(() => {
    setPhase("idle");
  }, []);

  return { value, transition, phase, origin, isPending, onCoverComplete, onRevealComplete };
}
