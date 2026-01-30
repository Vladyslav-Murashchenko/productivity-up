import { Dexie, type EntityTable } from "dexie";

import { ActiveTask } from "../active-task/model";
import { Task } from "../tasks/model";
import { TimeInterval } from "../time-intervals/model";

export const db = new Dexie("ProductivityUpDB") as Dexie & {
  tasks: EntityTable<Task, "id">;
  activeTask: EntityTable<ActiveTask, "primaryKey">;
  timeIntervals: EntityTable<TimeInterval, "id">;
};

db.version(1).stores({
  tasks: "++id, name, status",
  activeTask: "primaryKey",
  timeIntervals: "++id, taskId, start, end",
});
