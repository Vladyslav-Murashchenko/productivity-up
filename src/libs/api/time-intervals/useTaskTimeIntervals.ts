import { useLiveQuery } from "dexie-react-hooks";

import { db } from "../_internal/db";
import { Task } from "../tasks/model";

export const useTaskTimeIntervals = (taskId?: Task["id"]) => {
  const timeIntervals = useLiveQuery(async () => {
    if (!taskId) {
      return;
    }

    return db.timeIntervals.where("taskId").equals(taskId).toArray();
  }, [taskId]);

  return { timeIntervals };
};
