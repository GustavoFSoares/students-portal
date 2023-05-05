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

        <div class="achievement-card__how-get">
          <h6 class="achievement-card__how-get-label">
            {{ $t(`${I18N_PATH}.howGet`) }}:
          </h6>

          <h6 class="achievement-card__how-get-description">
            {{ goal.description }}
          </h6>
        </div>
      </div>
    </div>
  </AvCard>
</template>

<script setup>
import AvCard from "atoms/AvCard.vue";

const I18N_PATH = "modules.insights.pages.achievements.achievementCard";

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  goal: {
    type: Object,
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
});
</script>


<style lang="scss" scoped>
.achievement-card {
  display: flex;
  gap: 20px;
  cursor: pointer;

  &--obtained & {
    &__image img {
      filter: none;
    }
  }

  &__image {
    width: 70px;
    height: 70px;

    img {
      width: 100%;
      height: 100%;
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
    font-size: 14px;
    font-weight: $font-weight-semibold;
  }

  &__how-get {
    &-label {
      font-size: 12px;
      font-weight: $font-weight-semibold;
    }

    &-description {
      font-size: 12px;
    }
  }
}
</style>
