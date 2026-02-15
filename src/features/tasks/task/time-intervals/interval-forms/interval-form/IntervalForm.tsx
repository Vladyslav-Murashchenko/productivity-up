import { Check, Xmark } from "@gravity-ui/icons";
import { useState } from "react";

import { Button } from "@/libs/ui/Button";
import { Card } from "@/libs/ui/Card";
import { DateTimePicker } from "@/libs/ui/DateTimePicker";

import { ValidationError, validateInterval } from "./validateInterval";

type IntervalFormProps = {
  initialStart: Date;
  initialEnd: Date;
  prevIntervalEnd?: Date;
  nextIntervalStart?: Date;
  onSave: (start: Date, end: Date) => void;
  onCancel: () => void;
  submitLabel: string;
};

export const IntervalForm = ({
  initialStart,
  initialEnd,
  prevIntervalEnd,
  nextIntervalStart,
  onSave,
  onCancel,
  submitLabel,
}: IntervalFormProps) => {
  const [start, setStart] = useState(initialStart);
  const [end, setEnd] = useState(initialEnd);

  const [error, setError] = useState<ValidationError>({});

  const handleStartChange = (date: Date) => {
    setStart(date);
    setError(({ start: _, ...restError }) => restError);
  };

  const handleEndChange = (date: Date) => {
    setEnd(date);
    setError(({ end: _, ...restError }) => restError);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const validationError = validateInterval({
      prevIntervalEnd,
      nextIntervalStart,
      start,
      end,
      now: new Date(),
    });

    if (Object.keys(validationError).length > 0) {
      setError(validationError);
      return;
    }

    onSave(start, end);
  };

  return (
    <Card variant="secondary" className="p-4">
      <form
        onSubmit={handleSubmit}
        className="flex flex-row flex-wrap items-center gap-6"
      >
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
            onClick={onCancel}
            aria-label="Cancel"
            type="button"
          >
            <Xmark />
          </Button>
          <Button
            variant="primary"
            isIconOnly
            aria-label={submitLabel}
            type="submit"
          >
            <Check />
          </Button>
        </div>
      </form>
    </Card>
  );
};
