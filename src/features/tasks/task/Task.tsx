import { Clock, Play } from "@gravity-ui/icons";
import { useId } from "react";

import { Task as TaskModel } from "@/libs/api/tasks/model";
import { Button } from "@/libs/ui/Button";
import { Card } from "@/libs/ui/Card";

import { DeleteTask } from "./DeleteTask";

type TaskProps = TaskModel;

export const Task = ({ id, name }: TaskProps) => {
  const editTaskNameDescId = useId();
  const editTaskTimeDescId = useId();

  return (
    <Card className="flex flex-row items-center">
      <Button variant="secondary" isIconOnly aria-label="Start task">
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
      <Button
        variant="text"
        className="flex items-center gap-1 text-muted"
        aria-describedby={editTaskTimeDescId}
      >
        <Clock />
        <span>2h 10m</span>
      </Button>
      <span id={editTaskTimeDescId} className="sr-only">
        Edit task time
      </span>
      <DeleteTask id={id} />
    </Card>
  );
};
