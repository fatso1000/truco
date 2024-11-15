<script setup lang="ts">
import { ref } from "vue";

const props = defineProps<{
  image: string;
  name: string;
}>();

const currentImage = ref(props.image);
</script>

<template>
  <div
    class="flex items-start rounded-xl text-base-100 justify-center h-56 w-36"
  >
    <img :src="currentImage" class="object-fill h-full" />
    <span v-if="!image">{{ name }}</span>
  </div>
</template>
