<template>
  <article class="insights-ranking-page">
    <AvPageSection title="header">
      <template #default>
        <div class="insights-ranking-page__ranking-list">
          <RankingCard
            v-for="(user, userIndex) in users"
            :key="userIndex"
            :user-rank="user.rank"
            :user-name="user.name"
            :user-points="user.points"
          />
        </div>
      </template>
    </AvPageSection>
  </article>
</template>

<script>
import { useQuasar } from "quasar";
import { ref, computed } from "vue";

import AvPageSection from "molecules/AvPageSection.vue";
import RankingCard from "../../components/InsightsPage/RankingCard.vue";

export default {
  name: "InsigtRankingPage",
  components: {
    AvPageSection,
    RankingCard,
  },
  setup() {
    const $q = useQuasar();

    const users = ref([
      { name: "Selatiel", rank: 1, points: 1400 },
      { name: "Bruno", rank: 2, points: 100 },
      { name: "Pedro", rank: 3, points: 0 },
    ]);

    const isMobile = computed(() => {
      return $q.screen.sm || $q.screen.xs;
    });

    const orderedUsers = computed(() => {
      if (isMobile.value) {
        return users.value;
      }

      return [users.value[1], users.value[0], users.value[2]];
    });

    return {
      users: orderedUsers,
    };
  },
};
</script>

<style lang="scss" scoped>
.insights-ranking-page {
  &__ranking-list {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    gap: 10px;

    margin-bottom: 60px;
  }
}
</style>
