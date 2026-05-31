import { differenceInMilliseconds, isEqual, isSameDay } from "date-fns";

import { Interval } from "../model";

export type DurationMode = "total" | "today" | "last";

export const NEXT_MODE: Record<DurationMode, DurationMode> = {
  total: "last",
  last: "today",
  today: "total",
};

export const isDurationMode = (value: unknown): value is DurationMode =>
  value === "total" || value === "last" || value === "today";

export type CalculateDurationModeParams =
  | {
      mode: "today";
      now: Date;
    }
  | { mode: "total" | "last" };

type CalculateDurationOptions = {
  timeIntervals: Interval[];
  modeParams?: CalculateDurationModeParams;
};

export function calculateSavedDuration({
  timeIntervals,
  modeParams = { mode: "total" },
}: CalculateDurationOptions) {
  if (modeParams.mode === "last") {
    return 0;
  }

  return timeIntervals
    .filter((interval) => {
      if (modeParams.mode === "today") {
        return isSameDay(interval.start, modeParams.now);
      }

      return true;
    })
    .map((interval) => differenceInMilliseconds(interval.end, interval.start))
    .reduce((acc, ms) => acc + ms, 0);
}

export function sortIntervals<T extends Interval>(timeIntervals: T[]) {
  return timeIntervals.toSorted((a, b) => {
    if (isEqual(a.start, b.start)) {
      return differenceInMilliseconds(a.end, b.end);
    }

    return differenceInMilliseconds(a.start, b.start);
  });
}
