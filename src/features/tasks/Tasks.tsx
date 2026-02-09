"use client";
import { useState } from "react";

import { Filter, Filters } from "./Filters";
import { TaskList } from "./TaskList";
import { ActiveTask } from "./active-task";
import { CreateTask } from "./create-task";

export const Tasks = () => {
  const [activeFilter, setActiveFilter] = useState<Filter>("todo");

  return (
    <div className="flex flex-col gap-6">
      <CreateTask onCreateSuccess={() => setActiveFilter("todo")} />
      <ActiveTask />
      <Filters
        activeFilter={activeFilter}
        onActiveFilterChange={setActiveFilter}
      />
      <TaskList activeFilter={activeFilter} />
    </div>
  );
};
