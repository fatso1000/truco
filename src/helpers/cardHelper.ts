import { ICard } from "../types";

const cards = [
  {
    name: "espada_1",
    image: "",
    value: 14,
  },
  {
    name: "basto_1",
    image: "",
    value: 13,
  },
  {
    name: "espada_7",
    image: "",
    value: 12,
  },
  {
    name: "oro_7",
    image: "",
    value: 11,
  },
  {
    name: "basto_3",
    image: "",
    value: 10,
  },
  {
    name: "oro_3",
    image: "",
    value: 10,
  },
  {
    name: "copa_3",
    image: "",
    value: 10,
  },
  {
    name: "espada_3",
    image: "",
    value: 10,
  },
  {
    name: "basto_2",
    image: "",
    value: 9,
  },
  {
    name: "oro_2",
    image: "",
    value: 9,
  },
  {
    name: "copa_2",
    image: "",
    value: 9,
  },
  {
    name: "espada_2",
    image: "",
    value: 9,
  },
  {
    name: "oro_1",
    image: "",
    value: 8,
  },
  {
    name: "copa_1",
    image: "",
    value: 8,
  },
  {
    name: "basto_12",
    image: "",
    value: 7,
  },
  {
    name: "oro_12",
    image: "",
    value: 7,
  },
  {
    name: "copa_12",
    image: "",
    value: 7,
  },
  {
    name: "espada_12",
    image: "",
    value: 7,
  },
  {
    name: "basto_11",
    image: "",
    value: 6,
  },
  {
    name: "oro_11",
    image: "",
    value: 6,
  },
  {
    name: "copa_11",
    image: "",
    value: 6,
  },
  {
    name: "espada_11",
    image: "",
    value: 6,
  },
  {
    name: "basto_10",
    image: "",
    value: 5,
  },
  {
    name: "oro_10",
    image: "",
    value: 5,
  },
  {
    name: "copa_10",
    image: "",
    value: 5,
  },
  {
    name: "espada_10",
    image: "",
    value: 5,
  },
  {
    name: "basto_7",
    image: "",
    value: 4,
  },
  {
    name: "copa_7",
    image: "",
    value: 4,
  },
  {
    name: "basto_6",
    image: "",
    value: 3,
  },
  {
    name: "oro_6",
    image: "",
    value: 3,
  },
  {
    name: "copa_6",
    image: "",
    value: 3,
  },
  {
    name: "espada_6",
    image: "",
    value: 3,
  },
  {
    name: "basto_5",
    image: "",
    value: 2,
  },
  {
    name: "oro_5",
    image: "",
    value: 2,
  },
  {
    name: "copa_5",
    image: "",
    value: 2,
  },
  {
    name: "espada_5",
    image: "",
    value: 2,
  },
  {
    name: "basto_4",
    image: "",
    value: 1,
  },
  {
    name: "oro_4",
    image: "",
    value: 1,
  },
  {
    name: "copa_4",
    image: "",
    value: 1,
  },
  {
    name: "espada_4",
    image: "",
    value: 1,
  },
].map((card) => ({
  ...card,
  image: `/cards/${card.name}.png`,
}));

const cardsForPlayer = 3;

function getRandomNumber(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomBoolean() {
  return Math.random() < 0.5;
}

function getCardsFromDeck(deckCards: ICard[], mano: boolean) {
  const start = getRandomNumber(0, deckCards.length - 6),
    end = start + 6;

  const arr = [...deckCards].slice(start, end);
  const lol = [...arr].splice(0, 3),
    lel = [...arr].splice(3, 3);

  return mano ? [lol, lel] : [lel, lol];
}

function shuffleDeck(arr: ICard[]) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export {
  cards,
  getCardsFromDeck,
  cardsForPlayer,
  shuffleDeck,
  getRandomBoolean,
  getRandomNumber,
};
