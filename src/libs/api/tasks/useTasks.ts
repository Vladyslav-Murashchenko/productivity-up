import { useLiveQuery } from "dexie-react-hooks";

import { db } from "../_internal/db";
import { Task } from "./model";

type UseTasksParams = {
  status?: Task["status"];
};

export const useTasks = ({ status = "todo" }: UseTasksParams) => {
  const tasks = useLiveQuery(() => {
    return db.tasks.where("status").equals(status).toArray();
  }, [status]);

  return { tasks };
};
