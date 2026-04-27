import { differenceInMilliseconds } from "date-fns";

import { ActiveTaskState, TimeInterval } from "../model";

const SAVE_INTERVAL_THRESHOLD_MS = 3000;

export function shouldSaveInterval(
  activeTaskState: ActiveTaskState,
  now: Date,
) {
  const diff = differenceInMilliseconds(now, activeTaskState.startTime);
  return diff >= SAVE_INTERVAL_THRESHOLD_MS;
}

export function closeActiveTaskInterval(
  activeTaskState: ActiveTaskState,
  now: Date,
): Omit<TimeInterval, "id"> {
  return {
    taskId: activeTaskState.taskId,
    start: activeTaskState.startTime,
    end: now,
  };
}
