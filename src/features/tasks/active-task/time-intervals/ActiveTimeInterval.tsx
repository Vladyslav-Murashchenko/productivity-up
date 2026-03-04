import { useEffect, useState } from "react";

import { TimeIntervalView } from "@/shared-features/time-interval";

import { useActiveTaskState } from "@/libs/api/active-task/useActiveTaskState";

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
    <TimeIntervalView start={activeTaskState.startTime} end={now} isReadonly />
  );
};
