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
  },
  setup() {
    const player = ref();

    onMounted(() => {
      player.value?.play();
    });

    return {
      player,
    };
  },
};
</script>

<style lang="scss" scoped>
.stage-file-type-video {
  display: flex;
  justify-content: center;
  align-items: center;

  background: #f1f3f4;

  width: 480px;
  padding: 15px;

  @media (min-width: $breakpoint-tablet) {
    width: 480px;
  }

  video {
    width: 100%;
    border-radius: $defaultBorderRadius;
  }
}
</style>
