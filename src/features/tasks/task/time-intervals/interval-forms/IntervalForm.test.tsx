import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { IntervalForm } from "./IntervalForm";

const onSave = vi.fn();
const onCancel = vi.fn();

const renderIntervalForm = (props: { initialStart: Date; initialEnd: Date }) =>
  render(
    <IntervalForm
      onSave={onSave}
      onCancel={onCancel}
      submitLabel="Save"
      {...props}
    />,
  );

describe("IntervalForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("displays validation error to user when start time is after end time", async () => {
    const user = userEvent.setup();

    const start = new Date("2024-01-15T10:00:00");
    const end = new Date("2024-01-15T09:00:00");

    renderIntervalForm({
      initialStart: start,
      initialEnd: end,
    });

    const saveButton = screen.getByRole("button", { name: /save/i });
    await user.click(saveButton);

    expect(
      screen.getByText(/start time must be before end time/i),
    ).toBeInTheDocument();

    expect(onSave).not.toHaveBeenCalled();
  });
});
