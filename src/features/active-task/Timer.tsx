import { differenceInMilliseconds } from "date-fns";
import { useEffect, useState } from "react";

import { Task } from "@/libs/api/tasks/model";
import { useTaskTime } from "@/libs/api/time-intervals/useTaskTime";
import { Duration } from "@/libs/ui/Duration";

type TimerProps = {
  startTime: Date;
  taskId: Task["id"];
};

const MS_IN_SECOND = 1000;

export const Timer = ({ startTime, taskId }: TimerProps) => {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const { taskTime } = useTaskTime({ taskId });

  if (taskTime === undefined) {
    return null;
  }

  const totalMs = taskTime + differenceInMilliseconds(now, startTime);
  const totalSeconds = Math.floor(totalMs / MS_IN_SECOND);

  return <Duration totalSeconds={totalSeconds} />;
};
