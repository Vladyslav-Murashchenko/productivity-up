"use client";
import { useState } from "react";

import { useActiveTaskState } from "@/libs/api/active-task/useActiveTaskState";
import { useTasks } from "@/libs/api/tasks/useTasks";

import { Filter, Filters } from "./Filters";
import { TaskList } from "./TaskList";
import { ActiveTask } from "./active-task";
import { CreateTask } from "./create-task";
import { useTemporaryHiddenTaskId } from "./useTemporaryHiddenTaskId";

export const Tasks = () => {
  const [activeFilter, setActiveFilter] = useState<Filter>("todo");

  const { tasks } = useTasks({ status: activeFilter });

  const { activeTaskState } = useActiveTaskState();

  const { temporaryHiddenTaskId, temporaryHideTask } =
    useTemporaryHiddenTaskId(tasks);

  return (
    <div className="flex flex-col gap-6">
      <div className="h-30">
        {activeTaskState ? (
          <ActiveTask
            activeTaskState={activeTaskState}
            onTaskCompleteSuccess={temporaryHideTask}
          />
        ) : (
          <CreateTask onCreateSuccess={() => setActiveFilter("todo")} />
        )}
      </div>
      <Filters
        activeFilter={activeFilter}
        onActiveFilterChange={setActiveFilter}
      />
      <TaskList
        tasks={tasks}
        activeFilter={activeFilter}
        hiddenTaskId={temporaryHiddenTaskId ?? activeTaskState?.taskId ?? null}
      />
    </div>
  );
};
