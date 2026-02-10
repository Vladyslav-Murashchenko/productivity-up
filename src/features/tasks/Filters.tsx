import { Task } from "@/libs/api/tasks/model";
import { Button } from "@/libs/ui/Button";
import { ButtonGroup } from "@/libs/ui/ButtonGroup";

export type Filter = Task["status"];

type FiltersProps = {
  activeFilter: Filter;
  onActiveFilterChange: (filter: Filter) => void;
};

export const Filters = ({
  activeFilter,
  onActiveFilterChange,
}: FiltersProps) => {
  const getFilterVariant = (filter: Filter) => {
    return activeFilter === filter ? "secondary" : "tertiary";
  };

  return (
    <ButtonGroup className="justify-start">
      <Button
        aria-pressed={activeFilter === "todo"}
        variant={getFilterVariant("todo")}
        onClick={() => onActiveFilterChange("todo")}
      >
        To-do
      </Button>
      <Button
        aria-pressed={activeFilter === "done"}
        variant={getFilterVariant("done")}
        onClick={() => onActiveFilterChange("done")}
      >
        Done
      </Button>
    </ButtonGroup>
  );
};
