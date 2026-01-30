import { db } from "../_internal/db";

export const createTask = async (taskName: string) => {
  if (taskName.trim() === "") {
    throw new Error("Task name cannot be empty");
  }

  await db.tasks.add({
    name: taskName,
    status: "todo",
  });
};
