import { useMemo } from "react";

import { Task } from "@/libs/domain/tasks/model";
import { calculateDuration } from "@/libs/domain/time-intervals/calculateDuration";

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

    return calculateDuration(timeIntervals);
  }, [timeIntervals]);

  return { taskDuration };
};
