import { TrashBin } from "@gravity-ui/icons";

import { deleteTask } from "@/libs/api/tasks/deleteTask";
import { Task } from "@/libs/api/tasks/model";
import { Button } from "@/libs/ui/Button";
import { ConfirmModal } from "@/libs/ui/modal/ConfirmModal";
import { withErrorToast } from "@/libs/ui/utils/withErrorToast";

type DeleteTaskProps = {
  taskId: Task["id"];
};

export const DeleteTask = ({ taskId }: DeleteTaskProps) => {
  const handleTaskDelete = () => {
    void withErrorToast({
      fn: () => deleteTask(taskId),
      errorPrefix: "Failed to delete task",
    });
  };

  return (
    <ConfirmModal
      heading="Are you sure you want to delete task?"
      body="This action cannot be undone."
      confirmText="Yes, delete"
      onConfirm={handleTaskDelete}
    >
      <Button
        variant="tertiary"
        className="text-danger"
        isIconOnly
        aria-label="Delete task"
      >
        <TrashBin />
      </Button>
    </ConfirmModal>
  );
};
