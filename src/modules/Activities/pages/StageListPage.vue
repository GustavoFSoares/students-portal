<template>
  <AvPage
    class="stage-list-page"
    :title="stageData.title"
    :go-back-route="{ name: 'home.activities' }"
    header-background="white"
    column-header
  >
    <template #header>
      <div class="stage-list-header">
        <AvProgressBar
          class="stage-list-header__progress-bar"
          :progress="stageData.progress"
          inline
        />

        <AvReward
          v-if="stageData.reward"
          class="stage-list-header__reward"
          :coins="stageData.reward.coins"
          :points="stageData.reward.points"
        />
      </div>
    </template>

    <template #default>
      <div class="app-container__content">
        <AvCard class="stage-description">
          <div class="stage-description__card">
            <div
              v-if="stageData.cover"
              class="stage-description__image-wrapper"
            >
              <img
                class="stage-description__image"
                :src="stageData.cover.url"
                :alt="stageData.cover.description"
              />
            </div>

            <h2 class="stage-description__text" :title="stageData.description">
              {{ stageData.description }}
            </h2>

            <h6 class="stage-description__tasks-count">
              {{ activitiesList.length }} atividades
            </h6>
          </div>
        </AvCard>

        <StageList :stages="activitiesList" @openStage="handleOpenStage" />
      </div>
    </template>
  </AvPage>

  <QDialog
    :model-value="openStageDetail"
    position="right"
    full-height
    @hide="handleCloseDetail"
  >
    <StageListDetail :stage="selectedStageData" @close="handleCloseDetail" />
  </QDialog>
</template>

<script setup>
const I18N_PATH = "modules.activities.pages.activitiesList";

import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { computed, getCurrentInstance, onMounted, ref } from "vue";

import AvPage from "organisms/AvPage.vue";

import AvCard from "atoms/AvCard.vue";
import AvProgressBar from "atoms/AvProgressBar.vue";
import AvReward from "molecules/AvReward.vue";

import StageList from "../partials/StageList.vue";
import StageListDetail from "../partials/StageList/Detail.vue";

const $route = useRoute();
const $store = useStore();
const { appContext } = getCurrentInstance();

const stageData = ref({});
const activitiesList = ref([]);
const selectedStage = ref(null);

const handleOpenStage = (position) => {
  const stageSelectedStage = selectedStage.value;
  selectedStage.value = null;

  if (stageSelectedStage) {
    setTimeout(() => {
      selectedStage.value = position;
    }, 350);
  } else {
    selectedStage.value = position;
  }
};

const openStageDetail = computed(() => !!selectedStage.value);
const selectedStageData = computed(() => {
  const matchStage = activitiesList.value.find(
    (stage) => stage.position === selectedStage.value
  );

  return matchStage || {};
});

const handleCloseDetail = () => {
  selectedStage.value = null;
};

onMounted(async () => {
  const { name, description, cover, activities, progress, reward } =
    await $store.dispatch("ActivitiesModule/getActivityById", $route.params.id);

  stageData.value = {
    title: name,
    description,
    progress,
    reward,
    cover: {
      url: cover?.path
        ? `${appContext.config.globalProperties.$appStorage}/${cover.path}`
        : appContext.config.globalProperties.$defaultActivityCover,
      description: name,
    },
  };

  activitiesList.value = activities;

  $store.dispatch("ActivitiesModule/startActivity", $route.params.id);
});
</script>

<style lang="scss" scoped>
.stage-list-page {
  :deep(.av-page-header) {
    box-shadow: 0px 2px 4px rgba(51, 66, 78, 0.32);
    border-top: 1px solid $grey-transparent;
  }

  .stage-list-header {
    padding: 4px 15px;
    display: flex;
    gap: 16px;
    align-items: center;

    height: 100%;
    background: white;

    &__reward {
      max-width: 320px;
    }
  }

  .stage-description {
    margin-bottom: 66px;

    &__card {
      display: flex;
      gap: 16px;
      align-items: center;
      position: relative;
    }

    &__image-wrapper {
      width: 64px;
      height: 64px;

      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: $default-border-radius;
      overflow: hidden;

      img {
        width: 100%;
      }
    }

    &__text {
      color: $text-color-4;
      font-size: 16px;
      line-height: 20px;
      font-weight: $font-weight-semibold;
      width: 100%;

      text-overflow: ellipsis;
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }

    &__tasks-count {
      color: $text-color-4;
      font-size: 10px;
      line-height: 15px;
      font-weight: $font-weight-semibold;
      white-space: nowrap;
      align-self: flex-start;
    }
  }
}
</style>
