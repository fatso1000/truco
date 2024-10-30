<script setup lang="ts">
defineProps<{ label: string; points: number }>();
</script>

<template>
  <div class="inline-flex gap-2 items-center">
    <div>
      <span>{{ label }}: </span>
    </div>
    <div>
      {{ points }}
    </div>
  </div>
</template>
