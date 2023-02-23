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
  video {
    width: 100%;
    height: 100%;
    border-radius: $default-border-radius;
    overflow: hidden;
  }
}
</style>
