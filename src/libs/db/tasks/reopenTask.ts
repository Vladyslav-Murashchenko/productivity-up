import { Task } from "@/libs/domain/model";

import { db } from "../_internal/db";

export const reopenTask = async (taskId: Task["id"]) => {
  await db.tasks.update(taskId, { status: "todo" });
};
