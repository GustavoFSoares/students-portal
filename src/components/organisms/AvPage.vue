<template>
  <section :class="['av-page', { 'av-page--no-header': noHeader }]">
    <header class="av-page-header" v-if="!noHeader">
      <div class="av-page-header__title-wrapper">
        <QBtn
          v-if="goBackRoute"
          :to="goBackRoute"
          icon="chevron_left"
          size="md"
          padding="xs"
          flat
          text-color="white"
          :label="title"
        />

        <h1 v-else class="av-page-header__title">{{ title }}</h1>
      </div>

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
    goBackRoute: {
      type: Object,
      default: null,
    },
  },
};
</script>

<style lang="scss" scoped>
.av-page {
  height: 100%;
  display: flex;
  flex-direction: column;

  &-header {
    display: flex;
    border-bottom: $border-line;
    height: 53px;

    &__title {
      font-size: 15px;
      color: $text-color-3;
      font-weight: $font-weight-normal;

      &-wrapper {
        padding: 0 30px;

        display: flex;
        align-items: center;
        gap: 15px;
      }
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

    overflow: auto;

    &::-webkit-scrollbar {
      width: 8px;
      border-radius: 10px;
    }

    &::-webkit-scrollbar-thumb {
      background: rgba(#010203, 60%);
      border-radius: 10px;
    }

    &__container {
      padding: 20px 40px;
      padding-bottom: 80px;
    }
  }
}
</style>
