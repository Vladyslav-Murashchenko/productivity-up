export type ValidationError = {
  start?: string;
  end?: string;
};

type ValidateIntervalParams = {
  prevIntervalEnd?: Date;
  nextIntervalStart?: Date;
  start: Date;
  end: Date;
  now: Date;
};

export function validateInterval({
  prevIntervalEnd,
  nextIntervalStart,
  start,
  end,
  now,
}: ValidateIntervalParams): ValidationError {
  const validateStart = () => {
    if (start > end) {
      return {
        start: "Start time must be before end time",
      };
    }

    if (prevIntervalEnd && start < prevIntervalEnd) {
      return {
        start: "Start time cannot be before previous interval end time",
      };
    }

    return {};
  };

  const validateEnd = () => {
    if (nextIntervalStart && end > nextIntervalStart) {
      return {
        end: "End time cannot be after next interval start time",
      };
    }

    if (end > now) {
      return {
        end: "End time cannot be in the future",
      };
    }

    return {};
  };

  return {
    ...validateStart(),
    ...validateEnd(),
  };
}
