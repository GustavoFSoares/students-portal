<template>
  <div class="certificate-card">
    <InsightsCard
      :title="$t(`${I18N_PATH}.title`)"
      see-more-url="home.insights.certificates"
      :see-more-text="$t(`${I18N_PATH}.moreItems`)"
    >
      <template #default>
        <ul class="certificate-card__certificate-list">
          <li
            class="certificate-item"
            v-for="(certificate, certificateKey) in certificateList"
            :key="`certificate-${certificateKey}`"
          >
            <img
              class="certificate-item__image"
              :src="certificate.shieldImage"
              :alt="certificate.name"
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

const I18N_PATH = "modules.home.insightsPage.certificateCard";

export default {
  components: {
    InsightsCard,
  },
  setup() {
    const certificateList = ref([
      { shieldImage: null, name: "certificado-1" },
      { shieldImage: null, name: "certificado-2" },
      { shieldImage: null, name: "certificado-3" },
    ]);

    return {
      I18N_PATH,
      certificateList,
    };
  },
};
</script>

<style lang="scss" scoped>
.certificate-card {
  &__certificate-list {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 8px;

    list-style: none;
  }

  .certificate-item {
    background: rgba(255, 0, 0, 0.473);
    border-radius: 8px;

    width: 75px;
    height: 75px;

    overflow: hidden;
  }
}
</style>
