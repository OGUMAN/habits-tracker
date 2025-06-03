import { defineStore } from "pinia";
import { DateUtils } from "../../../shared/lib/dateUtils";

export const useHabitsStore = defineStore("habitsStore", {
  state: () => ({
    habits: [
      {
        title: "Do exercise",
        description: "Do a quick 15 minutes HIIT workout",
        id: 0,
        progress: [],
      },
    ] as IHabit[],
    editingHabit: null as IHabit | null,
    viewingHabit: null as IHabit | null,
  }),
  actions: {
    findHabitIndex(habitId: number) {
      return this.habits.findIndex((h) => h.id === habitId);
    },

    updateProgress(habit: IHabit, day: number, add: boolean) {
      const dayStart = DateUtils.startOfDay(day);
      const dayEnd = DateUtils.endOfDay(day);
      habit.progress = add
        ? [...habit.progress, dayStart]
        : habit.progress.filter((ts) => ts < dayStart || ts >= dayEnd);
    },

    mark(habit: IHabit, day: number, value: boolean) {
      const index = this.findHabitIndex(habit.id);
      if (index !== -1) {
        this.updateProgress(this.habits[index], day, value);
      }
    },

    isCompleted(habit: IHabit, day: number) {
      const dayStart = DateUtils.startOfDay(day);
      const dayEnd = DateUtils.endOfDay(day);
      return habit.progress.some((ts) => ts >= dayStart && ts < dayEnd);
    },

    edit(newHabit: INewHabit) {
      if (!this.editingHabit) return false;

      const index = this.findHabitIndex(this.editingHabit.id);
      if (index !== -1) {
        this.habits[index] = { ...this.editingHabit, ...newHabit };
      }
    },

    add(newHabit: INewHabit) {
      const newId = this.habits.length
        ? Math.max(...this.habits.map((h) => h.id)) + 1
        : 0;
      this.habits.push({ ...newHabit, id: newId, progress: [] });
    },

    delete(habit: IHabit) {
      this.habits = this.habits.filter((h) => h.id !== habit.id);
    },
  },
});
