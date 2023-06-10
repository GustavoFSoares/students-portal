<template>
  <AvPage
    class="stage-page"
    title="Estágios"
    no-header
    :go-back-route="{
      name: 'activities.stage-list',
      params: { id: trailId },
    }"
  >
    <template #default>
      <div class="stage-page__container" v-if="activityData">
        <div class="stage-page__header">
          <AvTimer
            auto-start
            :start-time="currentStage.time"
            @end-time="handleEndTime"
          />

          <QBtn
            round
            icon="close"
            class="stage-page__close-button"
            @click="handleClose"
          />
        </div>

        <div class="stage-page__wrapper">
          <h1 class="stage-page__title">{{ currentStage.description }}</h1>

          <div v-if="hasStages && currentStage" class="stage-wrapper">
            <div class="stage-wrapper__content">
              <StageContent
                :activity-id="activityData.id"
                :stage-id="currentStage.id"
                :content="currentStage.content"
                :type="currentStage.type"
              />

              <QBtn
                class="stage-wrapper__button"
                :label="isLast ? 'Concluir' : 'Avançar'"
                color="secondary"
                @click="handleNextStep(null)"
              />
            </div>

            <div class="stage-wrapper__steps-counter">
              <button
                v-for="(activityStep, activityStepIndex) of activityData.stages"
                :key="activityStepIndex"
                @click="handleNextStep(activityStepIndex)"
                :class="[
                  'stage-wrapper__step-item',
                  {
                    'stage-wrapper__step-item--completed':
                      activityStep.completed,
                    'stage-wrapper__step-item--selected':
                      activityStepIndex === currentStageIndex,
                  },
                ]"
              />
            </div>
          </div>

          <p v-else>Sem atividades</p>
        </div>
      </div>
    </template>
  </AvPage>

  <QDialog persistent :model-value="!!activityIsFinished">
    <StageEndActivity
      :trail-id="trailId"
      :activity="activityData"
      @restart="handleRestartActivity"
    />
  </QDialog>
</template>

<script setup>
const I18N_PATH = "modules.courses.stagePage";
const I18N_STAGE_TYPE_PATH = "modules.activities.stageType";

import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import { computed, getCurrentInstance, onMounted, ref } from "vue";

import AvReward from "molecules/AvReward.vue";
import AvTimer from "molecules/AvTimer.vue";

import AvPage from "organisms/AvPage.vue";

import StageContent from "../components/StagePage/StageContent.vue";
import StageEndActivity from "../components/StagePage/StageEndActivity.vue";

const { appContext } = getCurrentInstance();
const $route = useRoute();
const $router = useRouter();
const $store = useStore();

const { id: trailId, stageId } = $route.params;
const currentStageIndex = ref(0);
const activityData = ref(null);
const selectedFile = ref(null);
const activityIsFinished = ref(false);

const hasStages = computed(() => activityData.value.stages?.length !== 0);
const isLast = computed(
  () => activityData.value.stages?.length === currentStageIndex.value + 1
);

const currentStage = computed(() => {
  if (!hasStages.value) {
    return null;
  }

  return activityData.value.stages[currentStageIndex.value];
});

const handleEndTime = () => {
  handleClose();
};

const handleClose = () => {
  activityIsFinished.value = true;
};

const handleNextStep = (nextStep = null) => {
  if (nextStep !== null) {
    if (activityData.value.stages[currentStageIndex.value]) {
      currentStageIndex.value = nextStep;
    }

    return;
  }

  activityData.value.stages[currentStageIndex.value].completed = true;

  if (isLast.value) {
    handleClose();
    return;
  }

  currentStageIndex.value += 1;
};

const handleRestartActivity = () => {
  activityIsFinished.value = false;

  activityData.value.stages.forEach((stage) => {
    stage.completed = false;
  });

  currentStageIndex.value = 0;
};

onMounted(async () => {
  activityData.value = await $store.dispatch("ActivitiesModule/getStagesData", {
    stageId,
  });

  $store.dispatch("AuthModule/refreshUser");
});
</script>

<style lang="scss" scoped>
.stage-page {
  .stage-header {
    padding: 0 15px;
    display: flex;
    gap: 15px;
    align-items: center;

    height: 100%;

    &__texts {
      flex-grow: 1;
    }

    &__title {
      font-size: 15px;
      font-weight: $font-weight-semibold;
      color: $text-color-3;
    }

    &__description {
      font-size: 13px;
      font-weight: $font-weight-normal;
      color: $text-color-2;
    }

    &__rewards {
      max-width: 260px;
      width: 100%;
    }
  }

  :deep {
    .av-page-content {
      display: initial;
      padding: 0;

      &__container {
        height: 100%;
        padding-bottom: initial;
        // overflow: hidden;
      }
    }
  }

  &__container {
    max-width: 1366px;
    margin: 0 auto;
    width: 100%;
    height: 100%;
    position: relative;

    display: flex;
    flex-direction: column;
  }

  &__wrapper {
    width: 100%;
    height: 100%;
    background: #fff;
    border-radius: $default-border-radius $default-border-radius 0 0;

    position: relative;
    display: flex;
    flex-direction: column;
    text-align: center;
    gap: 15px;
  }

  &__title {
    padding: 32px 32px 0;
    font-size: 23px;
    color: $text-color-1;
    margin-bottom: 30px;
  }

  &__header {
    display: flex;
    justify-content: center;
    margin-bottom: 10px;
  }

  &__close-button {
    position: absolute;
    top: 0;
    right: calc(-1 * (0% + 42px));
    background: rgba(#cecece, 0.8) !important;
  }

  .stage-wrapper {
    height: 100%;
    margin-bottom: 35px;

    &__content {
      height: 100%;
      display: flex;
      flex-direction: column;
      gap: 15px;
      padding: 0 32px;
    }

    &__button {
      width: fit-content;
      align-self: flex-end;
    }

    &__steps-counter {
      width: 100%;
      position: absolute;
      bottom: 10px;

      display: flex;
      gap: 5px;
      justify-content: center;
    }

    &__step-item {
      width: 80px;
      height: 8px;
      border-radius: $default-border-radius;
      background: #e1e5e9;

      pointer-events: none;

      &--completed {
        pointer-events: initial;
        background: #84949d;
      }

      &--selected {
        background: #38d4b3;
      }
    }
  }
}
</style>
