<template>
  <div class="achievement-card">
    <InsightsCard
      :title="$t(`${I18N_PATH}.title`)"
      see-more-url="home.insights.conquest"
      :see-more-text="$t(`${I18N_PATH}.moreItems`)"
    >
      <template #default>
        <ul v-if="conquestList" class="achievement-card__conquest-list">
          <li
            class="conquest-item"
            v-for="(conquest, conquestKey) in conquestList"
            :key="`conquest-${conquestKey}`"
          >
            <img
              v-if="conquest.path"
              class="conquest-item__image"
              :title="conquest.name"
              :src="`${$appStorage}/${conquest.path}`"
              :alt="conquest.name"
            />

            <img
              v-else
              class="conquest-item__image"
              :title="conquest.name"
              src="~assets/img/conquests/default-trophy.jpg"
              :alt="conquest.name"
            />
          </li>
        </ul>

        <div v-else class="achievement-card__no-conquest">
          <h5 class="achievement-card__no-conquest-text">
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

const I18N_PATH = "modules.home.insightsPage.conquestCard";

export default {
  components: {
    InsightsCard,
  },
  setup() {
    const $store = useStore();

    const conquestList = computed(
      () => $store.getters["ConquestsModule/conquestsPreview"]
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
  &__conquest-list {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 8px;

    list-style: none;
  }

  .conquest-item {
    border-radius: 8px;

    box-shadow: 2px 2px 3px #00000014;

    width: 75px;
    height: 75px;

    overflow: hidden;

    &__image {
      width: 100%;
      height: 100%;
    }
  }

  &__no-conquest {
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
