<template>
  <article class="insights-certificates-page">
    <AvPageSection :title="$t(`${I18N_PATH}.title`)" @close="handleGoBackPage">
      <template #default>
        <CertificatesPageHeader
          class="insights-certificates-page__header"
          v-model:current-tab="currentTab"
          v-model:order-selected="orderSelected"
        />

        <div class="insights-certificates-page__content"></div>
      </template>
    </AvPageSection>
  </article>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";

import AvPageSection from "molecules/AvPageSection.vue";
import CertificatesPageHeader from "../../partials/InsightsPage/CertificatesPageHeader.vue";

const I18N_PATH = "modules.home.insightsPage.pages.certificatesPage";

export default {
  name: "InsigtCertificatePage",
  components: {
    AvPageSection,
    CertificatesPageHeader,
  },
  setup() {
    const $route = useRouter();

    const currentTab = ref(undefined);
    const orderSelected = ref(undefined);

    const handleGoBackPage = () => {
      $route.push({ name: "home.insights" });
    };

    return {
      I18N_PATH,
      currentTab,
      orderSelected,
      handleGoBackPage,
    };
  },
};
</script>

<style lang="scss" scoped>
.insights-certificates-page {
}
</style>
