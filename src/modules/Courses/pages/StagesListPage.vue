<template>
  <article class="stages-list-page">
    <StagesList @openStage="handleOpenStage" :stages="stagesList" />
  </article>
</template>

<script>
import { computed, ref } from "vue";

import StagesList from "../partials/StagesList.vue";

export default {
  name: "StagesListPage",
  components: {
    StagesList,
  },
  setup(_, ctx) {
    const stagesList = ref([
      { position: "1", rank: 1, completed: true },
      { position: "2", rank: 3, completed: true },
      { position: "3", rank: 2, completed: true },
      { position: "4", rank: 3, completed: true },
      { position: "5", rank: 2, completed: true },
      { position: "6", rank: 2, completed: true },
      { position: "7", rank: 2, completed: true },
      { position: "8", rank: 2, completed: true },
      { position: "9", rank: 2, completed: true },
      { position: "10", rank: 2, completed: true },
      { position: "11", rank: 1, completed: true },
      { position: "12", rank: 3, completed: true },
      { position: "13", rank: 2, completed: true },
      { position: "14", rank: 3, completed: true },
      { position: "15", rank: 2, completed: true },
      { position: "16", rank: 2, completed: true },
      { position: "17", rank: 2, completed: true },
    ]);

    const handleOpenStage = (id) => {
      console.log("handleOpenStage", id);
    };

    return {
      stagesList,
      handleOpenStage,
    };
  },
};
</script>

<style lang="scss" scoped>
.stages-list-page {
}
</style>
