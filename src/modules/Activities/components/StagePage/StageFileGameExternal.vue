<template>
  <section class="stage-file-game-external">
    <iframe :src="preparedPath.game" frameborder="0" height="600" />
  </section>
</template>

<script>
import { useStore } from "vuex";
import { onMounted } from "vue";

export default {
  name: "StageFileGameExternal",
  computed: {
    preparedPath() {
      return this.path;
    },
  },
  props: {
    path: {
      type: Object,
      required: true,
    },
    isLast: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    onMounted(() => {
      const $store = useStore();

      $store.dispatch("AchievementsModule/accessingGames");
    });
  },
};
</script>

<style lang="scss">
.stage-file-game-external {
  max-width: 1150px;
  margin: 0 auto;
  height: 95%;

  iframe {
    width: 100%;
    height: 100%;
  }

  &__button {
    margin-top: 5px;
    width: 100%;

    display: flex;
    justify-content: flex-end;
  }
}
</style>

