<template>
  <canvas ref="canvas"></canvas>
</template>

<script setup lang="ts">
const props = defineProps<{ habit: IHabit }>();

const DOT_RADIUS = 7;
const DOT_SPACING = 17.5;
const COLUMNS = 20;
const ROWS = 5;
const CANVAS_WIDTH = COLUMNS * DOT_SPACING;
const CANVAS_HEIGHT = ROWS * DOT_SPACING;
const UNMARKED_COLOR = "#b0b0b0";
const MARKED_COLOR = "#525252";
const MS_IN_DAY = 86400000;

const canvas = ref<HTMLCanvasElement | null>(null);
const store = useHabitsStore();

// Utility function: Start of day for timestamp
const startOfDay = (timestamp: number) => {
  const date = new Date(timestamp);
  date.setHours(0, 0, 0, 0);
  return date.getTime();
};

const drawCanvas = () => {
  if (!canvas.value || !props.habit) return;

  const ctx = canvas.value.getContext("2d");
  if (!ctx) return;

  // Set canvas size
  canvas.value.width = CANVAS_WIDTH;
  canvas.value.height = CANVAS_HEIGHT;
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  const today = startOfDay(Date.now());

  for (let i = 0; i < COLUMNS * ROWS; i++) {
    // Reverse x and y directions to draw from right-top to left-bottom
    const col = COLUMNS - 1 - (i % COLUMNS); // Reverse column
    const row = Math.floor(i / COLUMNS); // Row stays the same

    const x = col * DOT_SPACING + DOT_SPACING / 2;
    const y = row * DOT_SPACING + DOT_SPACING / 2;

    const dayOffset = i;
    const dayTimestamp = today - dayOffset * MS_IN_DAY;
    const isDone = store.isCompleted(props.habit, dayTimestamp);

    ctx.beginPath();
    ctx.arc(x, y, DOT_RADIUS, 0, Math.PI * 2);
    ctx.fillStyle = isDone ? MARKED_COLOR : UNMARKED_COLOR;
    ctx.fill();
  }
};

onMounted(async () => {
  await nextTick();
  drawCanvas();
});

watch(
  () => props.habit && [...props.habit.progress],
  () => drawCanvas(),
  { deep: true }
);
</script>

<style scoped>
canvas {
  display: block;
  width: 100%;
}
</style>
