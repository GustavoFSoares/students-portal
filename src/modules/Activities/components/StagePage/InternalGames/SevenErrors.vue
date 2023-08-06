<template>
  <div class="seven-errors">
    <iframe :src="url" ref="iframeElement" @load="handleLoad" />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue"

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

const gameData = {
  scene: [
        {
            id: 1,
            titulo: "turma_monica",
            img: {direita: "monica_direita.png", esquerda: "monica_esquerda.png"},
            positions: {
                "1": {"x": 42, "y": 239},
                "2": {"x": 87, "y": 148},
                "3": {"x": 54, "y": 64},
                "4": {"x": 304, "y": 210},
                "5": {"x": 109, "y": 249}
            }
        },
        // {
        //     id: 2,
        //     titulo: "praia",
        //     img: {direita: "praia_direita.png", esquerda: "praia_esquerda.png"},
        //     positions: {
        //         "1": {"x": 71, "y": 174},
        //         "2": {"x": 20, "y": 223},
        //         "3": {"x": 133, "y": 194},
        //         "4": {"x": 200, "y": 187},
        //         "5": {"x": 369, "y": 53},
        //         "6": {"x": 378, "y": 210},
        //         "7": {"x": 216, "y": 42}
        //     }
        // },
        // {
        //     id: 3,
        //     titulo: "pirata",
        //     img: {direita: "navio_pirata_direita.png", esquerda: "navio_pirata_esquerda.png"},
        //     positions: {
        //         "1": {"x": 378, "y": 180},
        //         "2": {"x": 273, "y": 268},
        //         "3": {"x": 106, "y": 49},
        //         "4": {"x": 33, "y": 20},
        //         "5": {"x": 64, "y": 102},
        //         "6": {"x": 223, "y": 234},
        //         "7": {"x": 321, "y": 111}
        //     }
        // }
    ]
}

const handleLoad = () => {
  iframeElement.value.contentWindow.postMessage(gameData, '*')

  window.onmessage = ({ data }) => {
    if (data === 'finish') {
      console.warn('finished game')
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
