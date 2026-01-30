import { TrashBin } from "@gravity-ui/icons";

import { deleteTask } from "@/libs/api/tasks/deleteTask";
import { Task } from "@/libs/api/tasks/model";
import { Button } from "@/libs/ui/Button";
import { ConfirmModal } from "@/libs/ui/ConfirmModal";
import { showToast } from "@/libs/ui/Toast";

type DeleteTaskProps = {
  id: Task["id"];
};

export const DeleteTask = ({ id }: DeleteTaskProps) => {
  const handleTaskDelete = async () => {
    try {
      await deleteTask(id);
    } catch (error) {
      if (error instanceof Error) {
        showToast({
          message: `Error deleting task: ${error.message}`,
        });
      }
    }
  };

  return (
    <ConfirmModal
      heading="Are you sure you want to delete task?"
      body="This action cannot be undone."
      confirmText="Yes, delete"
      onConfirm={() => void handleTaskDelete()}
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
