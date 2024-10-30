<script setup lang="ts">
import { ITableCard } from "../types";
import Card from "../components/Card.vue";

defineProps<{
  cards: ITableCard[][];
}>();
</script>

<template>
  <div class="relative h-96 w-full justify-center inline-flex">
    <div
      v-for="(currentCards) in cards"
      class="w-36 ml-5"
    >
      <div
        v-for="card in currentCards"
        :class="`absolute rounded-xl border-2 ${
          card.status === 'win' ? 'z-10 top-16' : 'z-0'
        } ${card.player === 'player' ? ' border-info' : ' border-error'}`"
        :key="card.card.name"
      >
        <Card :image="card.card.image" :name="card.card.name" />
      </div>
    </div>
  </div>
</template>
