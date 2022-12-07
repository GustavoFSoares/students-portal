<template>
  <div class="profile-activities">
    <div class="profile-activities__navigation-list">
      <router-link
        class="navigation-item"
        v-for="(routeItem, routeKey) in activities"
        :key="routeKey"
        :to="{ name: 'home.activities', hash: `#${routeKey}` }"
      >
        <h4 class="navigation-item__text">
          {{ $t(`${I18N_PATH}.statuses.${routeKey}`) }}
        </h4>

        <QBadge class="navigation-item__badge" color="secondary" transparent>
          {{ routeItem.count }}
        </QBadge>
      </router-link>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";

const I18N_PATH = "partials.appCardProfile.section.activities";

export default {
  name: "ProfileActivities",
  setup() {
    const $store = useStore();

    const activities = computed(() => {
      const acvitiesCount =
        $store.getters["ActivitiesModule/getActivitiesCount"];

      return {
        available: {
          count: acvitiesCount.available,
          route: "auth.login",
        },
        inProgress: {
          count: acvitiesCount.inProgress,
          route: "auth.login",
        },
        completed: {
          count: acvitiesCount.completed,
          route: "auth.login",
        },
      };
    });

    return {
      I18N_PATH,
      activities,
    };
  },
};
</script>

<style lang="scss" scoped>
.profile-activities {
  .navigation-item {
    display: flex;
    align-items: center;
    justify-content: space-between;

    text-decoration: none;
    border-radius: $default-border-radius;

    padding: 10px;
    font-size: 14px;

    color: $text-color-3;

    transition: 0.3s color, background-color ease-in;

    &:hover {
      background-color: $default-background;
    }

    &__text {
      font-size: 15px;
      line-height: 1;
      font-weight: $font-weight-normal;
    }

    &__badge {
      border-radius: 50%;
      width: 18px;
      height: 18px;

      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>
