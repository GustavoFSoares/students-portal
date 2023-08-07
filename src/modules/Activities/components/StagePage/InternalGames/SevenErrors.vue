<template>
  <div class="seven-errors">
    <iframe :src="url" ref="iframeElement" @load="handleLoad" />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue"

const $emit = defineEmits(['finish'])

const iframeElement = ref(null);

const props = defineProps({
  url: {
    type: String,
    required: true,
  },
  parameters: {
    type: [Object, Array],
    requred: true
  }
});

const handleLoad = () => {
  const gameOptions = props.parameters.map((stage) => {
    const img = {
      direita: '/storage/'+stage.images.right,
      esquerda: '/storage/'+stage.images.left
    }
    const positions = stage.positions.map((positionItem) => ({ ...positionItem }))

    return {
      positions,
      img
    }
  })

  iframeElement.value.contentWindow.postMessage({ scene: gameOptions }, '*')

  window.onmessage = ({ data }) => {
    if (data === 'finish') {
      $emit('finish')
    }
  };
};
</script>

<style lang="scss" scoped>
.seven-errors {
  max-width: 1150px;
  margin: 0 auto;
  height: 100%;

  iframe {
    width: 100%;
    height: 100%;
  }
}
</style>
