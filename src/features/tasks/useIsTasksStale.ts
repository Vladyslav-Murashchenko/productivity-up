import { useEffectEvent, useLayoutEffect, useState } from "react";

import { Task } from "@/libs/api/tasks/model";

import { Filter } from "./Filters";

/**
 * This hook is used to fix a UI bug where
 * when the user switches between filters, the tasks list will be stale for a moment because of the way dexie works
 * This staleness is usually ok but in case, when one list is empty, the user will see incorrect empty message for a moment
 * This leads to blinking effect which I don't want to have in UI.
 */
export const useIsTasksStale = (filter: Filter, tasks?: Task[]) => {
  const [isStale, setIsStale] = useState(false);

  const becomeStale = useEffectEvent(() => {
    if (tasks) {
      setIsStale(true);
    }
  });

  useLayoutEffect(() => {
    becomeStale();
  }, [filter]);

  const becomeFresh = useEffectEvent(() => {
    setIsStale(false);
  });

  useLayoutEffect(() => {
    becomeFresh();
  }, [tasks]);

  return isStale;
};
