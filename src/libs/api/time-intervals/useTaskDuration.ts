import { differenceInMilliseconds } from "date-fns";
import { useMemo } from "react";

import { Task } from "../tasks/model";
import { useTaskTimeIntervals } from "./useTaskTimeIntervals";

type UseTaskDurationParams = {
  taskId?: Task["id"];
};

export const useTaskDuration = ({ taskId }: UseTaskDurationParams) => {
  const { timeIntervals } = useTaskTimeIntervals(taskId);

  const taskDuration = useMemo(() => {
    if (!timeIntervals) {
      return;
    }

    return timeIntervals
      .map((interval) => differenceInMilliseconds(interval.end, interval.start))
      .reduce((acc, seconds) => acc + seconds, 0);
  }, [timeIntervals]);

  return { taskDuration };
};
