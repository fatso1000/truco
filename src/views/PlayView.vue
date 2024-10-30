<script setup lang="ts">
import { IMeta, EnumStates, ICard, ITrucoMeta, TrucoActions } from "../types";
import {
  cards,
  getCardsFromDeck,
  getRandomBoolean,
  getRandomNumber,
  shuffleDeck,
} from "../helpers/cardHelper";
import { onMounted, reactive, ref } from "vue";
import TableCards from "../components/TableCards.vue";
import CardHand from "../components/CardHand.vue";
import Points from "../components/Points.vue";
import Deck from "../components/Deck.vue";
import PlayMenu from "../components/PlayMenu.vue";

const tripleDrawCards: ICard[][] = [
    [
      { image: "", name: "card_1", value: 12 },
      { image: "", name: "card_11", value: 12 },
      { image: "", name: "card_12", value: 12 },
    ],
    [
      { image: "", name: "card_13", value: 12 },
      { image: "", name: "card_14", value: 12 },
      { image: "", name: "card_15", value: 12 },
    ],
  ],
  firstDrawCards: ICard[][] = [
    [
      { image: "", name: "card_12", value: 12 },
      { image: "", name: "card_13", value: 12 },
      { image: "", name: "card_14", value: 12 },
    ],
    [
      { image: "", name: "card_12", value: 12 },
      { image: "", name: "card_13", value: 5 },
      { image: "", name: "card_14", value: 5 },
    ],
  ],
  winLoseDrawCards: ICard[][] = [
    [
      { image: "", name: "card_12", value: 5 },
      { image: "", name: "card_5", value: 12 },
      { image: "", name: "card_14", value: 12 },
    ],
    [
      { image: "", name: "card_12", value: 12 },
      { image: "", name: "card_13", value: 5 },
      { image: "", name: "card_14", value: 12 },
    ],
  ],
  twoWinCards: ICard[][] = [
    [
      { image: "", name: "card_11", value: 12 },
      { image: "", name: "card_12", value: 12 },
      { image: "", name: "card_13", value: 12 },
    ],
    [
      { image: "", name: "card_14", value: 5 },
      { image: "", name: "card_15", value: 5 },
      { image: "", name: "card_16", value: 5 },
    ],
  ],
  twoDrawCards: ICard[][] = [
    [
      { image: "", name: "card_11", value: 12 },
      { image: "", name: "card_12", value: 12 },
      { image: "", name: "card_13", value: 12 },
    ],
    [
      { image: "", name: "card_14", value: 12 },
      { image: "", name: "card_15", value: 12 },
      { image: "", name: "card_16", value: 5 },
    ],
  ],
  winDrawCards: ICard[][] = [
    [
      { image: "", name: "card_11", value: 12 },
      { image: "", name: "card_12", value: 12 },
      { image: "", name: "card_13", value: 12 },
    ],
    [
      { image: "", name: "card_14", value: 5 },
      { image: "", name: "card_15", value: 12 },
      { image: "", name: "card_16", value: 5 },
    ],
  ];

const meta: IMeta = reactive({
  deck: [],
  playerCards: [],
  rivalCards: [],
  tableCards: [[], [], []],
  difficulty: "easy",
  mano: true,
  round: 0,
  turn: 0,
});

const yourTurn = ref(false);

const globalMeta = reactive({
  playerWins: 0,
  rivalWins: 0,
});

const roundMeta: {
  playerWins: number[];
  rivalWins: number[];
  draws: number[];
} = reactive({
  playerWins: [],
  rivalWins: [],
  draws: [],
  envido: 0,
});

const trucoMeta: ITrucoMeta = reactive({
  level: null,
  points: 0,
  lastTrucoPlayer: undefined,
});

const state = ref<EnumStates>(EnumStates.WAITING);
const trucoTurn = ref<string | undefined>(undefined);

