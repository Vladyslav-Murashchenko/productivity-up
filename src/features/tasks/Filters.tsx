import { Button } from "@/libs/ui/Button";
import { ButtonGroup } from "@/libs/ui/ButtonGroup";

export type Filter = "todo" | "done";

type FiltersProps = {
  activeFilter: Filter;
  onActiveFilterChange: (filter: Filter) => void;
  className?: string;
};

export const Filters = ({
  activeFilter,
  onActiveFilterChange,
  className,
}: FiltersProps) => {
  const getFilterVariant = (filter: Filter) => {
    return activeFilter === filter ? "secondary" : "tertiary";
  };

  return (
    <ButtonGroup className={className}>
      <Button
        variant={getFilterVariant("todo")}
        onClick={() => onActiveFilterChange("todo")}
      >
        Todo
      </Button>
      <Button
        variant={getFilterVariant("done")}
        onClick={() => onActiveFilterChange("done")}
      >
        Done
      </Button>
    </ButtonGroup>
  );
};
