import { TimeInterval } from "@/libs/domain/time-intervals/model";

import { db } from "../_internal/db";

export const deleteTimeInterval = async (
  id: TimeInterval["id"],
): Promise<void> => {
  await db.timeIntervals.delete(id);
};
