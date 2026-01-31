import { useLiveQuery } from "dexie-react-hooks";

import { db } from "@/libs/api/_internal/db";

import { Task } from "./model";

export const useTask = (taskId?: Task["id"]) => {
  const task = useLiveQuery(() => {
    if (!taskId) {
      return;
    }

    return db.tasks.get(taskId);
  }, [taskId]);

  return { task };
};
