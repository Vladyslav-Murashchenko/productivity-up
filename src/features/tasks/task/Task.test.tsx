import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { startTask } from "@/libs/api/active-task/startTask";
import { deleteTask } from "@/libs/api/tasks/deleteTask";
import { reopenTask } from "@/libs/api/tasks/reopenTask";
import { useTaskDuration } from "@/libs/api/time-intervals/useTaskDuration";
import { useTaskTimeIntervals } from "@/libs/api/time-intervals/useTaskTimeIntervals";

import { Task } from "./Task";

vi.mock("@/libs/api/active-task/startTask");
vi.mock("@/libs/api/tasks/reopenTask");
vi.mock("@/libs/api/tasks/deleteTask");
vi.mock("@/libs/api/tasks/updateTaskName");
vi.mock("@/libs/api/time-intervals/useTaskDuration");
vi.mock("@/libs/api/time-intervals/useTaskTimeIntervals");
vi.mock("@/libs/api/time-intervals/createTimeInterval");
vi.mock("@/libs/api/time-intervals/updateTimeInterval");
vi.mock("@/libs/api/time-intervals/deleteTimeInterval");

const renderTask = (props = {}) =>
  render(<Task id={1} name="Write tests" status="todo" {...props} />);

describe("Task", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    vi.mocked(useTaskDuration).mockReturnValue({
      taskDuration: 3600000, // 1 hour
    });

    vi.mocked(useTaskTimeIntervals).mockReturnValue({
      timeIntervals: [],
    });
  });

  describe("todo task", () => {
    it("renders zero duration", () => {
      vi.mocked(useTaskDuration).mockReturnValue({
        taskDuration: 0,
      });

      renderTask();

      expect(screen.getByText("0s")).toBeInTheDocument();
    });

    it("renders task with name and duration", () => {
      renderTask();

      expect(screen.getByText("Write tests")).toBeInTheDocument();
      expect(screen.getByText("1h 0m 0s")).toBeInTheDocument();
    });

    it("renders start button for todo task", () => {
      renderTask({ status: "todo" });

      const startButton = screen.getByRole("button", { name: /start task/i });
      expect(startButton).toBeInTheDocument();
    });

    it("does not render reopen button for todo task", () => {
      renderTask({ status: "todo" });

      expect(
        screen.queryByRole("button", { name: /reopen task/i }),
      ).not.toBeInTheDocument();
    });

    it("calls startTask when start button is clicked", async () => {
      const user = userEvent.setup();

      renderTask({ status: "todo" });

      const startButton = screen.getByRole("button", { name: /start task/i });
      await user.click(startButton);

      expect(startTask).toHaveBeenCalledWith(1);
    });

    it("renders delete button", () => {
      renderTask();

      const deleteButton = screen.getByRole("button", { name: /delete task/i });
      expect(deleteButton).toBeInTheDocument();
    });

    it("opens delete confirmation modal when delete button is clicked", async () => {
      const user = userEvent.setup();

      renderTask();

      const deleteButton = screen.getByRole("button", { name: /delete task/i });
      await user.click(deleteButton);

      expect(
        screen.getByText("Are you sure you want to delete task?"),
      ).toBeInTheDocument();
      expect(
        screen.getByText("This action cannot be undone."),
      ).toBeInTheDocument();
    });

    it("calls deleteTask when delete is confirmed", async () => {
      const user = userEvent.setup();

      renderTask();

      const deleteButton = screen.getByRole("button", { name: /delete task/i });
      await user.click(deleteButton);

      const confirmButton = screen.getByRole("button", {
        name: /yes, delete/i,
      });
      await user.click(confirmButton);

      expect(deleteTask).toHaveBeenCalledWith(1);
    });

    it("opens edit task name modal when task name is clicked", async () => {
      const user = userEvent.setup();

      renderTask();

      const taskNameButton = screen.getByRole("button", {
        name: /write tests/i,
      });
      await user.click(taskNameButton);

      expect(screen.getByText("Edit Task Name")).toBeInTheDocument();
    });

    it("opens time intervals modal when duration is clicked", async () => {
      const user = userEvent.setup();

      renderTask();

      const durationButton = screen.getByRole("button", { name: /1h 0m 0s/i });
      await user.click(durationButton);

      expect(screen.getByText("Time Intervals")).toBeInTheDocument();
    });
  });

  describe("done task", () => {
    it("renders reopen button for done task", () => {
      renderTask({ status: "done" });

      const reopenButton = screen.getByRole("button", { name: /reopen task/i });
      expect(reopenButton).toBeInTheDocument();
    });

    it("does not render start button for done task", () => {
      renderTask({ status: "done" });

      expect(
        screen.queryByRole("button", { name: /start task/i }),
      ).not.toBeInTheDocument();
    });

    it("calls reopenTask when reopen button is clicked", async () => {
      const user = userEvent.setup();

      renderTask({ status: "done" });

      const reopenButton = screen.getByRole("button", { name: /reopen task/i });
      await user.click(reopenButton);

      expect(reopenTask).toHaveBeenCalledWith(1);
    });
  });
});
