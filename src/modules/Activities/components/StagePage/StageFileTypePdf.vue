<template>
  <section class="stage-file-type-pdf">
    <iframe :src="`${$appStorage}/${path}?page=1`" frameborder="0" width="100%" height="100%" />
  </section>
</template>

<script>
import { getCurrentInstance, onMounted } from "vue";
import VuePdfEmbed from "vue-pdf-embed";
import { useStore } from "vuex";

export default {
  name: "StageFileTypePdf",
  props: {
    path: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss">
.stage-page__modal:has(.stage-file-type-pdf) {
  width: 80vw !important;
}
</style>
