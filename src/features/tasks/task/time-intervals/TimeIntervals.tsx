import { useState } from "react";

import { Task } from "@/libs/api/tasks/model";
import { TimeInterval as TimeIntervalModel } from "@/libs/api/time-intervals/model";
import { useTaskTimeIntervals } from "@/libs/api/time-intervals/useTaskTimeIntervals";

import { AddIntervalButton } from "./AddIntervalButton";
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

  const handleBlockingActionStart = () => {
    setIsReadonly(true);
  };

  const handleBlockingActionEnd = () => {
    setIsReadonly(false);
  };

  if (timeIntervals.length === 0) {
    return (
      <div className="flex flex-col gap-3 py-8">
        <p className="text-center text-muted">No time intervals recorded yet</p>
        <div className="flex flex-col">
          <AddIntervalButton
            className="self-center"
            taskId={taskId}
            isReadonly={isReadonly}
            onAddStart={handleBlockingActionStart}
            onAddFinish={handleBlockingActionEnd}
          />
        </div>
      </div>
    );
  }

  const sortedIntervals = sortByStartAsc(timeIntervals);

  return (
    <ul className="flex flex-col gap-4 pt-4">
      {sortedIntervals.map((interval, i, intervals) => (
        <li className="flex flex-col gap-4 relative" key={interval.id}>
          {i === 0 && (
            <AddIntervalButton
              className="absolute top-0 left-0 -translate-y-[70%] -translate-x-[20%] scale-50"
              taskId={taskId}
              isReadonly={isReadonly}
              onAddStart={handleBlockingActionStart}
              onAddFinish={handleBlockingActionEnd}
              nextIntervalStart={interval.start}
            />
          )}
          <TimeInterval
            prevIntervalEnd={intervals[i - 1]?.end}
            nextIntervalStart={intervals[i + 1]?.start}
            interval={interval}
            isReadonly={isReadonly}
            onEditStart={handleBlockingActionStart}
            onEditFinish={handleBlockingActionEnd}
          />
          <AddIntervalButton
            className="absolute bottom-0 left-0 translate-y-[70%] -translate-x-[20%] scale-50"
            taskId={taskId}
            isReadonly={isReadonly}
            onAddStart={handleBlockingActionStart}
            onAddFinish={handleBlockingActionEnd}
            prevIntervalEnd={interval.end}
            nextIntervalStart={intervals[i + 1]?.start}
          />
        </li>
      ))}
    </ul>
  );
};

function sortByStartAsc(timeIntervals: TimeIntervalModel[]) {
  return timeIntervals.toSorted((a, b) => {
    if (a.start.getTime() === b.start.getTime()) {
      return a.end.getTime() - b.end.getTime();
    }

    return a.start.getTime() - b.start.getTime();
  });
}
