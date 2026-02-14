import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { completeActiveTask } from "@/libs/api/active-task/completeActiveTask";
import { pauseActiveTask } from "@/libs/api/active-task/pauseActiveTask";
import { useTask } from "@/libs/api/tasks/useTask";
import { useTaskDuration } from "@/libs/api/time-intervals/useTaskDuration";

import { ActiveTask } from "./ActiveTask";

vi.mock("@/libs/api/active-task/pauseActiveTask");
vi.mock("@/libs/api/active-task/completeActiveTask");
vi.mock("@/libs/api/tasks/useTask");
vi.mock("@/libs/api/time-intervals/useTaskDuration");

const handleTaskCompleteSuccess = vi.fn();

const defaultActiveTaskState = {
  primaryKey: "singleton",
  taskId: 1,
  startTime: new Date("2026-02-10T10:00:00"),
} as const;

const renderActiveTask = () =>
  render(
    <ActiveTask
      activeTaskState={defaultActiveTaskState}
      onTaskCompleteSuccess={handleTaskCompleteSuccess}
    />,
  );

describe("ActiveTask", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    vi.mocked(useTask).mockReturnValue({
      task: {
        id: 1,
        name: "Write tests",
        status: "todo",
      },
    });

    vi.mocked(useTaskDuration).mockReturnValue({
      taskDuration: 5 * 60 * 1000, // 5 minutes
    });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("renders active task with correct time", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-02-10T12:04:01"));

    renderActiveTask();

    expect(screen.getByText("Active Task")).toBeInTheDocument();
    expect(screen.getByText("Write tests")).toBeInTheDocument();
    expect(screen.getByText("2h 9m 1s")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /pause/i })).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /complete/i }),
    ).toBeInTheDocument();
  });

  it("calls pauseActiveTask when pause button is clicked", async () => {
    const user = userEvent.setup();

    renderActiveTask();

    const pauseButton = screen.getByRole("button", { name: /pause/i });
    await user.click(pauseButton);

    expect(pauseActiveTask).toHaveBeenCalledOnce();
  });

  it("calls completeActiveTask when complete button is clicked", async () => {
    const user = userEvent.setup();

    renderActiveTask();

    const completeButton = screen.getByRole("button", { name: /complete/i });
    await user.click(completeButton);

    expect(completeActiveTask).toHaveBeenCalledOnce();
  });

  it("does not render when task data is not loaded", () => {
    vi.mocked(useTask).mockReturnValue({
      task: undefined,
    });

    renderActiveTask();

    expect(screen.queryByText("Active Task")).not.toBeInTheDocument();
  });

  it("should open edit task modal when clicking on task name", async () => {
    const user = userEvent.setup();

    renderActiveTask();

    const taskNameButton = screen.getByRole("button", { name: /write tests/i });
    await user.click(taskNameButton);

    expect(screen.getByText("Edit Task Name")).toBeInTheDocument();
  });
});
