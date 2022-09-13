<template>
  <div class="ranking-card">
    <div class="ranking-card__wrapper">
      <div class="ranking-card__content">
        <div class="ranking-card__rank">
          <h6 class="ranking-card__rank-number">
            {{ userRank }}
          </h6>

          <QIcon name="img:/svg/medal.svg" class="ranking-card__rank-medal" />
        </div>

        <div class="ranking-card__user-image">
          <QIcon
            class="ranking-card__user-image-crown"
            name="img:assets/icons/crown.svg"
            v-if="false && isFirst"
          />

          <img
            src="https://png.pngtree.com/png-clipart/20190924/original/pngtree-businessman-user-avatar-free-vector-png-image_4827807.jpg"
            :alt="userName"
          />
        </div>

        <div class="ranking-card__points">{{ userPoints }}</div>
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

    height: 65%;
  }

  &__content {
    display: flex;
    justify-content: space-evenly;
  }

  &__user-image {
    display: flex;
    flex-direction: column;

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
}
</style>
