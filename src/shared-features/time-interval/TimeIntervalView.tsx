import { Pencil, TrashBin } from "@gravity-ui/icons";
import { differenceInMilliseconds, format } from "date-fns";

import { Button } from "@/libs/ui/Button";
import { Card } from "@/libs/ui/Card";
import { ConfirmModal } from "@/libs/ui/modal/ConfirmModal";
import { formatDuration } from "@/libs/ui/utils/formatDuration";

const TIME_FORMAT = "dd.MM.yy, HH:mm:ss";

type TimeIntervalViewProps = {
  start: Date;
  end: Date;
  onEdit?: () => void;
  onDelete?: () => void;
  isReadonly: boolean;
};

export const TimeIntervalView = ({
  start,
  end,
  onEdit,
  onDelete,
  isReadonly,
}: TimeIntervalViewProps) => {
  const intervalDuration = differenceInMilliseconds(end, start);

  return (
    <Card
      variant="secondary"
      className="p-4 flex flex-row flex-wrap items-center gap-6"
    >
      <div className="flex flex-col gap-1 min-w-45">
        <div className="flex justify-start gap-2">
          <span className="text-sm w-9 text-muted">Start: </span>
          <span>{format(start, TIME_FORMAT)}</span>
        </div>
        <div className="flex justify-start gap-2">
          <span className="text-sm w-9 text-muted">End: </span>
          <span>{format(end, TIME_FORMAT)}</span>
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
          onClick={onEdit}
          aria-label="Edit interval"
          isDisabled={isReadonly}
        >
          <Pencil />
        </Button>
        <ConfirmModal
          heading="Are you sure you want to delete this time interval?"
          body="This action cannot be undone."
          confirmText="Yes, delete"
          onConfirm={onDelete}
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
