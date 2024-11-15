<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { EnumStates, PlayMenuProps, TrucoActions } from "../types/index";

const props = defineProps<PlayMenuProps>();

const trucoName = ref(TrucoActions.TRUCO);
const isShuffling = computed(() => props.state === EnumStates.SHUFFLING);
const isTrucoDisabled = ref(false);

watch(props.trucoMeta, (newTrucoMeta) => {
  if (!newTrucoMeta.level) {
    isTrucoDisabled.value = false;
    trucoName.value = TrucoActions.TRUCO;
  } else if (newTrucoMeta.level === TrucoActions.TRUCO) {
    trucoName.value = TrucoActions.RETRUCO;
  } else if (newTrucoMeta.level === TrucoActions.RETRUCO) {
    trucoName.value = TrucoActions.VALE_CUATRO;
  } else if (newTrucoMeta.level === TrucoActions.VALE_CUATRO) {
    isTrucoDisabled.value = true;
  }
});
</script>

<template>
  <div class="flex flex-col w-full z-10 relative">
    <div
      v-if="
        trucoTurn === 'player' &&
        (state === EnumStates.WAITING_TRUCO ||
          state === EnumStates.WAITING_RETRUCO ||
          state === EnumStates.WAITING_VALE_CUATRO)
      "
      class="absolute bottom-12 inline-flex w-full text-base-content rounded-md h-12"
    >
      <button
        class="btn flex-1 btn-secondary font-bold"
        @click="onTrucoReply(TrucoActions.QUIERO)"
      >
        Quiero
      </button>
      <button
        class="btn btn-primary flex-1 font-bold"
        @click="onTrucoReply(TrucoActions.NO_QUIERO)"
      >
        No Quiero
      </button>
    </div>
    <div
      class="inline-flex w-full h-12 bg-base-100 text-base-content rounded-md"
    >
      <button
        type="button"
        :disabled="
          isShuffling ||
          isTrucoDisabled ||
          (trucoMeta.lastTrucoPlayer === 'rival' && trucoTurn !== 'player') ||
          (!!trucoTurn
            ? trucoTurn !== 'player' &&
              (state === EnumStates.WAITING_TRUCO ||
                state === EnumStates.WAITING_RETRUCO ||
                state === EnumStates.WAITING_VALE_CUATRO)
            : !yourTurn)
        "
        class="btn btn-ghost flex-1"
        @click="onTrucoPlay(trucoName as any)"
      >
        {{ trucoName }}
      </button>
      <button type="button" class="btn btn-ghost flex-1" disabled>
        Envido
      </button>
      <button type="button" disabled class="btn btn-ghost flex-1">Flor</button>
      <button
        type="button"
        class="btn btn-ghost flex-1"
        @click="onMazo"
        :disabled="isShuffling || !yourTurn || state !== EnumStates.WAITING"
      >
        Mazo
      </button>
    </div>
  </div>
</template>
