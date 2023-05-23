<template>
  <div class="stage-list">
    <ol class="stage-list__list">
      <StageItem
        v-for="stage in stageList"
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
  name: "StageList",
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

    const stageList = computed(() => props.stages);

    const handleClickStage = (position) => {
      ctx.emit("open-stage", position);
    };

    return {
      isMobile,
      stageList,
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
    grid-template-columns: repeat(3, 1fr);
    gap: 25px 35px;

    @media (min-width: $breakpoint-tablet) {
      gap: 25px 70px;
      grid-template-columns: repeat(5, 1fr);
    }
  }
}
</style>
