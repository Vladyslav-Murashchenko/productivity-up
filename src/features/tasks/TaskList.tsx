import { useActiveTaskState } from "@/libs/api/active-task/useActiveTaskState";
import { useTasks } from "@/libs/api/tasks/useTasks";
import { cn } from "@/libs/ui/utils/cn";

import { Filter } from "./Filters";
import { Task } from "./task";

type TaskListProps = {
  activeFilter: Filter;
};

export const TaskList = ({ activeFilter }: TaskListProps) => {
  const { tasks } = useTasks({ status: activeFilter });

  const { activeTaskState } = useActiveTaskState();

  if (!tasks) {
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
        <li
          key={task.id}
          className={cn(activeTaskState?.taskId === task.id && "hidden")}
        >
          <Task {...task} />
        </li>
      ))}
    </ul>
  );
};
