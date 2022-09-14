<template>
  <div :class="['ranking-card', `ranking-card--rank-${userRank}`]">
    <div class="ranking-card__wrapper">
      <div class="ranking-card__content">
        <div class="ranking-card__rank">
          <div class="rank-number">
            <h6 class="rank-number__text">{{ userRank }}º</h6>
          </div>

          <QIcon
            v-if="false && isWinner && !isFirst"
            class="rank-medal"
            name="img:/svg/medal.svg"
          />
        </div>

        <div class="ranking-card__user-image">
          <QIcon
            v-if="false && isFirst"
            class="ranking-card__user-image-crown"
            name="img:/svg/crown.svg"
          />

          <img
            src="https://png.pngtree.com/png-clipart/20190924/original/pngtree-businessman-user-avatar-free-vector-png-image_4827807.jpg"
            :alt="userName"
          />
        </div>

        <div class="ranking-card__points">{{ userPoints }}pts</div>
      </div>

      <div class="ranking-card__user-name">
        <h5 class="ranking-card__user-name-text">{{ userName }}</h5>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";

export default {
  name: "RankingCard",
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
      default: null,
    },
    userPoints: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    const isFirst = computed(() => props.userRank === 1);
    const isWinner = computed(() => props.userRank <= 3);

    return {
      isFirst,
      isWinner,
    };
  },
};
</script>

<style lang="scss" scoped>
.ranking-card {
  width: 100%;
  height: 165px;

  display: grid;
  align-items: flex-end;

  &__wrapper {
    padding: 10px;

    border: 2px solid $secondary;
    border-radius: 8px;

    display: flex;
    flex-direction: column;

    height: 65%;
  }

  &__content {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    flex-grow: 1;
  }

  &__rank {
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
    }

    &:has(.rank-medal) {
      margin-top: 25px;
    }
  }

  &__user-image {
    display: flex;
    flex-direction: column;
    // padding: 20px 0;

    img {
      width: 50px;
      height: 50px;

      border-radius: 50%;
      border: 3px solid $secondary;
    }
  }

  &__user-name {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;

    &-text {
      padding: 0 8px;
      font-weight: $font-weight-bold;
      font-size: 15px;
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
        height: map-get($rank-data, "height");

        border-color: map-get($rank-data, "default");
      }

      &__rank .rank-number {
        background: map-get($rank-data, "default");
        box-shadow: 0 3px map-get($rank-data, "boxShadow");
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
