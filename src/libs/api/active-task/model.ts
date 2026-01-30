import { Task } from "../tasks/model";

export type ActiveTask = {
  primaryKey: "singleton";
  id: Task["id"];
  startDate: Date;
};
