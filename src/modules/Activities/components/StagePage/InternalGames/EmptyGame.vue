<template>
  <div class="empty-game">
    <iframe :src="url" @load="handleLoad" />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const props = defineProps({
  url: {
    type: String,
    required: true,
  },
  parameters: {
    type: [Object, Array],
    requred: true,
  },
});
</script>

<style lang="scss" scoped>
.empty-game {
  max-width: 1150px;
  margin: 0 auto;
  height: 100%;

  iframe {
    width: 100%;
    height: 100%;
  }
}
</style>
