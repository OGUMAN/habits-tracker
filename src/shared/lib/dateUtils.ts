export const DateUtils = {
  startOfDay(date: Date | number): number {
    const d = typeof date === "number" ? new Date(date) : date;
    return new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
  },

  endOfDay(date: Date | number): number {
    return this.startOfDay(date) + 24 * 60 * 60 * 1000;
  },

  isFuture(date: number) {
    return date > Date.now();
  },
};
