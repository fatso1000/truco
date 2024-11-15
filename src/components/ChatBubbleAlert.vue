<template>
  <div
    :class="[
      'absolute right-2 top-10 -translate-x-1/2 text-white font-bold p-4 chat chat-end rounded',
      alertTypeClass,
    ]"
    v-if="isAlertVisible"
  >
    <div className="chat-image avatar">
      <div className="w-10 rounded-full">
        <img
          alt="Tailwind CSS chat bubble component"
          src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
        />
      </div>
    </div>
    <div class="chat-bubble">{{ alertMessage }}</div>
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
