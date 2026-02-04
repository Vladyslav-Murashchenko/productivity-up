import { useState } from "react";

import { Task } from "@/libs/api/tasks/model";
import { updateTaskName } from "@/libs/api/tasks/updateTaskName";
import { FieldError } from "@/libs/ui/FieldError";
import { Input } from "@/libs/ui/Input";
import { Label } from "@/libs/ui/Label";
import { TextField } from "@/libs/ui/TextField";
import { withErrorToast } from "@/libs/ui/utils/withErrorToast";

type EditTaskNameFormProps = {
  taskId: Task["id"];
  currentName: string;
  formId: string;
  onSubmitSuccess: () => void;
};

export const EditTaskNameForm = ({
  taskId,
  currentName,
  formId,
  onSubmitSuccess,
}: EditTaskNameFormProps) => {
  const [newName, setNewName] = useState(currentName);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewName(e.target.value);
    setError(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newNameTrimmed = newName.trim();

    if (newNameTrimmed === "") {
      setError("Task name cannot be empty");
      return;
    }

    void withErrorToast({
      fn: async () => {
        await updateTaskName(taskId, newNameTrimmed);
        onSubmitSuccess();
      },
      errorPrefix: "Failed to update task name",
    });
  };

  return (
    <form id={formId} onSubmit={handleSubmit}>
      <TextField isInvalid={!!error}>
        <Label>Task Name</Label>
        <Input
          value={newName}
          variant="secondary"
          placeholder="Enter task name..."
          onChange={handleChange}
          autoFocus
        />
        <FieldError>{error}</FieldError>
      </TextField>
    </form>
  );
};
