import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { completeActiveTask } from "@/libs/db/active-task/completeActiveTask";
import { pauseActiveTask } from "@/libs/db/active-task/pauseActiveTask";
import { useTask } from "@/libs/db/tasks/useTask";
import { useTaskSavedDuration } from "@/libs/db/time-intervals/useTaskSavedDuration";

import { ActiveTask } from "./ActiveTask";

vi.mock("@/libs/db/active-task/pauseActiveTask");
vi.mock("@/libs/db/active-task/completeActiveTask");
vi.mock("@/libs/db/tasks/useTask");
vi.mock("@/libs/db/time-intervals/useTaskSavedDuration");

const handleTaskCompleteSuccess = vi.fn();

const defaultActiveTaskState = {
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
    localStorage.clear();

    vi.mocked(useTask).mockReturnValue({
      task: {
        id: 1,
        name: "Write tests",
        status: "todo",
      },
    });

    vi.mocked(useTaskSavedDuration).mockReturnValue({
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

  describe("timer mode", () => {
    it("shows the current timer mode above the time", () => {
      renderActiveTask();

      expect(
        screen.getByRole("button", { name: /today/i }),
      ).toBeInTheDocument();
    });

    it("cycles the mode on click: Today → Total → Last → Today", async () => {
      const user = userEvent.setup();

      renderActiveTask();

      await user.click(screen.getByRole("button", { name: /today/i }));
      expect(
        screen.getByRole("button", { name: /total/i }),
      ).toBeInTheDocument();

      await user.click(screen.getByRole("button", { name: /total/i }));
      expect(screen.getByRole("button", { name: /last/i })).toBeInTheDocument();

      await user.click(screen.getByRole("button", { name: /last/i }));
      expect(
        screen.getByRole("button", { name: /today/i }),
      ).toBeInTheDocument();
    });

    it("shows only the live session duration in Last mode", async () => {
      const startTime = new Date();
      vi.mocked(useTaskSavedDuration).mockImplementation(({ modeParams }) => ({
        taskDuration: modeParams?.mode === "last" ? 0 : 5 * 60 * 1000,
      }));

      const user = userEvent.setup();

      render(
        <ActiveTask
          activeTaskState={{ taskId: 1, startTime }}
          onTaskCompleteSuccess={handleTaskCompleteSuccess}
        />,
      );

      expect(screen.getByText(/5m 0s/)).toBeInTheDocument();

      await user.click(screen.getByRole("button", { name: /today/i }));
      await user.click(screen.getByRole("button", { name: /total/i }));

      expect(screen.getByText(/^0s$/)).toBeInTheDocument();
    });

    it("restores the previously selected mode from localStorage", () => {
      localStorage.setItem("productivity-up:timer-mode", "last");

      renderActiveTask();

      expect(screen.getByRole("button", { name: /last/i })).toBeInTheDocument();
    });

    it("persists mode changes to localStorage", async () => {
      const user = userEvent.setup();

      renderActiveTask();

      await user.click(screen.getByRole("button", { name: /today/i }));

      expect(localStorage.getItem("productivity-up:timer-mode")).toBe("total");
    });

    it("does not open the time intervals modal when clicking the mode button", async () => {
      const user = userEvent.setup();

      renderActiveTask();

      await user.click(screen.getByRole("button", { name: /today/i }));

      expect(screen.queryByText("Time Intervals")).not.toBeInTheDocument();
    });
  });
});
