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
    isLast: {
      type: Boolean,
      default: false,
    },
  },
  setup(_, ctx) {
    const handleEmitFinish = () => {
      ctx.emit("finish");
    };

    return {
      handleEmitFinish,
    };
  },
};
</script>

<style lang="scss" scoped>
.stage-file-type-image {
  width: 100%;
  height: 100%;

  max-width: 1150px;
  margin: 0 auto;

  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;

  img {
    max-height: 600px;

    display: block;
    width: 100%;
    height: 100%;

    max-width: 300px;

    border-radius: $default-border-radius;

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
