<template>
  <header class="stage-header">
    <div class="stage-header__title-wrapper">
      <QBtn
        class="stage-header__back-button"
        icon="arrow_back"
        flat
        round
        size="13px"
        padding="4px"
        :to="{ name: 'courses.stages-list', params: { id: stageId } }"
      />

      <h1 class="stage-header__title">{{ title }}</h1>
    </div>

    <AvReward class="stage-header__rewards" :points="points" :coins="coins" />
  </header>
</template>

<script>
import AvReward from "molecules/AvReward.vue";

export default {
  name: "StagesHeader",
  components: {
    AvReward,
  },
  props: {
    stageId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      default: null,
    },
    points: {
      type: Number,
      default: 0,
    },
    coins: {
      type: Number,
      default: 0,
    },
  },
};
</script>

<style lang="scss" scoped>
.stage-header {
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

  &__rewards {
    max-width: 260px;
    width: 100%;
  }
}
</style>
