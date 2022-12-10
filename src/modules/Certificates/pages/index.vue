<template>
  <AvPage class="certificates-page" :title="$t(`${I18N_PATH}.title`)"> </AvPage>
</template>

<script>
const I18N_PATH = "modules.certificates";

import { useStore } from "vuex";
import { onMounted } from "vue";

import AvPage from "organisms/AvPage.vue";

export default {
  name: "ActivityPage",
  components: {
    AvPage,
  },
  setup() {
    const $store = useStore();

    onMounted(async () => {
      const data = await $store.dispatch("CertificatesModule/loadCertificates");
      console.log(data);
    });

    return {
      I18N_PATH,
    };
  },
};
</script>

<style lang="scss" scoped>
.certificates-page {
}
</style>
