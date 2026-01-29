"use client";
import { useState } from "react";

import { Filter, Filters } from "./Filters";
import { Task } from "./Task";

export const Tasks = () => {
  const [activeFilter, setActiveFilter] = useState<Filter>("todo");

  return (
    <div>
      <Filters
        activeFilter={activeFilter}
        onActiveFilterChange={setActiveFilter}
        className="mb-6"
      />
      <ul className="flex flex-col gap-3">
        <li>
          <Task />
        </li>
        <li>
          <Task />
        </li>
      </ul>
    </div>
  );
};
