import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { updateTimeInterval } from "@/libs/api/time-intervals/updateTimeInterval";

import { EditInterval } from "./EditInterval";

vi.mock("@/libs/api/time-intervals/updateTimeInterval");

const onEditFinish = vi.fn();
const interval = {
  id: 1,
  taskId: 1,
  start: new Date("2024-01-15T09:00:00"),
  end: new Date("2024-01-15T10:00:00"),
};

const renderEditInterval = (props = {}) =>
  render(
    <EditInterval interval={interval} onEditFinish={onEditFinish} {...props} />,
  );

describe("EditInterval", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders interval form with interval values", () => {
    renderEditInterval();

    expect(screen.getByText(/start:/i)).toBeInTheDocument();
    expect(
      screen.getByDisplayValue(/2024-01-15T09:00:00/i),
    ).toBeInTheDocument();
    expect(screen.getByText(/end:/i)).toBeInTheDocument();
    expect(
      screen.getByDisplayValue(/2024-01-15T10:00:00/i),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /save/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /cancel/i })).toBeInTheDocument();
  });

  it("calls updateTimeInterval with correct data on save", async () => {
    const user = userEvent.setup();
    vi.mocked(updateTimeInterval).mockResolvedValue();

    renderEditInterval();

    const saveButton = screen.getByRole("button", { name: /save/i });
    await user.click(saveButton);

    await waitFor(() => {
      expect(updateTimeInterval).toHaveBeenCalledWith({
        id: interval.id,
        start: interval.start,
        end: interval.end,
      });
    });
  });

  it("calls onEditFinish after successful save", async () => {
    const user = userEvent.setup();
    vi.mocked(updateTimeInterval).mockResolvedValue();

    renderEditInterval();

    const saveButton = screen.getByRole("button", { name: /save/i });
    await user.click(saveButton);

    await waitFor(() => {
      expect(onEditFinish).toHaveBeenCalledTimes(1);
    });
  });

  it("calls onEditFinish when cancel button is clicked", async () => {
    const user = userEvent.setup();

    renderEditInterval();

    const cancelButton = screen.getByRole("button", { name: /cancel/i });
    await user.click(cancelButton);

    expect(onEditFinish).toHaveBeenCalledTimes(1);
    expect(updateTimeInterval).not.toHaveBeenCalled();
  });
});
