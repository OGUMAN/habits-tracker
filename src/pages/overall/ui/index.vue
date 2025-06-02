<template>
  <EntitiesHabitList>
    <template #default="{ habit }">
      <PagesOverallDots :habit="habit" />
    </template>
  </EntitiesHabitList>
</template>
