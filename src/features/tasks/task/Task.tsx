import { Clock, Play } from "@gravity-ui/icons";
import { useId } from "react";

import { startTask } from "@/libs/api/active-task/startTask";
import { Task as TaskModel } from "@/libs/api/tasks/model";
import { useTaskDuration } from "@/libs/api/time-intervals/useTaskDuration";
import { Button } from "@/libs/ui/Button";
import { Card } from "@/libs/ui/Card";
import { formatDuration } from "@/libs/ui/utils/formatDuration";
import { withErrorToast } from "@/libs/ui/utils/withErrorToast";

import { DeleteTask } from "./DeleteTask";

type TaskProps = TaskModel;

export const Task = ({ id, name }: TaskProps) => {
  const editTaskNameDescId = useId();
  const editTaskTimeDescId = useId();

  const handleTaskStart = () => {
    void withErrorToast({
      fn: () => startTask(id),
      errorPrefix: "Failed to start task",
    });
  };

  const { taskDuration } = useTaskDuration({
    taskId: id,
  });

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
      {taskDuration !== undefined && (
        <Button
          variant="text"
          className="flex items-center gap-1 text-muted"
          aria-describedby={editTaskTimeDescId}
        >
          <Clock />
          <span>{formatDuration(taskDuration)}</span>
        </Button>
      )}
      <span id={editTaskTimeDescId} className="sr-only">
        Edit task time
      </span>
      <DeleteTask id={id} />
    </Card>
  );
};
