import { useState } from "react";

import { Task } from "@/libs/api/tasks/model";
import { createTimeInterval } from "@/libs/api/time-intervals/createTimeInterval";
import { withErrorToast } from "@/libs/ui/utils/withErrorToast";

import { getInitialEnd, getInitialStart } from "./CreateInterval.utils";
import { IntervalForm } from "./interval-form";

type CreateIntervalProps = {
  taskId: Task["id"];
  prevIntervalEnd?: Date;
  nextIntervalStart?: Date;
  onCreateFinish: () => void;
};

export const CreateInterval = ({
  taskId,
  prevIntervalEnd,
  nextIntervalStart,
  onCreateFinish,
}: CreateIntervalProps) => {
  const [mountTime] = useState(() => new Date());

  const handleSave = (start: Date, end: Date) => {
    void withErrorToast({
      fn: async () => {
        await createTimeInterval({
          taskId,
          start,
          end,
        });

        onCreateFinish();
      },
      errorPrefix: "Failed to create time interval",
    });
  };

  const initialStart = getInitialStart(
    mountTime,
    prevIntervalEnd,
    nextIntervalStart,
  );

  const initialEnd = getInitialEnd(mountTime, initialStart, nextIntervalStart);

  return (
    <IntervalForm
      initialStart={initialStart}
      initialEnd={initialEnd}
      prevIntervalEnd={prevIntervalEnd}
      nextIntervalStart={nextIntervalStart}
      onSave={handleSave}
      onCancel={onCreateFinish}
      submitLabel="Add"
    />
  );
};
