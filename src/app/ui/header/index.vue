<template>
  <div class="app-header">
    <h1 class="app-header__title">Habits</h1>
    <div class="app-header__bottom">
      <AppHeaderNav />
      <AppHeaderAddHabit />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.app-header {
  margin-bottom: 15px;

  &__title {
    line-height: 1em;
    font-size: 48px;
    margin-bottom: 10px;
    font-weight: 600;
  }

  &__bottom {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}
</style>
