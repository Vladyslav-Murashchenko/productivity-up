import { sortIntervals } from "./sortIntervals";

describe("sortIntervals", () => {
  it("sorts intervals by start time ascending", () => {
    const intervals = [
      {
        start: new Date("2024-01-01T10:00:00"),
        end: new Date("2024-01-01T11:00:00"),
      },
      {
        start: new Date("2024-01-01T09:00:00"),
        end: new Date("2024-01-01T10:00:00"),
      },
      {
        start: new Date("2024-01-01T11:00:00"),
        end: new Date("2024-01-01T12:00:00"),
      },
    ];

    const sorted = sortIntervals(intervals);

    expect(sorted).toEqual([
      {
        start: new Date("2024-01-01T09:00:00"),
        end: new Date("2024-01-01T10:00:00"),
      },
      {
        start: new Date("2024-01-01T10:00:00"),
        end: new Date("2024-01-01T11:00:00"),
      },
      {
        start: new Date("2024-01-01T11:00:00"),
        end: new Date("2024-01-01T12:00:00"),
      },
    ]);
  });

  it("sorts intervals with zero time should go first", () => {
    const intervals = [
      {
        start: new Date("2024-01-01T10:00:00"),
        end: new Date("2024-01-01T11:00:00"),
      },
      {
        start: new Date("2024-01-01T10:00:00"),
        end: new Date("2024-01-01T10:00:00"),
      },
      {
        start: new Date("2024-01-01T11:00:00"),
        end: new Date("2024-01-01T11:30:00"),
      },
    ];

    const sorted = sortIntervals(intervals);

    expect(sorted).toEqual([
      {
        start: new Date("2024-01-01T10:00:00"),
        end: new Date("2024-01-01T10:00:00"),
      },
      {
        start: new Date("2024-01-01T10:00:00"),
        end: new Date("2024-01-01T11:00:00"),
      },
      {
        start: new Date("2024-01-01T11:00:00"),
        end: new Date("2024-01-01T11:30:00"),
      },
    ]);
  });
});
