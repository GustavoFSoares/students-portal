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
      <div class="stage-page__container">
        <div class="stage-page__header">
          <AvTimer :start-time="60" @end-time="handleEndTime" />

          <QBtn
            round
            icon="close"
            class="stage-page__close-button"
            @click="handleClose"
          />
        </div>

        <div class="stage-page__wrapper">
          {{ stageData }}
          <h1 class="stage-page__title">{{ stageData.name }}</h1>

          <StageActivityStepper
            v-if="false && stageData.files && stageData.files.length"
            :activity-steps="stageData.files"
            :activity-type="stageData.type"
          />

          <p v-else>Sem atividades</p>
          <!-- <div class="stage-page__items-list">
            <button
              class="stage-item"
              v-for="(stageFile, stageFileIndex) in stageData.files"
              :key="stageFile.id"
              @click="handleOpenStage(stageFile)"
            >
              <img
                class="stage-item__image"
                :src="$appPublic + stageData.cover"
                :alt="`stage-file-${stageFile.id}`"
              />

              <div class="stage-item__content">
                <h4 class="stage-item__title">
                  {{ stageData.name }} - {{ stageFileIndex + 1 }}
                </h4>

                <h5 class="file-type">
                  <QIcon class="stage-item__icon" :name="fileIcon" />

                  <strong class="file-type__label">
                    {{ $t(`${I18N_PATH}.documentType`) }}:
                  </strong>

                  <span class="file-type__text">
                    {{ $t(`${I18N_STAGE_TYPE_PATH}.${stageData.type}`) }}
                  </span>
                </h5>
              </div>
            </button>
          </div> -->
        </div>
      </div>
    </template>
  </AvPage>
</template>

<script setup>
const I18N_PATH = "modules.courses.stagePage";
const I18N_STAGE_TYPE_PATH = "modules.activities.stageType";

import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { computed, getCurrentInstance, onMounted, ref } from "vue";

import AvReward from "molecules/AvReward.vue";
import AvTimer from "molecules/AvTimer.vue";

import AvPage from "organisms/AvPage.vue";

// import StageFileGameInternal from "../components/StagePage/StageFileGameInternal.vue";
// import StageFileGameExternal from "../components/StagePage/StageFileGameExternal.vue";
// import StageFileTypeAudio from "../components/StagePage/StageFileTypeAudio.vue";
// import StageFileTypeImage from "../components/StagePage/StageFileTypeImage.vue";
// import StageFileTypePdf from "../components/StagePage/StageFileTypePdf.vue";
// import StageFileTypeVideo from "../components/StagePage/StageFileTypeVideo.vue";
import StageActivityStepper from "../components/StagePage/StageActivityStepper.vue";

const { appContext } = getCurrentInstance();
const $route = useRoute();
const $store = useStore();

const stageFilesMap = {
  music: "StageFileTypeAudio",
  image: "StageFileTypeImage",
  document: "StageFileTypePdf",
  video: "StageFileTypeVideo",
  "game-external": "StageFileGameExternal",
  "game-internal": "StageFileGameInternal",
};

const { id: activityId, stageId } = $route.params;
const stageData = ref({});
const selectedFile = ref(null);

// const showFileData = computed(() => !!selectedFile.value);

//const stageFileTypeComponent = computed(() => {
//  return stageFilesMap[stageData.value.type] || null;
//});
const handleEndTime = () => {
  handleClose();
};

const handleClose = () => {
  alert("close");
};

const currentStage = onMounted(async () => {
  const stagesData = await $store.dispatch("ActivitiesModule/getStagesData", {
    stageId,
  });

  console.log("stagesData", stagesData);

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
        overflow: hidden;
      }
    }
  }

  &__container {
    max-width: 1366px;
    margin: 0 auto;
    height: 100%;
    position: relative;
  }

  &__wrapper {
    height: 100%;
    background: #fff;
    border-radius: $default-border-radius $default-border-radius 0 0;
    padding: 32px;
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
    font-size: 42px;
    color: $text-color-3;
    margin-bottom: 5px;
    text-transform: capitalize;
  }

  &__items-list {
    display: grid;
    gap: 10px;
    grid-template-columns: repeat(2, 1fr);
  }

  .stage-item {
    background: $card-background;
    border-radius: $default-border-radius;
    overflow: hidden;
    transition: opacity 0.4s ease;

    display: flex;
    gap: 10px;

    height: 100px;

    &:hover {
      opacity: 0.8;
    }

    &__image {
      z-index: 2;
      height: 100%;
    }

    &__content {
      flex-grow: 1;
      padding: 22px 10px 22px 0;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    &__title {
      font-size: 14px;
      font-weight: $font-weight-semibold;
      color: $text-color-3;
    }

    .file-type {
      display: flex;
      align-items: center;
      gap: 5px;

      font-size: 13px;
      color: $text-color-3;

      &__label {
        font-weight: $font-weight-semibold;
      }
    }

    &__icon {
      font-size: 20px;
    }
  }

  &__modal {
    position: relative;
    width: initial;
    height: 80vh;

    box-shadow: none;

    background: transparent;
    max-width: initial !important;

    :deep(section) {
      width: 100%;
      height: 100%;

      background: $background;

      display: flex;
      justify-content: center;
      align-items: center;

      border-radius: $default-border-radius;
      overflow: hidden;
    }

    &-close {
      position: absolute;
      top: 5px;
      right: 5px;

      &--moved {
        top: 40px;
        right: 20px;
      }
    }
  }
}
</style>
