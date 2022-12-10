<template>
  <q-card class="stage-list-detail">
    <div class="stage-list-detail__content">
      <QBtn
        class="stage-list-detail__close"
        icon="close"
        flat
        rounded
        padding="sm"
        @click="handleClose"
      />

      <div class="stage-list-detail__position">{{ positionLabel }}</div>

      <h1 class="stage-list-detail__title">{{ stage.name }}</h1>

      <div class="stage-list-detail__stars">
        <QIcon
          :class="[
            'stage-list-detail__stars-icon',
            {
              'stage-list-detail__stars-icon--checked': rankItem <= stage.rank,
            },
          ]"
          v-for="rankItem in TOTAL_STARS"
          :key="rankItem"
          name="svguse:/icons.svg#star"
        />
      </div>

      <div v-if="stageType" class="stage-list-detail__type">
        <QIcon class="stage-list-detail__type-icon" :name="stageType.icon" />

        <h4 class="stage-list-detail__type-name">
          {{ $t(`${I18N_STAGE_TYPE_PATH}.${stageType.name}`) }}
        </h4>
      </div>

      <AvReward
        v-if="stage.reward"
        :points="stage.reward.points"
        :coins="stage.reward.coins"
      />

      <QBtn
        class="stage-list-detail__start-activity"
        :label="$t(`${I18N_PATH}.startActivity`)"
        color="secondary"
      />
      <!-- :to="{
          name: 'courses.stage',
          params: {
            id: stage.trailId,
            stageId: stage.id,
          },
        }" -->
    </div>
  </q-card>
</template>

<script>
import { computed, getCurrentInstance } from "vue";

import AvReward from "molecules/AvReward.vue";

const TOTAL_STARS = 3;
const I18N_PATH = "modules.courses.stagesList.detail";
const I18N_STAGE_TYPE_PATH = "modules.courses.stageType";

export default {
  emits: ["close"],
  name: "StageListDetail",
  components: {
    AvReward,
  },
  props: {
    stage: {
      type: Object,
      default: () => {},
    },
  },
  setup(props, ctx) {
    const { appContext } = getCurrentInstance();

    const stageType = computed(() => {
      if (!props.stage.type) {
        return null;
      }

      return {
        icon:
          appContext.config.globalProperties.$iconsMap[props.stage.type] ||
          props.stage.type,
        name: props.stage.type,
      };
    });

    const positionLabel = computed(() => Number(props.stage.position) + 1);

    const handleClose = () => {
      ctx.emit("close");
    };

    return {
      TOTAL_STARS,
      I18N_PATH,
      I18N_STAGE_TYPE_PATH,
      stageType,
      positionLabel,
      handleClose,
    };
  },
};
</script>

<style lang="scss" scoped>
.stage-list-detail {
  background: $card-background;
  border: $card-border-line;
  border-radius: $default-border-radius;
  backdrop-filter: $default-backdrop;

  width: 500px;
  padding: 70px 30px;

  position: relative;

  &__content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }

  &__close {
    position: absolute;
    top: 10px;
    right: 10px;
    color: $text-color-3;
  }

  &__position {
    border-radius: 50px;
    width: 72px;
    height: 72px;
    border-radius: $default-border-radius;

    border: $card-border-line;
    border-color: $secondary;
    // background: rgba($secondary, 0.5);
    background: $card-background;
    color: $text-color-3;

    padding: 2px;

    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 30px;
  }

  &__title {
    font-size: 14px;
    font-weight: $font-weight-semibold;
    color: $text-color-3;
  }

  &__stars {
    display: flex;
    gap: 4px;

    &-icon {
      font-size: 18px;
      stroke: $white;
      fill: $secondary;

      &--checked {
        stroke: $secondary;
        fill: $secondary;
      }
    }
  }

  &__type {
    display: flex;
    gap: 15px;
    justify-content: center;
    align-items: center;
    color: $text-color-2;

    &-name {
      font-size: 12px;
    }

    &-icon {
      font-size: 20px;
    }
  }

  &__start-activity {
    text-transform: none !important;
    margin-top: 40px;
  }
}
</style>
