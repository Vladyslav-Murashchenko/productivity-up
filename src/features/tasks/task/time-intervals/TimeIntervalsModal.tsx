import { Task } from "@/libs/api/tasks/model";
import { Modal } from "@/libs/ui/modal/Modal";

import { TimeIntervals } from "./TimeIntervals";

type TimeIntervalsModalProps = {
  children: React.ReactNode;
  taskId: Task["id"];
};

export const TimeIntervalsModal = ({
  children,
  taskId,
}: TimeIntervalsModalProps) => {
  return (
    <Modal className="pr-2" trigger={children} heading="Time Intervals">
      <TimeIntervals taskId={taskId} />
    </Modal>
  );
};
