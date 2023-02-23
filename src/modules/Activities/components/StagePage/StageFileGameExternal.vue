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

<style lang="scss">
.stage-page__modal:has(.stage-file-game-external) {
  width: 80vw !important;
}
</style>

