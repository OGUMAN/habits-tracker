import { describe, it, expect } from "vitest";
import { calculateHabitStats } from "./utils";

describe("calculateHabitStats", () => {
  it("returns zeros for empty or undefined input", () => {
    expect(calculateHabitStats([])).toEqual({
      currentStreak: 0,
      bestStreak: 0,
      totalCompleted: 0,
    });
    expect(calculateHabitStats(undefined)).toEqual({
      currentStreak: 0,
      bestStreak: 0,
      totalCompleted: 0,
    });
  });

  it("calculates stats for single day progress", () => {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    const timestamps = [date.getTime()];
    const result = calculateHabitStats(timestamps);
    expect(result.bestStreak).toBe(1);
    expect(result.currentStreak).toBe(1);
    expect(result.totalCompleted).toBe(1);
  });

  it("calculates correct streaks for consecutive days", () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const oneDay = 86400000;
    const timestamps = [
      today.getTime() - 3 * oneDay,
      today.getTime() - 2 * oneDay,
      today.getTime() - oneDay,
      today.getTime(),
    ];

    const result = calculateHabitStats(timestamps);
    expect(result.bestStreak).toBe(4);
    expect(result.currentStreak).toBe(4);
    expect(result.totalCompleted).toBe(4);
  });

  it("resets streak correctly with gaps", () => {
    const oneDay = 86400000;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const timestamps = [
      today.getTime() - 5 * oneDay,
      today.getTime() - 4 * oneDay,
      today.getTime() - 2 * oneDay,
      today.getTime() - oneDay,
    ];

    const result = calculateHabitStats(timestamps);
    expect(result.bestStreak).toBe(2);
    expect(result.currentStreak).toBe(2);
    expect(result.totalCompleted).toBe(4);
  });

  it("handles non-consecutive dates and calculates best streak correctly", () => {
    const oneDay = 86400000;
    const dates = [
      new Date("2025-06-01").getTime(),
      new Date("2025-06-02").getTime(),
      new Date("2025-06-04").getTime(),
      new Date("2025-06-05").getTime(),
      new Date("2025-06-06").getTime(),
    ];
    const result = calculateHabitStats(dates);
    expect(result.bestStreak).toBe(3); // June 4-6
    expect(result.totalCompleted).toBe(5);
  });
});
