<template>
  <div class="exam-game">
    <iframe :src="url" ref="iframeElement" @load="handleLoad" />
  </div>
</template>

<script setup>
import { ref, onMounted, getCurrentInstance } from "vue";

const { appContext } = getCurrentInstance();
const $emit = defineEmits(["finish"]);

const iframeElement = ref(null);

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

const handleLoad = () => {
  const params = JSON.parse(JSON.stringify(props.parameters));

  const gameOptions = {
    avaliacao: params.avaliacao.map((item) => ({
      ...item,
      path: item.path
        ? `${appContext.config.globalProperties.$appStorage}/${item.path}`
        : null,
    })),
    tituloAvaliacao: params.questionTitle,
  };

  console.log("here", { origin: "avag", gameOptions });
  iframeElement.value.contentWindow.postMessage(
    { origin: "avag", gameOptions },
    "*"
  );

  window.onmessage = ({ data }) => {
    if (data.status === "finish") {
      $emit("finish");
    }
  };
};
</script>

<style lang="scss" scoped>
.exam-game {
  max-width: 1150px;
  margin: 0 auto;
  height: 100%;

  iframe {
    width: 100%;
    height: 100%;
  }
}
</style>
