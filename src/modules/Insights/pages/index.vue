<template>
  <article class="insights-page">
    <div v-if="isMainPage" class="insights-page__wrapper">
      <RankingCard v-if="false" />

      <ConquestCard />

      <CertificateCard />
    </div>

    <router-view v-else />
  </article>
</template>

<script>
import { computed } from "vue";
import { useRoute } from "vue-router";

import RankingCard from "../partials/RankingCard.vue";
import ConquestCard from "../partials/ConquestCard.vue";
import CertificateCard from "../partials/CertificateCard.vue";

export default {
  name: "insights-page",
  components: {
    RankingCard,
    ConquestCard,
    CertificateCard,
  },
  setup() {
    const $route = useRoute();

    const isMainPage = computed(() => $route.meta.mainPage);

    return {
      isMainPage,
    };
  },
};
</script>

<style lang="scss" scoped>
.insights-page {
  &__wrapper {
    display: grid;
    gap: 20px;

    grid-template-columns: 1fr;

    @media (min-width: $breakpoint-tablet) {
      grid-template-columns: repeat(3, 1fr);
    }
  }
}
</style>
