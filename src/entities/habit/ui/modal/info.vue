<template>
    <SharedModal 
      class="habit-modal" 
      @hide="closeModal" 
      v-model="isOpened">
      <template #title>{{ habit?.title }}</template>
      <template #content>
        <div class="habit-modal__stats">
          <div class="habit-modal__stat">
            <span class="habit-modal__label">Daystreak:</span> {{ stats.currentStreak }}
          </div>
          <div class="habit-modal__stat">
            <span class="habit-modal__label">Best streak:</span> {{ stats.bestStreak }}
          </div>
          <div class="habit-modal__stat">
            <span class="habit-modal__label">Total:</span> {{ stats.totalCompleted }}
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
    const MS_PER_DAY = 86400000;
    const dates = [...new Set(habit.value?.progress?.map(ts => {
      const d = new Date(ts);
      d.setHours(0, 0, 0, 0);
      return d.getTime();
    }) ?? [])].sort((a, b) => a - b);
  
    let bestStreak = 0, currentStreak = 0, streak = 1;
    for (let i = 1; i < dates.length; i++) {
      if (dates[i] - dates[i - 1] === MS_PER_DAY) streak++;
      else { bestStreak = Math.max(bestStreak, streak); streak = 1; }
    }
    bestStreak = Math.max(bestStreak, streak);
  
    const today = new Date(); today.setHours(0, 0, 0, 0);
    const yesterday = new Date(today); yesterday.setDate(yesterday.getDate() - 1);
    if (dates.includes(today.getTime()) || dates.includes(yesterday.getTime())) {
      currentStreak = 1;
      for (let i = dates.length - 1; i > 0; i--) {
        if (dates[i] - dates[i - 1] === MS_PER_DAY) currentStreak++;
        else break;
      }
    }
  
    return { currentStreak, bestStreak, totalCompleted: dates.length };
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
      box-shadow: 0 1px 3px rgba(0,0,0,0.1);
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
  