"use client";
import { useState } from "react";

import { Filter, Filters } from "./Filters";
import { TaskList } from "./TaskList";

export const Tasks = () => {
  const [activeFilter, setActiveFilter] = useState<Filter>("todo");

  return (
    <div className="flex flex-col gap-6">
      <Filters
        activeFilter={activeFilter}
        onActiveFilterChange={setActiveFilter}
      />
      <TaskList activeFilter={activeFilter} />
    </div>
  );
};
