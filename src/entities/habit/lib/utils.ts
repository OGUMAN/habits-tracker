// utils/habitStats.ts
export interface HabitStats {
  currentStreak: number;
  bestStreak: number;
  totalCompleted: number;
}

/**
 * Calculate habit streak stats from an array of timestamps (progress).
 * @param timestamps Array of progress timestamps in ms
 */
export function calculateHabitStats(
  timestamps: number[] | undefined
): HabitStats {
  const MS_PER_DAY = 86400000;
  if (!timestamps || timestamps.length === 0) {
    return { currentStreak: 0, bestStreak: 0, totalCompleted: 0 };
  }

  // Normalize dates to midnight and unique
  const dates = [
    ...new Set(
      timestamps.map((ts) => {
        const d = new Date(ts);
        d.setHours(0, 0, 0, 0);
        return d.getTime();
      })
    ),
  ].sort((a, b) => a - b);

  let bestStreak = 0,
    currentStreak = 0,
    streak = 1;

  for (let i = 1; i < dates.length; i++) {
    if (dates[i] - dates[i - 1] === MS_PER_DAY) {
      streak++;
    } else {
      bestStreak = Math.max(bestStreak, streak);
      streak = 1;
    }
  }
  bestStreak = Math.max(bestStreak, streak);

  // Calculate current streak
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  if (dates.includes(today.getTime()) || dates.includes(yesterday.getTime())) {
    currentStreak = 1;
    for (let i = dates.length - 1; i > 0; i--) {
      if (dates[i] - dates[i - 1] === MS_PER_DAY) {
        currentStreak++;
      } else {
        break;
      }
    }
  }

  return { currentStreak, bestStreak, totalCompleted: dates.length };
}
