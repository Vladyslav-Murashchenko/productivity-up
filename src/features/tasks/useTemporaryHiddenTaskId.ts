import { useEffect, useEffectEvent, useState } from "react";

import { Task } from "@/libs/api/tasks/model";

/**
 * Prevents a just-finished active task from flashing in the "to-do" list
 * while tasks query is still stale.
 */
export const useTemporaryHiddenTaskId = (tasks?: Task[]) => {
  const [temporaryHiddenId, setTemporaryHiddenId] = useState<Task["id"] | null>(
    null,
  );

  const temporaryHideTask = (taskId: Task["id"]) => {
    setTemporaryHiddenId(taskId);
  };

  const clearHidden = useEffectEvent(() => {
    setTemporaryHiddenId(null);
  });

  useEffect(() => {
    if (tasks) {
      clearHidden();
    }
  }, [tasks]);

  return {
    temporaryHiddenTaskId: temporaryHiddenId,
    temporaryHideTask,
  };
};
