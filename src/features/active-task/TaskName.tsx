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
        className="w-full justify-start"
        aria-describedby={editTaskNameDescId}
        onClick={() => setIsOpen(true)}
      >
        <span className="flex-1 truncate text-left">{name}</span>
      </Button>
      <span id={editTaskNameDescId} className="sr-only">
        Edit active task name
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
