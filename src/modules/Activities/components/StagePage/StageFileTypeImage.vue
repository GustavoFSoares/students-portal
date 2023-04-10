<template>
  <section class="stage-file-type-image">
    <img :src="`${$appStorage}/${path}`" alt="" />

    <div class="stage-file-type-image__button">
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
  name: "StageFileTypeImage",
  emits: ["close"],
  props: {
    path: {
      type: String,
      required: true,
    },
    isLast: {
      type: String,
      required: true,
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

    @media (min-width: $breakpoint-tablet) {
      /* max-width: 600px; */
    }
  }

  &__button {
    margin-top: 5px;
    width: 100%;

    display: flex;
    justify-content: flex-end;
  }
}
</style>

<style lang="scss">
.stage-page__modal:has(.stage-file-type-image) {
  width: initial !important;
}
</style>
