import { Check, Pause } from "@gravity-ui/icons";

import { completeActiveTask } from "@/libs/api/active-task/completeActiveTask";
import { pauseActiveTask } from "@/libs/api/active-task/pauseActiveTask";
import { useActiveTaskState } from "@/libs/api/active-task/useActiveTaskState";
import { useTask } from "@/libs/api/tasks/useTask";
import { Button } from "@/libs/ui/Button";
import { Card } from "@/libs/ui/Card";
import { withErrorToast } from "@/libs/ui/utils/withErrorToast";

import { TaskName } from "./TaskName";
import { Timer } from "./Timer";

export const ActiveTask = () => {
  const { activeTaskState } = useActiveTaskState();

  const { task: activeTask } = useTask(activeTaskState?.taskId);

  const handlePause = () => {
    void withErrorToast({
      fn: pauseActiveTask,
      errorPrefix: "Failed to pause task",
    });
  };

  const handleComplete = () => {
    void withErrorToast({
      fn: completeActiveTask,
      errorPrefix: "Failed to complete task",
    });
  };

  if (!activeTaskState || !activeTask) {
    return null;
  }

  return (
    <Card className="w-full bg-accent p-4 gap-2">
      <div className="min-w-0 flex-1 flex gap-2">
        <div className="flex flex-col min-w-0 flex-1">
          <h2 className="text-xs opacity-80">Active Task</h2>
          <TaskName taskId={activeTask.id} name={activeTask.name} />
        </div>
        <div className="flex items-end">
          <Timer taskId={activeTask.id} startTime={activeTaskState.startTime} />
        </div>
      </div>
      <div className="flex gap-2 justify-center">
        <Button
          size="lg"
          className="flex-1 bg-[rgba(255,255,255,0.2)] hover:bg-[rgba(255,255,255,0.3)]"
          onClick={handlePause}
        >
          <Pause />
          Pause
        </Button>
        <Button
          size="lg"
          className="flex-1 bg-foreground text-accent hover:bg-gray-100"
          onClick={handleComplete}
        >
          <Check />
          Complete
        </Button>
      </div>
    </Card>
  );
};
