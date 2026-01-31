import { useLiveQuery } from "dexie-react-hooks";

import { ACTIVE_TASK_STATE_PRIMARY_KEY } from "@/libs/api/active-task/model";

import { db } from "../_internal/db";

export const useActiveTaskState = () => {
  const activeTaskState = useLiveQuery(() => {
    return db.activeTaskState.get(ACTIVE_TASK_STATE_PRIMARY_KEY);
  });

  return { activeTaskState };
};
