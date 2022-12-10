<template>
  <section class="stage-file-game-external">
    <iframe :src="path" frameborder="0" width="100%" height="100%" />
  </section>
</template>

<script>
export default {
  name: "StageFileGameExternal",
  props: {
    path: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.stage-file-game-external {
  display: flex;
  justify-content: center;
  align-items: center;

  background: #f1f3f4;

  width: 80vw;
  height: 71vh;
}
</style>

<style lang="scss">
.stage-page__modal {
  background: transparent;
  max-width: initial !important;
}
</style>
