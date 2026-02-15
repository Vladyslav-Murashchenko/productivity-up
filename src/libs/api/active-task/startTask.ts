import { differenceInMilliseconds } from "date-fns";

import { db } from "../_internal/db";
import {
  ACTIVE_TASK_STATE_PRIMARY_KEY,
  ActiveTaskState,
} from "../active-task/model";
import { Task } from "../tasks/model";

export const startTask = async (taskId: Task["id"]) => {
  const now = new Date();

  await db.transaction("rw", db.activeTaskState, db.timeIntervals, async () => {
    const activeTaskState = await db.activeTaskState.get(
      ACTIVE_TASK_STATE_PRIMARY_KEY,
    );

    if (activeTaskState && shouldSaveInterval(now, activeTaskState)) {
      await db.timeIntervals.add({
        taskId: activeTaskState.taskId,
        start: activeTaskState.startTime,
        end: now,
      });
    }

    await db.activeTaskState.put({
      primaryKey: ACTIVE_TASK_STATE_PRIMARY_KEY,
      taskId,
      startTime: now,
    });
  });
};

const SAVE_INTERVAL_THRESHOLD_MS = 3000;

const shouldSaveInterval = (now: Date, activeTaskState: ActiveTaskState) => {
  const diff = differenceInMilliseconds(now, activeTaskState.startTime);
  return diff >= SAVE_INTERVAL_THRESHOLD_MS;
};
