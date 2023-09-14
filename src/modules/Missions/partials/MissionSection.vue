<template>
  <div class="mission-section">
    <dv class="mission-section__header">
      <div class="mission-section__cover">
        <img :src="imagePath" :alt="name" />
      </div>

      <div class="mission-section__title-wrapper">
        <h2 class="mission-section__title">{{ name }}</h2>
        <h3 class="mission-section__description">
          {{ description }}
        </h3>
      </div>
    </dv>

    <div class="mission-section__content">
      <ActivitiesList :activities="activities" hide-header />
    </div>
  </div>
</template>

<script setup>
import { computed, getCurrentInstance } from "vue";

import ActivitiesList from "modules/Activities/components/ActivitiesList.vue";

const { appContext } = getCurrentInstance();

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  cover: {
    type: Object,
    required: true,
  },
  activities: {
    type: Array,
    default: null,
  },
});

const imagePath = computed(() =>
  props.cover?.path
    ? `${appContext.config.globalProperties.$appStorage}/${props.cover.path}`
    : appContext.config.globalProperties.$defaultActivityCover
);
</script>

<style lang="scss" scoped>
.mission-section {
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 100%;
  background: $white;
  border-radius: $default-border-radius;
  padding: 15px;

  &__header {
    display: flex;
    gap: 10px;
    width: 100%;
  }

  &__cover {
    width: 150px;
    max-height: 100px;
    border-radius: $default-border-radius;
    overflow: hidden;

    img {
      width: 100%;
    }
  }

  &__title {
    font-size: 18px;
    font-weight: $font-weight-bold;
    color: $text-color-1;
  }

  &__description {
    font-size: 14px;
    font-weight: $font-weight-semibold;
    color: $text-color-4;
    margin-top: 5px;
  }

  &__content {
    :deep(.activity-card) {
      box-shadow: initial;
      border: 1px solid $text-color-3;
    }
  }
}
</style>
