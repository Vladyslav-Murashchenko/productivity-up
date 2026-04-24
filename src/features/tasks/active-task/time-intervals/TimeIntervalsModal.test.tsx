import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { useActiveTaskState } from "@/libs/db/active-task/useActiveTaskState";
import { useTaskTimeIntervals } from "@/libs/db/time-intervals/useTaskTimeIntervals";
import { Button } from "@/libs/ui/Button";

import { TimeIntervalsModal } from "./TimeIntervalsModal";

vi.mock("@/libs/db/active-task/useActiveTaskState");
vi.mock("@/libs/db/time-intervals/useTaskTimeIntervals");
vi.mock("@/libs/db/time-intervals/createTimeInterval");
vi.mock("@/libs/db/time-intervals/updateTimeInterval");
vi.mock("@/libs/db/time-intervals/deleteTimeInterval");

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

    vi.mocked(useActiveTaskState).mockReturnValue({
      activeTaskState: {
        taskId: 1,
        startTime: new Date("2026-02-12T16:00:00"),
      },
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

  it("displays active time interval correctly", async () => {
    vi.useFakeTimers({ toFake: ["Date"] });
    vi.setSystemTime(new Date("2026-02-12T16:06:11"));

    const user = userEvent.setup();

    renderTimeIntervalsModal();

    const triggerButton = screen.getByRole("button", { name: /open modal/i });
    await user.click(triggerButton);

    expect(screen.getByText("12.02.26, 16:00:00")).toBeInTheDocument();
    expect(screen.getByText("6m 11s")).toBeInTheDocument();

    vi.useRealTimers();
  });
});