onMounted(() => {
  const shuffledDeck = shuffleDeck(cards);
  const isMano = getRandomBoolean();
  const [playerCards, rivalCards] = getCardsFromDeck(shuffledDeck, isMano);
  // const [playerCards, rivalCards] = [tripleDrawCards[0], tripleDrawCards[1]];
  // const [playerCards, rivalCards] = [twoWinCards[0], twoWinCards[1]];
  // const [playerCards, rivalCards] = [firstDrawCards[0], firstDrawCards[1]];
  // const [playerCards, rivalCards] = [winLoseDrawCards[0], winLoseDrawCards[1]];
  // const [playerCards, rivalCards] = [twoDrawCards[0], twoDrawCards[1]];
  // const [playerCards, rivalCards] = [winDrawCards[0], winDrawCards[1]];
  meta.deck = shuffledDeck;
  meta.playerCards = playerCards;
  meta.rivalCards = rivalCards;
  meta.mano = isMano;
  yourTurn.value = isMano;
  if (!isMano) basicRivalPlay();
});

function resetState() {
  state.value = EnumStates.SHUFFLING;
  setTimeout(() => {
    const shuffledDeck = shuffleDeck(cards);
    const isMano = !meta.mano;
    const [playerCards, rivalCards] = getCardsFromDeck(shuffledDeck, isMano);
    meta.deck = shuffledDeck;
    meta.playerCards = playerCards;
    meta.rivalCards = rivalCards;
    meta.tableCards = [[], [], []];
    meta.mano = isMano;
    yourTurn.value = isMano;
    meta.round = 0;
    meta.turn = 0;
    roundMeta.playerWins = [];
    roundMeta.rivalWins = [];
    roundMeta.draws = [];
    trucoMeta.lastTrucoPlayer = undefined;
    trucoMeta.level = null;
    trucoMeta.points = 0;
    state.value = EnumStates.WAITING;
    trucoTurn.value = undefined;
    if (!isMano) basicRivalPlay();
  }, 5000);
}

const tripleDraw = () => roundMeta.draws.length === 3,
  firstDraw = () =>
    roundMeta.draws.length === 1 &&
    roundMeta.draws[0] === 0 &&
    (roundMeta.playerWins.length === 1 || roundMeta.rivalWins.length === 1),
  lastDraw = () =>
    roundMeta.draws.length === 1 &&
    roundMeta.draws[0] === 2 &&
    roundMeta.playerWins.length === 1 &&
    roundMeta.rivalWins.length === 1,
  winDraw = () =>
    roundMeta.draws.length === 1 &&
    roundMeta.draws[0] === 1 &&
    (roundMeta.playerWins.length === 1 || roundMeta.rivalWins.length === 1),
  twoDraw = () =>
    roundMeta.draws.length === 2 &&
    (roundMeta.playerWins.length === 1 || roundMeta.rivalWins.length === 1),
  winTwo = () =>
    roundMeta.playerWins.length === 2 || roundMeta.rivalWins.length === 2;

