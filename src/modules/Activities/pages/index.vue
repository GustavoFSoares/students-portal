<template>
  <AvPage class="activity-page" :title="$t(`${I18N_PATH}.title`)">
    <template #header>
      <ActivityPageHeader @filter="handleFilter" />
    </template>

    <template #default> -{{ currentState }}- </template>
  </AvPage>
</template>

<script>
const I18N_PATH = "modules.activities";

import { ref } from "vue";

import AvPage from "organisms/AvPage.vue";

import ActivityPageHeader from "../partials/ActivityPageHeader.vue";

export default {
  name: "ActivityPage",
  components: {
    AvPage,
    ActivityPageHeader,
  },
  setup() {
    const currentState = ref();

    const handleFilter = (state) => {
      currentState.value = state;
    };

    return {
      I18N_PATH,
      currentState,
      handleFilter,
    };
  },
};
</script>

<style lang="scss" scoped>
.activity-page {
}
</style>
