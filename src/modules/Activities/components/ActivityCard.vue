<template>
  <div class="activity-card">
    <AvCard class="activity-card__wrapper">
      <template #header>
        <div class="activity-card__image-wrapper">
          <img
            class="activity-card__image"
            v-if="cover"
            :src="imagePath"
            :alt="cover.tipo"
          />
        </div>
      </template>

      <template #default>
        <div class="activity-card__content">
          <h3 class="activity-card__title">{{ title }}</h3>

          <div
            v-if="progress !== null"
            class="progress-bar"
            :style="{ '--progress': `${progress}%` }"
          >
            <div class="progress-bar__progress" />
            <p class="progress-bar__label">{{ progress }}%</p>
          </div>

          <div class="activity-card__cta-wrapper">
            <QBtn
              size="sm"
              :label="$t(`${I18N_PATH}.access`)"
              color="secondary"
              @click="handleStartNow"
            />
          </div>
        </div>
      </template>
    </AvCard>
  </div>
</template>

<script>
const I18N_PATH = "modules.activities.components.activityCard";

import { computed, getCurrentInstance } from "vue";

import AvCard from "atoms/AvCard.vue";

export default {
  name: "ActivityCard",
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
      default: null,
    },
  },
  setup(props, ctx) {
    const { appContext } = getCurrentInstance();

    const imagePath = computed(() =>
      props.cover.path
        ? `${appContext.config.globalProperties.$appStorage}/${props.cover.path}`
        : appContext.config.globalProperties.$defaultActivityCover
    );

    const isCompleted = computed(() => props.progress === 100);

    const handleStartNow = () => {
      ctx.emit("start-now");
    };

    return {
      I18N_PATH,
      imagePath,
      isCompleted,
      handleStartNow,
    };
  },
};
</script>

<style lang="scss" scoped>
.activity-card {
  width: 100%;

  &:hover & {
    &__image {
      transform: scale(1.04);
    }
  }

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
    transition: transform 0.2s ease-in;

    &-wrapper {
      width: 160px;
      height: 100%;

      background: #ff00008f;
      border-radius: 8px;
      overflow: hidden;

      @media (min-width: $breakpoint-tablet) {
        width: 100%;
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
    color: $text-color-3;
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

        background-color: $secondary;
      }
    }

    &__label {
      margin-top: 5px;
      color: $text-color-2;
      font-size: 14px;
    }
  }

  &__cta-wrapper {
    display: flex;
    justify-content: flex-end;
  }
}
</style>
