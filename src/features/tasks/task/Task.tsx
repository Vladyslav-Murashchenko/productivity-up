import { ArrowRotateLeft, Play } from "@gravity-ui/icons";

import { startTask } from "@/libs/api/active-task/startTask";
import { Task as TaskModel } from "@/libs/api/tasks/model";
import { reopenTask } from "@/libs/api/tasks/reopenTask";
import { Button } from "@/libs/ui/Button";
import { Card } from "@/libs/ui/Card";
import { withErrorToast } from "@/libs/ui/utils/withErrorToast";

import { DeleteTask } from "./DeleteTask";
import { TaskDuration } from "./TaskDuration";
import { TaskName } from "./TaskName";

type TaskProps = TaskModel;

export const Task = ({ id, name, status }: TaskProps) => {
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
      <TaskDuration taskId={id} />
      <DeleteTask taskId={id} />
    </Card>
  );
};
