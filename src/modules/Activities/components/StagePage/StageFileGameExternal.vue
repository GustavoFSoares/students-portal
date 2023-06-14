<template>
  <section class="stage-file-game-external">
    <iframe
      :src="preparedPath.game"
      frameborder="0"
      width="100%"
      height="100%"
    />

    <div class="stage-file-game-external__button">
      <QBtn
        :label="isLast ? 'Concluir' : 'Avançar'"
        color="secondary"
        @click="handleEmitFinish"
      />
    </div>
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
  height: 100vh;
  max-width: 1150px;
  margin: 0 auto;

  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;

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

