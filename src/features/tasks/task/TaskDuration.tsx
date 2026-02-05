import { Clock } from "@gravity-ui/icons";
import { useId } from "react";

import { Task } from "@/libs/api/tasks/model";
import { useTaskDuration } from "@/libs/api/time-intervals/useTaskDuration";
import { Button } from "@/libs/ui/Button";
import { formatDuration } from "@/libs/ui/utils/formatDuration";

import { TimeIntervalsModal } from "./time-intervals";

type TaskDurationProps = {
  taskId: Task["id"];
};

export const TaskDuration = ({ taskId }: TaskDurationProps) => {
  const editTaskTimeDescId = useId();

  const { taskDuration } = useTaskDuration({ taskId });

  if (taskDuration === undefined) {
    return null;
  }

  return (
    <>
      <TimeIntervalsModal taskId={taskId}>
        <Button
          variant="text"
          className="flex items-center gap-1 text-muted"
          aria-describedby={editTaskTimeDescId}
        >
          <Clock />
          <span>{formatDuration(taskDuration)}</span>
        </Button>
      </TimeIntervalsModal>
      <span id={editTaskTimeDescId} className="sr-only">
        Edit task time
      </span>
    </>
  );
};
