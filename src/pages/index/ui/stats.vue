<template>
  <div>
    <p>Completed today: {{ completedToday }} / {{ totalHabits }}</p>
  </div>
</template>

<script lang="ts" setup>
const habitsStore = useHabitsStore();

const totalHabits = computed(() => habitsStore.habits.length);

const today = new Date();
const startOfToday = new Date(
  today.getFullYear(),
  today.getMonth(),
  today.getDate()
).getTime();
const endOfToday = startOfToday + 24 * 60 * 60 * 1000;

const completedToday = computed(
  () =>
    habitsStore.habits.filter((habit) =>
      habit.progress.some((ts) => ts >= startOfToday && ts < endOfToday)
    ).length
);
</script>
