<template>
  <div class="achievement-card">
    <InsightsCard
      :title="$t(`${I18N_PATH}.title`)"
      see-more-url="home.insights.conquest"
      :see-more-text="$t(`${I18N_PATH}.moreItems`)"
    >
      <template #default>
        <ul v-if="conquestList" class="achievement-card__achievement-list">
          <li
            class="achievement-item"
            v-for="(conquest, conquestKey) in conquestList"
            :key="`achievement-${conquestKey}`"
          >
            <img
              v-if="conquest.path"
              class="achievement-item__image"
              :title="conquest.name"
              :src="`${$appStorage}/${conquest.path}`"
              :alt="conquest.name"
            />

            <img
              v-else
              class="achievement-item__image"
              :title="conquest.name"
              src="~assets/img/conquests/default-trophy.jpg"
              :alt="conquest.name"
            />
          </li>
        </ul>

        <div v-else class="achievement-card__no-achievement">
          <h5 class="achievement-card__no-achievement-text">
            {{ $t(`${I18N_PATH}.noConquest`) }}
          </h5>
        </div>
      </template>
    </InsightsCard>
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";

import InsightsCard from "../components/InsightsCard.vue";

const I18N_PATH = "modules.home.insightsPage.achievementCard";

export default {
  components: {
    InsightsCard,
  },
  setup() {
    const $store = useStore();

    const conquestList = computed(
      () => $store.getters["AchievementsModule/achievementsPreview"]
    );

    return {
      I18N_PATH,
      conquestList,
    };
  },
};
</script>

<style lang="scss" scoped>
.achievement-card {
  &__achievement-list {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 8px;

    list-style: none;
  }

  .achievement-item {
    border-radius: 8px;

    width: 70px;
    height: 70px;

    overflow: hidden;

    &__image {
      width: 100%;
      height: 100%;
    }
  }

  &__no-achievement {
    width: 100%;
    text-align: center;

    color: $text-color-1;

    &-text {
      font-size: 12px;
      font-weight: 700;
    }
  }
}
</style>
