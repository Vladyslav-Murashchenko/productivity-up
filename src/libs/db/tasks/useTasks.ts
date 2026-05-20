import { useLiveQuery } from "dexie-react-hooks";

import { db } from "../_db";

export const useTasks = () => {
  const tasks = useLiveQuery(() => {
    return db.tasks.toArray();
  });

  return { tasks };
};
