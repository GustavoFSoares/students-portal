<template>
  <div class="activity-page-header">
    <div class="activity-page-header__navigation">
      <router-link
        v-for="activityStateKey in activitiesStates"
        :key="activityStateKey"
        :to="`#${activityStateKey}`"
        :class="[
          'activity-page-header__navigation-item',
          {
            'activity-page-header__navigation-item--exact':
              currentState === activityStateKey,
          },
        ]"
      >
        {{ $t(`${I18N_PATH}.navigationStatuses.${activityStateKey}`) }}
      </router-link>
    </div>
  </div>
</template>

<script>
const I18N_PATH = "modules.activities";

import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";

export default {
  name: "ActivityPageHeader",
  setup(_, ctx) {
    const $route = useRoute();
    const $router = useRouter();

    const activitiesStates = ["available", "inProgress", "completed"];

    if (
      !$route.hash ||
      !activitiesStates.find(
        (activityStateKey) => `#${activityStateKey}` === $route.hash
      )
    ) {
      $router.push(`#${activitiesStates[0]}`);
    }

    const currentState = computed(() => {
      const state = $route.hash.replace("#", "");

      ctx.emit("filter", state);
      return state;
    });

    return {
      I18N_PATH,
      currentState,
      activitiesStates,
    };
  },
};
</script>

<style lang="scss" scoped>
.activity-page-header {
  display: flex;
  height: 100%;
  justify-content: center;

  &__navigation {
    display: flex;
    align-items: center;

    &-item {
      text-decoration: none;
      padding: 15px 24px;
      border-bottom: 2px solid transparent;
      color: $text-color-2;
      transition: 0.3s color, border-color ease-in;

      &--exact {
        color: $text-color-3;
        border-color: $text-color-3;
      }

      &:hover {
        color: $text-color-2;
        border-color: $text-color-2;
      }
    }
  }
}
</style>
