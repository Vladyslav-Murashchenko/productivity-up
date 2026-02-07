import { TimeInterval } from "@/libs/api/time-intervals/model";
import { updateTimeInterval } from "@/libs/api/time-intervals/updateTimeInterval";
import { withErrorToast } from "@/libs/ui/utils/withErrorToast";

import { IntervalForm } from "./IntervalForm";

type IntervalFormProps = {
  interval: TimeInterval;
  prevIntervalEnd?: Date;
  nextIntervalStart?: Date;
  onEditFinish: () => void;
};

export const EditInterval = ({
  interval,
  prevIntervalEnd,
  nextIntervalStart,
  onEditFinish,
}: IntervalFormProps) => {
  const handleSave = (start: Date, end: Date) => {
    void withErrorToast({
      fn: async () => {
        await updateTimeInterval({
          id: interval.id,
          start,
          end,
        });

        onEditFinish();
      },
      errorPrefix: "Failed to update time interval",
    });
  };

  return (
    <IntervalForm
      initialStart={interval.start}
      initialEnd={interval.end}
      prevIntervalEnd={prevIntervalEnd}
      nextIntervalStart={nextIntervalStart}
      onSave={handleSave}
      onCancel={onEditFinish}
      submitLabel="Save"
    />
  );
};
