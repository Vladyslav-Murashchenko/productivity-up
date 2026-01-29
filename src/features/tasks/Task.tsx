import { Clock, Play, TrashBin } from "@gravity-ui/icons";
import { useId } from "react";

import { Button } from "@/libs/ui/Button";
import { Card } from "@/libs/ui/Card";

export const Task = () => {
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
        Task name
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
      <Button
        variant="tertiary"
        className="text-danger"
        isIconOnly
        aria-label="Delete task"
      >
        <TrashBin />
      </Button>
    </Card>
  );
};