function matchPoints() {
  const whoWinPoints =
    roundMeta.playerWins.length > roundMeta.rivalWins.length
      ? "player"
      : "rival";

  if (firstDraw()) {
    if (roundMeta.playerWins.length === 1) {
      globalMeta.playerWins =
        trucoMeta.points > 0
          ? globalMeta.playerWins + trucoMeta.points
          : globalMeta.playerWins + 1;
    } else if (roundMeta.rivalWins.length === 1) {
      globalMeta.rivalWins =
        trucoMeta.points > 0
          ? globalMeta.rivalWins + trucoMeta.points
          : globalMeta.rivalWins + 1;
    }

    console.log(
      "first draw",
      "playerwins: ",
      roundMeta.playerWins.length === 1
    );

    resetState();
    return true;
  } else if (tripleDraw()) {
    if (meta.mano) {
      globalMeta.playerWins =
        trucoMeta.points > 0
          ? globalMeta.playerWins + trucoMeta.points
          : globalMeta.playerWins + 1;
    } else {
      globalMeta.rivalWins =
        trucoMeta.points > 0
          ? globalMeta.rivalWins + trucoMeta.points
          : globalMeta.rivalWins + 1;
    }

    console.log("triple draw", meta.mano);

    resetState();
    return true;
  } else if (lastDraw()) {
    if (roundMeta.playerWins[0] === 0) {
      globalMeta.playerWins =
        trucoMeta.points > 0
          ? globalMeta.playerWins + trucoMeta.points
          : globalMeta.playerWins + 1;
    } else if (roundMeta.rivalWins[0] === 0) {
      globalMeta.rivalWins =
        trucoMeta.points > 0
          ? globalMeta.rivalWins + trucoMeta.points
          : globalMeta.rivalWins + 1;
    }

    console.log("win lose draw", "playerwins: ", roundMeta.playerWins[0] === 0);

    resetState();
    return true;
  } else if (winTwo()) {
    if (whoWinPoints === "player") {
      globalMeta.playerWins =
        trucoMeta.points > 0
          ? globalMeta.playerWins + trucoMeta.points
          : globalMeta.playerWins + 1;
    } else {
      globalMeta.rivalWins =
        trucoMeta.points > 0
          ? globalMeta.rivalWins + trucoMeta.points
          : globalMeta.rivalWins + 1;
    }

    console.log("win two", "playerwins: ", whoWinPoints === "player");

    resetState();
    return true;
  } else if (winDraw()) {
    if (roundMeta.playerWins.length === 1) {
      globalMeta.playerWins =
        trucoMeta.points > 0
          ? globalMeta.playerWins + trucoMeta.points
          : globalMeta.playerWins + 1;
    } else if (roundMeta.rivalWins.length === 1) {
      globalMeta.rivalWins =
        trucoMeta.points > 0
          ? globalMeta.rivalWins + trucoMeta.points
          : globalMeta.rivalWins + 1;
    }

    console.log("win draw", "playerwins: ", roundMeta.playerWins.length === 1);

    resetState();
    return true;
  } else if (twoDraw()) {
    if (roundMeta.playerWins.length === 1) {
      globalMeta.playerWins =
        trucoMeta.points > 0
          ? globalMeta.playerWins + trucoMeta.points
          : globalMeta.playerWins + 1;
    } else if (roundMeta.rivalWins.length === 1) {
      globalMeta.rivalWins =
        trucoMeta.points > 0
          ? globalMeta.rivalWins + trucoMeta.points
          : globalMeta.rivalWins + 1;
    }

    console.log("two draw", "playerwins: ", roundMeta.playerWins.length === 1);

    resetState();
    return true;
  }
  console.log("nobody won");
  return false;
}

function basicRivalPlay(onlyPlay?: boolean) {
  setTimeout(() => {
    const shouldPlay = getRandomBoolean(),
      lel: any[] = [
        TrucoActions.TRUCO,
        TrucoActions.RETRUCO,
        TrucoActions.VALE_CUATRO,
      ];
    let answerNumber = 0;

    if (trucoMeta.level === null) {
      answerNumber = 0;
    } else if (trucoMeta.level === TrucoActions.TRUCO) {
      answerNumber = 1;
    } else if (trucoMeta.level === TrucoActions.RETRUCO) {
      answerNumber = 2;
    } else {
      onlyPlay = true;
    }

    if (shouldPlay && !onlyPlay && trucoMeta.lastTrucoPlayer !== "player") {
      onTrucoPlay(lel[answerNumber]);
    } else {
      const cardToPlay = getRandomNumber(0, meta.rivalCards.length - 1);
      // const cardToPlay = 0;
      playCard(meta.rivalCards[cardToPlay], "rival");
    }
  }, 2000);
}

function changeTurn() {
  yourTurn.value = !yourTurn.value;
  if (!yourTurn.value) basicRivalPlay();
}

function onFinishRound(winner: "player" | "rival") {
  meta.round = meta.round + 1;
  meta.turn = 0;
  yourTurn.value = winner === "player" ? true : false;
  if (!yourTurn.value) basicRivalPlay();
}

function onFinishTurn() {
  meta.turn = meta.turn + 1;
  changeTurn();
}

function setStatusCard(winnerPosition: 1 | 0) {
  const metaRound = meta.round,
    metaTableCard = meta.tableCards[metaRound];
  const opposite = winnerPosition === 1 ? 0 : 1;

  metaTableCard[winnerPosition].status = "win";
  metaTableCard[opposite].status = "lose";
}

