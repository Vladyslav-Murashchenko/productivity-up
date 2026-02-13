import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { useTaskTimeIntervals } from "@/libs/api/time-intervals/useTaskTimeIntervals";
import { Button } from "@/libs/ui/Button";

import { TimeIntervalsModal } from "./TimeIntervalsModal";

vi.mock("@/libs/api/time-intervals/useTaskTimeIntervals");
vi.mock("@/libs/api/time-intervals/createTimeInterval");
vi.mock("@/libs/api/time-intervals/updateTimeInterval");
vi.mock("@/libs/api/time-intervals/deleteTimeInterval");

const renderTimeIntervalsModal = (props = {}) =>
  render(
    <TimeIntervalsModal taskId={1} {...props}>
      <Button>Open Modal</Button>
    </TimeIntervalsModal>,
  );

describe("TimeIntervalsModal", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    vi.mocked(useTaskTimeIntervals).mockReturnValue({
      timeIntervals: [
        {
          id: 1,
          taskId: 1,
          start: new Date("2026-02-12T10:00:00"),
          end: new Date("2026-02-12T11:00:00"),
        },
        {
          id: 2,
          taskId: 1,
          start: new Date("2026-02-12T14:00:00"),
          end: new Date("2026-02-12T15:30:00"),
        },
      ],
    });
  });

  it("renders trigger button", () => {
    renderTimeIntervalsModal();

    expect(
      screen.getByRole("button", { name: /open modal/i }),
    ).toBeInTheDocument();
  });

  it("opens modal when trigger is clicked", async () => {
    const user = userEvent.setup();

    renderTimeIntervalsModal();

    const triggerButton = screen.getByRole("button", { name: /open modal/i });
    await user.click(triggerButton);

    expect(screen.getByText("Time Intervals")).toBeInTheDocument();
  });

  it("renders time intervals when modal is open", async () => {
    const user = userEvent.setup();

    renderTimeIntervalsModal();

    const triggerButton = screen.getByRole("button", { name: /open modal/i });
    await user.click(triggerButton);

    expect(screen.getByText("12.02.26, 10:00:00")).toBeInTheDocument();
    expect(screen.getByText("12.02.26, 11:00:00")).toBeInTheDocument();
    expect(screen.getByText("1h 0m 0s")).toBeInTheDocument();

    expect(screen.getByText("12.02.26, 14:00:00")).toBeInTheDocument();
    expect(screen.getByText("12.02.26, 15:30:00")).toBeInTheDocument();
    expect(screen.getByText("1h 30m 0s")).toBeInTheDocument();
  });

  it("shows empty state when no intervals", async () => {
    const user = userEvent.setup();

    vi.mocked(useTaskTimeIntervals).mockReturnValue({
      timeIntervals: [],
    });

    renderTimeIntervalsModal();

    const triggerButton = screen.getByRole("button", { name: /open modal/i });
    await user.click(triggerButton);

    expect(
      screen.getByText("No time intervals recorded yet"),
    ).toBeInTheDocument();
  });

  it("renders add interval buttons when intervals exist", async () => {
    const user = userEvent.setup();

    renderTimeIntervalsModal();

    const triggerButton = screen.getByRole("button", { name: /open modal/i });
    await user.click(triggerButton);

    const addButtons = screen.getAllByRole("button", {
      name: /add time interval/i,
    });
    expect(addButtons.length).toBe(3);
  });

  it("does not render when timeIntervals is undefined", async () => {
    const user = userEvent.setup();

    vi.mocked(useTaskTimeIntervals).mockReturnValue({
      timeIntervals: undefined,
    });

    renderTimeIntervalsModal();

    const triggerButton = screen.getByRole("button", { name: /open modal/i });
    await user.click(triggerButton);

    expect(
      screen.queryByText("No time intervals recorded yet"),
    ).not.toBeInTheDocument();
  });

  it("passes correct taskId to useTaskTimeIntervals", async () => {
    const user = userEvent.setup();

    renderTimeIntervalsModal({ taskId: 42 });

    const triggerButton = screen.getByRole("button", { name: /open modal/i });
    await user.click(triggerButton);

    expect(useTaskTimeIntervals).toHaveBeenCalledWith(42);
  });

  it('should start edit when clicking on "Edit" button', async () => {
    const user = userEvent.setup();

    renderTimeIntervalsModal();
    const triggerButton = screen.getByRole("button", { name: /open modal/i });
    await user.click(triggerButton);

    const editButtons = screen.getAllByRole("button", {
      name: /edit interval/i,
    });
    await user.click(editButtons[0]);

    expect(
      screen.getByDisplayValue(/2026-02-12T10:00:00/i),
    ).toBeInTheDocument();

    expect(
      screen.getByDisplayValue(/2026-02-12T11:00:00/i),
    ).toBeInTheDocument();
  });

  it('should add new interval when clicking on "Add" button', async () => {
    const user = userEvent.setup();

    renderTimeIntervalsModal();
    const triggerButton = screen.getByRole("button", { name: /open modal/i });
    await user.click(triggerButton);
    const addButtons = screen.getAllByRole("button", {
      name: /add time interval/i,
    });
    await user.click(addButtons[1]);

    expect(
      screen.getByDisplayValue(/2026-02-12T11:00:00/i),
    ).toBeInTheDocument();

    expect(
      screen.getByDisplayValue(/2026-02-12T12:00:00/i),
    ).toBeInTheDocument();
  });
});
