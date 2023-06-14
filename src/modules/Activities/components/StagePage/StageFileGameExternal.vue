<template>
  <section class="stage-file-game-external">
    <iframe
      :src="preparedPath.game"
      frameborder="0"
      width="100%"
      height="100%"
    />
  </section>
</template>

<script>
export default {
  name: "StageFileGameExternal",
  computed: {
    preparedPath() {
      return JSON.parse(this.path);
    },
  },
  props: {
    path: {
      type: String,
      required: true,
    },
    isLast: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss">
.stage-file-game-external {
  max-width: 1150px;
  margin: 0 auto;
  height: 950%;

  iframe {
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

