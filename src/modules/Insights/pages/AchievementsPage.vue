<template>
  <article class="insights-achievements">
    <AvPageSection :title="$t(`${I18N_PATH}.title`)" @close="handleGoBackPage">
      <div class="insights-achievements__list">
        <AchievementCard
          v-for="(conquestData, conquestKey) in conquests"
          :key="conquestKey"
          :title="conquestData.name"
          :goal="conquestData.goal"
          :badge="conquestData.path"
          :obtained="conquestData.obtained"
        />
      </div>
    </AvPageSection>
  </article>
</template>

<script setup>
import { computed } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

import AvPageSection from "molecules/AvPageSection.vue";
import AchievementCard from "../components/AchievementCard.vue";

const I18N_PATH = "modules.insights.pages.achievements";

const $router = useRouter();
const $store = useStore();

const conquests = computed(
  () => $store.getters["AchievementsModule/achievements"]
);

const handleGoBackPage = () => {
  $router.push({ name: "home.insights" });
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
