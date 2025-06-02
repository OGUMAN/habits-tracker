<template>
  <q-btn-group flat class="habit-navigation">
    <q-btn
      v-for="link in links"
      :key="link.path"
      :to="link.path"
      :label="link.label"
      rounded
      flat
      :color="isActive(link.path) ? 'primary' : 'secondary'"
      text-color="black"
      :class="{ 'habit-navigation__link--active': isActive(link.path) }"
    />
  </q-btn-group>
</template>

<script setup>
const route = useRoute();

const links = [
  { label: "Daily", path: "/" },
  { label: "Weekly", path: "/weekly" },
  { label: "Overall", path: "/overall" },
];

const isActive = (path) => route.path === path;
</script>

<style scoped lang="scss">
.habit-navigation {
  display: flex;
  gap: 0.5rem;
  padding: 0.5rem 0;

  &__link--active {
    font-weight: bold;
    background: #c7c7c7;
  }
}
</style>
