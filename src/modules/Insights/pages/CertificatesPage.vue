<template>
  <article class="insights-certificates-page">
    <AvPageSection :title="$t(`${I18N_PATH}.title`)" @close="handleGoBackPage">
      <template #default>
        <CertificatesPageHeader
          class="insights-certificates-page__header"
          v-model:current-tab="currentTab"
          v-model:order-selected="orderSelected"
        />

        <div class="insights-certificates-page__content">
          <div
            v-if="hasCertificates"
            class="insights-certificates-page__certificates-list"
          >
            <CertificatesPageCard
              v-for="(certificate, certificateIndex) in certificates"
              :key="`certificate-${certificateIndex}`"
              :title="certificate.title"
              :image="certificate.image"
              :completed-date="certificate.completedDate"
            />
          </div>

          <div v-else class="insights-certificates-page__no-certificates">
            <h5 class="insights-certificates-page__no-certificates-text">
              {{ $t(`${I18N_PATH}.noCertificates`) }}
            </h5>
          </div>
        </div>
      </template>
    </AvPageSection>
  </article>
</template>

<script>
import { computed, ref } from "vue";
import { useRouter } from "vue-router";

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
    const $route = useRouter();

    const currentTab = ref(undefined);
    const orderSelected = ref(undefined);
    const certificatesData = ref([
      {
        title: "Certificado 1",
        image:
          "https://www.gov.br/conarq/pt-br/assuntos/eventos-1/curso-protecao-de-dados-pessoais-no-setor-publico/copy_of_safe_image.jfif/@@images/943ef27a-2b9e-4e5f-9d06-7ed830a06169.jpeg",
        completedDate: new Date(),
      },
      {
        title: "Certificado 2",
        image:
          "https://dfg.ai/itemimages/968430380-curso-completo-de-bitcoin-HOT7.jpg",
      },
    ]);

    const hasCertificates = computed(() => certificates.value.length > 0);

    const certificates = computed(() => {
      if (currentTab.value == "completed") {
        return [];
      }

      return certificatesData.value;
    });

    const handleGoBackPage = () => {
      $route.push({ name: "home.insights" });
    };

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
.insights-certificates-page {
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
