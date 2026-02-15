import { Plus } from "@gravity-ui/icons";
import { useState } from "react";

import { AnimatedCreateIntervalWrapper } from "@/libs/animations/AnimatedCreateIntervalWrapper";
import { Task } from "@/libs/api/tasks/model";
import { Button } from "@/libs/ui/Button";

import { CreateInterval } from "./interval-forms";

type AddIntervalButtonProps = {
  taskId: Task["id"];
  className?: string;
  wrapperClassName?: string;
  prevIntervalEnd?: Date;
  nextIntervalStart?: Date;
  isReadonly: boolean;
  onAddStart: () => void;
  onAddFinish: () => void;
};

export const AddIntervalButton = ({
  taskId,
  className,
  wrapperClassName,
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
      <AnimatedCreateIntervalWrapper className="my-5 overflow-hidden">
        <CreateInterval
          taskId={taskId}
          onCreateFinish={handleCreateFinish}
          prevIntervalEnd={prevIntervalEnd}
          nextIntervalStart={nextIntervalStart}
        />
      </AnimatedCreateIntervalWrapper>
    );
  }

  return (
    <div className={wrapperClassName}>
      <Button
        className={className}
        variant="secondary"
        isIconOnly
        onClick={handleCreateStart}
        aria-label="Add time interval"
        isDisabled={isReadonly}
      >
        <Plus />
      </Button>
    </div>
  );
};
