import { Task } from "../tasks/model";

export type TimeInterval = {
  id: number;
  taskId: Task["id"];
  start: Date;
  end: Date;
};
