import { Interval } from "../model";
import { calculateSavedDuration, sortIntervals } from "./timeIntervals";

describe("timeIntervals", () => {
  describe("calculateDuration", () => {
    it("calculates duration for a single interval", () => {
      const intervals: Interval[] = [
        {
          start: new Date("2024-01-15T08:00:00"),
          end: new Date("2024-01-15T09:00:00"),
        },
      ];

      const result = calculateSavedDuration({
        timeIntervals: intervals,
      });

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

      const result = calculateSavedDuration({
        timeIntervals: intervals,
      });

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

      const result = calculateSavedDuration({
        timeIntervals: intervals,
      });

      expect(result).toEqual(9_000_000); // 30m + 1h15m + 45m = 2h30m in milliseconds
    });

    it("returns 0 for empty array", () => {
      const intervals: Interval[] = [];

      const result = calculateSavedDuration({
        timeIntervals: intervals,
      });

      expect(result).toEqual(0);
    });

    it("handles intervals with very short durations", () => {
      const intervals: Interval[] = [
        {
          start: new Date("2024-01-15T08:00:00"),
          end: new Date("2024-01-15T08:00:05"),
        },
      ];

      const result = calculateSavedDuration({
        timeIntervals: intervals,
      });

      expect(result).toEqual(5000); // 5 seconds in milliseconds
    });

    describe("mode: today", () => {
      it("sums only intervals that started on the same day as `now`", () => {
        const intervals: Interval[] = [
          {
            start: new Date("2024-01-14T22:00:00"),
            end: new Date("2024-01-14T23:00:00"),
          },
          {
            start: new Date("2024-01-15T08:00:00"),
            end: new Date("2024-01-15T09:00:00"),
          },
          {
            start: new Date("2024-01-15T10:00:00"),
            end: new Date("2024-01-15T10:30:00"),
          },
        ];

        const result = calculateSavedDuration({
          timeIntervals: intervals,
          modeParams: {
            mode: "today",
            now: new Date("2024-01-15T12:00:00"),
          },
        });

        expect(result).toEqual(5_400_000); // 1h + 30m
      });

      it("uses the provided `now`, not the system clock", () => {
        vi.useFakeTimers();
        vi.setSystemTime(new Date("2030-06-20T12:00:00"));

        const intervals: Interval[] = [
          {
            start: new Date("2024-01-15T08:00:00"),
            end: new Date("2024-01-15T09:00:00"),
          },
          {
            start: new Date("2024-01-16T08:00:00"),
            end: new Date("2024-01-16T09:00:00"),
          },
        ];

        const result = calculateSavedDuration({
          timeIntervals: intervals,
          modeParams: {
            mode: "today",
            now: new Date("2024-01-15T12:00:00"),
          },
        });

        vi.useRealTimers();

        expect(result).toEqual(3_600_000); // only the 2024-01-15 interval
      });
    });

    describe("mode: last", () => {
      it("returns 0 regardless of stored intervals", () => {
        const intervals: Interval[] = [
          {
            start: new Date("2024-01-15T08:00:00"),
            end: new Date("2024-01-15T09:00:00"),
          },
          {
            start: new Date("2024-01-15T10:00:00"),
            end: new Date("2024-01-15T11:00:00"),
          },
        ];

        const result = calculateSavedDuration({
          timeIntervals: intervals,
          modeParams: { mode: "last" },
        });

        expect(result).toEqual(0);
      });
    });
  });

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
});
