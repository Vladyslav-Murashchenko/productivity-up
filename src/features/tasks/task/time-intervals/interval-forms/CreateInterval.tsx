import { addHours, min, subHours } from "date-fns";
import { useState } from "react";

import { Task } from "@/libs/api/tasks/model";
import { createTimeInterval } from "@/libs/api/time-intervals/createTimeInterval";
import { withErrorToast } from "@/libs/ui/utils/withErrorToast";

import { IntervalForm } from "./IntervalForm";

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

const DEFAULT_INTERVAL_DURATION_HOURS = 1;

function getInitialStart(
  mountTime: Date,
  prevIntervalEnd?: Date,
  nextIntervalStart?: Date,
): Date {
  if (prevIntervalEnd) {
    return prevIntervalEnd;
  }

  if (nextIntervalStart) {
    return subHours(nextIntervalStart, DEFAULT_INTERVAL_DURATION_HOURS);
  }

  return subHours(mountTime, DEFAULT_INTERVAL_DURATION_HOURS);
}

function getInitialEnd(
  mountTime: Date,
  initialStart: Date,
  nextIntervalStart?: Date,
): Date {
  if (nextIntervalStart) {
    return min([
      nextIntervalStart,
      addHours(initialStart, DEFAULT_INTERVAL_DURATION_HOURS),
    ]);
  }

  return min([
    mountTime,
    addHours(initialStart, DEFAULT_INTERVAL_DURATION_HOURS),
  ]);
}
