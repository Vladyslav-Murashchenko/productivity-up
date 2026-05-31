import { ArrowsRotateRight } from "@gravity-ui/icons";
import { useEffect, useState } from "react";

import { useTaskSavedDuration } from "@/libs/db/time-intervals/useTaskSavedDuration";
import { ActiveTaskState } from "@/libs/domain/model";
import { calculateActiveSessionDuration } from "@/libs/domain/time-intervals/activeTaskInterval";
import { DurationMode } from "@/libs/domain/time-intervals/timeIntervals";
import { Button } from "@/libs/ui/Button";
import { formatDuration } from "@/libs/ui/utils/formatDuration";

import { TimeIntervalsModal } from "./time-intervals";
import { useTimerMode } from "./useTimerMode";

const MODE_LABEL: Record<DurationMode, string> = {
  total: "Total",
  last: "Last",
  today: "Today",
};

type TimerProps = {
  activeTaskState: ActiveTaskState;
};

export const Timer = ({ activeTaskState }: TimerProps) => {
  const [now, setNow] = useState(() => new Date());
  const { mode, cycleMode } = useTimerMode();

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const { taskDuration } = useTaskSavedDuration({
    taskId: activeTaskState.taskId,
    modeParams: { mode, now },
  });

  if (taskDuration === undefined) {
    return null;
  }

  const totalMs =
    taskDuration + calculateActiveSessionDuration(activeTaskState, now);

  return (
    <div className="flex flex-col items-end">
      <Button
        variant="text"
        className="text-xs opacity-80 gap-1 h-fit"
        onClick={cycleMode}
      >
        {MODE_LABEL[mode]}
        <ArrowsRotateRight className="size-3 m-0" />
      </Button>
      <TimeIntervalsModal taskId={activeTaskState.taskId}>
        <Button variant="text" className="text-3xl">
          {formatDuration(totalMs)}
        </Button>
      </TimeIntervalsModal>
    </div>
  );
};
