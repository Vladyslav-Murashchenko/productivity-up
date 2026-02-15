import { useState } from "react";

import { AnimatedTimeIntervalList } from "@/libs/animations/AnimatedTimeIntervalList";
import { Task } from "@/libs/api/tasks/model";
import { useTaskTimeIntervals } from "@/libs/api/time-intervals/useTaskTimeIntervals";

import { AddIntervalButton } from "./AddIntervalButton";
import { TimeInterval } from "./TimeInterval";
import { sortIntervals } from "./sortIntervals";

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
            wrapperClassName="self-center"
            taskId={taskId}
            isReadonly={isReadonly}
            onAddStart={handleBlockingActionStart}
            onAddFinish={handleBlockingActionEnd}
          />
        </div>
      </div>
    );
  }

  const sortedIntervals = sortIntervals(timeIntervals);

  return (
    <AnimatedTimeIntervalList className="flex flex-col">
      {sortedIntervals.map((interval, i, intervals) => (
        <AnimatedTimeIntervalList.Item
          key={interval.id}
          className="flex flex-col overflow-hidden"
        >
          {i === 0 && (
            <AddIntervalButton
              wrapperClassName="h-5"
              className="-translate-y-[20%] -translate-x-[20%] scale-50"
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
            wrapperClassName="h-5"
            className="-translate-y-[20%] -translate-x-[20%] scale-50"
            taskId={taskId}
            isReadonly={isReadonly}
            onAddStart={handleBlockingActionStart}
            onAddFinish={handleBlockingActionEnd}
            prevIntervalEnd={interval.end}
            nextIntervalStart={intervals[i + 1]?.start}
          />
        </AnimatedTimeIntervalList.Item>
      ))}
    </AnimatedTimeIntervalList>
  );
};
