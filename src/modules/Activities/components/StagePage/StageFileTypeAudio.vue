<template>
  <section class="stage-file-type-audio">
    <audio controls="" ref="player">
      <source :src="`${$appStorage}/${path}`" type="audio/mpeg" />
      Your browser does not support the audio element.
    </audio>

    <div class="stage-file-type-audio__button">
      <QBtn
        :label="isLast ? 'Concluir' : 'Avançar'"
        color="secondary"
        @click="handleEmitFinish"
      />
    </div>
  </section>
</template>

<script>
import { onMounted, ref } from "vue";
export default {
  name: "StageFileTypeAudio",
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
    const player = ref();

    const handleEmitFinish = () => {
      ctx.emit("finish");
    };

    onMounted(() => {
      player.value?.play();
    });

    return {
      player,
      handleEmitFinish,
    };
  },
};
</script>

<style lang="scss">
.stage-page__modal:has(.stage-file-type-audio) {
  height: initial !important;
  width: 25vw !important;
}
</style>

<style lang="scss" scoped>
.stage-file-type-audio {
  background: transparent !important;

  audio {
    width: 100%;
  }

  &__button {
    margin-top: 5px;
    width: 100%;

    display: flex;
    justify-content: flex-end;
  }
}
</style>
