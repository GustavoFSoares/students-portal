<template>
  <aside class="stages-list-detail">
    <QBtn
      class="stages-list-detail__close"
      icon="close"
      flat
      rounded
      padding="sm"
      @click="handleClose"
    />

    <div class="stages-list-detail__position">{{ stage.position }}</div>

    <h1 class="stages-list-detail__title">{{ stage.nome }}</h1>

    <div class="stages-list-detail__stars">
      <QIcon
        :class="[
          'stages-list-detail__stars-icon',
          { 'stages-list-detail__stars-icon--checked': rankItem <= stage.rank },
        ]"
        v-for="rankItem in TOTAL_STARS"
        :key="rankItem"
        name="svguse:/icons.svg#star"
      />
    </div>

    <AvReward :points="stage.pontos" :coins="stage.moedas" />

    <QBtn
      class="stages-list-detail__start-activity"
      :label="$t(`${I18N_PATH}.startActivity`)"
      color="primary"
    />
  </aside>
</template>

<script>
import AvReward from "molecules/AvReward.vue";

const TOTAL_STARS = 3;
const I18N_PATH = "modules.courses.stagesList.detail";

export default {
  emits: ["close"],
  name: "StagesListDetail",
  components: {
    AvReward,
  },
  props: {
    stage: {
      type: Object,
      default: () => {},
    },
  },
  setup(_, ctx) {
    const handleClose = () => {
      ctx.emit("close");
    };

    return {
      TOTAL_STARS,
      I18N_PATH,
      handleClose,
    };
  },
};
</script>

<style lang="scss" scoped>
.stages-list-detail {
  padding: 70px 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  position: relative;

  &__close {
    position: absolute;
    top: 10px;
    right: 10px;
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
    font-size: 30px;
  }

  &__title {
    font-size: 14px;
    font-weight: $font-weight-semibold;
  }

  &__stars {
    display: flex;
    gap: 4px;

    &-icon {
      font-size: 18px;
      stroke: $secondary;
      fill: $white;

      &--checked {
        stroke: $primary;
        fill: $primary;
      }
    }
  }

  .card-reward {
    display: flex;
    gap: 10px;
    width: 100%;

    &-item {
      width: 100%;
      display: flex;
      gap: 5px;
      align-items: center;
      border: 2px solid $grey-transparent;
      border-radius: 8px;
      text-decoration: none;

      padding: 5px;
      transition: border-color, background-color 0.4s ease-in;

      &__icon {
        font-size: 22px;
      }

      &__value {
        font-size: 14px;
        font-weight: $font-weight-semibold;
      }

      &__label {
        color: $secondary;
        flex-grow: 1;
        text-align: end;
        font-size: 12px;
      }

      $rewards: (
        coins: $yellow-14,
        points: $primary,
      );

      @each $rewardItem, $rewardColor in $rewards {
        &--#{$rewardItem} {
          color: $rewardColor;
          border-color: rgba($rewardColor, 0.4);

          &:hover {
            background-color: rgba($rewardColor, 0.1);
          }
        }
      }
    }
  }

  &__start-activity {
    text-transform: none !important;
    margin-top: 40px;
  }
}
</style>
