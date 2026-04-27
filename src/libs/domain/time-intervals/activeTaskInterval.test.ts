import { ActiveTaskState } from "../model";
import {
  closeActiveTaskInterval,
  shouldSaveInterval,
} from "./activeTaskInterval";

describe("activeTaskInterval", () => {
  const activeTaskState: ActiveTaskState = {
    taskId: 1,
    startTime: new Date("2024-01-15T10:00:00"),
  };

  describe("shouldSaveInterval", () => {
    it("returns false if less than 3 seconds have passed", () => {
      const now = new Date("2024-01-15T10:00:02");

      expect(shouldSaveInterval(activeTaskState, now)).toBe(false);
    });

    it("returns true if exactly 3 seconds have passed", () => {
      const now = new Date("2024-01-15T10:00:03");

      expect(shouldSaveInterval(activeTaskState, now)).toBe(true);
    });

    it("returns true if more than 3 seconds have passed", () => {
      const now = new Date("2024-01-15T10:05:00");

      expect(shouldSaveInterval(activeTaskState, now)).toBe(true);
    });
  });

  describe("closeActiveTaskInterval", () => {
    it("returns interval with taskId, start from activeTaskState and end as now", () => {
      const now = new Date("2024-01-15T11:00:00");

      const result = closeActiveTaskInterval(activeTaskState, now);

      expect(result).toEqual({
        taskId: 1,
        start: new Date("2024-01-15T10:00:00"),
        end: now,
      });
    });
  });
});
