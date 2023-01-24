<template>
  <AvPage
    class="stage-list-page"
    :title="'Atividades'"
    :go-back-route="{ name: 'home.activities' }"
  >
    <template #header>
      <div class="stage-list-header">
        <div class="stage-list-header__cover">
          <img
            v-if="stageData.cover"
            class="stage-list-header__cover-image"
            :src="stageData.cover.url"
            :alt="stageData.cover.description"
          />
        </div>

        <div class="stage-list-header__texts">
          <h1 class="stage-list-header__title">
            {{ stageData.title }}
          </h1>

          <h2 class="stage-list-header__description">
            {{ stageData.description }}
          </h2>
        </div>

        <h3 class="stage-list-header__activities">
          {{ stageList.length }} {{ $t(`${I18N_PATH}.activities`) }}
        </h3>
      </div>
    </template>

    <template #default>
      <StageList :stages="stageList" @openStage="handleOpenStage" />
    </template>
  </AvPage>

  <q-dialog :model-value="openStageDetail" @hide="handleCloseDetail">
    <StageListDetail :stage="selectedStageData" @close="handleCloseDetail" />
  </q-dialog>
</template>

<script>
const I18N_PATH = "modules.activities.pages.stageList";

import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { computed, getCurrentInstance, onMounted, ref } from "vue";

import AvPage from "organisms/AvPage.vue";

import StageList from "../partials/StageList.vue";
import StageListDetail from "../partials/StageList/Detail.vue";

export default {
  name: "StageListPage",
  components: {
    AvPage,
    StageList,
    StageListDetail,
  },
  setup() {
    const $route = useRoute();
    const $store = useStore();
    const { appContext } = getCurrentInstance();

    const stageData = ref({});
    const stageList = ref([]);
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
      const matchStage = stageList.value.find(
        (stage) => stage.position === selectedStage.value
      );

      return matchStage || {};
    });

    const handleCloseDetail = () => {
      selectedStage.value = null;
    };

    onMounted(async () => {
      const { name, description, cover, stages } = await $store.dispatch(
        "ActivitiesModule/getActivityById",
        $route.params.id
      );

      stageData.value = {
        title: name,
        description,
        cover: {
          url: cover?.path
            ? `${appContext.config.globalProperties.$appStorage}/${cover.path}`
            : appContext.config.globalProperties.$defaultActivityCover,
          description: name,
        },
      };
      stageList.value = stages;
    });

    return {
      I18N_PATH,
      stageData,
      stageList,

      selectedStageData,
      handleOpenStage,
      openStageDetail,
      handleCloseDetail,
    };
  },
};
</script>

<style lang="scss" scoped>
.stage-list-page {
  .stage-list-header {
    padding: 0 15px;
    display: flex;
    gap: 15px;
    align-items: center;

    height: 100%;

    &__cover {
      width: 35px;
      height: 35px;
      border-radius: 50%;
      overflow: hidden;
      background: #ff00008f;

      &-image {
        width: 100%;
        height: 100%;
      }
    }

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

    &__activities {
      font-size: 12px;
      color: $text-color-3;
      font-weight: $font-weight-bold;
    }
  }
}
</style>
