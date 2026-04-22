import { Task } from "@/libs/domain/tasks/model";

import { db } from "../_internal/db";

export const updateTaskName = async (taskId: Task["id"], newName: string) => {
  if (newName.trim() === "") {
    throw new Error("Task name cannot be empty");
  }

  await db.tasks.update(taskId, { name: newName });
};
