<template>
  <section class="stage-file-type-pdf">
    <iframe
      :src="`${$appStorage}/${path}?page=1`"
      frameborder="0"
      width="100%"
      height="100%"
    />

    <div class="stage-file-type-pdf__button">
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
  name: "StageFileTypePdf",
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

<style lang="scss">
.stage-file-type-pdf {
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
