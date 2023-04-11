<template>
  <section class="stage-file-game-internal">
    <component
      v-if="gameComponent"
      :is="gameComponent"
      :parameters="preparedWords"
    />
  </section>
</template>

<script>
import { computed } from "vue";

import InternalGamesMap from "maps/internalGamesMap.json";

import QuizGame from "./InternalGames/QuizGame.vue";
import WordPuzzle from "./InternalGames/WordPuzzle.vue";
import HangmanGame from "./InternalGames/HangmanGame.vue";

export default {
  name: "StageFileGameExternal",
  components: {
    QuizGame,
    WordPuzzle,
    HangmanGame,
  },
  props: {
    path: {
      type: String,
      required: true,
    },
    parameters: {
      type: Array,
      default: () => [],
    },
  },
  setup(props) {
    const isTextGame = (gameName) => {
      const textGames = ["WordPuzzle", "HangmanGame"];

      return textGames.includes(gameName);
    };

    const gameComponent = computed(() => {
      const game = InternalGamesMap[props.path];

      return game || null;
    });

    const preparedWords = computed(() => {
      if (isTextGame(gameComponent.value)) {
        return props.parameters.map((parameter) => parameter.toUpperCase());
      }

      return props.parameters;
    });

    return {
      preparedWords,
      gameComponent,
    };
  },
};
</script>

<style lang="scss">
.stage-page__modal:has(.stage-file-game-internal) {
  width: 80vw !important;
}
</style>

