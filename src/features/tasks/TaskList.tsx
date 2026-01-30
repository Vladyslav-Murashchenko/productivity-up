import { useTasks } from "@/libs/api/tasks/useTasks";
import { Spinner } from "@/libs/ui/Spinner";

import { Filter } from "./Filters";
import { Task } from "./Task";

type TaskListProps = {
  activeFilter: Filter;
};

export const TaskList = ({ activeFilter }: TaskListProps) => {
  const { tasks } = useTasks({ status: activeFilter });

  if (!tasks) {
    return <Spinner />;
  }

  if (tasks.length === 0) {
    return <p className="text-muted">No tasks available</p>;
  }

  return (
    <ul className="flex flex-col gap-3">
      {tasks.map((task) => (
        <li key={task.id}>
          <Task {...task} />
        </li>
      ))}
    </ul>
  );
};
