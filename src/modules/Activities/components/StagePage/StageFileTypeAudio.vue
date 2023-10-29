<template>
  <section class="stage-file-type-audio">
    <audio controls="" ref="player">
      <source :src="`${$appStorage}/${path.arquivo}`" type="audio/mpeg" />
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

    return {
      player,
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

  height: 100%;
  max-width: 400px;

  display: flex;
  align-items: center;
  margin: auto;

  audio {
    width: 100%;
  }
}
</style>
