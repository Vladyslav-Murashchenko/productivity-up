import { useEffect, useRef } from "react";

export const useAutoFocusOnDesktop = () => {
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const isDesktop =
      globalThis.window.matchMedia?.("(hover: hover) and (pointer: fine)")
        .matches ?? false;

    if (isDesktop) {
      ref.current?.focus();
    }
  }, []);

  return ref;
};
