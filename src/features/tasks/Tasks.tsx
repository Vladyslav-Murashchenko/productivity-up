"use client";
import { useState } from "react";

import { useTasks } from "@/libs/api/tasks/useTasks";

import { Filter, Filters } from "./Filters";
import { Task } from "./Task";

export const Tasks = () => {
  const [activeFilter, setActiveFilter] = useState<Filter>("todo");

  const { tasks } = useTasks({ status: activeFilter });

  return (
    <div>
      <Filters
        activeFilter={activeFilter}
        onActiveFilterChange={setActiveFilter}
        className="mb-6"
      />
      {tasks && tasks.length > 0 ? (
        <ul className="flex flex-col gap-3">
          {tasks.map((task) => (
            <li key={task.id}>
              <Task {...task} />
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-muted">No tasks available</p>
      )}
    </div>
  );
};
