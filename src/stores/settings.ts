import { defineStore } from "pinia";
import { reactive } from "vue";

export const useSettingsStore = defineStore("settings", () => {
  const settings = reactive({
    difficulty: "easy",
    playerName: "player",
    mode: "offline",
  });

  function changeDifficulty(difficulty: "easy" | "medium" | "hard") {
    settings.difficulty = difficulty;
  }

  function changePlayerName(playerName: string) {
    settings.playerName = playerName;
  }

  function changeMode(mode: "offline" | "online") {
    settings.mode = mode;
  }

  return { settings, changeDifficulty, changePlayerName, changeMode };
});
