<template>
  <EntitiesHabitList>
    <template #default="{ habit }">
      <PagesWeeklyDays :habit="habit" />
    </template>
  </EntitiesHabitList>
</template>
