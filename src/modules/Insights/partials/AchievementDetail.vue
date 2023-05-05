<template>
  <q-card
    :class="[
      'achievement-detail',
      { 'achievement-detail--obtained': obtained },
    ]"
  >
    <QBtn
      class="achievement-detail__close-button"
      icon="close"
      round
      flat
      @click="handleCloseDetail"
    />

    <div class="achievement-detail__image">
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

    <div class="achievement-detail__text-wrapper">
      <h5 class="achievement-detail__title">{{ title }}</h5>

      <div class="achievement-detail__how-get">
        <h6 class="achievement-detail__how-get-label">
          {{ $t(`${I18N_PATH}.howGet`) }}:
        </h6>

        <h6 class="achievement-detail__how-get-description">
          {{ goal.description }}
        </h6>
      </div>
    </div>
  </q-card>
</template>

<script setup>
import { defineEmits, defineProps } from "vue";
const I18N_PATH = "modules.insights.pages.achievements.achievementCard";

const $emit = defineEmits(["close"]);

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

const handleCloseDetail = () => {
  $emit("close");
};
</script>

<style lang="scss" scoped>
.achievement-detail {
  position: relative;
  width: 290px;

  padding: 76px 0;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;

  background: $white;

  @media (min-width: $breakpoint-tablet) {
    width: 329px;
  }

  &--obtained & {
    &__image img {
      filter: none;
    }
  }

  &__image {
    width: 140px;
    height: 140px;

    img {
      width: 100%;
      height: 100%;
      filter: grayscale(100%);
    }
  }

  &__text-wrapper {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    gap: 42px;

    text-align: center;
  }

  &__title {
    font-size: 14px;
    font-weight: $font-weight-semibold;
  }

  &__how-get {
    display: flex;
    flex-direction: column;
    gap: 2px;

    &-label {
      font-size: 12px;
      font-weight: $font-weight-semibold;
    }

    &-description {
      font-size: 12px;
    }
  }

  &__close-button {
    position: absolute;
    top: 16px;
    right: 16px;
  }
}
</style>
