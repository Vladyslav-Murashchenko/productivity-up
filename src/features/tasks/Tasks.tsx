"use client";
import { useState } from "react";

import { Button } from "@/libs/ui/Button";
import { ButtonGroup } from "@/libs/ui/ButtonGroup";

import { Task } from "./Task";

type Filter = "todo" | "done";

export const Tasks = () => {
  const [filter, setFilter] = useState<Filter>("todo");

  const getFilterVariant = (current: Filter) => {
    return filter === current ? "secondary" : "tertiary";
  };

  return (
    <div>
      <ButtonGroup className="mb-6">
        <Button
          variant={getFilterVariant("todo")}
          onClick={() => setFilter("todo")}
        >
          Todo
        </Button>
        <Button
          variant={getFilterVariant("done")}
          onClick={() => setFilter("done")}
        >
          Done
        </Button>
      </ButtonGroup>
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
