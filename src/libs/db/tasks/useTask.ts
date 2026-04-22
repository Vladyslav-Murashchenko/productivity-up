import { useLiveQuery } from "dexie-react-hooks";

import { Task } from "@/libs/domain/tasks/model";

import { db } from "../_internal/db";

export const useTask = (taskId?: Task["id"]) => {
  const task = useLiveQuery(() => {
    if (!taskId) {
      return;
    }

    return db.tasks.get(taskId);
  }, [taskId]);

  return { task };
};
