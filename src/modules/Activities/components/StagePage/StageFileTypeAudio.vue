<template>
  <section class="stage-file-type-audio">
    <audio controls="" ref="player">
      <source :src="`${$appStorage}/${path}`" type="audio/mpeg" />
      Your browser does not support the audio element.
    </audio>
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
.stage-file-type-audio {
  display: flex;
  justify-content: center;
  align-items: center;

  background: #f1f3f4;
}
</style>
