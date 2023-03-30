<template>
  <AvCard
    :class="['achievement-card', { 'achievement-card--obtained': obtained }]"
    bordered
  >
    <div class="achievement-card__content">
      <div class="achievement-card__image">
        <img
          v-if="badge"
          class="conquest-item__image"
          :src="`${$appStorage}/${badge}`"
          :alt="title"
        />

        <img
          v-else-if="obtained"
          class="conquest-item__image"
          src="~assets/img/achievements/on.png"
          :alt="title"
        />

        <img
          v-else
          class="conquest-item__image"
          src="~assets/img/achievements/off.png"
          :alt="title"
        />
      </div>

      <div class="achievement-card__text-wrapper">
        <h5 class="achievement-card__title">{{ title }}</h5>

        <h6 class="achievement-card__description">
          <strong>{{ goalTarget }}</strong> - {{ goalDescription }}
        </h6>
      </div>
    </div>
  </AvCard>
</template>

<script>
import AvCard from "atoms/AvCard.vue";

export default {
  name: "AchievementCard",
  components: {
    AvCard,
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    goalDescription: {
      type: String,
      required: true,
    },
    goalTarget: {
      type: String,
      required: true,
    },
    obtained: {
      type: Boolean,
      default: false,
    },
    badge: {
      type: String,
      default: null,
    },
  },
};
</script>

<style lang="scss" scoped>
.achievement-card {
  :deep(.av-card__content) {
    background: $default-background;
  }

  &--obtained {
    :deep(.av-card__content) {
      background: rgba(#fff, 10%);
    }
  }

  &__content {
    display: flex;
    gap: 20px;

    @media (min-width: $breakpoint-tablet) {
      min-height: 90px;
    }
  }

  &__image {
    height: 90px;

    img {
      width: 100%;
      height: 100%;
      border-radius: 15px;
    }
  }

  &__text-wrapper {
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  &__title {
    color: $text-color-3;
    font-size: 15px;
    font-weight: $font-weight-semibold;
  }

  &__description {
    color: $text-color-2;
    font-size: 12px;
  }
}
</style>
