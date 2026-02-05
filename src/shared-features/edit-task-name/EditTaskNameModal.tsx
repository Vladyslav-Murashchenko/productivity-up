import { useId } from "react";

import { Task } from "@/libs/api/tasks/model";
import { FormModal } from "@/libs/ui/modal/FormModal";

import { EditTaskNameForm } from "./EditTaskNameForm";

type EditTaskModalProps = {
  currentName: string;
  taskId: Task["id"];
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
};

export const EditTaskNameModal = ({
  currentName,
  taskId,
  isOpen,
  onOpenChange,
}: EditTaskModalProps) => {
  const formId = useId();

  return (
    <FormModal
      heading="Edit Task Name"
      submitFormId={formId}
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      <EditTaskNameForm
        formId={formId}
        taskId={taskId}
        currentName={currentName}
        onSubmitSuccess={() => onOpenChange(false)}
      />
    </FormModal>
  );
};
