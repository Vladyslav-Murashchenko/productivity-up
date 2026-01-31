import { Clock, Play } from "@gravity-ui/icons";
import { useId } from "react";

import { startTask } from "@/libs/api/active-task/startTask";
import { Task as TaskModel } from "@/libs/api/tasks/model";
import { useTaskTime } from "@/libs/api/time-intervals/useTaskTime";
import { withErrorToast } from "@/libs/helpers/withErrorToast";
import { Button } from "@/libs/ui/Button";
import { Card } from "@/libs/ui/Card";
import { Duration } from "@/libs/ui/Duration";

import { DeleteTask } from "./DeleteTask";

type TaskProps = TaskModel & {
  isActive: boolean;
};

export const Task = ({ id, name, isActive }: TaskProps) => {
  const editTaskNameDescId = useId();
  const editTaskTimeDescId = useId();

  const handleTaskStart = () => {
    void withErrorToast({
      fn: () => startTask(id),
      errorPrefix: "Failed to start task",
    });
  };

  const { taskTime } = useTaskTime({
    taskId: id,
    unit: "s",
  });

  if (isActive) {
    return null;
  }

  return (
    <Card className="flex flex-row items-center">
      <Button
        onClick={handleTaskStart}
        variant="secondary"
        isIconOnly
        aria-label="Start task"
      >
        <Play />
      </Button>
      <Button
        variant="text"
        className="flex-1 justify-start whitespace-normal min-h-fit"
        aria-describedby={editTaskNameDescId}
      >
        {name}
      </Button>
      <span id={editTaskNameDescId} className="sr-only">
        Edit task name
      </span>
      {taskTime !== undefined && (
        <Button
          variant="text"
          className="flex items-center gap-1 text-muted"
          aria-describedby={editTaskTimeDescId}
        >
          <Clock />
          <Duration totalSeconds={taskTime} />
        </Button>
      )}
      <span id={editTaskTimeDescId} className="sr-only">
        Edit task time
      </span>
      <DeleteTask id={id} />
    </Card>
  );
};
