import { differenceInMilliseconds } from "date-fns";
import { useEffect, useState } from "react";

import { Task } from "@/libs/api/tasks/model";
import { useTaskDuration } from "@/libs/api/time-intervals/useTaskDuration";
import { formatDuration } from "@/libs/ui/utils/formatDuration";

type TimerProps = {
  startTime: Date;
  taskId: Task["id"];
};

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

  const { taskDuration } = useTaskDuration({ taskId });

  if (taskDuration === undefined) {
    return null;
  }

  const totalMs = taskDuration + differenceInMilliseconds(now, startTime);

  return <span className="text-3xl">{formatDuration(totalMs)}</span>;
};
