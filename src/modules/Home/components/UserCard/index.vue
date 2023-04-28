<template>
  <AvCard class="user-card" header-color="primary" :no-border-radius="isMobile">
    <template #header>
      <UserCardHeader />

      <QBtn
        v-if="isMobile"
        class="user-card__close-button"
        flat
        round
        icon="close"
        color="white"
        @click="handleCloseMenu"
      />
    </template>

    <template #default>
      <div class="navigation">
        <router-link
          class="navigation-item"
          v-for="(routeItem, routeKey) in routes"
          :key="routeKey"
          :to="{ name: routeItem.route }"
          @click="handleClickNavigationItem"
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
import { computed } from "vue";
import { useQuasar } from "quasar";

import AvCard from "atoms/AvCard.vue";

import UserCardHeader from "./UserCardHeader.vue";

export default {
  name: "UserCard",
  emits: ["navigating", "closeMenu"],
  components: {
    AvCard,
    UserCardHeader,
  },
  setup(_, ctx) {
    const $q = useQuasar();

    const routes = {
      insights: {
        route: "home.activities",
        icon: "o_widgets",
      },
      courses: {
        route: "home.rankings",
        icon: "o_layers",
      },
      // feed: {
      //   route: "home.feed",
      //   icon: "o_fax",
      // },
      // library: {
      //   route: "home.library",
      //   icon: "collections_bookmark",
      // },
      // events: {
      //   route: "home.events",
      //   icon: "o_confirmation_number",
      // },
      // missions: {
      //   route: "home.missions",
      //   icon: "o_flag",
      // },
    };

    const isMobile = computed(() => {
      return $q.screen.sm || $q.screen.xs;
    });

    const handleCloseMenu = () => {
      ctx.emit("closeMenu");
    };

    const handleClickNavigationItem = () => {
      ctx.emit("navigating");
    };

    return {
      routes,
      isMobile,
      handleCloseMenu,
      handleClickNavigationItem,
    };
  },
};
</script>

<style lang="scss" scoped>
.user-card {
  height: 100%;
  min-width: 302px;

  &__close-button {
    position: absolute;
    top: 10px;
    right: 10px;
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

      color: $text-color-1;
      padding: 10px;

      border-radius: 8px;

      transition: background-color 0.2s ease-in-out;

      &__icon {
        font-size: 25px;
      }

      &__text {
        font-size: 15px;
        font-weight: $font-weight-bold;
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
