<template>
  <div :class="['ranking-card', `ranking-card--rank-${userRank}`]">
    <div class="ranking-card__wrapper">
      <div class="ranking-card__content">
        <div class="ranking-card__rank">
          <div class="rank-number">
            <h6 class="rank-number__text">{{ userRank }}º</h6>
          </div>

          <QIcon
            v-if="isWinner && !isFirst"
            class="rank-medal"
            name="svguse:/icons.svg#medal"
          />
        </div>

        <div class="ranking-card__user-image">
          <QIcon
            v-if="isFirst"
            name="svguse:/icons.svg#crown"
            class="ranking-card__user-image-crown"
          />

          <AvatarViewer :option="userAvatar" :size="50" :title="userName" />
        </div>

        <div class="ranking-card__points">{{ userPoints }}pts</div>
      </div>

      <div class="ranking-card__user-name">
        <h5 class="ranking-card__user-name-text">
          {{ userName }}

          <span v-if="isYou">{{ $t(`${I18N_PATH}.isYou`) }}</span>
        </h5>
      </div>
    </div>
  </div>
</template>

<script>
const I18N_PATH = "modules.ranking";

import { computed } from "vue";
import { AvatarViewer } from "vue-color-avatar";

export default {
  name: "RankingCard",
  components: {
    AvatarViewer,
  },
  props: {
    userRank: {
      type: Number,
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    userImage: {
      type: String,
      required: true,
    },
    userPoints: {
      type: Number,
      required: true,
    },
    userAvatar: {
      type: Object,
      required: true,
    },
    isYou: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const isFirst = computed(() => props.userRank === 1);
    const isWinner = computed(() => props.userRank <= 3);

    return {
      I18N_PATH,
      isFirst,
      isWinner,
    };
  },
};
</script>

<style lang="scss" scoped>
.ranking-card {
  width: 100%;

  height: 120px;

  @media (min-width: $breakpoint-tablet) {
    height: 165px;
  }

  display: grid;
  align-items: flex-end;

  &__wrapper {
    background: rgba(255, 255, 255, 0.1);

    padding: 10px;

    border: 2px solid $secondary;
    border-radius: 8px;

    display: flex;
    flex-direction: column;

    height: 100%;
    @media (min-width: $breakpoint-tablet) {
      height: 65%;
    }
  }

  &__content {
    flex-grow: 1;

    display: grid;
    align-items: center;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
  }

  &__rank {
    position: relative;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    gap: 10px;

    .rank-number {
      min-width: 25px;
      min-height: 25px;

      border-radius: 50%;

      display: flex;
      justify-content: center;
      align-items: center;

      background: $secondary;
      box-shadow: 0 3px #7c7c7c;

      &__text {
        color: $white;
        font-size: 15px;
        font-weight: $font-weight-bold;

        padding: 2px;
      }
    }

    .rank-medal {
      font-size: 20px;

      position: absolute;
      top: calc(100% + 8px);
    }
  }

  &__user-image {
    display: flex;
    flex-direction: column;
    align-items: center;

    position: relative;

    &-crown {
      position: absolute;
      top: -25px;

      width: 28px;
      height: 20px;

      fill: $yellow-8;
    }

    img {
      width: 50px;
      height: 50px;

      border-radius: 50%;
      border: 3px solid $secondary;
    }
  }

  &__points {
    text-align: center;
    color: $text-color-3;
  }

  &__user-name {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;

    &-text {
      padding: 0 8px;
      color: $text-color-3;
      &,
      span {
        font-weight: $font-weight-bold;
        font-size: 15px;
        flex-shrink: 0;
      }
    }

    &:before,
    &:after {
      content: "";
      height: 2px;
      width: 100%;
      border-radius: 8px;
      background: $secondary;
    }
  }

  $rank-colors: (
    1: (
      default: $yellow-8,
      boxShadow: $yellow-9,
      height: 100%,
    ),
    2: (
      default: $grey-13,
      boxShadow: $grey-14,
      height: 80%,
    ),
    3: (
      default: $deep-orange-4,
      boxShadow: $deep-orange-6,
      height: 70%,
    ),
  );

  @each $rank, $rank-data in $rank-colors {
    &--rank-#{$rank} & {
      &__wrapper {
        @media (min-width: $breakpoint-tablet) {
          height: map-get($rank-data, "height");
        }

        border-color: map-get($rank-data, "default");
      }

      &__rank {
        .rank-number {
          background: map-get($rank-data, "default");
          box-shadow: 0 3px map-get($rank-data, "boxShadow");
        }

        .rank-medal {
          fill: map-get($rank-data, "boxShadow");
        }
      }

      &__user-image img {
        border-color: map-get($rank-data, "default");
      }

      &__user-name {
        &:before,
        &:after {
          background: map-get($rank-data, "default");
        }
      }
    }
  }
}
</style>
