<template>
  <div v-if="habitsStore.habits.length" class="habit-list">
    <EntitiesHabit
      v-for="habit in habitsStore.habits"
      :data="habit"
      :id="habit.id"
      ><slot :habit="habit" />
    </EntitiesHabit>
  </div>
  <div class="habit-list__empty" v-else>No habits</div>
</template>

<script lang="ts" setup>
const habitsStore = useHabitsStore();
</script>

<style lang="scss" scoped>
.habit-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
  overflow: auto;

  &__empty {
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100px;
  }
}
</style>
