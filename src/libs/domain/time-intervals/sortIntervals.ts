import { differenceInMilliseconds, isEqual } from "date-fns";

import { Interval } from "../model";

export function sortIntervals<T extends Interval>(timeIntervals: T[]) {
  return timeIntervals.toSorted((a, b) => {
    if (isEqual(a.start, b.start)) {
      return differenceInMilliseconds(a.end, b.end);
    }

    return differenceInMilliseconds(a.start, b.start);
  });
}
