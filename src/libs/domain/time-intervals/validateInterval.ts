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
}: ValidateIntervalParams) {
  const errors: ValidationError = {};

  if (start > end) {
    errors.start = "Start time must be before end time";
  } else if (prevIntervalEnd && start < prevIntervalEnd) {
    errors.start = "Start time cannot be before previous interval end time";
  }

  if (nextIntervalStart && end > nextIntervalStart) {
    errors.end = "End time cannot be after next interval start time";
  } else if (end > now) {
    errors.end = "End time cannot be in the future";
  }

  return errors;
}
