import { DateField, DateInputGroup, Tooltip } from "@heroui/react";
import {
  ZonedDateTime,
  fromDate,
  getLocalTimeZone,
} from "@internationalized/date";
import { useId } from "react";

import { Label } from "./Label";

type DateTimePickerProps = {
  label?: string;
  value: Date | null;
  onChange: (date: Date) => void;
  errorMessage?: string | null;
  className?: string;
  labelClassName?: string;
};

export const DateTimePicker = ({
  label,
  value,
  onChange,
  errorMessage,
  className,
  labelClassName,
}: DateTimePickerProps) => {
  const inputId = useId();

  const handleChange = (date: ZonedDateTime | null) => {
    if (date) {
      onChange(date.toDate());
    }
  };

  const dateValue = value ? fromDate(value, getLocalTimeZone()) : null;

  return (
    <Tooltip delay={0} isDisabled={!errorMessage}>
      <Tooltip.Trigger tabIndex={-1}>
        <DateField
          isInvalid={!!errorMessage}
          value={dateValue}
          onChange={handleChange}
          granularity="second"
          hideTimeZone
          className={className}
        >
          {label && (
            <Label className={labelClassName} htmlFor={inputId}>
              {label}
            </Label>
          )}
          <DateInputGroup variant="secondary">
            <DateInputGroup.Input>
              {(segment) => <DateInputGroup.Segment segment={segment} />}
            </DateInputGroup.Input>
          </DateInputGroup>
        </DateField>
        {errorMessage && (
          <span className="sr-only" role="alert">
            {errorMessage}
          </span>
        )}
      </Tooltip.Trigger>
      <Tooltip.Content className="text-danger">{errorMessage}</Tooltip.Content>
    </Tooltip>
  );
};
