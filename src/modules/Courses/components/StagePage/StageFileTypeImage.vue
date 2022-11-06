<template>
  <section class="stage-file-type-image">
    <img :src="`${$appStorage}/${path}`" alt="" />

    <QBtn
      class="stage-file-type-image__close-button"
      icon="close"
      round
      color="grey-6"
      size="sm"
      @click="handleCloseImage"
    />
  </section>
</template>

<script>
export default {
  name: "StageFileTypeImage",
  emits: ["close"],
  props: {
    path: {
      type: String,
      required: true,
    },
  },
  setup(_, ctx) {
    const handleCloseImage = () => {
      ctx.emit("close");
    };

    return {
      handleCloseImage,
    };
  },
};
</script>

<style lang="scss" scoped>
.stage-file-type-image {
  position: relative;

  img {
    display: block;
    width: 100%;
    height: 100%;

    max-width: 300px;

    @media (min-width: $breakpoint-tablet) {
      max-width: 600px;
    }
  }

  &__close-button {
    position: absolute;
    top: 5px;
    right: 5px;
  }
}
</style>
