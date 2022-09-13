<template>
  <div :class="['av-card', { 'av-card--no-border-radius': noBorderRadius }]">
    <div class="av-card__header">
      <slot name="header" />
    </div>

    <div class="av-card__content">
      <slot />
    </div>

    <slot name="footer" />
  </div>
</template>

<script>
export default {
  name: "av-card",
  props: {
    noBorderRadius: {
      type: Boolean,
    },
  },
};
</script>

<style lang="scss" scoped>
.av-card {
  background: #fff;
  border-radius: $defaultBorderRadius;
  overflow: hidden;

  &--no-border-radius {
    border-radius: initial;
  }

  &__header,
  &__content {
    position: relative;
  }

  &__content {
    padding: 10px 12px;
  }
}
</style>
