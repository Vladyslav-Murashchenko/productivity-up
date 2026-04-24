import { useLiveQuery } from "dexie-react-hooks";

import { ActiveTaskState } from "@/libs/domain/model";

import { ACTIVE_TASK_STATE_PRIMARY_KEY, db } from "../_internal/db";

export const useActiveTaskState = () => {
  const activeTaskState: ActiveTaskState | undefined = useLiveQuery(() => {
    return db.activeTaskState.get(ACTIVE_TASK_STATE_PRIMARY_KEY);
  });

  return { activeTaskState };
};
