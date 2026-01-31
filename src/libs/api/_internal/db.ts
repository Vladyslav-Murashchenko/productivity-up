import { Dexie, type EntityTable } from "dexie";

import { ActiveTaskState } from "../active-task/model";
import { Task } from "../tasks/model";
import { TimeInterval } from "../time-intervals/model";

export const db = new Dexie("ProductivityUpDB") as Dexie & {
  tasks: EntityTable<Task, "id">;
  activeTaskState: EntityTable<ActiveTaskState, "primaryKey">;
  timeIntervals: EntityTable<TimeInterval, "id">;
};

db.version(1).stores({
  tasks: "++id, name, status",
  activeTaskState: "primaryKey",
  timeIntervals: "++id, taskId, start, end",
});
