import { useState } from "react";

import { Task } from "@/libs/api/tasks/model";
import { TimeInterval as TimeIntervalModel } from "@/libs/api/time-intervals/model";
import { useTaskTimeIntervals } from "@/libs/api/time-intervals/useTaskTimeIntervals";

import { TimeInterval } from "./TimeInterval";

type TimeIntervalsProps = {
  taskId: Task["id"];
};

export const TimeIntervals = ({ taskId }: TimeIntervalsProps) => {
  const { timeIntervals } = useTaskTimeIntervals(taskId);

  const [isReadonly, setIsReadonly] = useState(false);

  if (!timeIntervals) {
    return null;
  }

  if (timeIntervals.length === 0) {
    return (
      <p className="text-center text-muted py-8">
        No time intervals recorded yet
      </p>
    );
  }

  return (
    <ul className="flex flex-col gap-3">
      {sortByStartAsc(timeIntervals).map((interval, i, intervals) => (
        <li key={interval.id}>
          <TimeInterval
            prevIntervalEnd={intervals[i - 1]?.end}
            nextIntervalStart={intervals[i + 1]?.start}
            interval={interval}
            isReadonly={isReadonly}
            onEditStart={() => setIsReadonly(true)}
            onEditFinish={() => setIsReadonly(false)}
          />
        </li>
      ))}
    </ul>
  );
};

function sortByStartAsc(timeIntervals: TimeIntervalModel[]) {
  return timeIntervals.toSorted(
    (a, b) => a.start.getTime() - b.start.getTime(),
  );
}
