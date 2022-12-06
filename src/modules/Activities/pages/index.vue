<template>
  <AvPage class="activity-page" :title="$t(`${I18N_PATH}.title`)">
    <template #header>
      <ActivityPageHeader @filter="handleFilter" />
    </template>

    <template #default> -{{ currentActivies }}- </template>
  </AvPage>
</template>

<script>
const I18N_PATH = "modules.activities";

import { useStore } from "vuex";
import { computed, onMounted, ref } from "vue";

import AvPage from "organisms/AvPage.vue";

import ActivityPageHeader from "../partials/ActivityPageHeader.vue";

export default {
  name: "ActivityPage",
  components: {
    AvPage,
    ActivityPageHeader,
  },
  setup() {
    const $store = useStore();

    const currentState = ref();
    const activiesGroups = ref({
      available: [],
      inProgress: [],
      completed: [],
    });

    const currentActivies = computed(() => {
      if (!currentState.value) {
        return [];
      }

      return activiesGroups.value[currentState.value] || [];
    });

    const handleFilter = (state) => {
      currentState.value = state;
    };

    onMounted(async () => {
      console.log("load");
      const activiesData = await $store.dispatch(
        "ActivitiesModule/getActivities"
      );
      activiesGroups.value = activiesData;
    });

    return {
      I18N_PATH,
      currentState,
      currentActivies,
      handleFilter,
    };
  },
};
</script>

<style lang="scss" scoped>
.activity-page {
}
</style>
