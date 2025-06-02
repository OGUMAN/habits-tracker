<template>
  <SharedModal @hide="habitsStore.editingHabit = null" v-model="isOpened">
    <template #activator>
      <slot />
    </template>
    <template #title>Edit habit</template>
    <template #content>
      <EntitiesHabitModalForm
        :value="habitsStore.editingHabit"
        @submit="handleSubmit"
      />
    </template>
  </SharedModal>
</template>

<script lang="ts" setup>
const isOpened = ref(false);
const habitsStore = useHabitsStore();

const handleSubmit = (formValue: INewHabit) => {
  habitsStore.edit(formValue);
  isOpened.value = false;
};

watch(
  () => habitsStore.editingHabit,
  () => {
    isOpened.value = !!habitsStore.editingHabit;
  }
);
</script>
