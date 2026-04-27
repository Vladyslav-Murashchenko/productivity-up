import {
  closeActiveTaskInterval,
  shouldSaveInterval,
} from "@/libs/domain/time-intervals/activeTaskInterval";

import { ACTIVE_TASK_STATE_PRIMARY_KEY, db } from "../_internal/db";

export const completeActiveTask = async () => {
  const now = new Date();

  await db.transaction(
    "rw",
    db.activeTaskState,
    db.timeIntervals,
    db.tasks,
    async () => {
      const activeTaskState = await db.activeTaskState.get(
        ACTIVE_TASK_STATE_PRIMARY_KEY,
      );

      if (!activeTaskState) {
        throw new Error("No active task to complete");
      }

      if (shouldSaveInterval(activeTaskState, now)) {
        await db.timeIntervals.add(
          closeActiveTaskInterval(activeTaskState, now),
        );
      }

      await db.tasks.update(activeTaskState.taskId, { status: "done" });

      await db.activeTaskState.delete(ACTIVE_TASK_STATE_PRIMARY_KEY);
    },
  );
};
