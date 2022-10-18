<template>
  <div class="stage-item">
    <div class="stage-item__stars">
      <QIcon
        :class="[
          'stage-item__stars-icon',
          { 'stage-item__stars-icon--checked': rankItem <= rank },
        ]"
        v-for="rankItem in TOTAL_STARS"
        :key="rankItem"
        name="svguse:/icons.svg#star"
      />
    </div>

    <div class="stage-item__container">
      <QCircularProgress
        class="stage-item__content"
        show-value
        :value="itemProgress"
        size="90px"
        :thickness="0.08"
        color="primary"
        center-color="transparent"
        track-color="transparent"
      >
        <div class="stage-item__position">{{ position }}</div>
        <div class="stage-item__badgse"></div>
      </QCircularProgress>
    </div>
  </div>
</template>

<script>
const TOTAL_STARS = 3;

import { computed } from "vue";
export default {
  name: "StageItem",
  props: {
    position: {
      type: String,
      required: true,
    },
    rank: {
      type: Number,
      required: true,
    },
    completed: {
      type: Boolean,
      required: true,
    },
  },
  setup(props) {
    const itemProgress = computed(() => (100 * props.rank) / TOTAL_STARS);

    return {
      itemProgress,
      TOTAL_STARS,
    };
  },
};
</script>

<style lang="scss" scoped>
.stage-item {
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  position: relative;
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.1);
  }

  &__container {
    border-radius: 100%;
    overflow: hidden;
    background: $white;
  }

  &__content {
    padding: 3px;

    &:deep(.q-circular-progress__circle) {
      stroke-linecap: round;
    }
  }

  &__stars {
    display: flex;
    gap: 4px;
    position: absolute;
    bottom: calc(100% + 6px);

    &-icon {
      font-size: 18px;
      stroke: $white;
      fill: $white;

      &:nth-of-type(2) {
        transform: translateY(-5px);
      }

      &--checked {
        fill: $primary;
      }
    }
  }

  &__position {
    width: 72px;
    height: 72px;
    border-radius: 100%;
    background: #009088;
    color: $white;

    padding: 2px;

    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
