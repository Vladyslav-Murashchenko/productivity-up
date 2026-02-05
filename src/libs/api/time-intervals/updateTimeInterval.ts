import { db } from "../_internal/db";
import { TimeInterval } from "./model";

type UpdateTimeIntervalParams = {
  id: TimeInterval["id"];
  start: Date;
  end: Date;
};

export const updateTimeInterval = async ({
  id,
  start,
  end,
}: UpdateTimeIntervalParams): Promise<void> => {
  const interval = await db.timeIntervals.get(id);

  if (!interval) {
    throw new Error("Time interval not found");
  }

  if (start > end) {
    throw new Error("Start time must be before end time");
  }

  await db.timeIntervals.update(id, { start, end });
};
