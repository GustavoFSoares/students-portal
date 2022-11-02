<template>
  <div class="course-card">
    <AvCard class="course-card__wrapper">
      <template #header>
        <div class="course-card__image-wrapper">
          <img
            class="course-card__image"
            v-if="cover"
            :src="$appStorage + cover.path"
            :alt="cover.tipo"
          />
        </div>
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
    cover: {
      type: Object,
      required: false,
    },
    progress: {
      type: Number,
      required: true,
      default: 50,
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
    @media (min-width: $breakpoint-tablet) {
      flex-direction: column;
    }

    &:deep(.av-card__header) {
      flex-grow: 1;
    }

    @media (max-width: $breakpoint-mobile) {
      &:deep(.av-card__content) {
        width: 60%;
      }
    }
  }

  &__image {
    &-wrapper {
      width: 100%;
      height: 100%;

      background: #ff00008f;
      border-radius: 8px;
      overflow: hidden;

      @media (min-width: $breakpoint-tablet) {
        height: 196px;
      }
    }

    width: 100%;
    height: 100%;
  }

  &__content {
    display: flex;
    flex-direction: column;
    gap: 8px;
    height: 100%;
  }

  &__title {
    font-size: 15px;
    flex-grow: 1;
    height: 100%;
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
