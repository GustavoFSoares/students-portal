<template>
  <section class="stage-file-type-video">
    <video
      controls
      ref="player"
      controlsList="nodownload"
      oncontextmenu="return false;"
    >
      <source :src="`${$appStorage}/${path}`" type="video/mp4" />
      Your browser does not support the video tag.
    </video>

    <div class="stage-file-type-video__button">
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
  name: "StageFileTypeVideo",
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

    onMounted(() => {
      player.value?.play();
    });

    const handleEmitFinish = () => {
      ctx.emit("finish");
    };

    return {
      player,
      handleEmitFinish,
    };
  },
};
</script>

<style lang="scss" scoped>
.stage-file-type-video {
  margin: 0 auto;
  max-width: 1150px;

  video {
    max-height: 600px;

    width: 100%;
    height: 100%;
    border-radius: $default-border-radius;
    overflow: hidden;
  }

  &__button {
    margin-top: 5px;
    width: 100%;

    display: flex;
    justify-content: flex-end;
  }
}
</style>
