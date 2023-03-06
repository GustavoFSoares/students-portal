<template>
  <section class="stage-file-game-internal">
    <component v-if="gameComponent" :is="gameComponent" />
  </section>
</template>

<script>
import { computed } from "vue";

import InternalGamesMap from "maps/internalGamesMap.json";

import WordPuzzle from "./InternalGames/WordPuzzle.vue";

export default {
  name: "StageFileGameExternal",
  components: {
    WordPuzzle,
  },
  props: {
    path: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const gameComponent = computed(() => {
      const game = InternalGamesMap[props.path];

      return game || null;
    });

    return {
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

