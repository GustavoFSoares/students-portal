<template>
  <div class="conquest-card">
    <InsightsCard
      :title="$t(`${I18N_PATH}.title`)"
      see-more-url="home.insights.conquest"
      :see-more-text="$t(`${I18N_PATH}.moreItems`)"
    >
      <template #default>
        <ul class="conquest-card__conquest-list">
          <li
            class="conquest-item"
            v-for="(conquest, conquestKey) in conquestList"
            :key="`conquest-${conquestKey}`"
          >
            <img
              class="conquest-item__image"
              :src="conquest.shieldImage"
              :alt="conquest.name"
            />
          </li>
        </ul>
      </template>
    </InsightsCard>
  </div>
</template>

<script>
import { ref } from "vue";

import InsightsCard from "../components/InsightsCard.vue";

const I18N_PATH = "modules.home.insightsPage.conquestCard";

export default {
  components: {
    InsightsCard,
  },
  setup() {
    const conquestList = ref([
      { shieldImage: null, name: "conquista-1" },
      { shieldImage: null, name: "conquista-2" },
      { shieldImage: null, name: "conquista-3" },
    ]);

    return {
      I18N_PATH,
      conquestList,
    };
  },
};
</script>

<style lang="scss" scoped>
.conquest-card {
  &__conquest-list {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 8px;

    list-style: none;
  }

  .conquest-item {
    background: rgba(255, 0, 0, 0.473);
    border-radius: 8px;

    width: 75px;
    height: 75px;

    overflow: hidden;
  }
}
</style>
