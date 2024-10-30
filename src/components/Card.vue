<script setup lang="ts">
import { onMounted, ref } from "vue";

const props = defineProps<{
  image: string;
  name: string;
}>();

const imageLol = ref<any>(props.image);

onMounted(() => {
  const img = new URL(props.image, import.meta.url).href;
  imageLol.value = img;
});
</script>

<template>
  <div
    class="flex items-start rounded-xl text-base-100 justify-center h-56 w-36"
  >
    <img :src="imageLol" class="object-fill h-full" />
    <span v-if="!image">{{ name }}</span>
  </div>
</template>
