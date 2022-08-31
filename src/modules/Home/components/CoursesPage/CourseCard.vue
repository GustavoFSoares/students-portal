<template>
  <div class="course-card">
    <AvCard>
      <template #header>
        <div class="course-card__image" />
      </template>

      <template #default>
        <div class="course-card__content">
          <h3 class="course-card__title">{{ title }}</h3>

          <div class="progress-bar" :style="{ '--progress': `${progress}%` }">
            <div class="progress-bar__progress" />
            <p class="progress-bar__label">{{ progress }}%</p>
          </div>

          <div class="course-card__cta-wrapper">
            <QBtn size="sm" label="Comece agora" color="primary" />
          </div>
        </div>
      </template>
    </AvCard>
  </div>
</template>

<script>
import AvCard from "atoms/AvCard.vue";
export default {
  name: "course-card",
  components: {
    AvCard,
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
  },
};
</script>

<style lang="scss" scoped>
.course-card {
  width: 100%;

  &__image {
    width: 100%;
    height: 196px;
    background: rgba(255, 0, 0, 0.562);
    border-radius: 8px;
  }

  &__content {
    display: grid;
    gap: 8px;
  }

  &__title {
    font-size: 15px;
  }

  .progress-bar {
    &__progress {
      width: 100%;
      height: 5px;
      border-radius: 4px;

      background: $grey-transparent;

      position: relative;
      overflow: hidden;

      &:before {
        content: "";
        position: absolute;

        width: var(--progress);
        height: 100%;

        background-color: $primary;
      }
    }

    &__label {
      margin-top: 5px;
      color: $secondary;
      font-size: 14px;
    }
  }

  &__cta-wrapper {
    display: flex;
    justify-content: flex-end;
  }
}
</style>
