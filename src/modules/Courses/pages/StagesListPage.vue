<template>
  <q-layout view="lHh Lpr lFf" class="stages-list-page">
    <StageListHeader
      class="stages-list-page__header"
      :title="trail.title"
      :progress="80"
      :points="rewardsData.points"
      :coins="rewardsData.coins"
    />

    <div class="stages-list-page__wrapper">
      <div class="course-header">
        <div class="course-header__cover">
          <img
            v-if="trail.cover"
            class="course-header__cover-image"
            :src="trail.cover.url"
            :alt="trail.cover.description"
          />
        </div>

        <h2 class="course-header__title">
          {{ trail.description }}
        </h2>

        <h3 class="course-header__activities">
          {{ stagesList.length }} {{ $t(`${I18N_PATH}.activities`) }}
        </h3>
      </div>

      <StagesList @openStage="handleOpenStage" :stages="stagesList" />

      <QDrawer
        side="right"
        :width="310"
        :model-value="openStageDetail"
        bordered
        @hide="handleCloseDetail"
      >
        <StageListDetail
          :stage="selectedStageData"
          @close="handleCloseDetail"
        />
      </QDrawer>
    </div>
  </q-layout>
</template>

<script>
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { computed, onMounted, ref, getCurrentInstance } from "vue";

import StagesList from "../partials/StagesList.vue";
import StageListHeader from "../partials/StagesList/Header.vue";
import StageListDetail from "../partials/StagesList/Detail.vue";

const I18N_PATH = "modules.courses.stagesList";
export default {
  name: "StagesListPage",
  components: {
    StagesList,
    StageListHeader,
    StageListDetail,
  },
  setup(_) {
    const $route = useRoute();
    const $store = useStore();
    const { appContext } = getCurrentInstance();

    const { id } = $route.params;

    const trail = ref({});
    const selectedStage = ref(null);

    const stagesList = ref([
      // { position: "1", title: "Texto 1", rank: 1, completed: true },
      // { position: "2", title: "Texto 2", rank: 3, completed: true },
      // { position: "3", title: "Texto 3", rank: 2, completed: true },
      // { position: "4", title: "Texto 4", rank: 3, completed: true },
      // { position: "5", title: "Texto 5", rank: 2, completed: true },
      // { position: "6", title: "Texto 6", rank: 2, completed: true },
      // { position: "7", title: "Texto 7", rank: 2, completed: true },
      // { position: "8", title: "Texto 8", rank: 2, completed: true },
      // { position: "9", title: "Texto 9", rank: 2, completed: true },
      // { position: "10", title: "Texto 10", rank: 2, completed: true },
      // { position: "11", title: "Texto 11", rank: 2, completed: true },
      // { position: "12", title: "Texto 12", rank: 2, completed: true },
      // { position: "13", title: "Texto 13", rank: 2, completed: true },
      // { position: "14", title: "Texto 14", rank: 2, completed: true },
      // { position: "15", title: "Texto 15", rank: 2, completed: true },
      // { position: "16", title: "Texto 16", rank: 2, completed: true },
      // { position: "17", title: "Texto 17", rank: 2, completed: true },
    ]);

    const rewardsData = computed(
      () => $store.getters["AuthModule/rewardsData"]
    );

    const openStageDetail = computed(() => !!selectedStage.value);
    const selectedStageData = computed(() => {
      const matchStage = stagesList.value.find(
        (stage) => stage.position === selectedStage.value
      );

      return matchStage || {};
    });

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

    const handleCloseDetail = () => {
      selectedStage.value = null;
    };

    onMounted(async () => {
      const { nome, descricao, capa, stage } = await $store.dispatch(
        "CourseModule/getTrailById",
        id
      );

      trail.value = {
        title: nome,
        description: descricao,
        cover: {
          url: `${appContext.config.globalProperties.$appStorage}/${capa?.path}`,
          description: nome,
        },
      };

      console.log(stage);

      stagesList.value = stage.map((stage) => ({
        ...stage,
        position: stage.ordem + "",
        rank: 2,
        completed: true,
      }));
    });

    return {
      I18N_PATH,
      trail,
      selectedStage,
      stagesList,
      rewardsData,
      openStageDetail,
      selectedStageData,
      handleOpenStage,
      handleCloseDetail,
    };
  },
};
</script>

<style lang="scss" scoped>
.stages-list-page {
  &__wrapper {
    max-width: 840px;
    margin: auto;
  }

  .course-header {
    position: relative;
    background: $white;
    border-radius: 10px;

    display: flex;
    gap: 15px;
    align-items: center;

    padding: 15px;
    margin: 20px 0 32px;
    width: 100%;

    &__cover {
      width: 55px;
      height: 55px;
      border-radius: 50%;
      overflow: hidden;
      background: #ff00008f;

      &-image {
        width: 100%;
        height: 100%;
      }
    }

    &__title {
      font-size: 12px;
      font-weight: $font-weight-semibold;
      color: $secondary;
    }

    &__activities {
      position: absolute;
      top: 15px;
      right: 15px;
      font-size: 10px;
      color: $secondary;
      font-weight: $font-weight-bold;
    }
  }
}
</style>
