<template>
  <q-checkbox :model-value="isChecked" @update:model-value="toggleHabit" />
</template>

<script setup lang="ts">
const props = defineProps<{
  habit: IHabit;
  day: number;
}>();

const habitsStore = useHabitsStore();

const isChecked = computed(() =>
  habitsStore.isCompleted(props.habit, props.day)
);

function toggleHabit(value: boolean) {
  if (DateUtils.isFuture(props.day)) return false;
  habitsStore.mark(props.habit, props.day, value);
}
</script>
