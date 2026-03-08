import { Task } from "../tasks/model";

export type Interval = {
  start: Date;
  end: Date;
};

export type TimeInterval = Interval & {
  id: number;
  taskId: Task["id"];
};
