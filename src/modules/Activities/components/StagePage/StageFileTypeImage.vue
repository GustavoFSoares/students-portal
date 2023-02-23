<template>
  <section class="stage-file-type-image">
    <img :src="`${$appStorage}/${path}`" alt="" />
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
  img {
    display: block;
    width: 100%;
    height: 100%;

    max-width: 300px;

    @media (min-width: $breakpoint-tablet) {
      max-width: 600px;
    }
  }
}
</style>

<style lang="scss">
.stage-page__modal:has(.stage-file-type-image) {
  width: initial !important;
}
</style>
