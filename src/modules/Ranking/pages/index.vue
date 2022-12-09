<template>
  <AvPage class="ranking-page" no-header>
    <div class="ranking-page__ranking-list">
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
  </AvPage>
</template>

<script>
import { useQuasar } from "quasar";
import { computed, onMounted } from "vue";
import { useStore } from "vuex";

import AvPage from "organisms/AvPage.vue";

import RankingCard from "../components/RankingCard.vue";

export default {
  name: "RankingPage",
  components: {
    AvPage,
    RankingCard,
  },
  setup() {
    const $q = useQuasar();
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

    return {
      orderedUsers,
    };
  },
};
</script>

<style lang="scss" scoped>
.ranking-page {
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
