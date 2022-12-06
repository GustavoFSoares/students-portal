<template>
  <AvPage class="activity-page" :title="$t(`${I18N_PATH}.title`)">
    <template #header>
      <ActivityPageHeader @filter="handleFilter" />
    </template>

    <template #default>
      <ul class="activity-list">
        <ActivityCard
          class="activity-item"
          v-for="(activity, activityKey) in currentActivies"
          :key="`activity-${activityKey}`"
          :title="activity.name"
          :cover="activity.cover"
          @startNow="handleStartActivity(activity.id)"
        />
      </ul>
    </template>
  </AvPage>
</template>

<script>
const I18N_PATH = "modules.activities";

import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { computed, onMounted, ref } from "vue";

import AvPage from "organisms/AvPage.vue";

import ActivityCard from "../components/ActivityCard.vue";
import ActivityPageHeader from "../partials/ActivityPageHeader.vue";

export default {
  name: "ActivityPage",
  components: {
    AvPage,
    ActivityCard,
    ActivityPageHeader,
  },
  setup() {
    const $store = useStore();
    const $router = useRouter();

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

    const handleStartActivity = (activityId) => {
      $router.push({
        name: "activities.stages-list",
        params: {
          id: activityId,
        },
      });
    };

    onMounted(async () => {
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
      handleStartActivity,
    };
  },
};
</script>

<style lang="scss" scoped>
.activity-page {
  .activity-list {
    display: grid;
    gap: 15px;

    grid-template-columns: 1fr;

    @media (min-width: $breakpoint-tablet) {
      grid-template-columns: repeat(3, 1fr);
    }
  }
}
</style>
