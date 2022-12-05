<template>
  <section class="av-page">
    <header class="av-page-header">
      <h1 class="av-page-header__title">{{ title }}</h1>

      <div class="av-page-header__content">
        <slot name="header" />
      </div>
    </header>

    <main class="av-page-content">
      <slot name="default" />
    </main>
  </section>
</template>

<script>
export default {
  name: "AvPage",
  props: {
    title: {
      type: String,
      required: true,
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
    padding: 20px 40px;
    overflow: auto;
  }
}
</style>
