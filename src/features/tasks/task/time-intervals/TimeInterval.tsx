import { useState } from "react";

import { TimeIntervalView } from "@/shared-features/time-interval";

import { deleteTimeInterval } from "@/libs/api/time-intervals/deleteTimeInterval";
import { TimeInterval as TimeIntervalModel } from "@/libs/domain/time-intervals/model";
import { withErrorToast } from "@/libs/ui/utils/withErrorToast";

import { EditInterval } from "./interval-forms";

type TimeIntervalProps = {
  interval: TimeIntervalModel;
  prevIntervalEnd?: Date;
  nextIntervalStart?: Date;
  isReadonly: boolean;
  onEditStart: () => void;
  onEditFinish: () => void;
};

export const TimeInterval = ({
  interval,
  prevIntervalEnd,
  nextIntervalStart,
  isReadonly,
  onEditStart,
  onEditFinish,
}: TimeIntervalProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleDelete = () => {
    void withErrorToast({
      fn: () => deleteTimeInterval(interval.id),
      errorPrefix: "Failed to delete time interval",
    });
  };

  const handleEditStart = () => {
    setIsEditing(true);
    onEditStart();
  };

  const handleEditFinish = () => {
    setIsEditing(false);
    onEditFinish();
  };

  if (isEditing) {
    return (
      <EditInterval
        interval={interval}
        prevIntervalEnd={prevIntervalEnd}
        nextIntervalStart={nextIntervalStart}
        onEditFinish={handleEditFinish}
      />
    );
  }

  return (
    <TimeIntervalView
      start={interval.start}
      end={interval.end}
      onEdit={handleEditStart}
      onDelete={handleDelete}
      isReadonly={isReadonly}
    />
  );
};
