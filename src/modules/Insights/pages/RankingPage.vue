<template>
  <article class="insights-ranking-page">
    <AvPageSection :title="$t(`${I18N_PATH}.title`)" @close="handleGoBackPage">
      <template #default>
        <div class="insights-ranking-page__ranking-list">
          <RankingCard
            v-for="(user, userIndex) in orderedUsers"
            :key="userIndex"
            :user-rank="user.position"
            :user-name="user.userName"
            :user-points="user.score"
            :is-you="user.isYou"
            user-image="https://png.pngtree.com/png-clipart/20190924/original/pngtree-businessman-user-avatar-free-vector-png-image_4827807.jpg"
          />
        </div>
      </template>
    </AvPageSection>
  </article>
</template>

<script>
import { useQuasar } from "quasar";
import { computed, onMounted } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

import AvPageSection from "molecules/AvPageSection.vue";

import RankingCard from "../components/RankingCard.vue";

const I18N_PATH = "modules.home.insightsPage.pages.rankingPage";

export default {
  name: "InsigtRankingPage",
  components: {
    AvPageSection,
    RankingCard,
  },
  setup(_, ctx) {
    const $q = useQuasar();
    const $route = useRouter();
    const $store = useStore();

    const users = computed(() => $store.getters["RankingModule/getRankings"]);

    onMounted(async () => {
      await $store.dispatch("RankingModule/loadRankings");
    });

    const isMobile = computed(() => {
      return $q.screen.xs;
    });

    const orderedUsers = computed(() => {
      if (isMobile.value) {
        return users.value;
      }

      return [users.value[1], users.value[0], users.value[2]].filter(
        (user) => user
      );
    });

    const handleGoBackPage = () => {
      $route.push({ name: "home.insights" });
    };

    return {
      I18N_PATH,
      orderedUsers,
      handleGoBackPage,
    };
  },
};
</script>

<style lang="scss" scoped>
.insights-ranking-page {
  &__ranking-list {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-end;
    gap: 10px;

    margin-bottom: 60px;

    @media (min-width: $breakpoint-tablet) {
      flex-direction: row;
    }
  }
}
</style>
