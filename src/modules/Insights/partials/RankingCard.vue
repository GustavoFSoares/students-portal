<template>
  <div class="ranking-card">
    <InsightsCard
      :title="$t(`${I18N_PATH}.title`)"
      see-more-url="home.insights.ranking"
      :see-more-text="$t(`${I18N_PATH}.moreItems`)"
    >
      <template #default>
        <ul class="ranking-card__ranking-list">
          <li
            class="ranking-item"
            v-for="(userPosition, rankingKey) in rankingList"
            :key="`ranking-${rankingKey}}`"
          >
            <div class="ranking-item__position">
              {{ userPosition.position }}º
            </div>

            <div class="ranking-item__user">
              <div class="ranking-item__user-avatar"></div>

              <div class="ranking-item__user-name">
                {{ userPosition.user.name }}
              </div>
            </div>

            <div class="ranking-item__score">
              {{ userPosition.score }}
            </div>
          </li>
        </ul>
      </template>
    </InsightsCard>
  </div>
</template>

<script>
import { ref } from "vue";

import InsightsCard from "../components/InsightsCard.vue";

const I18N_PATH = "modules.home.insightsPage.rankingCard";

export default {
  components: {
    InsightsCard,
  },
  setup() {
    const rankingList = ref([
      { score: 1400, user: { name: "Selatiel" }, position: 1 },
      { score: 0, user: { name: "Cleiton" }, position: 2 },
      { score: 0, user: { name: "Bruno" }, position: 3 },
    ]);

    return {
      I18N_PATH,
      rankingList,
    };
  },
};
</script>

<style lang="scss" scoped>
.ranking-card {
  &__ranking-list {
    display: grid;
    gap: 12px;

    list-style: none;
  }

  .ranking-item {
    display: flex;
    align-items: center;
    gap: 10px;

    &__position,
    &__user,
    &__score {
      font-weight: $font-weight-bold;
    }

    &__user {
      flex-grow: 1;
      display: flex;
      align-items: center;
      gap: 5px;

      &-avatar {
        background: rgba(255, 0, 0, 0.473);
        width: 25px;
        height: 25px;
        border-radius: 5px;
      }
    }
  }
}
</style>
