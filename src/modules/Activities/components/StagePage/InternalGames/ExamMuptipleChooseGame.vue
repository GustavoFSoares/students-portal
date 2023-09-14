<template>
  <div class="exam-multiple-choose-game">
    <iframe :src="url" ref="iframeElement" @load="handleLoad" />
  </div>
</template>

<script setup>
import { ref, onMounted, getCurrentInstance } from "vue";

const { appContext } = getCurrentInstance();

const $emit = defineEmits(["finish"]);
const props = defineProps({
  url: {
    type: String,
    required: true,
  },
  parameters: {
    type: [Object, Array],
    default: () => {},
  },
});

const iframeElement = ref(null);

const handleLoad = () => {
  const params = JSON.parse(JSON.stringify(props.parameters || {}));

  params.questions = params.questions.map((question) => ({
    ...question,
    file: question.file
      ? `${appContext.config.globalProperties.$appStorage}/${question.file}`
      : null,
  }));

  iframeElement.value.contentWindow.postMessage({ avag: { params } }, "*");

  window.onmessage = ({ data }) => {
    if (data.avag && data.avag.status === "finish") {
      $emit("finish", data.avag.data);
    }
  };
};
</script>

<style lang="scss" scoped>
.exam-multiple-choose-game {
  max-width: 1150px;
  margin: 0 auto;
  height: 100%;

  iframe {
    width: 100%;
    height: 100%;
  }
}
</style>
