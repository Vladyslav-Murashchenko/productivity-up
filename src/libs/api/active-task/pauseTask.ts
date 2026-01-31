import { db } from "../_internal/db";
import { ACTIVE_TASK_STATE_PRIMARY_KEY } from "./model";

export const pauseActiveTask = async () => {
  const now = new Date();

  await db.transaction("rw", db.activeTaskState, db.timeIntervals, async () => {
    const activeTaskState = await db.activeTaskState.get(
      ACTIVE_TASK_STATE_PRIMARY_KEY,
    );

    if (!activeTaskState) {
      return;
    }

    await db.timeIntervals.add({
      taskId: activeTaskState.taskId,
      start: activeTaskState.startTime,
      end: now,
    });

    await db.activeTaskState.delete(ACTIVE_TASK_STATE_PRIMARY_KEY);
  });
};
