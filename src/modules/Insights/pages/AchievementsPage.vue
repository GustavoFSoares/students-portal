<template>
  <article class="insights-achievements-page">
    <AvPageSection :title="$t(`${I18N_PATH}.title`)" @close="handleGoBackPage">
      <template #default>
        <CertificatesPageHeader
          class="insights-achievements-page__header"
          v-model:current-tab="currentTab"
          v-model:order-selected="orderSelected"
        />

        <div class="insights-achievements-page__content">
          <div
            v-if="hasCertificates"
            class="insights-achievements-page__certificates-list"
          >
            <CertificatesPageCard
              v-for="(certificate, certificateIndex) in certificates"
              :key="`certificate-${certificateIndex}`"
              :title="certificate.name"
              :description="certificate.description"
              :image="certificate.path"
              :completed-date="certificate.completedDate"
            />
          </div>

          <div v-else class="insights-achievements-page__no-certificates">
            <h5 class="insights-achievements-page__no-certificates-text">
              {{ $t(`${I18N_PATH}.noCertificates`) }}
            </h5>
          </div>
        </div>
      </template>
    </AvPageSection>
  </article>
</template>

<script>
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { computed, onMounted, ref } from "vue";

import AvPageSection from "molecules/AvPageSection.vue";

import CertificatesPageCard from "../components/CertificatesPageCard.vue";
import CertificatesPageHeader from "../partials/CertificatesPageHeader.vue";

const I18N_PATH = "modules.home.insightsPage.pages.certificatesPage";

export default {
  name: "InsigtCertificatePage",
  components: {
    AvPageSection,
    CertificatesPageCard,
    CertificatesPageHeader,
  },
  setup() {
    const $store = useStore();
    const $route = useRouter();

    const currentTab = ref(undefined);
    const orderSelected = ref(undefined);

    const certificates = computed(
      () => $store.getters["CertificatesModule/getCertificates"]
    );
    const hasCertificates = computed(() => certificates.value.length > 0);

    const handleGoBackPage = () => {
      $route.push({ name: "home.insights" });
    };

    onMounted(async () => {
      await $store.dispatch("CertificatesModule/loadCertificates");
    });

    return {
      I18N_PATH,
      currentTab,
      certificates,
      orderSelected,
      hasCertificates,
      handleGoBackPage,
    };
  },
};
</script>

<style lang="scss" scoped>
.insights-achievements-page {
  &__content {
    margin-bottom: 60px;
  }

  &__no-certificates {
    display: flex;
    justify-content: center;

    &-text {
      font-size: 24px;
      font-weight: $font-weight-semibold;
      text-align: center;
    }
  }

  &__certificates-list {
    display: grid;

    gap: 15px;
    grid-template-columns: 1fr;

    @media (min-width: $breakpoint-tablet) {
      gap: 30px 15px;
      grid-template-columns: repeat(3, 1fr);
    }
  }
}
</style>
