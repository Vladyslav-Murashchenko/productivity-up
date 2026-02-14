import { Task as TaskModel } from "@/libs/api/tasks/model";

import { Filter } from "./Filters";
import { Task } from "./task";
import { useIsTasksStale } from "./useIsTasksStale";

type TaskListProps = {
  tasks?: TaskModel[];
  activeFilter: Filter;
  hiddenTaskId: TaskModel["id"] | null;
};

export const TaskList = ({
  tasks,
  activeFilter,
  hiddenTaskId,
}: TaskListProps) => {
  const isTasksStale = useIsTasksStale(activeFilter, tasks);

  if (!tasks || isTasksStale) {
    return null;
  }

  if (tasks.length === 0 && activeFilter === "todo") {
    return (
      <p className="text-muted">
        Your to-do list is empty. Add your first task
      </p>
    );
  }

  if (tasks.length === 0 && activeFilter === "done") {
    return <p className="text-muted">No tasks completed yet</p>;
  }

  return (
    <ul className="flex flex-col gap-3">
      {tasks.toReversed().map((task) => (
        <li key={task.id} hidden={hiddenTaskId === task.id}>
          <Task {...task} />
        </li>
      ))}
    </ul>
  );
};
