import { addHours, min, subHours } from "date-fns";

const DEFAULT_INTERVAL_DURATION_HOURS = 1;

export function getInitialStart(
  mountTime: Date,
  prevIntervalEnd?: Date,
  nextIntervalStart?: Date,
): Date {
  if (prevIntervalEnd) {
    return prevIntervalEnd;
  }

  if (nextIntervalStart) {
    return subHours(nextIntervalStart, DEFAULT_INTERVAL_DURATION_HOURS);
  }

  return subHours(mountTime, DEFAULT_INTERVAL_DURATION_HOURS);
}

export function getInitialEnd(
  mountTime: Date,
  initialStart: Date,
  nextIntervalStart?: Date,
): Date {
  if (nextIntervalStart) {
    return min([
      nextIntervalStart,
      addHours(initialStart, DEFAULT_INTERVAL_DURATION_HOURS),
    ]);
  }

  return min([
    mountTime,
    addHours(initialStart, DEFAULT_INTERVAL_DURATION_HOURS),
  ]);
}
