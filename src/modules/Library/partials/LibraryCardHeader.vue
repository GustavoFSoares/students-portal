<template>
  <div class="library-card-header">
    <div class="library-card-header__cover">
      <img :src="imagePath" :alt="name" />
    </div>

    <div class="library-card-header__title-wrapper">
      <h2 class="library-card-header__title">{{ name }}</h2>
      <h3 class="library-card-header__description">
        {{ description }}
      </h3>
    </div>
  </div>
</template>

<script setup>
import { computed, getCurrentInstance } from "vue";

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
});

const imagePath = computed(() =>
  props.cover?.path
    ? `${appContext.config.globalProperties.$appStorage}/${props.cover.path}`
    : appContext.config.globalProperties.$defaultActivityCover
);
</script>

<style lang="scss" scoped>
.library-card-header {
  display: flex;
  gap: 10px;
  width: 100%;

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
}
</style>
