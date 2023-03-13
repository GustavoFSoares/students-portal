<template>
  <AvPage class="certificates-page" :title="$t(`${I18N_PATH}.title`)">
    <div class="certificates-list__wrapper">
      <ul class="certificates-list">
        <CertificateCard
          v-for="certificate in certificates"
          :key="certificate.id"
          :id="certificate.id"
          :name="certificate.name"
          :description="certificate.description"
          :conclusion-date="certificate.conclusionDate"
        />
      </ul>
    </div>
  </AvPage>
</template>

<script>
const I18N_PATH = "modules.certificates";

import { useStore } from "vuex";
import { onMounted, ref } from "vue";

import AvPage from "organisms/AvPage.vue";
import CertificateCard from "../components/CertificateCard.vue";

export default {
  name: "ActivityPage",
  components: {
    AvPage,
    CertificateCard,
  },
  setup() {
    const $store = useStore();
    const certificates = ref([]);

    onMounted(async () => {
      certificates.value = await $store.dispatch(
        "CertificatesModule/loadCertificates"
      );
    });

    return {
      I18N_PATH,
      certificates,
    };
  },
};
</script>

<style lang="scss" scoped>
.certificates-page {
  .certificates-list {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 30px;
  }
}
</style>
