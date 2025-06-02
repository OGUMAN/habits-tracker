<template>
  <div @click="modelValue = true">
    <slot name="activator" />
  </div>

  <q-dialog @hide="$emit('hide')" v-model="modelValue">
    <q-card style="min-width: 350px">
      <q-card-section class="shared-modal__header">
        <h1 class="shared-modal__title text-h6">
          <slot name="title" />
        </h1>
        <q-btn dense round flat icon="close" @click.stop="modelValue = false" />
      </q-card-section>

      <q-card-section class="q-pt-none">
        <slot name="content" />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script lang="ts" setup>
const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
});
const emits = defineEmits(["update:modelValue", "hide"]);
const modelValue = computed({
  get: () => props.modelValue,
  set: (val) => emits("update:modelValue", val),
});
</script>

<style lang="scss" scoped>
.shared-modal {
  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__title {
    line-height: 1em;
  }
}
</style>
