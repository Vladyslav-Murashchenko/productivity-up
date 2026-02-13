import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { createTimeInterval } from "@/libs/api/time-intervals/createTimeInterval";

import { CreateInterval } from "./CreateInterval";

vi.mock("@/libs/api/time-intervals/createTimeInterval");

const onCreateFinish = vi.fn();
const taskId = 1;

const renderCreateInterval = (props = {}) =>
  render(
    <CreateInterval
      taskId={taskId}
      onCreateFinish={onCreateFinish}
      {...props}
    />,
  );

describe("CreateInterval", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("renders interval form with initial values", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2024-01-15T10:00:00"));

    renderCreateInterval();

    expect(screen.getByText(/start:/i)).toBeInTheDocument();
    expect(
      screen.getByDisplayValue(/2024-01-15T09:00:00/i),
    ).toBeInTheDocument();
    expect(screen.getByText(/end:/i)).toBeInTheDocument();
    expect(
      screen.getByDisplayValue(/2024-01-15T10:00:00/i),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /add/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /cancel/i })).toBeInTheDocument();
  });

  it("calls createTimeInterval with correct data on save", async () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2024-01-15T10:00:00"));

    const user = userEvent.setup();
    vi.mocked(createTimeInterval).mockResolvedValue();

    renderCreateInterval();

    vi.useRealTimers();

    const saveButton = screen.getByRole("button", { name: /add/i });
    await user.click(saveButton);

    await waitFor(() => {
      expect(createTimeInterval).toHaveBeenCalledWith({
        taskId: taskId,
        start: new Date("2024-01-15T09:00:00"),
        end: new Date("2024-01-15T10:00:00"),
      });
    });
  });

  it("calls onCreateFinish after successful save", async () => {
    const user = userEvent.setup();
    vi.mocked(createTimeInterval).mockResolvedValue();

    renderCreateInterval();

    const saveButton = screen.getByRole("button", { name: /add/i });
    await user.click(saveButton);

    await waitFor(() => {
      expect(onCreateFinish).toHaveBeenCalledTimes(1);
    });
  });

  it("calls onCreateFinish when cancel button is clicked", async () => {
    const user = userEvent.setup();

    renderCreateInterval();

    const cancelButton = screen.getByRole("button", { name: /cancel/i });
    await user.click(cancelButton);

    expect(onCreateFinish).toHaveBeenCalledTimes(1);
    expect(createTimeInterval).not.toHaveBeenCalled();
  });
});
