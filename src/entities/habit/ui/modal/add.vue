<template>
  <SharedModal v-model="isOpened">
    <template #activator>
      <slot />
    </template>
    <template #title>New habit</template>
    <template #content>
      <EntitiesHabitModalForm @submit="handleSubmit" />
    </template>
  </SharedModal>
</template>

<script lang="ts" setup>
const isOpened = ref(false);
const habitsStore = useHabitsStore();

const handleSubmit = (formValue: INewHabit) => {
  habitsStore.add(formValue);
  isOpened.value = false;
};
</script>
