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

  if (tasks.length === 0) {
    return <p className="text-muted">No tasks available</p>;
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
