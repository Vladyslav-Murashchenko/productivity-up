import { Task } from "../tasks/model";

export const ACTIVE_TASK_STATE_PRIMARY_KEY = "singleton";

export type ActiveTaskState = {
  primaryKey: typeof ACTIVE_TASK_STATE_PRIMARY_KEY;
  taskId: Task["id"];
  startTime: Date;
};
