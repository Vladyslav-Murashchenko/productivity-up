import { useLiveQuery } from "dexie-react-hooks";

import { db } from "../_internal/db";
import { ACTIVE_TASK_STATE_PRIMARY_KEY } from "../active-task/model";

export const useActiveTaskState = () => {
  const activeTaskState = useLiveQuery(() => {
    return db.activeTaskState.get(ACTIVE_TASK_STATE_PRIMARY_KEY);
  });

  return { activeTaskState };
};
