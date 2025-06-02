<template>
  <Title>Habits tracker</Title>
  <main class="main">
    <section class="main__section">
      <AppHeader />
      <EntitiesHabitModalEdit />
      <EntitiesHabitModalInfo />
      <NuxtPage />
    </section>
  </main>
</template>

<style lang="scss" scoped>
.main {
  max-width: 390px;
  margin: 0 auto;
  padding: 10px;
  height: 100vh;

  &__section {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
}
</style>

<style lang="scss">
body,
html {
  font-size: 17px;
}

*,
*:after,
*:before {
  box-sizing: border-box;
}
</style>
