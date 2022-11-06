<template>
  <article class="stage-page">
    <StagePageHeader
      class="stage-page__header"
      :trail-id="trailId"
      :title="stageData.name"
      :coins="stageData.coins"
      :points="stageData.points"
    />

    <div class="stage-page__wrapper">
      <div class="stage-page__items-list">
        <button
          class="stage-item"
          v-for="(stageFile, stageFileIndex) in stageData.files"
          :key="stageFile.id"
          @click="handleOpenStage(stageFile.path)"
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

    <q-dialog :model-value="showFileData" @hide="handleHideFileData">
      <QCard>
        <component
          v-if="stageFileTypeComponent"
          :is="stageFileTypeComponent"
          :path="selectedFile"
        />
      </QCard>
    </q-dialog>
  </article>
</template>

<script>
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { computed, getCurrentInstance, onMounted, ref } from "vue";

import StagePageHeader from "../partials/Stage/Header.vue";

import StageFileTypeAudio from "../components/StagePage/StageFileTypeAudio.vue";
import StageFileTypeImage from "../components/StagePage/StageFileTypeImage.vue";
import StageFileTypePdf from "../components/StagePage/StageFileTypePdf.vue";
import StageFileTypeVideo from "../components/StagePage/StageFileTypeVideo.vue";

const I18N_PATH = "modules.courses.stagePage";
const I18N_STAGE_TYPE_PATH = "modules.courses.stageType";

export default {
  name: "StagePage",
  components: {
    StagePageHeader,
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
      áudio: "StageFileTypeAudio",
      imagens: "StageFileTypeImage",
      pdf: "StageFileTypePdf",
      video: "StageFileTypeVideo",
    };

    const iconsMap = {
      pdf: "document",
      áudio: "music",
      video: "video",
      imagens: "image",
    };

    const { id: trailId, stageId } = $route.params;

    const stageData = ref({});
    const selectedFile = ref(null);

    const fileIcon = computed(
      () =>
        appContext.config.globalProperties.$iconsMap[
          iconsMap[stageData.value.type]
        ]
    );
    const showFileData = computed(() => !!selectedFile.value);
    const stageFileTypeComponent = computed(() => {
      return stageFilesMap[stageData.value.type] || null;
    });

    const handleOpenStage = (path) => {
      selectedFile.value = path;
    };

    const handleHideFileData = () => {
      selectedFile.value = null;
    };

    onMounted(async () => {
      stageData.value = await $store.dispatch("CourseModule/getStageData", {
        stageId,
      });
    });

    return {
      trailId,
      stageId,
      stageData,
      selectedFile,
      fileIcon,
      showFileData,
      stageFileTypeComponent,
      handleOpenStage,
      handleHideFileData,
      I18N_PATH,
      I18N_STAGE_TYPE_PATH,
    };
  },
};
</script>

<style lang="scss" scoped>
.stage-page {
  display: flex;
  gap: 20px;
  flex-direction: column;

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
    background: $white;
    border-radius: $defaultBorderRadius;
    overflow: hidden;
    transition: opacity 0.4s ease;

    display: flex;
    gap: 10px;

    height: 100px;

    &:hover {
      opacity: 0.8;
    }

    &__image {
      padding: 10px;
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
    }

    .file-type {
      display: flex;
      align-items: center;
      gap: 5px;

      font-size: 13px;

      &__label {
        font-weight: $font-weight-semibold;
      }
    }

    &__icon {
      font-size: 20px;
    }
  }
}
</style>
