<template>
  <article class="insights-achievements">
    <AvPageSection :title="$t(`${I18N_PATH}.title`)" @close="handleGoBackPage">
      <div class="insights-achievements__list">
        <AchievementCard
          v-for="(achievementData, achievementKey) in achievements"
          :key="achievementKey"
          :title="achievementData.name"
          :goal="achievementData.goal"
          :badge="achievementData.path"
          :obtained="achievementData.obtained"
          @click="handleSelectAchiement(achievementData)"
        />
      </div>
    </AvPageSection>
  </article>

  <QDialog
    :model-value="showSelectedAchievement"
    position="right"
    full-height
    maximized
    @hide="handleHideDetail"
  >
    <AchievementDetail
      v-if="selectedAchievement"
      :title="selectedAchievement.name"
      :goal="selectedAchievement.goal"
      :badge="selectedAchievement.path"
      :obtained="selectedAchievement.obtained"
      @close="handleHideDetail"
    />
  </QDialog>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

import AvPageSection from "molecules/AvPageSection.vue";
import AchievementCard from "../components/AchievementCard.vue";
import AchievementDetail from "../partials/AchievementDetail.vue";

const I18N_PATH = "modules.insights.pages.achievements";

const $router = useRouter();
const $store = useStore();

const selectedAchievement = ref();

const showSelectedAchievement = computed(() => !!selectedAchievement.value);

const achievements = computed(
  () => $store.getters["AchievementsModule/achievements"]
);

const handleGoBackPage = () => {
  $router.push({ name: "home.insights" });
};

const handleSelectAchiement = (achievement) => {
  selectedAchievement.value = achievement;
};

const handleHideDetail = () => {
  selectedAchievement.value = null;
};
</script>

<style lang="scss" scoped>
.insights-achievements {
  &__list {
    display: grid;

    grid-template-columns: 1fr;
    gap: 16px;

    @media (min-width: $breakpoint-tablet) {
      grid-template-columns: repeat(3, 1fr);
    }
  }
}
</style>
