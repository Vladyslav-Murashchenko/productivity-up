import { db } from "../_internal/db";
import { ACTIVE_TASK_STATE_PRIMARY_KEY } from "../active-task/model";

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

      await db.timeIntervals.add({
        taskId: activeTaskState.taskId,
        start: activeTaskState.startTime,
        end: now,
      });

      await db.tasks.update(activeTaskState.taskId, { status: "done" });

      await db.activeTaskState.delete(ACTIVE_TASK_STATE_PRIMARY_KEY);
    },
  );
};