function whoWinRound() {
  const metaRound = meta.round,
    metaTableCard = meta.tableCards[metaRound];
  let winner: "player" | "rival" = "player";

  if (metaTableCard[0].card.value > metaTableCard[1].card.value) {
    if (metaTableCard[0].player === "player") {
      roundMeta.playerWins.push(metaRound);
      setStatusCard(0);
    } else {
      winner = "rival";
      roundMeta.rivalWins.push(metaRound);
      setStatusCard(0);
    }
  } else if (metaTableCard[0].card.value === metaTableCard[1].card.value) {
    roundMeta.draws.push(metaRound);
    winner = meta.mano ? "player" : "rival";
    const winnerPosition = metaTableCard[0].player === winner ? 0 : 1;
    setStatusCard(winnerPosition);
  } else {
    if (metaTableCard[1].player === "player") {
      roundMeta.playerWins.push(metaRound);
      setStatusCard(1);
    } else {
      winner = "rival";
      roundMeta.rivalWins.push(metaRound);
      setStatusCard(1);
    }
  }
  return winner;
}

function manageGame() {
  if (meta.turn === 1) {
    const winner = whoWinRound(),
      match = matchPoints();

    if (!match) {
      onFinishRound(winner);
    }
  } else if (meta.turn === 0) {
    onFinishTurn();
  }
}

function playCard(card: ICard, player: "player" | "rival") {
  if (player === "player") {
    meta.playerCards = [...meta.playerCards].filter(
      (playerCard) => card.name !== playerCard.name
    );
  } else {
    meta.rivalCards = [...meta.rivalCards].filter(
      (rivalCard) => card.name !== rivalCard.name
    );
  }
  meta.tableCards[meta.round].push({
    card,
    player,
    round: meta.round,
    status: "waiting",
  });

  manageGame();
}

function onMazo() {
  if (yourTurn.value) {
    globalMeta.rivalWins = globalMeta.rivalWins + 1;
  } else {
    globalMeta.playerWins = globalMeta.playerWins + 1;
  }
  resetState();
}

const trucoReply: any[] = [
    TrucoActions.QUIERO,
    TrucoActions.NO_QUIERO,
    // TrucoActions.ENVIDO,
    TrucoActions.RETRUCO,
  ],
  retrucoReply: any[] = [
    TrucoActions.QUIERO,
    TrucoActions.NO_QUIERO,
    TrucoActions.VALE_CUATRO,
  ],
  valecuatroReply: any[] = [TrucoActions.QUIERO, TrucoActions.NO_QUIERO];

function onTrucoPlay(
  type: TrucoActions.TRUCO | TrucoActions.RETRUCO | TrucoActions.VALE_CUATRO
) {
  switch (type) {
    case TrucoActions.TRUCO:
      state.value = EnumStates.WAITING_TRUCO;
      const getTrucoRandom = getRandomNumber(0, trucoReply.length - 1);
      trucoMeta.level = TrucoActions.TRUCO;

      if (
        !!(trucoTurn.value === "player" || (!trucoTurn.value && yourTurn.value))
      ) {
        trucoTurn.value = "rival";
        if (trucoReply[getTrucoRandom] === TrucoActions.RETRUCO) {
          onTrucoPlay(TrucoActions.RETRUCO);
        } else {
          onTrucoReply(trucoReply[getTrucoRandom]);
        }
      } else {
        trucoTurn.value = "player";
      }
      break;

    case TrucoActions.RETRUCO:
      state.value = EnumStates.WAITING_RETRUCO;
      const getRetrucoRandom = getRandomNumber(0, trucoReply.length - 1);
      trucoMeta.level = TrucoActions.RETRUCO;

      if (
        !!(trucoTurn.value === "player" || (!trucoTurn.value && yourTurn.value))
      ) {
        console.log(
          retrucoReply[getRetrucoRandom] === TrucoActions.VALE_CUATRO,
          TrucoActions.VALE_CUATRO
        );
        trucoTurn.value = "rival";
        if (retrucoReply[getRetrucoRandom] === TrucoActions.VALE_CUATRO) {
          onTrucoPlay(TrucoActions.VALE_CUATRO);
        } else {
          onTrucoReply(retrucoReply[getRetrucoRandom]);
        }
      } else {
        trucoTurn.value = "player";
      }

      break;
    case TrucoActions.VALE_CUATRO:
      state.value = EnumStates.WAITING_VALE_CUATRO;
      const getValecuatroRandom = getRandomNumber(0, trucoReply.length - 1);
      trucoMeta.level = TrucoActions.VALE_CUATRO;

      if (
        !!(trucoTurn.value === "player" || (!trucoTurn.value && yourTurn.value))
      ) {
        trucoTurn.value = "rival";
        onTrucoReply(valecuatroReply[getValecuatroRandom]);
      } else {
        trucoTurn.value = "player";
      }

      break;

    default:
      break;
  }
}

