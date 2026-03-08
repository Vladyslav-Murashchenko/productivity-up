import { Task } from "../tasks/model";

export type ActiveTaskState = {
  taskId: Task["id"];
  startTime: Date;
};
