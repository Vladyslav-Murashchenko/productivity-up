import { useId, useState } from "react";

import { ActiveTaskState } from "@/libs/api/active-task/model";
import { createTask } from "@/libs/api/tasks/createTask";
import { Button } from "@/libs/ui/Button";
import { Card } from "@/libs/ui/Card";
import { Input } from "@/libs/ui/Input";
import { Label } from "@/libs/ui/Label";
import { TextField } from "@/libs/ui/TextField";
import { withErrorToast } from "@/libs/ui/utils/withErrorToast";

type CreateTaskProps = {
  activeTaskState?: ActiveTaskState;
  onCreateSuccess: () => void;
};

export const CreateTask = ({
  activeTaskState,
  onCreateSuccess,
}: CreateTaskProps) => {
  const [taskName, setTaskName] = useState("");

  const taskNameInputId = useId();

  const handleTaskCreate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const taskNameTrimmed = taskName.trim();

    if (taskNameTrimmed === "") {
      return;
    }

    void withErrorToast({
      fn: async () => {
        await createTask(taskNameTrimmed);
        setTaskName("");
        onCreateSuccess();
      },
      errorPrefix: "Failed to create task",
    });
  };

  if (activeTaskState) {
    return null;
  }

  return (
    <Card className="p-6">
      <form
        onSubmit={handleTaskCreate}
        className="flex flex-row items-end gap-3"
      >
        <TextField className="flex-1">
          <Label htmlFor={taskNameInputId}>
            What would you like to focus on?
          </Label>
          <Input
            className="h-12"
            variant="secondary"
            id={taskNameInputId}
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            placeholder="Enter a task..."
            autoFocus
          />
        </TextField>
        <Button type="submit" className="h-12 rounded-field" size="lg">
          Create
        </Button>
      </form>
    </Card>
  );
};
