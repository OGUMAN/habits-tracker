<template>
  <q-form @submit.prevent="handleSubmit" class="q-gutter-md">
    <q-input
      filled
      v-model="formValue.title"
      label="Habit name"
      lazy-rules
      hide-bottom-space
      :rules="[(val) => (val && val.length > 0) || 'Please type something']"
    />

    <q-input
      filled
      type="textarea"
      v-model="formValue.description"
      label="Habit description"
    />

    <div>
      <q-btn type="submit" label="Submit" color="primary" />
    </div>
  </q-form>
</template>

<script lang="ts" setup>
const DEFAULT_VALUE: INewHabit = {
  title: "",
  description: "",
};

const props = defineProps({
  value: {
    type: Object as PropType<IHabit>,
    required: false,
  },
});
const formValue = ref<INewHabit>(
  props.value ? { ...props.value } : DEFAULT_VALUE
);

const emits = defineEmits(["submit"]);

function handleSubmit() {
  emits("submit", formValue.value);
}
</script>
