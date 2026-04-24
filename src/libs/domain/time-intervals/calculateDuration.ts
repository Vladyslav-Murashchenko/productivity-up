import { differenceInMilliseconds } from "date-fns";

import { Interval } from "../model";

export const calculateDuration = (timeIntervals: Interval[]) => {
  return timeIntervals
    .map((interval) => differenceInMilliseconds(interval.end, interval.start))
    .reduce((acc, ms) => acc + ms, 0);
};
