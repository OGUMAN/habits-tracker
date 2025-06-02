<template>
  <div class="weekly-view">
    <div
      v-for="day in weekDays"
      :key="day.date"
      :class="[
        'weekly-view__day',
        { 'weekly-view__day--today': isToday(day.date) },
      ]"
    >
      <div class="weekly-view__day-name">{{ day.name }}</div>
      <EntitiesHabitCheckbox
        :class="[
          'weekly-view__habit-checkbox',
          DateUtils.isFuture(day.date)
            ? 'weekly-view__habit-checkbox--future'
            : '',
        ]"
        :habit="habit"
        :day="day.date"
        :checked="habitsStore.isCompleted(habit, day.date)"
        @update:checked="toggleCompletion"
      />
      {{}}
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  habit: {
    type: Object as PropType<IHabit>,
    required: true,
  },
});

const habitsStore = useHabitsStore();

const today = DateUtils.startOfDay(new Date().getTime());

const startOfWeek = computed(() => {
  const now = new Date();
  const start = new Date(now.setDate(now.getDate() - now.getDay()));
  return DateUtils.startOfDay(start.getTime());
});

const weekDays = computed(() => {
  return Array.from({ length: 7 }).map((_, i) => {
    const date = startOfWeek.value + i * 24 * 60 * 60 * 1000;
    const name = new Date(date)
      .toLocaleDateString("en", { weekday: "short" })
      .slice(0, 2);
    return { name, date };
  });
});

function toggleCompletion(habit: IHabit, day: number, value: boolean) {
  habitsStore.mark(habit, day, value);
}

function isToday(date: number) {
  return date === today;
}
</script>

<style lang="scss" scoped>
.weekly-view {
  display: flex;
  margin-top: 8px;
  justify-content: space-between;

  &__day {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 4px;
    border-radius: 8px;

    &--today {
      background-color: rgb(76 22 255 / 20%);
    }
  }

  &__day-name {
    text-transform: uppercase;
    margin-bottom: 4px;
    font-size: 12px;
  }

  &__habit-checkbox {
    &--future {
      opacity: 0.5;
    }
  }
}
</style>
