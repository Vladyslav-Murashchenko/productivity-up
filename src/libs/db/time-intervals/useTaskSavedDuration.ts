import { useMemo } from "react";

import { Task } from "@/libs/domain/model";
import {
  CalculateDurationModeParams,
  calculateSavedDuration,
} from "@/libs/domain/time-intervals/timeIntervals";

import { useTaskTimeIntervals } from "./useTaskTimeIntervals";

type UseTaskSavedDurationParams = {
  taskId?: Task["id"];
  modeParams?: CalculateDurationModeParams;
};

export const useTaskSavedDuration = ({
  taskId,
  modeParams,
}: UseTaskSavedDurationParams) => {
  const { timeIntervals } = useTaskTimeIntervals(taskId);

  const taskDuration = useMemo(() => {
    if (!timeIntervals) {
      return;
    }

    return calculateSavedDuration({ timeIntervals, modeParams });
  }, [timeIntervals, modeParams]);

  return { taskDuration };
};
