import { useEffect, useState } from "react";

import { TimeIntervalCard } from "@/shared-features/time-interval";

import { useActiveTaskState } from "@/libs/db/active-task/useActiveTaskState";

export const ActiveTimeInterval = () => {
  const { activeTaskState } = useActiveTaskState();

  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  if (!activeTaskState) {
    return null;
  }

  return (
    <TimeIntervalCard start={activeTaskState.startTime} end={now} isReadonly />
  );
};
