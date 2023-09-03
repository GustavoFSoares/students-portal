<template>
  <article class="insights-certificates-page">
    <AvPageSection :title="$t(`${I18N_PATH}.title`)" @close="handleGoBackPage">
      <template #default>
        <CertificatesPageHeader
          class="insights-certificates-page__header"
          v-model:current-tab="currentTab"
          v-model:order-selected="orderSelected"
          hide-orders
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
              :description="certificate.description"
              :completed-date="certificate.conclusionDate"
              :image="certificate.path"
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

<script setup>
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { computed, onMounted, ref } from "vue";

import AvPageSection from "molecules/AvPageSection.vue";

import CertificatesPageCard from "../components/CertificatesPageCard.vue";
import CertificatesPageHeader from "../partials/CertificatesPageHeader.vue";

const I18N_PATH = "modules.insights.pages.certificatesPage";

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
