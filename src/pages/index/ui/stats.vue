<template>
  <div>
    <p>Completed today: {{ completedToday }} / {{ totalHabits }}</p>
  </div>
</template>

<script lang="ts" setup>
const habitsStore = useHabitsStore();

const totalHabits = computed(() => habitsStore.habits.length);

const now = Date.now();

const completedToday = computed(
  () =>
    habitsStore.habits.filter((habit) =>
      habit.progress.some(
        (ts) => ts >= DateUtils.startOfDay(now) && ts < DateUtils.endOfDay(now)
      )
    ).length
);
</script>
