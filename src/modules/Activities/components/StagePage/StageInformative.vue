<template>
  <section class="stage-informative">
    <div class="stage-informative__content">
      <div class="stage-informative__image">
        <img :src="`${$appStorage}/${path.arquivo}`" alt="" />
      </div>

      <div class="stage-informative__text-content">
        <h1 class="stage-informative__title">
          {{ title }}
        </h1>
        <h2 class="stage-informative__description">
          {{ description }}
        </h2>
      </div>
    </div>
  </section>
</template>

<script setup>
const props = defineProps({
  path: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
.stage-informative {
  height: 100%;

  display: flex;
  align-items: center;

  padding: 0 40px;

  &__content {
    width: 100%;
    height: 100%;
    max-height: 350px;
    display: flex;
    gap: 20px;
    align-items: center;
  }

  &__image {
    flex-grow: 1;
    height: 350px;

    img {
      // width: 100%;
      height: 100%;
    }
  }

  &__text-content {
    width: 100%;
    max-width: 40%;
    display: flex;
    flex-direction: column;
    gap: 20px;
    justify-content: flex-start;
    align-items: flex-start;
    text-align: start;

    height: 100%;
  }

  &__title {
    font-size: 24px;
    font-weight: $font-weight-semibold;
  }

  &__description {
    font-size: 16px;
    line-height: 20px;
  }
}
</style>
