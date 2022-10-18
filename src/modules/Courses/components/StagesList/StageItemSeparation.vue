<template>
  <div class="stage-item-separator">
    <div class="stage-item-separator__content" />
  </div>
</template>

<style lang="scss" scoped>
.stage-item-separator {
  content: "";
  border: 3px solid $white;
  background: $white;
  width: 100%;
  min-width: 30px;
  max-width: 30px;
  margin: 0 -1px;
  flex-grow: 1;

  &__content {
    height: 4px;
    margin: 0 1px;
    border-radius: 4px;

    overflow: hidden;
    background: $primary;
  }
}
</style>
