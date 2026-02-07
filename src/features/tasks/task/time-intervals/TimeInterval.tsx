import { Pencil, TrashBin } from "@gravity-ui/icons";
import { format } from "date-fns";
import { useState } from "react";

import { deleteTimeInterval } from "@/libs/api/time-intervals/deleteTimeInterval";
import { TimeInterval as TimeIntervalModel } from "@/libs/api/time-intervals/model";
import { Button } from "@/libs/ui/Button";
import { Card } from "@/libs/ui/Card";
import { ConfirmModal } from "@/libs/ui/modal/ConfirmModal";
import { formatDuration } from "@/libs/ui/utils/formatDuration";
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

const TIME_FORMAT = "dd.MM.yy, HH:mm:ss";

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

  const intervalDuration = interval.end.getTime() - interval.start.getTime();

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
    <Card variant="secondary" className="p-4 flex flex-row items-center gap-6">
      <div className="flex flex-col gap-1 min-w-45">
        <div className="flex justify-start gap-2">
          <span className="text-sm w-9 text-muted">Start: </span>
          <span>{format(interval.start, TIME_FORMAT)}</span>
        </div>
        <div className="flex justify-start gap-2">
          <span className="text-sm w-9 text-muted">End: </span>
          <span>{format(interval.end, TIME_FORMAT)}</span>
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-sm text-muted">Duration: </span>
        <span>{formatDuration(intervalDuration)}</span>
      </div>
      <div className="flex gap-2 ml-auto">
        <Button
          variant="secondary"
          isIconOnly
          onClick={handleEditStart}
          aria-label="Edit interval"
          isDisabled={isReadonly}
        >
          <Pencil />
        </Button>
        <ConfirmModal
          heading="Are you sure you want to delete this time interval?"
          body="This action cannot be undone."
          confirmText="Yes, delete"
          onConfirm={handleDelete}
        >
          <Button
            variant="tertiary"
            className="text-danger"
            isIconOnly
            aria-label="Delete interval"
            isDisabled={isReadonly}
          >
            <TrashBin />
          </Button>
        </ConfirmModal>
      </div>
    </Card>
  );
};
