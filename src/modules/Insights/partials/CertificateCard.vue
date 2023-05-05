<template>
  <div class="certificate-card">
    <InsightsCard
      :title="$t(`${I18N_PATH}.title`)"
      see-more-url="home.insights.certificates"
      :see-more-text="$t(`${I18N_PATH}.moreItems`)"
    >
      <template #default>
        <ul v-if="certificateData" class="certificate-card__certificate-list">
          <li
            class="certificate-item"
            v-for="(certificate, certificateKey) in certificateData"
            :key="`certificate-${certificateKey}`"
          >
            <img
              v-if="certificate.path"
              class="certificate-item__image"
              :src="`${$appStorage}/${certificate.path}`"
              :alt="certificate.name"
              :title="certificate.name"
            />

            <img
              v-else
              class="certificate-item__image"
              src="~assets/img/certificates/default-certificate.png"
              :alt="certificate.name"
              :title="certificate.name"
            />
          </li>
        </ul>

        <div v-else class="certificate-card__no-certificate">
          <QIcon
            class="certificate-card__no-certificate-icon"
            name="fa-solid fa-award"
          />

          <h5 class="certificate-card__no-certificate-text">
            {{ $t(`${I18N_PATH}.noCertificate`) }}
          </h5>
        </div>
      </template>
    </InsightsCard>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { computed, onMounted } from "vue";

import InsightsCard from "../components/InsightsCard.vue";

const I18N_PATH = "modules.home.insightsPage.certificateCard";

export default {
  components: {
    InsightsCard,
  },
  setup() {
    const $store = useStore();

    const certificateData = computed(
      () => $store.getters["CertificatesModule/certificatesPreview"]
    );

    onMounted(async () => {
      await $store.dispatch("CertificatesModule/loadCertificates");
    });

    return {
      I18N_PATH,
      certificateData,
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
    border-radius: 8px;

    width: 75px;
    height: 75px;

    overflow: hidden;

    &__image {
      // width: 100%;
      height: 100%;
    }
  }

  &__no-certificate {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    color: $text-color-1;

    gap: 25px;

    &-icon {
      font-size: 60px;
    }

    &-text {
      font-size: 12px;
      font-weight: 700;
    }
  }
}
</style>
