<template>
  <section class="stage-file-type-pdf">
    <VuePdfEmbed :source="`${$appStorage}/${path}`" />
  </section>
</template>

<script>
import { getCurrentInstance, onMounted } from "vue";
import VuePdfEmbed from "vue-pdf-embed";
import { useStore } from "vuex";

export default {
  name: "StageFileTypePdf",
  components: {
    VuePdfEmbed,
  },
  props: {
    path: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const { appContext } = getCurrentInstance();
    const $store = useStore();

    // onMounted(async () => {
    //   const pdfPath = `${appContext.config.globalProperties.$appStorage}/${props.path}`;
    //   $store.dispatch("CourseModule/getPdfData", pdfPath);
    // });
  },
};
</script>
