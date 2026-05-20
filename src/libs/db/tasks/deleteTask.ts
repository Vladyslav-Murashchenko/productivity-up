import { db } from "../_db";

export const deleteTask = async (taskId: number): Promise<void> => {
  await db.tasks.delete(taskId);
};
