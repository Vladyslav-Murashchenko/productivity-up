import { db } from "../_internal/db";
import { Task } from "./model";

export const reopenTask = async (taskId: Task["id"]) => {
  await db.tasks.update(taskId, { status: "todo" });
};
