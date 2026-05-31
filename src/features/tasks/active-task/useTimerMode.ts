import { useState } from "react";

import {
  NEXT_MODE,
  isDurationMode,
} from "@/libs/domain/time-intervals/timeIntervals";

const STORAGE_KEY = "productivity-up:timer-mode";

export const useTimerMode = () => {
  const [mode, setMode] = useState(() => {
    const stored = localStorage.getItem(STORAGE_KEY);

    return isDurationMode(stored) ? stored : "today";
  });

  return {
    mode,
    cycleMode: () => {
      setMode((current) => {
        const next = NEXT_MODE[current];
        localStorage.setItem(STORAGE_KEY, next);
        return next;
      });
    },
  };
};
