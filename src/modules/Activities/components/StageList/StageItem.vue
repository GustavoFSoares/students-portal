<template>
  <li
    :class="[
      'stage-item',
      {
        'stage-item--completed': completed,
        'stage-item--blocked': !active,
      },
    ]"
  >
    <QBadge v-if="completed" class="stage-item__completed-flag" color="green-9">
      <QIcon name="check" rounded color="white" size="xs" />
    </QBadge>

    <div class="stage-item__stars" v-if="false">
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
    active: {
      type: Boolean,
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

  &__completed-flag {
    position: absolute;
    top: -6px;
    right: -6px;
    padding: 2px;
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
      background: $primary;
    }
  }

  &--blocked & {
    &__container {
      background: rgba($grey-14, 0.6);
      cursor: not-allowed;
    }
  }

  &__container {
    border-radius: $default-border-radius;
    overflow: hidden;
    background: rgba($primary, 0.8);
    border: 1px solid transparent;
  }

  &__content {
    padding: 3px;
  }

  &__position {
    width: 50px;
    height: 50px;

    color: $white;
    padding: 2px;
    font-size: 16px;
    font-weight: $font-weight-bold;

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
