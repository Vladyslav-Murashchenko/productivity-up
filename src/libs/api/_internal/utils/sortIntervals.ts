type Interval = {
  start: Date;
  end: Date;
};

export function sortIntervals<T extends Interval>(timeIntervals: T[]) {
  return timeIntervals.toSorted((a, b) => {
    if (a.start.getTime() === b.start.getTime()) {
      return a.end.getTime() - b.end.getTime();
    }

    return a.start.getTime() - b.start.getTime();
  });
}
