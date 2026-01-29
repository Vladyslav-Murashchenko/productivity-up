"use client";
import { useId, useState } from "react";

import { Button } from "@/libs/ui/Button";
import { Card } from "@/libs/ui/Card";
import { Input } from "@/libs/ui/Input";
import { Label } from "@/libs/ui/Label";
import { TextField } from "@/libs/ui/TestField";

export const CreateTask = () => {
  const [taskName, setTaskName] = useState("");

  const taskNameInputId = useId();

  return (
    <Card className="flex-row items-end p-6">
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
      <Button className="h-12 rounded-field" size="lg">
        Create
      </Button>
    </Card>
  );
};
