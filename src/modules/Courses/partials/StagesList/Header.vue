<template>
  <header class="stages-list-header">
    <div class="stages-list-header__title-wrapper">
      <QBtn
        class="stages-list-header__back-button"
        icon="arrow_back"
        flat
        round
        size="13px"
        padding="4px"
        :to="{ name: 'home.courses' }"
      />

      <h1 class="stages-list-header__title">{{ title }}</h1>
    </div>

    <div class="stages-list-header__content">
      <AvProgressBar
        class="stages-list-header__progress-bar"
        :progress="progress"
        inline
      />

      <AvReward
        class="stages-list-header__rewards"
        :points="points"
        :coins="coins"
      />
    </div>
  </header>
</template>

<script>
import AvProgressBar from "atoms/AvProgressBar.vue";

import AvReward from "molecules/AvReward.vue";

export default {
  name: "StagesListHeader",
  components: {
    AvProgressBar,
    AvReward,
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    progress: {
      type: Number,
      required: true,
    },
    points: {
      type: Number,
      required: true,
    },
    coins: {
      type: Number,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.stages-list-header {
  padding: 5px;
  background-color: $white;
  box-shadow: 0 1px 10px $secondary;

  display: flex;
  justify-content: space-between;

  &__title {
    font-size: 11px;
    font-weight: $font-weight-semibold;

    &-wrapper {
      display: flex;
      gap: 10px;
      align-items: center;
    }
  }

  &__content {
    display: flex;
    gap: 12px;
    align-items: center;

    flex-grow: 1;
    max-width: 50%;
  }

  &__progress-bar {
    flex-grow: 1;
  }

  &__rewards {
    max-width: 260px;
    width: 100%;
  }
}
</style>
