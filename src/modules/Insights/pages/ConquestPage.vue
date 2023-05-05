<template>
  <article class="insights-conquest-page">
    <AvPageSection :title="$t(`${I18N_PATH}.title`)" @close="handleGoBackPage">
      <div class="insights-conquest-page__list">
        <ConquestCard
          v-for="(conquestData, conquestKey) in conquests"
          :key="conquestKey"
          :title="conquestData.name"
          :description="conquestData.description"
          :badge="conquestData.path"
          :obtained="conquestData.obtained"
        />
      </div>
    </AvPageSection>
  </article>
</template>

<script>
import { computed } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

import AvPageSection from "molecules/AvPageSection.vue";
import ConquestCard from "../components/AchievementCard.vue";

const I18N_PATH = "modules.home.insightsPage.pages.conquestPage";
export default {
  name: "InsightConquestPage",
  components: {
    AvPageSection,
    ConquestCard,
  },
  setup() {
    const $router = useRouter();
    const $store = useStore();

    const conquests = computed(
      () => $store.getters["ConquestsModule/conquests"]
    );

    const handleGoBackPage = () => {
      $router.push({ name: "home.insights" });
    };

    return {
      I18N_PATH,
      conquests,
      handleGoBackPage,
    };
  },
};
</script>

<style lang="scss" scoped>
.insights-conquest-page {
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
