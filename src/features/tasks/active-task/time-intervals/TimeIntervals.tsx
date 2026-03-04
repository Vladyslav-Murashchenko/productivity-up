import { TimeIntervalView } from "@/shared-features/time-interval";

import { Task } from "@/libs/api/tasks/model";
import { useTaskTimeIntervals } from "@/libs/api/time-intervals/useTaskTimeIntervals";

import { ActiveTimeInterval } from "./ActiveTimeInterval";

type TimeIntervalsProps = {
  taskId: Task["id"];
};

export const TimeIntervals = ({ taskId }: TimeIntervalsProps) => {
  const { timeIntervals } = useTaskTimeIntervals(taskId);

  if (!timeIntervals) {
    return null;
  }

  return (
    <ul className="flex flex-col gap-5.5">
      {timeIntervals.map((interval) => (
        <li key={interval.id}>
          <TimeIntervalView
            start={interval.start}
            end={interval.end}
            isReadonly
          />
        </li>
      ))}
      <li>
        <ActiveTimeInterval />
      </li>
    </ul>
  );
};
