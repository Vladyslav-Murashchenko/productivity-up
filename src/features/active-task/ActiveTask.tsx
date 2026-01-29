"use client";
import { Check, Pause } from "@gravity-ui/icons";
import { useId } from "react";

import { Button } from "@/libs/ui/Button";
import { Card } from "@/libs/ui/Card";

export const ActiveTask = () => {
  const editTaskNameDescId = useId();

  return (
    <Card className="w-full bg-accent p-4 gap-2">
      <div className="min-w-0 flex-1 flex gap-2">
        <div className="flex flex-col min-w-0 flex-1">
          <h2 className="text-xs opacity-80">Active Task</h2>
          <Button
            variant="text"
            className="w-full justify-start"
            aria-describedby={editTaskNameDescId}
          >
            <span className="flex-1 truncate text-left">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque,
              suscipit! rewrew rewreww errwe rewrew
            </span>
          </Button>
          <span id={editTaskNameDescId} className="sr-only">
            Edit active task name
          </span>
        </div>
        <div className="text-3xl flex items-end">2h 32m 4s</div>
      </div>
      <div className="flex gap-2 justify-center">
        <Button
          size="lg"
          className="flex-1 bg-[rgba(255,255,255,0.2)] hover:bg-[rgba(255,255,255,0.3)]"
        >
          <Pause />
          Pause
        </Button>
        <Button
          size="lg"
          className="flex-1 bg-foreground text-accent hover:bg-gray-100"
        >
          <Check />
          Complete
        </Button>
      </div>
    </Card>
  );
};
