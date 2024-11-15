<template>
  <div
    class="absolute w-full h-full backdrop-blur-sm bg-black/70 z-50"
    v-if="props.isAlertVisible"
  >
    <div
      :class="[
        'auto-close-alert text-3xl absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 max-w-md text-white font-bold p-4 alert rounded',
        alertTypeClass,
      ]"
    >
      {{ props.alertMessage }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { AlertProps } from "../types/index";

const props = defineProps<AlertProps>();

const alertTypeClass = computed(() => {
  switch (props.alertType) {
    case "info":
      return "alert-info";
    case "success":
      return "alert-success";
    case "error":
      return "alert-error";
  }
});
</script>

<style scoped>
.auto-close-alert {
  padding: 1em;
  margin: 1em 0;
  border-radius: 5px;
  color: white;
  font-weight: bold;
}
</style>
