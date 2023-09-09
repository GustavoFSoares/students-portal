<template>
  <div class="empty-game">
    <iframe :src="url" ref="iframeElement" @load="handleLoad" />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const $emit = defineEmits(["finish"]);
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

const iframeElement = ref(null);

const handleLoad = () => {
  const params = JSON.parse(JSON.stringify(props.parameters));

  iframeElement.value.contentWindow.postMessage({ avag: { params } }, "*");

  window.onmessage = ({ data }) => {
    if (data.avag && data.avag.status === "finish") {
      $emit("finish", data.avag.data);
    }
  };
};
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
