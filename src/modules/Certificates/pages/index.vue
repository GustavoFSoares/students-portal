<template>
  <AvPage class="certificates-page" :title="$t(`${I18N_PATH}.title`)"> </AvPage>
</template>

<script>
const I18N_PATH = "modules.certificates";

import AvPage from "organisms/AvPage.vue";

export default {
  name: "ActivityPage",
  components: {
    AvPage,
  },
  setup() {
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
