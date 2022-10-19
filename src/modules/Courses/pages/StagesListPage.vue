<template>
  <q-layout view="lHh Lpr lFf" class="stages-list-page">
    <StagesList @openStage="handleOpenStage" :stages="stagesList" />

    <QDrawer side="right" :width="310" :model-value="openStageDetail" bordered>
      <StageDetail :stage="selectedStageData" @close="handleCloseDetail" />
    </QDrawer>
  </q-layout>
</template>

<script>
import { computed, ref } from "vue";

import StagesList from "../partials/StagesList.vue";
import StageDetail from "../partials/StagesList/Detail.vue";

export default {
  name: "StagesListPage",
  components: {
    StagesList,
    StageDetail,
  },
  setup(_, ctx) {
    const selectedStage = ref();

    const stagesList = ref([
      { position: "1", title: "Texto 1", rank: 1, completed: true },
      { position: "2", title: "Texto 2", rank: 3, completed: true },
      { position: "3", title: "Texto 3", rank: 2, completed: true },
      { position: "4", title: "Texto 4", rank: 3, completed: true },
      { position: "5", title: "Texto 5", rank: 2, completed: true },
      { position: "6", title: "Texto 6", rank: 2, completed: true },
      { position: "7", title: "Texto 7", rank: 2, completed: true },
      { position: "8", title: "Texto 8", rank: 2, completed: true },
      { position: "9", title: "Texto 9", rank: 2, completed: true },
      { position: "10", title: "Texto 10", rank: 2, completed: true },
      { position: "11", title: "Texto 11", rank: 1, completed: true },
      { position: "12", title: "Texto 12", rank: 3, completed: true },
      { position: "13", title: "Texto 13", rank: 2, completed: true },
      { position: "14", title: "Texto 14", rank: 3, completed: true },
      { position: "15", title: "Texto 15", rank: 2, completed: true },
      { position: "16", title: "Texto 16", rank: 2, completed: true },
      { position: "17", title: "Texto 17", rank: 2, completed: true },
    ]);

    const openStageDetail = computed(() => !!selectedStage.value);
    const selectedStageData = computed(() => {
      const matchStage = stagesList.value.find(
        (stage) => stage.position === selectedStage.value
      );

      return matchStage || {};
    });

    const handleOpenStage = (position) => {
      selectedStage.value = null;

      selectedStage.value = position;
    };

    const handleCloseDetail = () => {
      selectedStage.value = null;
    };

    return {
      selectedStage,
      stagesList,
      openStageDetail,
      selectedStageData,
      handleOpenStage,
      handleCloseDetail,
    };
  },
};
</script>

<style lang="scss" scoped>
.stages-list-page {
}
</style>
