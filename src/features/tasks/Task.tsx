import { Clock, Play, TrashBin } from "@gravity-ui/icons";

import { Button } from "@/libs/ui/Button";
import { Card } from "@/libs/ui/Card";

export const Task = () => {
  return (
    <Card className="flex flex-row items-center">
      <Button variant="secondary" isIconOnly aria-label="Start task">
        <Play />
      </Button>
      <Button
        variant="ghost"
        className="flex-1 justify-start whitespace-normal min-h-fit"
        aria-describedby="edit-task-name-desc"
      >
        Task name
      </Button>
      <span id="edit-task-name-desc" className="sr-only">
        Edit task name
      </span>
      <Button
        variant="ghost"
        className="flex items-center gap-1 text-muted"
        aria-describedby="edit-task-time-desc"
      >
        <Clock />
        <span>2h 10m</span>
      </Button>
      <span id="edit-task-time-desc" className="sr-only">
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
