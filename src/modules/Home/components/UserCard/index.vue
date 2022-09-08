<template>
  <AvCard class="user-card" header-color="primary">
    <template #header>
      <UserCardHeader />
    </template>

    <template #default>
      <div class="navigation">
        <router-link
          class="navigation-item"
          v-for="(routeItem, routeKey) in routes"
          :key="routeKey"
          :to="{ name: routeItem.route }"
        >
          <QIcon class="navigation-item__icon" :name="routeItem.icon" />

          <h4 class="navigation-item__text">
            {{ $t(`modules.${routeKey}.seo.title`) }}
          </h4>
        </router-link>
      </div>
    </template>
  </AvCard>
</template>

<script>
import AvCard from "atoms/AvCard.vue";

import UserCardHeader from "./UserCardHeader.vue";

export default {
  name: "UserCard",
  components: {
    AvCard,
    UserCardHeader,
  },
  setup() {
    const routes = {
      insights: {
        route: "home.insights",
        icon: "o_widgets",
      },
      courses: {
        route: "home.courses",
        icon: "o_layers",
      },
      feed: {
        route: "home.feed",
        icon: "o_fax",
      },
      library: {
        route: "home.library",
        icon: "collections_bookmark",
      },
      events: {
        route: "home.events",
        icon: "o_confirmation_number",
      },
      missions: {
        route: "home.missions",
        icon: "o_flag",
      },
    };

    return {
      routes,
    };
  },
};
</script>

<style lang="scss" scoped>
.user-card {
  @media (min-width: map-get($breakpoints, "tablet")) {
    min-width: 360px;
  }

  .navigation {
    display: flex;
    flex-direction: column;
    gap: 5px;

    &-item {
      display: flex;
      align-items: center;
      gap: 10px;
      text-decoration: none;

      color: $secondary;
      padding: 10px;

      border-radius: 8px;

      transition: background-color 0.2s ease-in-out;

      &__icon {
        font-size: 25px;
      }

      &__text {
        font-size: 15px;
        font-weight: bold;
      }

      &:hover {
        background: rgba($primary, 0.1);
      }

      &.router-link-active {
        background-color: rgba($primary, 0.9);
        color: $white;
      }
    }
  }
}
</style>
