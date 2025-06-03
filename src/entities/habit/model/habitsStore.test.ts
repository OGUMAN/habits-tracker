import { createPinia, setActivePinia } from "pinia";
import { useHabitsStore } from "./habitsStore";
import { describe, it, expect, beforeEach, vi } from "vitest";

describe("habitsStore", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("adds a new habit", () => {
    const store = useHabitsStore();
    store.add({ title: "New Habit", description: "Try new habit" });
    expect(store.habits.length).toBe(2);
    expect(store.habits[1].title).toBe("New Habit");
  });

  it("deletes a habit", () => {
    const store = useHabitsStore();
    const habitToDelete = store.habits[0];
    store.delete(habitToDelete);
    expect(store.habits.length).toBe(0);
  });

  it("updates progress correctly (mark and unmark)", () => {
    const store = useHabitsStore();
    const habit = store.habits[0];
    const timestamp = Date.now();

    store.mark(habit, timestamp, true);
    expect(store.isCompleted(habit, timestamp)).toBe(true);

    store.mark(habit, timestamp, false);
    expect(store.isCompleted(habit, timestamp)).toBe(false);
  });

  it("edits a habit", () => {
    const store = useHabitsStore();
    store.editingHabit = { ...store.habits[0] };
    store.edit({ title: "Updated Title", description: "Updated Description" });

    expect(store.habits[0].title).toBe("Updated Title");
    expect(store.habits[0].description).toBe("Updated Description");
  });
});
