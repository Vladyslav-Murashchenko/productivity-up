import { Task } from "@/libs/domain/model";
import {
  closeActiveTaskInterval,
  shouldSaveInterval,
} from "@/libs/domain/time-intervals/activeTaskInterval";

import { ACTIVE_TASK_STATE_PRIMARY_KEY, db } from "../_internal/db";

export const startTask = async (taskId: Task["id"]) => {
  const now = new Date();

  await db.transaction("rw", db.activeTaskState, db.timeIntervals, async () => {
    const activeTaskState = await db.activeTaskState.get(
      ACTIVE_TASK_STATE_PRIMARY_KEY,
    );

    if (activeTaskState && shouldSaveInterval(activeTaskState, now)) {
      await db.timeIntervals.add(closeActiveTaskInterval(activeTaskState, now));
    }

    await db.activeTaskState.put({
      primaryKey: ACTIVE_TASK_STATE_PRIMARY_KEY,
      taskId,
      startTime: now,
    });
  });
};
