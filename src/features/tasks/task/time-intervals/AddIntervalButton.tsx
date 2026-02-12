import { Plus } from "@gravity-ui/icons";
import { useState } from "react";

import { Task } from "@/libs/api/tasks/model";
import { Button } from "@/libs/ui/Button";

import { CreateInterval } from "./interval-forms";

type AddIntervalButtonProps = {
  taskId: Task["id"];
  className?: string;
  prevIntervalEnd?: Date;
  nextIntervalStart?: Date;
  isReadonly: boolean;
  onAddStart: () => void;
  onAddFinish: () => void;
};

export const AddIntervalButton = ({
  taskId,
  className,
  onAddStart,
  onAddFinish,
  isReadonly,
  prevIntervalEnd,
  nextIntervalStart,
}: AddIntervalButtonProps) => {
  const [expanded, setExpanded] = useState(false);

  const handleCreateStart = () => {
    setExpanded(true);
    onAddStart();
  };

  const handleCreateFinish = () => {
    setExpanded(false);
    onAddFinish();
  };

  if (expanded) {
    return (
      <CreateInterval
        taskId={taskId}
        onCreateFinish={handleCreateFinish}
        prevIntervalEnd={prevIntervalEnd}
        nextIntervalStart={nextIntervalStart}
      />
    );
  }

  return (
    <Button
      variant="secondary"
      isIconOnly
      onClick={handleCreateStart}
      aria-label="Add time interval"
      className={className}
      isDisabled={isReadonly}
    >
      <Plus />
    </Button>
  );
};
