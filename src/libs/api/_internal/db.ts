import { Dexie, type EntityTable } from "dexie";

import { ActiveTaskState } from "@/libs/domain/active-task/model";
import { Task } from "@/libs/domain/tasks/model";
import { TimeInterval } from "@/libs/domain/time-intervals/model";

export const ACTIVE_TASK_STATE_PRIMARY_KEY = "singleton";

type ActiveTaskStateEntity = ActiveTaskState & {
  primaryKey: typeof ACTIVE_TASK_STATE_PRIMARY_KEY;
};

export const db = new Dexie("ProductivityUpDB") as Dexie & {
  tasks: EntityTable<Task, "id">;
  activeTaskState: EntityTable<ActiveTaskStateEntity, "primaryKey">;
  timeIntervals: EntityTable<TimeInterval, "id">;
};

db.version(1).stores({
  tasks: "++id, name, status",
  activeTaskState: "primaryKey",
  timeIntervals: "++id, taskId, start, end",
});
