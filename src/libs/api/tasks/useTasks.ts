import { useLiveQuery } from "dexie-react-hooks";

import { db } from "../_internal/db";

export const useTasks = () => {
  const tasks = useLiveQuery(() => {
    return db.tasks.toArray();
  });

  return { tasks };
};
