<template>
  <div class="stage-list">
    <ol class="stage-list__list">
      <StageItem
        v-for="stage in stages"
        :key="stage.id"
        :position="stage.position"
        :rank="stage.rank"
        :completed="stage.completed"
        @click="handleClickStage(stage.position)"
      />
    </ol>
  </div>
</template>

<script>
import { computed } from "vue";
import { Screen } from "quasar";

import StageItem from "../components/StageList/StageItem.vue";

export default {
  name: "StagesListPage",
  emits: ["open-stage"],
  components: {
    StageItem,
  },
  props: {
    stages: {
      type: Array,
      required: true,
    },
  },
  setup(props, ctx) {
    const isMobile = computed(() => Screen.xs);

    const stagesList = computed(() => props.stages);

    const handleClickStage = (position) => {
      ctx.emit("open-stage", position);
    };

    return {
      isMobile,
      stagesList,
      handleClickStage,
    };
  },
};
</script>

<style lang="scss" scoped>
.stage-list {
  display: flex;
  justify-content: center;

  ol {
    list-style: none;
  }

  &__list {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 50px;
  }
}
</style>