function onTrucoReply(
  answer: TrucoActions.QUIERO | TrucoActions.NO_QUIERO | TrucoActions.ENVIDO
) {
  switch (answer) {
    case TrucoActions.NO_QUIERO:
      if (trucoMeta.level === TrucoActions.TRUCO) {
        trucoMeta.points = 1;
      } else if (trucoMeta.level === TrucoActions.RETRUCO) {
        trucoMeta.points = 2;
      } else if (trucoMeta.level === TrucoActions.VALE_CUATRO) {
        trucoMeta.points = 3;
      }
      // RETURN POINTS
      if (yourTurn.value) {
        globalMeta.rivalWins = globalMeta.rivalWins + trucoMeta.points;
      } else {
        globalMeta.playerWins = globalMeta.playerWins + trucoMeta.points;
      }
      resetState();
      break;

    case TrucoActions.QUIERO:
      if (trucoMeta.level === TrucoActions.TRUCO) {
        trucoMeta.points = 2;
      } else if (trucoMeta.level === TrucoActions.RETRUCO) {
        trucoMeta.points = 3;
      } else if (trucoMeta.level === TrucoActions.VALE_CUATRO) {
        trucoMeta.points = 4;
      }

      trucoMeta.lastTrucoPlayer = trucoTurn.value;

      if (!yourTurn.value) basicRivalPlay(true);

      trucoTurn.value = undefined;
      state.value = EnumStates.WAITING;
      break;

    case TrucoActions.ENVIDO:
      break;

    default:
      break;
  }
}
</script>

<template>
  <div class="background__menu">
    <section
      class="container mx-auto px-4 h-[100svh] flex flex-col justify-between text-base-100 items-center"
    >
      <div class="relative flex flex-col w-full">
        <div
          class="inline-flex w-full h-12 bg-base-100 gap-5 text-base-content rounded-md"
        >
          <button>Salir</button>
          <Points label="Me" :points="globalMeta.playerWins" />
          <Points label="Rival" :points="globalMeta.rivalWins" />
        </div>
      </div>
      <div class="flex w-full h-60 z-0 relative">
        <div v-if="meta.mano" class="absolute">
          <Deck />
        </div>
      </div>
      <div
        class="absolute top-24 right-20 border bg-base-content flex flex-col gap-3 rounded-xl"
      >
        <span>round: {{ meta.round }}</span>
        <span>turn: {{ meta.turn }}</span>
        <span>yourTurn: {{ yourTurn }}</span>
        <span>playerRounds: {{ roundMeta.playerWins }}</span>
        <span>rivalRound: {{ roundMeta.rivalWins }}</span>
        <span>draws: {{ roundMeta.draws }}</span>
        <span>lastTrucoplayer: {{ trucoMeta.lastTrucoPlayer }}</span>
        <span>truco level: {{ trucoMeta.level }}</span>
        <span>truco points: {{ trucoMeta.points }}</span>
        <span>truco turn: {{ trucoTurn }}</span>
      </div>
      <TableCards :cards="meta.tableCards" />
      <div class="relative flex flex-col w-full">
        <div
          class="rounded-full absolute bottom-24 left-0 h-16 w-16 bg-white border-black"
        ></div>
        <div class="flex w-full h-80 z-0 relative">
          <CardHand
            :on-card-click="playCard"
            :cards="meta.playerCards"
            :your-turn="yourTurn"
          />
          <div v-if="!meta.mano">
            <Deck />
          </div>
        </div>
        <PlayMenu
          :truco-turn="trucoTurn"
          :state="state"
          :your-turn="yourTurn"
          :truco-meta="trucoMeta"
          :on-truco-play="onTrucoPlay"
          :on-truco-reply="onTrucoReply"
          :on-mazo="onMazo"
        />
      </div>
    </section>
  </div>
</template>
