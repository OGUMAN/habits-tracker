<template>
  <q-btn flat color="primary" round icon="more_vert" :text-color="'black'">
    <q-menu>
      <q-list style="min-width: 100px">
        <q-item
          @click="habitsStore.editingHabit = habit"
          clickable
          v-close-popup
        >
          <q-item-section>Edit</q-item-section>
        </q-item>
        <q-item @click="habitsStore.delete(habit)" clickable v-close-popup>
          <q-item-section>Delete</q-item-section>
        </q-item>
        <q-item clickable v-close-popup>
          <q-item-section @click="habitsStore.viewingHabit = habit">Info</q-item-section>
        </q-item>
      </q-list>
    </q-menu>
  </q-btn>
</template>

<script lang="ts" setup>
import type { PropType } from "vue";

const props = defineProps({
  habit: {
    type: Object as PropType<IHabit>,
    required: true,
  },
});

const habitsStore = useHabitsStore();
</script>
