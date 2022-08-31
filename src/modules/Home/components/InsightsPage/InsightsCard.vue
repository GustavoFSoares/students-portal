<template>
  <div class="insights-card">
    <AvCard>
      <div class="insights-card__container">
        <div class="insights-card__header">
          <h5 class="insights-card__header-title">{{ title }}</h5>

          <slot name="header" />
        </div>

        <div class="insights-card__content">
          <slot />
        </div>

        <div class="insights-card__footer">
          <QBtn
            flat
            size="sm"
            padding="xs"
            :to="{ name: seeMoreUrl }"
            :label="seeMoreText"
            :icon="seeMoreIcon"
            color="primary"
          />
        </div>
      </div>
    </AvCard>
  </div>
</template>

<script>
import AvCard from "atoms/AvCard.vue";

export default {
  components: {
    AvCard,
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    seeMoreUrl: {
      type: String,
      required: true,
    },
    seeMoreText: {
      type: String,
      required: true,
    },
    seeMoreIcon: {
      type: String,
      default: "o_add_circle",
    },
  },
};
</script>

<style lang="scss" scoped>
.insights-card {
  &__container {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    &-title {
      font-size: 14px;
    }
  }

  &__footer {
    display: flex;
    justify-content: flex-end;
  }
}
</style>
