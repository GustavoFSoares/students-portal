<template>
  <AvPage class="achievements-page" no-header>
    <div class="achievements-page__list">
      <AchievementCard
        v-for="(achievementData, achievementKey) in achievements"
        :key="achievementKey"
        :title="achievementData.name"
        :description="achievementData.description"
        :badge="achievementData.path"
        :obtained="achievementData.obtained"
      />
    </div>
  </AvPage>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";

import AvPage from "organisms/AvPage.vue";
import AchievementCard from "../components/AchievementCard.vue";

const I18N_PATH = "modules.home.insightsPage.pages.achievementPage";
export default {
  name: "AchievementsPage",
  components: {
    AvPage,
    AchievementCard,
  },
  setup() {
    const $store = useStore();

    const achievements = computed(
      () => $store.getters["AchievementsModule/achievements"]
    );

    return {
      I18N_PATH,
      achievements,
    };
  },
};
</script>

<style lang="scss" scoped>
.achievements-page {
  &__list {
    display: grid;

    gap: 15px;
    grid-template-columns: 1fr;

    @media (min-width: $breakpoint-tablet) {
      gap: 30px 15px;
      grid-template-columns: repeat(3, 1fr);
    }
  }
}
</style>
