<template>
  <section :class="['av-page', { 'av-page--no-header': noHeader }]">
    <header class="av-page-header" v-if="!noHeader">
      <h1 class="av-page-header__title">{{ title }}</h1>

      <div class="av-page-header__content">
        <slot name="header" />
      </div>
    </header>

    <main class="av-page-content">
      <div class="av-page-content__container">
        <slot name="default" />
      </div>
    </main>
  </section>
</template>

<script>
export default {
  name: "AvPage",
  props: {
    title: {
      type: String,
      default: null,
    },
    noHeader: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
.av-page {
  height: 100%;
  display: flex;
  flex-direction: column;

  &--no-header & {
    &-content__container {
      height: 910px;
    }
  }

  &-header {
    display: flex;
    border-bottom: $border-line;
    height: 53px;

    &__title {
      font-size: 15px;
      color: $text-color-3;
      padding: 15px 30px;
      font-weight: $font-weight-normal;
    }

    &__content {
      flex-grow: 1;
    }
  }

  &-content {
    background-color: $default-background;
    height: 100%;
    padding: 4px 0;
    position: relative;

    &__container {
      padding: 20px 40px;
      overflow: auto;
      height: 855px;

      &::-webkit-scrollbar {
        width: 8px;
        border-radius: 10px;
      }

      &::-webkit-scrollbar-thumb {
        background: rgba(#010203, 60%);
        border-radius: 10px;
      }
    }
  }
}
</style>
