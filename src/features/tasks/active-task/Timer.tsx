import { differenceInMilliseconds } from "date-fns";
import { useEffect, useState } from "react";

import { useTaskDuration } from "@/libs/db/time-intervals/useTaskDuration";
import { Task } from "@/libs/domain/tasks/model";
import { Button } from "@/libs/ui/Button";
import { formatDuration } from "@/libs/ui/utils/formatDuration";

import { TimeIntervalsModal } from "./time-intervals";

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

  return (
    <TimeIntervalsModal taskId={taskId}>
      <Button variant="text" className="text-3xl">
        {formatDuration(totalMs)}
      </Button>
    </TimeIntervalsModal>
  );
};
