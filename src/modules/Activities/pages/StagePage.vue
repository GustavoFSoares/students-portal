<template>
  <AvPage
    class="stage-page"
    title="Estágios"
    :go-back-route="{
      name: 'activities.stage-list',
      params: { id: activityId },
    }"
  >
    <template #header>
      <div class="stage-header">
        <div class="stage-header__texts">
          <h1 class="stage-header__title">
            {{ stageData.title }}
          </h1>

          <h2 class="stage-header__description">
            {{ stageData.description }}
          </h2>
        </div>

        <AvReward
          class="stage-header__rewards"
          :points="stageData.points"
          :coins="stageData.coins"
        />
      </div>
    </template>

    <template #default>
      <div class="stage-page__wrapper">
        <div class="stage-page__items-list">
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
        </div>
      </div>
    </template>
  </AvPage>

  <q-dialog :model-value="showFileData" @hide="handleHideFileData">
    <QCard class="stage-page__modal">
      <component
        v-if="stageFileTypeComponent"
        :is="stageFileTypeComponent"
        :path="selectedFile.target"
        :parameters="selectedFile.parameters || undefined"
        @close="handleHideFileData"
      />

      <QBtn
        v-if="stageFileTypeComponent !== 'StageFileTypeAudio'"
        :class="[
          'stage-page__modal-close',
          {
            'stage-page__modal-close--moved':
              stageFileTypeComponent === 'StageFileTypePdf',
          },
        ]"
        icon="close"
        round
        color="grey-6"
        size="sm"
        @click="handleHideFileData"
      />
    </QCard>
  </q-dialog>
</template>

<script>
const I18N_PATH = "modules.courses.stagePage";
const I18N_STAGE_TYPE_PATH = "modules.activities.stageType";

import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { computed, getCurrentInstance, onMounted, ref } from "vue";

import AvReward from "molecules/AvReward.vue";

import AvPage from "organisms/AvPage.vue";

import StageFileGameInternal from "../components/StagePage/StageFileGameInternal.vue";
import StageFileGameExternal from "../components/StagePage/StageFileGameExternal.vue";
import StageFileTypeAudio from "../components/StagePage/StageFileTypeAudio.vue";
import StageFileTypeImage from "../components/StagePage/StageFileTypeImage.vue";
import StageFileTypePdf from "../components/StagePage/StageFileTypePdf.vue";
import StageFileTypeVideo from "../components/StagePage/StageFileTypeVideo.vue";

export default {
  name: "StagePage",
  components: {
    AvReward,
    AvPage,
    StageFileGameInternal,
    StageFileGameExternal,
    StageFileTypeAudio,
    StageFileTypeImage,
    StageFileTypePdf,
    StageFileTypeVideo,
  },
  setup() {
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

    const fileIcon = computed(
      () => appContext.config.globalProperties.$iconsMap[stageData.value.type]
    );
    const showFileData = computed(() => !!selectedFile.value);

    const stageFileTypeComponent = computed(() => {
      return stageFilesMap[stageData.value.type] || null;
    });

    const handleOpenStage = ({ path, parameters }) => {
      selectedFile.value = {
        target: path,
        parameters,
      };
    };

    const handleHideFileData = () => {
      selectedFile.value = null;
    };

    onMounted(async () => {
      stageData.value = await $store.dispatch("ActivitiesModule/getStageData", {
        stageId,
      });

      $store.dispatch("AuthModule/refreshUser");
    });

    return {
      I18N_PATH,
      I18N_STAGE_TYPE_PATH,
      activityId,
      stageData,
      selectedFile,
      fileIcon,
      showFileData,
      stageFileTypeComponent,
      handleOpenStage,
      handleHideFileData,
    };
  },
};
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

  &__wrapper {
    width: 100%;
    max-width: 840px;
    margin: auto;

    display: flex;
    gap: 50px;
    flex-direction: column;
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
