import { db } from "../_internal/db";

export const deleteTask = async (taskId: number): Promise<void> => {
  await db.tasks.delete(taskId);
};
