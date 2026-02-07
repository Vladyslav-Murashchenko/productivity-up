import { db } from "../_internal/db";
import { Task } from "../tasks/model";

type CreateTimeIntervalParams = {
  taskId: Task["id"];
  start: Date;
  end: Date;
};

export const createTimeInterval = async ({
  taskId,
  start,
  end,
}: CreateTimeIntervalParams): Promise<void> => {
  const now = new Date();

  if (start > end) {
    throw new Error("Start time must be before end time");
  }

  if (end > now) {
    throw new Error("End time cannot be in the future");
  }

  await db.timeIntervals.add({
    taskId,
    start,
    end,
  });
};
