import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { useActiveTaskState } from "@/libs/api/active-task/useActiveTaskState";
import { useTask } from "@/libs/api/tasks/useTask";
import { useTasks } from "@/libs/api/tasks/useTasks";
import { useTaskDuration } from "@/libs/api/time-intervals/useTaskDuration";
import { useTaskTimeIntervals } from "@/libs/api/time-intervals/useTaskTimeIntervals";

import { Tasks } from "./Tasks";
import { useIsTasksStale } from "./useIsTasksStale";

vi.mock("@/libs/api/tasks/createTask");
vi.mock("@/libs/api/active-task/useActiveTaskState");
vi.mock("@/libs/api/tasks/useTask");
vi.mock("@/libs/api/tasks/useTasks");
vi.mock("@/libs/api/time-intervals/useTaskDuration");
vi.mock("@/libs/api/time-intervals/useTaskTimeIntervals");
vi.mock("./useIsTasksStale");

const renderTasks = () => render(<Tasks />);

describe("Tasks", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    vi.mocked(useActiveTaskState).mockReturnValue({
      activeTaskState: undefined,
    });

    vi.mocked(useTask).mockReturnValue({
      task: undefined,
    });

    vi.mocked(useTasks).mockReturnValue({
      tasks: [
        {
          id: 1,
          name: "Task 1",
          status: "todo",
        },
        {
          id: 2,
          name: "Task 2",
          status: "todo",
        },
      ],
    });

    vi.mocked(useTaskDuration).mockReturnValue({
      taskDuration: 0,
    });

    vi.mocked(useTaskTimeIntervals).mockReturnValue({
      timeIntervals: [],
    });

    vi.mocked(useIsTasksStale).mockReturnValue(false);
  });

  it("renders create task form", () => {
    renderTasks();

    expect(screen.getByPlaceholderText("Enter a task...")).toBeInTheDocument();
  });

  it("renders active task if there is one", () => {
    vi.mocked(useActiveTaskState).mockReturnValue({
      activeTaskState: {
        primaryKey: "singleton",
        taskId: 1,
        startTime: new Date("2026-01-01T00:00:00"),
      },
    });

    vi.mocked(useTask).mockReturnValue({
      task: {
        id: 1,
        name: "Task 1",
        status: "todo",
      },
    });

    renderTasks();

    expect(screen.getByText("Active Task")).toBeInTheDocument();
  });

  it("renders task list with todo tasks", () => {
    renderTasks();

    expect(screen.getByText("Task 1")).toBeInTheDocument();
    expect(screen.getByText("Task 2")).toBeInTheDocument();
  });

  it("renders filters with todo selected by default", () => {
    renderTasks();

    const todoButton = screen.getByRole("button", { name: "To-do" });
    const doneButton = screen.getByRole("button", { name: "Done" });

    expect(todoButton).toHaveAttribute("aria-pressed", "true");
    expect(doneButton).toHaveAttribute("aria-pressed", "false");
  });

  it("switches to done filter when done button is clicked", async () => {
    const user = userEvent.setup();

    renderTasks();

    const todoButton = screen.getByRole("button", { name: "To-do" });
    const doneButton = screen.getByRole("button", { name: "Done" });

    await user.click(doneButton);

    expect(todoButton).toHaveAttribute("aria-pressed", "false");
    expect(doneButton).toHaveAttribute("aria-pressed", "true");
  });

  it("resets filter to todo when task is created successfully", async () => {
    const user = userEvent.setup();

    renderTasks();

    const todoButton = screen.getByRole("button", { name: "To-do" });
    const doneButton = screen.getByRole("button", { name: "Done" });

    await user.click(doneButton);

    const input = screen.getByPlaceholderText("Enter a task...");
    const createButton = screen.getByRole("button", { name: /create/i });

    await user.type(input, "New Task");
    await user.click(createButton);

    expect(todoButton).toHaveAttribute("aria-pressed", "true");
    expect(doneButton).toHaveAttribute("aria-pressed", "false");
  });

  it("shows empty message when no todo tasks", () => {
    vi.mocked(useTasks).mockReturnValue({
      tasks: [],
    });

    renderTasks();

    expect(
      screen.getByText("Your to-do list is empty. Add your first task"),
    ).toBeInTheDocument();
  });

  it("shows empty message when no done tasks", async () => {
    const user = userEvent.setup();

    vi.mocked(useTasks).mockReturnValue({
      tasks: [],
    });

    renderTasks();

    const doneButton = screen.getByRole("button", { name: "Done" });
    await user.click(doneButton);

    expect(screen.getByText("No tasks completed yet")).toBeInTheDocument();
  });

  it("should not display active task", () => {
    vi.mocked(useActiveTaskState).mockReturnValue({
      activeTaskState: {
        primaryKey: "singleton",
        taskId: 1,
        startTime: new Date("2026-01-01T00:00:00"),
      },
    });

    renderTasks();

    expect(screen.queryByText("Task 1")).not.toBeVisible();
  });
});
