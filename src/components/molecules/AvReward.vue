<template>
  <div class="av-reward">
    <div
      v-for="(rewardItem, rewardKey) in rewards"
      :key="rewardKey"
      :class="['av-reward-item', `av-reward-item--${rewardKey}`]"
    >
      <QIcon class="av-reward-item__icon" :name="getRewardIcon(rewardKey)" />

      <h6 class="av-reward-item__value">
        {{ levelFormatter(rewardItem.value) }}
      </h6>

      <h6 class="av-reward-item__label">
        {{ $t(`${I18N_PATH}.${rewardKey}`) }}
      </h6>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";

const I18N_PATH = "components.molecules.rewards";

export default {
  props: {
    coins: {
      type: Number,
      default: 0,
    },
    points: {
      type: Number,
      default: 0,
    },
  },
  setup(props, ctx) {
    const rewards = computed(() => ({
      points: {
        route: "home",
        value: props.points,
      },
      coins: {
        route: "home",
        value: props.coins,
      },
    }));

    const getRewardIcon = (rewardName) => {
      const rewards = {
        coins: "o_paid",
        points: "o_grade",
      };

      return rewards[rewardName] || null;
    };

    const levelFormatter = (val) => {
      return val.toLocaleString("pt-BR");
    };

    return {
      I18N_PATH,
      rewards,
      getRewardIcon,
      levelFormatter,
    };
  },
};
</script>

<style lang="scss" scoped>
.av-reward {
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
      font-size: 16px;
    }

    &__value {
      font-size: 12px;
      font-weight: $font-weight-semibold;
    }

    &__label {
      color: $text-color-1;
      flex-grow: 1;
      text-align: end;
      font-size: 12px;
    }

    $rewards: (
      coins: (
        color: $yellow-14,
        border: $yellow-14,
      ),
      points: (
        color: $primary,
        border: #e0e5e9,
      ),
    );

    @each $rewardItem, $rewardColor in $rewards {
      &--#{$rewardItem} {
        color: map-get($rewardColor, "color");

        $borderColor: map-get($rewardColor, "border");
        border-color: rgba($borderColor, 0.4);

        &:hover {
          background-color: rgba($borderColor, 0.1);
        }
      }
    }
  }
}
</style>
