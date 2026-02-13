import { describe, expect, it } from "vitest";

import { validateInterval } from "./validateInterval";

describe("validateInterval", () => {
  const now = new Date("2024-01-15T10:00:00");

  it("returns no errors for valid interval", () => {
    const start = new Date("2024-01-15T08:00:00");
    const end = new Date("2024-01-15T09:00:00");

    const errors = validateInterval({ start, end, now });

    expect(errors).toEqual({});
  });

  describe("start validation", () => {
    it("returns error when start is after end", () => {
      const start = new Date("2024-01-15T09:00:00");
      const end = new Date("2024-01-15T08:00:00");

      const errors = validateInterval({ start, end, now });

      expect(errors.start).toBe("Start time must be before end time");
    });

    it("returns error when start is before prevIntervalEnd", () => {
      const prevIntervalEnd = new Date("2024-01-15T07:00:00");
      const start = new Date("2024-01-15T06:00:00");
      const end = new Date("2024-01-15T08:00:00");

      const errors = validateInterval({ prevIntervalEnd, start, end, now });

      expect(errors.start).toBe(
        "Start time cannot be before previous interval end time",
      );
    });

    it("returns no errors when start and end is the same but not in the future", () => {
      const start = new Date("2024-01-15T10:00:00");
      const end = new Date("2024-01-15T10:00:00");

      const errors = validateInterval({ start, end, now });
      expect(errors).toEqual({});
    });

    it("returns no error when start equals prevIntervalEnd", () => {
      const prevIntervalEnd = new Date("2024-01-15T07:00:00");
      const start = new Date("2024-01-15T07:00:00");
      const end = new Date("2024-01-15T08:00:00");

      const errors = validateInterval({ prevIntervalEnd, start, end, now });

      expect(errors).toEqual({});
    });

    it("returns no error when start is after prevIntervalEnd", () => {
      const prevIntervalEnd = new Date("2024-01-15T07:00:00");
      const start = new Date("2024-01-15T08:00:00");
      const end = new Date("2024-01-15T09:00:00");

      const errors = validateInterval({ prevIntervalEnd, start, end, now });

      expect(errors).toEqual({});
    });
  });

  describe("end validation", () => {
    it("returns error when end is after nextIntervalStart", () => {
      const nextIntervalStart = new Date("2024-01-15T09:00:00");
      const start = new Date("2024-01-15T07:00:00");
      const end = new Date("2024-01-15T10:00:00");

      const errors = validateInterval({ nextIntervalStart, start, end, now });

      expect(errors.end).toBe(
        "End time cannot be after next interval start time",
      );
    });

    it("returns no error when end equals nextIntervalStart", () => {
      const nextIntervalStart = new Date("2024-01-15T09:00:00");
      const start = new Date("2024-01-15T08:00:00");
      const end = new Date("2024-01-15T09:00:00");

      const errors = validateInterval({ nextIntervalStart, start, end, now });

      expect(errors.end).toBeUndefined();
    });

    it("returns no error when end is before nextIntervalStart", () => {
      const nextIntervalStart = new Date("2024-01-15T09:00:00");
      const start = new Date("2024-01-15T07:00:00");
      const end = new Date("2024-01-15T08:00:00");

      const errors = validateInterval({ nextIntervalStart, start, end, now });

      expect(errors.end).toBeUndefined();
    });

    it("returns error when end is in the future", () => {
      const start = new Date("2024-01-15T09:00:00");
      const end = new Date("2024-01-15T11:00:00");

      const errors = validateInterval({ start, end, now });

      expect(errors.end).toBe("End time cannot be in the future");
    });

    it("returns no error when end equals now", () => {
      const start = new Date("2024-01-15T09:00:00");
      const end = new Date("2024-01-15T10:00:00");

      const errors = validateInterval({ start, end, now });

      expect(errors).toEqual({});
    });

    it("returns no error when end is before now", () => {
      const start = new Date("2024-01-15T08:00:00");
      const end = new Date("2024-01-15T09:00:00");

      const errors = validateInterval({ start, end, now });

      expect(errors).toEqual({});
    });
  });

  describe("combined validation", () => {
    it("returns both start and end errors when both are invalid", () => {
      const start = new Date("2024-01-15T12:00:00");
      const end = new Date("2024-01-15T11:00:00");

      const errors = validateInterval({ start, end, now });

      expect(errors.start).toBe("Start time must be before end time");
      expect(errors.end).toBe("End time cannot be in the future"); // end validation doesn't run when end < start
    });

    it("validates with both prevIntervalEnd and nextIntervalStart", () => {
      const prevIntervalEnd = new Date("2024-01-15T07:00:00");
      const nextIntervalStart = new Date("2024-01-15T09:00:00");
      const start = new Date("2024-01-15T07:30:00");
      const end = new Date("2024-01-15T08:30:00");

      const errors = validateInterval({
        prevIntervalEnd,
        nextIntervalStart,
        start,
        end,
        now,
      });

      expect(errors).toEqual({});
    });

    it("returns errors when violating both constraints", () => {
      const prevIntervalEnd = new Date("2024-01-15T08:00:00");
      const nextIntervalStart = new Date("2024-01-15T08:30:00");
      const start = new Date("2024-01-15T07:00:00");
      const end = new Date("2024-01-15T09:00:00");

      const errors = validateInterval({
        prevIntervalEnd,
        nextIntervalStart,
        start,
        end,
        now,
      });

      expect(errors.start).toBe(
        "Start time cannot be before previous interval end time",
      );
      expect(errors.end).toBe(
        "End time cannot be after next interval start time",
      );
    });
  });
});
