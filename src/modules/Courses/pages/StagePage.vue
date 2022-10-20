<template>
  <article class="stage-page">
    {{ stageData.type }} - {{ stageData.cover }}
    <div class="stage-page__items-list">
      <div
        class="stage-page__item"
        v-for="stageFile in stageData.files"
        :key="stageFile.id"
      >
        <QBtn flat @click="handleOpenStage(stageFile.path)">
          <img
            :src="$appPublic + stageData.cover"
            :alt="`stage-file-${stageFile.id}`"
          />
        </QBtn>
      </div>
    </div>
  </article>
</template>

<script>
import { onMounted, ref } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";

export default {
  name: "StagePage",
  setup() {
    const $route = useRoute();
    const $store = useStore();

    const stageData = ref({});

    const { stageId } = $route.params;

    const handleOpenStage = (path) => {
      console.log(path);
    };

    onMounted(async () => {
      stageData.value = await $store.dispatch("CourseModule/getStageData", {
        stageId,
      });
    });

    return {
      stageData,
      handleOpenStage,
    };
  },
};
</script>

<style lang="scss" scoped>
.stage-page {
  max-width: 840px;
  margin: auto;

  display: flex;
  gap: 50px;
  flex-direction: column;

  &__items-list {
    display: grid;
    gap: 10px;
    grid-template-columns: repeat(5, 1fr);
  }

  &__item {
    background: $white;
    border-radius: $defaultBorderRadius;
    padding: 15px;
    // width: 100%;
  }
}
</style>
