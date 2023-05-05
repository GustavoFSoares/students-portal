<template>
  <AvCard bordered>
    <div
      :class="['achievement-card', { 'achievement-card--obtained': obtained }]"
    >
      <div class="achievement-card__image">
        <img
          v-if="badge"
          class="achievement-item__image"
          :src="`${$appStorage}/${badge}`"
          :alt="title"
        />

        <img
          v-else
          class="achievement-item__image"
          src="~assets/img/conquests/default-trophy.jpg"
          :alt="title"
        />
      </div>

      <div class="achievement-card__text-wrapper">
        <h5 class="achievement-card__title">{{ title }}</h5>

        <h6 class="achievement-card__description">{{ description }}</h6>
      </div>
    </div>
  </AvCard>
</template>

<script>
import AvCard from "atoms/AvCard.vue";

export default {
  name: "ConquestCard",
  components: {
    AvCard,
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    description: {
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
  display: flex;
  gap: 20px;

  @media (min-width: $breakpoint-tablet) {
    min-height: 90px;
  }

  &--obtained & {
    &__image img {
      filter: none;
    }
  }

  &__image {
    width: 55px;

    img {
      width: 100%;
      filter: grayscale(100%);
    }
  }

  &__text-wrapper {
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  &__title {
    font-size: 10px;
    font-weight: $font-weight-semibold;
  }

  &__description {
    font-size: 12px;
  }
}
</style>
