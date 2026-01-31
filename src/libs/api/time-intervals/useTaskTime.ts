import { differenceInMilliseconds } from "date-fns";
import { useMemo } from "react";

import { Task } from "../tasks/model";
import { useTaskTimeIntervals } from "./useTaskTimeIntervals";

type UseTaskTimeParams = {
  taskId?: Task["id"];
  unit?: "ms" | "s";
};

const MS_IN_SECOND = 1000;

export const useTaskTime = ({ taskId, unit = "ms" }: UseTaskTimeParams) => {
  const { timeIntervals } = useTaskTimeIntervals(taskId);

  const taskTime = useMemo(() => {
    if (!timeIntervals) {
      return;
    }

    const ms = timeIntervals
      .map((interval) => differenceInMilliseconds(interval.end, interval.start))
      .reduce((acc, seconds) => acc + seconds, 0);

    if (unit === "s") {
      return Math.floor(ms / MS_IN_SECOND);
    }

    return ms;
  }, [timeIntervals, unit]);

  return { taskTime };
};
