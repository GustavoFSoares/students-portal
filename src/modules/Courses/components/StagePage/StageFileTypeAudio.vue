<template>
  <section class="stage-file-type-audio">
    <audio controls="" ref="audio">
      <source
        src="https://www.w3schools.com/html/horse.mp3"
        type="audio/mpeg"
      />
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
    const audio = ref();

    onMounted(() => {
      // audio.value?.play();
    });

    return {
      audio,
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
