<template>
  <AvPage
    class="stage-page"
    title="Estágios"
    no-header
    :go-back-route="{
      name: 'activities.stage-list',
      params: { id: activityId },
    }"
  >
    <template #default>
      <div class="stage-page__container" v-if="activityData">
        <div class="stage-page__header">
          <AvTimer :start-time="currentStage.time" @end-time="handleEndTime" />

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
                :content="currentStage.content"
                :type="currentStage.type"
              />

              <QBtn
                class="stage-wrapper__button"
                :label="isLast ? 'Concluir' : 'Avançar'"
                color="secondary"
                @click="handleSextStage"
              />
            </div>

            <div class="stage-wrapper__steps">STEPS</div>
          </div>

          <p v-else>Sem atividades</p>
        </div>
      </div>
    </template>
  </AvPage>
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

const { appContext } = getCurrentInstance();
const $route = useRoute();
const $router = useRouter();
const $store = useStore();

const { id: activityId, stageId } = $route.params;
const currentStageIndex = ref(0);
const activityData = ref(null);
const selectedFile = ref(null);

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
  alert("close");

  $router.push({
    name: "activities.stage-list",
    params: { id: activityId },
  });
};

const handleSextStage = () => {
  if (isLast.value) {
    handleClose();
    return;
  }

  currentStageIndex.value += 1;
};

onMounted(async () => {
  activityData.value = await $store.dispatch("ActivitiesModule/getStagesData", {
    stageId,
  });

  console.log("stagesData", activityData.value);

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

  &__title {
    font-size: 23px;
    color: $text-color-1;
    margin-bottom: 30px;
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
    &__steps {
      position: absolute;
      bottom: 10px;
      background: red;

      width: 100%;
      height: 20px;
    }
  }
}
</style>
