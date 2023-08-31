<template>
  <section class="stage-file-game-internal">
    <component
      :is="gameComponent"
      :url="gameUrl"
      :parameters="gameParameters"
      @finish="handleFinish"
    />
  </section>
</template>

<script setup>
import { computed, getCurrentInstance } from "vue";

import InternalGamesMap from "maps/internalGamesMap.json";

import SevenErrors from "./InternalGames/SevenErrors.vue";
import ExamGame from "./InternalGames/ExamGame.vue";
import EmptyGame from "./InternalGames/EmptyGame.vue";

import QuizGame from "./InternalGames/QuizGame.vue";
import WordPuzzle from "./InternalGames/WordPuzzle.vue";
import HangmanGame from "./InternalGames/HangmanGame.vue";

const { appContext } = getCurrentInstance();

const $emit = defineEmits(["finish"]);

const props = defineProps({
  path: {
    type: Object,
    required: true,
  },
  parameters: {
    type: Array,
    default: () => [],
  },
});

const preparedPath = computed(() => {
  return typeof props.path === "string" ? JSON.parse(props.path) : props.path;
});

const gameComponent = computed(() => {
  const gamesMap = {
    "7-erros": SevenErrors,
    "Quiz--avaliacao": ExamGame,
  };

  return gamesMap[preparedPath.value.game] || EmptyGame;
});

const gameUrl = computed(() => {
  console.log("->", preparedPath.value);
  console.log("->", InternalGamesMap);

  return (
    `${appContext.config.globalProperties.$appPublic}/${
      InternalGamesMap[preparedPath.value.game]
    }` || preparedPath.value.game
  );
});

const gameParameters = computed(() => {
  return preparedPath.value.gameData;
});

const handleFinish = () => {
  $emit("finish");
};
// const isTextGame = (gameName) => {
//   const textGames = ["WordPuzzle", "HangmanGame"];

//   return textGames.includes(gameName);
// };
// const preparedWords = computed(() => {
//   if (isTextGame(gameComponent.value)) {
//     return props.parameters.map((parameter) => parameter.toUpperCase());
//   }

//   return props.parameters;
// });
</script>

<style lang="scss" scoped>
.stage-file-game-internal {
  max-width: 1150px;
  margin: 0 auto;
  height: 100%;

  border-radius: $default-border-radius;
  overflow: hidden;

  iframe {
    width: 100%;
    height: 600px;
    border: none;
  }
}
</style>

