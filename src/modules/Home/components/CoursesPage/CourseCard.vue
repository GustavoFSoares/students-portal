<template>
  <div class="course-card">
    <AvCard class="course-card__wrapper">
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
            <QBtn
              size="sm"
              :label="
                isCompleted
                  ? $t(`${I18N_PATH}.completed`)
                  : $t(`${I18N_PATH}.startNow`)
              "
              color="primary"
              @click="handleStartNow"
              :disable="isCompleted"
            />
          </div>
        </div>
      </template>
    </AvCard>
  </div>
</template>

<script>
import AvCard from "atoms/AvCard.vue";
import { computed } from "vue";

const I18N_PATH = "modules.home.coursesPage.courseCard";

export default {
  name: "course-card",
  emits: ["start-now"],
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
  setup(props, ctx) {
    const isCompleted = computed(() => props.progress === 100);

    const handleStartNow = () => {
      ctx.emit("start-now");
    };

    return {
      I18N_PATH,
      isCompleted,
      handleStartNow,
    };
  },
};
</script>

<style lang="scss" scoped>
.course-card {
  width: 100%;

  &__wrapper {
    display: flex;

    flex-direction: row;
    @media (min-width: map-get($breakpoints, "tablet")) {
      flex-direction: column;
    }

    &::v-deep .av-card__header {
      flex-grow: 1;
    }

    @media (max-width: map-get($breakpoints, "mobile")) {
      &::v-deep .av-card__content {
        width: 60%;
      }
    }
  }

  &__image {
    background: rgba(255, 0, 0, 0.562);
    border-radius: 8px;

    width: 100%;
    height: 100%;

    @media (min-width: map-get($breakpoints, "tablet")) {
      height: 196px;
    }
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
