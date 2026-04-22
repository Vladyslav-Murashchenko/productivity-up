import { useLiveQuery } from "dexie-react-hooks";

import { Task } from "@/libs/domain/tasks/model";
import { sortIntervals } from "@/libs/domain/time-intervals/sortIntervals";

import { db } from "../_internal/db";

export const useTaskTimeIntervals = (taskId?: Task["id"]) => {
  const timeIntervals = useLiveQuery(async () => {
    if (!taskId) {
      return;
    }

    return db.timeIntervals.where("taskId").equals(taskId).toArray();
  }, [taskId]);

  return {
    timeIntervals: timeIntervals && sortIntervals(timeIntervals),
  };
};
