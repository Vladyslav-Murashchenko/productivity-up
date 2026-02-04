import { ArrowRotateLeft, Clock, Play } from "@gravity-ui/icons";
import { useId } from "react";

import { startTask } from "@/libs/api/active-task/startTask";
import { Task as TaskModel } from "@/libs/api/tasks/model";
import { reopenTask } from "@/libs/api/tasks/reopenTask";
import { useTaskDuration } from "@/libs/api/time-intervals/useTaskDuration";
import { Button } from "@/libs/ui/Button";
import { Card } from "@/libs/ui/Card";
import { formatDuration } from "@/libs/ui/utils/formatDuration";
import { withErrorToast } from "@/libs/ui/utils/withErrorToast";

import { DeleteTask } from "./DeleteTask";
import { TaskName } from "./TaskName";

type TaskProps = TaskModel;

export const Task = ({ id, name, status }: TaskProps) => {
  const editTaskTimeDescId = useId();

  const handleTaskStart = () => {
    void withErrorToast({
      fn: () => startTask(id),
      errorPrefix: "Failed to start task",
    });
  };

  const handleTaskReopen = () => {
    void withErrorToast({
      fn: () => reopenTask(id),
      errorPrefix: "Failed to reopen task",
    });
  };

  const { taskDuration } = useTaskDuration({
    taskId: id,
  });

  return (
    <Card className="flex flex-row items-center">
      {status === "todo" && (
        <Button
          onClick={handleTaskStart}
          variant="secondary"
          isIconOnly
          aria-label="Start task"
        >
          <Play />
        </Button>
      )}
      {status === "done" && (
        <Button
          onClick={handleTaskReopen}
          variant="secondary"
          isIconOnly
          aria-label="Reopen task"
        >
          <ArrowRotateLeft />
        </Button>
      )}
      <TaskName taskId={id} name={name} />
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
