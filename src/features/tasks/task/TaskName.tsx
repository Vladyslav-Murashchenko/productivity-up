import { useId, useState } from "react";

import { EditTaskNameModal } from "@/shared-features/edit-task-name";

import { Task } from "@/libs/api/tasks/model";
import { Button } from "@/libs/ui/Button";

export type TaskNameProps = {
  taskId: Task["id"];
  name: string;
};

export const TaskName = ({ taskId, name }: TaskNameProps) => {
  const editTaskNameDescId = useId();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        variant="text"
        className="flex-1 justify-start whitespace-normal wrap-anywhere min-h-fit text-left"
        aria-describedby={editTaskNameDescId}
        onClick={() => setIsOpen(true)}
      >
        {name}
      </Button>
      <span id={editTaskNameDescId} className="sr-only">
        Edit task name
      </span>
      <EditTaskNameModal
        taskId={taskId}
        currentName={name}
        isOpen={isOpen}
        onOpenChange={setIsOpen}
      />
    </>
  );
};
