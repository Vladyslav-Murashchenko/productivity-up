import { useEffect, useRef } from "react";

export const useAutoFocusOnDesktop = () => {
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const desktopMediaQuery = globalThis.window.matchMedia(
      "(hover: hover) and (pointer: fine)",
    );

    if (desktopMediaQuery.matches) {
      ref.current?.focus();
    }
  }, []);

  return ref;
};
