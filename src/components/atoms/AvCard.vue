<template>
  <div class="av-card">
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
};
</script>

<style lang="scss" scoped>
.av-card {
  background: #fff;
  border-radius: $defaultBorderRadius;
  overflow: hidden;

  &__content {
    padding: 15px 20px;
  }
}
</style>
