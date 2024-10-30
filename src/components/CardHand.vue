<script setup lang="ts">
import { reactive } from "vue";
import { ICard } from "../types";
import Card from "./Card.vue";

const props = defineProps<{
  cards: ICard[];
  yourTurn: boolean;
  onCardClick: (card: ICard, player: "player" | "rival") => void;
}>();

const isSelected = reactive({
  active: false,
  id: 0,
  trigger: false,
});

const onSelectButton = (
  index: number,
  card: ICard,
  player: "player" | "rival"
) => {
  if (!isSelected.active) {
    isSelected.active = true;
    isSelected.id = index;
  } else if (isSelected.id === index) {
    isSelected.trigger = true;
    setTimeout(() => {
      isSelected.trigger = false;
      props.onCardClick(card, player);
    }, 1500);
  }
};

const onLostFocus = () => {
  isSelected.active = false;
  isSelected.id = 0;
  isSelected.trigger = false;
};
</script>

<template>
  <div class="inline-flex m-auto">
    <button
      :disabled="!yourTurn"
      type="button"
      @focusout="onLostFocus"
      @click="onSelectButton(index, card, 'player')"
      v-for="(card, index) in cards"
      :style="{
        'z-index': index,
      }"
      :class="
        (index === isSelected.id && isSelected.active && !isSelected.trigger
          ? ' !z-40 scale-125 !rotate-0'
          : index === isSelected.id && isSelected.active && isSelected.trigger
          ? ' test-animation'
          : '') +
        ' first:-rotate-12 first:translate-x-9 first:translate-y-4 last:translate-y-4 last:-translate-x-9 last:rotate-12 rounded-xl transition shadow-2xl'
      "
      :key="card.name"
    >
      <Card :image="card.image" :name="card.name" />
    </button>
  </div>
</template>
