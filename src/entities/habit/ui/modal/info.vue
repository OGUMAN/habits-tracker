<template>
  <SharedModal class="habit-modal" @hide="closeModal" v-model="isOpened">
    <template #title>{{ habit?.title }}</template>
    <template #content>
      <div class="habit-modal__stats">
        <div class="habit-modal__stat">
          <span class="habit-modal__label">Daystreak:</span>
          {{ stats.currentStreak }}
        </div>
        <div class="habit-modal__stat">
          <span class="habit-modal__label">Best streak:</span>
          {{ stats.bestStreak }}
        </div>
        <div class="habit-modal__stat">
          <span class="habit-modal__label">Total:</span>
          {{ stats.totalCompleted }}
        </div>
      </div>
      <div class="habit-modal__description">
        <span class="habit-modal__label">Description:</span>
        <p>{{ habit?.description }}</p>
      </div>
    </template>
  </SharedModal>
</template>

<script lang="ts" setup>
import { calculateHabitStats } from 'entities/habit/lib/utils';

const habitsStore = useHabitsStore();
const isOpened = ref(false);
const habit = computed(() => habitsStore.viewingHabit);

watch(habit, (newHabit) => {
  isOpened.value = !!newHabit;
});

const closeModal = () => {
  habitsStore.viewingHabit = null;
};

const stats = computed(() => {
  return calculateHabitStats(habit.value?.progress);
});
</script>

<style lang="scss" scoped>
.habit-modal {
  &__stats {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    margin-bottom: 1rem;
  }

  &__stat {
    flex: 1 1 30%;
    background: #f9f9f9;
    padding: 0.5rem;
    border-radius: 0.5rem;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }

  &__label {
    font-weight: bold;
    color: #333;
  }

  &__description {
    background: #f5f5f5;
    padding: 0.75rem;
    border-radius: 0.5rem;
    p {
      margin: 0.5rem 0 0;
      line-height: 1.4;
    }
  }
}
</style>
