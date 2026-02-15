import { AnimatedTaskList } from "@/libs/animations/AnimatedTaskList";
import { Task as TaskModel } from "@/libs/api/tasks/model";

import { Filter } from "./Filters";
import { Task } from "./task";

type TaskListProps = {
  tasks?: TaskModel[];
  activeFilter: Filter;
  hiddenTaskId: TaskModel["id"] | null;
  hasActiveTask: boolean;
};

export const TaskList = ({
  tasks,
  activeFilter,
  hiddenTaskId,
  hasActiveTask,
}: TaskListProps) => {
  if (!tasks) {
    return null;
  }

  const visibleTasks = tasks
    .filter((task) => task.status === activeFilter)
    .filter((task) => task.id !== hiddenTaskId)
    .toReversed();

  if (visibleTasks.length === 0 && activeFilter === "todo") {
    return <p className="text-muted">Your to-do list is empty</p>;
  }

  if (visibleTasks.length === 0 && activeFilter === "done") {
    return <p className="text-muted">No tasks completed yet</p>;
  }

  if (visibleTasks.length === 0 && activeFilter === "todo" && hasActiveTask) {
    return <p className="text-muted">The only to-do task you have is active</p>;
  }

  return (
    <AnimatedTaskList key={activeFilter} className="flex flex-col gap-3">
      {visibleTasks.map((task) => (
        <AnimatedTaskList.Item key={task.id}>
          <Task {...task} />
        </AnimatedTaskList.Item>
      ))}
    </AnimatedTaskList>
  );
};
