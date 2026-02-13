import { describe, expect, it } from "vitest";

import { getInitialEnd, getInitialStart } from "./CreateInterval.utils";

describe("CreateInterval.utils", () => {
  describe("getInitialStart", () => {
    const mountTime = new Date("2024-01-15T10:00:00");

    it("returns prev interval end if prev interval exists", () => {
      const prevIntervalEnd = new Date("2024-01-15T08:00:00");
      const nextIntervalStart = new Date("2024-01-15T11:00:00");

      const result = getInitialStart(
        mountTime,
        prevIntervalEnd,
        nextIntervalStart,
      );

      expect(result).toEqual(prevIntervalEnd);
    });

    it("returns 1 hour before next interval when no previous interval", () => {
      const nextIntervalStart = new Date("2024-01-15T11:00:00");

      const result = getInitialStart(mountTime, undefined, nextIntervalStart);

      expect(result).toEqual(new Date("2024-01-15T10:00:00"));
    });

    it("returns 1 hour before mountTime when no interval at all", () => {
      const result = getInitialStart(mountTime);

      expect(result).toEqual(new Date("2024-01-15T09:00:00"));
    });
  });

  describe("getInitialEnd", () => {
    it("returns the 1 hour after initialStart if enough time", () => {
      const mountTime = new Date("2024-01-15T10:00:00");
      const initialStart = new Date("2024-01-15T08:00:00");
      const nextIntervalStart = new Date("2024-01-15T09:30:00");

      const result = getInitialEnd(mountTime, initialStart, nextIntervalStart);

      expect(result).toEqual(new Date("2024-01-15T09:00:00"));
    });

    it("returns next interval start if not enough time", () => {
      const mountTime = new Date("2024-01-15T10:00:00");
      const initialStart = new Date("2024-01-15T08:00:00");
      const nextIntervalStart = new Date("2024-01-15T08:30:00");

      const result = getInitialEnd(mountTime, initialStart, nextIntervalStart);

      expect(result).toEqual(nextIntervalStart);
    });

    it("returns 1 hour after initialStart if no next interval and enough time", () => {
      const mountTime = new Date("2024-01-15T10:00:00");
      const initialStart = new Date("2024-01-15T08:00:00");

      const result = getInitialEnd(mountTime, initialStart);

      expect(result).toEqual(new Date("2024-01-15T09:00:00"));
    });

    it("returns mountTime if no next interval and not enough time", () => {
      const mountTime = new Date("2024-01-15T10:00:00");
      const initialStart = new Date("2024-01-15T09:30:00");

      const result = getInitialEnd(mountTime, initialStart);

      expect(result).toEqual(mountTime);
    });
  });
});
