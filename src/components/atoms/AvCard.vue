<template>
  <div
    :class="[
      'av-card',
      {
        'av-card--no-border-radius': noBorderRadius,
        'av-card--rounded-header': roundedHeader,
        'av-card--bordered': bordered,
        'av-card--shadows': shadows,
      },
    ]"
  >
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
    bordered: {
      type: Boolean,
    },
    roundedHeader: {
      type: Boolean,
    },
    shadows: {
      type: Boolean,
    },
  },
};
</script>

<style lang="scss" scoped>
.av-card {
  background-color: $card-background;

  border-radius: $default-border-radius;
  overflow: hidden;

  display: flex;
  flex-direction: column;

  &--no-border-radius {
    border-radius: initial;
  }

  &--rounded-header & {
    &__header {
      border-radius: 0 0 $default-border-radius $default-border-radius;
      overflow: hidden;
    }
  }

  &--bordered {
    border: $card-border-line;
  }

  &--shadows {
    box-shadow: rgba(0, 0, 0, 0.15) 3px 3px 10px;
  }

  &__header,
  &__content {
    position: relative;
  }

  &__content {
    padding: 10px 12px;
    flex-grow: 1;
  }
}
</style>
