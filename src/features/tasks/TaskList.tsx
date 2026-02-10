import { useActiveTaskState } from "@/libs/api/active-task/useActiveTaskState";
import { useTasks } from "@/libs/api/tasks/useTasks";

import { Filter } from "./Filters";
import { Task } from "./task";
import { useIsTasksStale } from "./useIsTasksStale";

type TaskListProps = {
  activeFilter: Filter;
};

export const TaskList = ({ activeFilter }: TaskListProps) => {
  const { tasks } = useTasks({ status: activeFilter });

  const { activeTaskState } = useActiveTaskState();

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
        <li key={task.id} hidden={activeTaskState?.taskId === task.id}>
          <Task {...task} />
        </li>
      ))}
    </ul>
  );
};
