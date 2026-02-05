import { db } from "../_internal/db";
import { TimeInterval } from "./model";

export const deleteTimeInterval = async (
  id: TimeInterval["id"]
): Promise<void> => {
  await db.timeIntervals.delete(id);
};
