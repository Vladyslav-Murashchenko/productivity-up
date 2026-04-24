import { Interval } from "../model";
import { calculateDuration } from "./calculateDuration";

describe("calculateDuration", () => {
  it("calculates duration for a single interval", () => {
    const intervals: Interval[] = [
      {
        start: new Date("2024-01-15T08:00:00"),
        end: new Date("2024-01-15T09:00:00"),
      },
    ];

    const result = calculateDuration(intervals);

    expect(result).toEqual(3_600_000); // 1 hour in milliseconds
  });

  it("calculates total duration for multiple intervals", () => {
    const intervals: Interval[] = [
      {
        start: new Date("2024-01-15T08:00:00"),
        end: new Date("2024-01-15T09:00:00"),
      },
      {
        start: new Date("2024-01-15T10:00:00"),
        end: new Date("2024-01-15T11:30:00"),
      },
    ];

    const result = calculateDuration(intervals);

    expect(result).toEqual(9_000_000); // 2.5 hours in milliseconds
  });

  it("calculates duration for intervals with different lengths", () => {
    const intervals: Interval[] = [
      {
        start: new Date("2024-01-15T08:00:00"),
        end: new Date("2024-01-15T08:30:00"),
      },
      {
        start: new Date("2024-01-15T09:00:00"),
        end: new Date("2024-01-15T10:15:00"),
      },
      {
        start: new Date("2024-01-15T11:00:00"),
        end: new Date("2024-01-15T11:45:00"),
      },
    ];

    const result = calculateDuration(intervals);

    expect(result).toEqual(9_000_000); // 30m + 1h15m + 45m = 2h30m in milliseconds
  });

  it("returns 0 for empty array", () => {
    const intervals: Interval[] = [];

    const result = calculateDuration(intervals);

    expect(result).toEqual(0);
  });

  it("handles intervals with very short durations", () => {
    const intervals: Interval[] = [
      {
        start: new Date("2024-01-15T08:00:00"),
        end: new Date("2024-01-15T08:00:05"),
      },
    ];

    const result = calculateDuration(intervals);

    expect(result).toEqual(5000); // 5 seconds in milliseconds
  });
});
