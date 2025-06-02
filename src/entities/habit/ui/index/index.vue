<template>
  <div class="habit">
    <div class="habit__header">
      <div class="habit__title">{{ data.title }}</div>
      <div class="habit__buttons">
        <EntitiesHabitCheckbox :habit="data" :day="Date.now()" />
        <EntitiesHabitMenu :habit="data" />
      </div>
    </div>

    <slot :isCompletedToday="true" />
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  data: {
    type: Object as PropType<IHabit>,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
.habit {
  background-color: #96ffff;
  padding: 10px 20px;
  border-radius: 15px;

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__title {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    width: 100%;
  }

  &__buttons {
    width: fit-content;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
}
</style>
