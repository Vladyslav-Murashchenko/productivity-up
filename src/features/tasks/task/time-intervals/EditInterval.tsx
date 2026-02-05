import { Check, Xmark } from "@gravity-ui/icons";
import { useState } from "react";

import { TimeInterval } from "@/libs/api/time-intervals/model";
import { updateTimeInterval } from "@/libs/api/time-intervals/updateTimeInterval";
import { Button } from "@/libs/ui/Button";
import { Card } from "@/libs/ui/Card";
import { DateTimePicker } from "@/libs/ui/DateTimePicker";
import { withErrorToast } from "@/libs/ui/utils/withErrorToast";

import { ValidationError, validateInterval } from "./validateInterval";

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
  const [start, setStart] = useState(interval.start);
  const [end, setEnd] = useState(interval.end);

  const [error, setError] = useState<ValidationError>({});

  const handleStartChange = (date: Date) => {
    setStart(date);
    setError(({ start: _, ...restError }) => restError);
  };

  const handleEndChange = (date: Date) => {
    setEnd(date);
    setError(({ end: _, ...restError }) => restError);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    const validationError = validateInterval({
      prevIntervalEnd,
      nextIntervalStart,
      start,
      end,
    });

    if (Object.keys(validationError).length > 0) {
      setError(validationError);
      return;
    }

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
    <Card variant="secondary" className="p-4">
      <form onSubmit={handleSave} className="flex flex-row items-center gap-6">
        <div className="flex flex-col gap-1">
          <DateTimePicker
            className="flex-row justify-start items-center"
            labelClassName="min-w-9 mr-3"
            label="Start:"
            value={start}
            onChange={handleStartChange}
            errorMessage={error?.start}
          />
          <DateTimePicker
            className="flex-row justify-start items-center"
            labelClassName="min-w-9 mr-3"
            label="End:"
            value={end}
            onChange={handleEndChange}
            errorMessage={error?.end}
          />
        </div>
        <div className="flex gap-2 ml-auto">
          <Button
            variant="secondary"
            isIconOnly
            onClick={onEditFinish}
            aria-label="Cancel"
          >
            <Xmark />
          </Button>
          <Button variant="primary" isIconOnly aria-label="Save" type="submit">
            <Check />
          </Button>
        </div>
      </form>
    </Card>
  );
};
