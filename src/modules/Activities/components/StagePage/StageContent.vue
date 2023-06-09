<template>
  <div class="stage-content">
    <component
      v-if="stageFileTypeComponent"
      :is="stageFileTypeComponent"
      :path="content"
    />
  </div>
</template>

<script setup>
import { useStore } from "vuex";
import { computed, defineProps, watch } from "vue";

import StageFileTypeAudio from "./StageFileTypeAudio.vue";
import StageFileTypeImage from "./StageFileTypeImage.vue";
import StageFileTypePdf from "./StageFileTypePdf.vue";
import StageFileTypeVideo from "./StageFileTypeVideo.vue";
import StageFileGameExternal from "./StageFileGameExternal.vue";
import StageFileGameInternal from "./StageFileGameInternal.vue";

const $store = useStore();
const props = defineProps({
  activityId: {
    type: Number,
    required: true,
  },
  stageId: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  content: {
    required: true,
  },
});

watch(
  () => props.stageId,
  async () => {
    await $store.dispatch("ActivitiesModule/completeStage", {
      activityId: props.activityId,
      stageId: props.stageId,
    });
  },
  { immediate: true }
);

const stageFilesMap = {
  music: StageFileTypeAudio,
  image: StageFileTypeImage,
  document: StageFileTypePdf,
  video: StageFileTypeVideo,
  "game-external": StageFileGameExternal,
  "game-internal": StageFileGameInternal,
};

const stageFileTypeComponent = computed(() => {
  return stageFilesMap[props.type] || null;
});
</script>

<style lang="scss" scoped>
.stage-content {
  height: 100%;
  overflow: auto;
}
</style>
