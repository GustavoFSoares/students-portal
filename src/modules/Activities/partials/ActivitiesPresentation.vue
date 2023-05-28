<template>
  <video
    class="activities-presentation"
    autoplay
    :width="$q.screen.width"
    :height="$q.screen.height"
    @ended="handleEndVideo"
  >
    <source
      :src="`/activities-presentation/animacao-${presentationId}.mp4`"
      type="video/mp4"
    />
  </video>
</template>

<script setup>
import { toRef, defineProps } from "vue";

const $emits = defineEmits(["ended"]);
const props = defineProps({
  presentationId: {
    type: [Number, String],
    reuqired: true,
  },
});

const handleEndVideo = () => {
  $emits("ended");
};
</script>

<style lang="scss" scoped>
.activities-presentation {
  background: $dark-background;
}
</style>
