<template>
  <li :class="['stage-item', { 'stage-item--completed': completed }]">
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
      <div class="stage-item__content">
        <div class="stage-item__position">{{ positionLabel }}</div>
        <div class="stage-item__badgse"></div>
      </div>
    </div>
  </li>
</template>

<script>
const TOTAL_STARS = 0;

import { computed } from "vue";
import { Screen } from "quasar";

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
    const isMobile = computed(() => Screen.xs);
    const itemProgress = computed(() => (100 * props.rank) / TOTAL_STARS);
    const positionLabel = computed(() => Number(props.position) + 1);

    return {
      TOTAL_STARS,
      isMobile,
      itemProgress,
      positionLabel,
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
    transform: scale(1.03);
  }

  &__stars {
    display: flex;
    gap: 4px;
    bottom: calc(100% + 6px);

    &-icon {
      font-size: 18px;
      stroke: $white;
      fill: $secondary;

      &:nth-of-type(2) {
        transform: translateY(-5px);
      }

      &--checked {
        stroke: $secondary;
        fill: $secondary;
      }
    }
  }

  &--completed & {
    &__container {
      border-color: $secondary;
      background: rgba($secondary, 0.5);
    }
  }

  &__container {
    border-radius: $default-border-radius;
    overflow: hidden;
    background: $card-background;
    border: $card-border-line;
  }

  &__content {
    padding: 3px;
  }

  &__position {
    width: 50px;
    height: 50px;

    color: $text-color-3;
    padding: 2px;

    display: flex;
    align-items: center;
    justify-content: center;

    @media (min-width: $breakpoint-tablet) {
      width: 72px;
      height: 72px;
    }
  }
}
</style>
