<template>
  <QToolbar class="app-toolbar">
    <div class="navigation">
      <router-link
        :class="[
          'navigation-item',
          { 'router-link-active': $route.name.includes(routeItem.route) },
        ]"
        v-for="(routeItem, routeKey) in routes"
        :key="routeKey"
        :to="{ name: `home.${routeItem.route}` }"
        @click="handleClickNavigationItem"
      >
        <h4 class="navigation-item__text">
          {{ $t(`modules.${routeKey}.seo.title`) }}
        </h4>
      </router-link>
    </div>

    <div class="controls">
      <div class="notification">
        <QIcon class="controls__icon" name="fa-solid fa-bell" />
      </div>

      <div class="cloud">
        <QIcon class="controls__icon" name="fa-solid fa-cloud" />
      </div>

      <AppToolbarSettings />
    </div>
  </QToolbar>
</template>

<script>
import AppToolbarSettings from "./AppToolbar/Settings.vue";

export default {
  name: "AppToolbar",
  components: {
    AppToolbarSettings,
  },
  setup(_, ctx) {
    const routes = {
      activities: { route: "activities" },
      ranking: { route: "rankings" },
      achievements: { route: "achievements" },
      certificates: { route: "certificates" },
    };

    const handleClickNavigationItem = () => {
      ctx.emit("navigating");
    };

    return {
      routes,
      handleClickNavigationItem,
    };
  },
};
</script>

<style lang="scss" scoped>
.app-toolbar {
  display: flex;
  justify-content: space-between;
  width: initial;

  padding: initial;

  .navigation {
    display: flex;
    flex-direction: column;

    @media (min-width: $breakpoint-tablet) {
      flex-direction: row;
    }
  }

  .navigation-item {
    padding: 20px 30px;
    text-decoration: none;

    color: $text-color;
    border-bottom: 2px solid transparent;

    transition: 0.3s color, border-bottom ease-in;

    &__text {
      font-size: 15px;
      font-weight: $font-weight-normal;
    }

    &.router-link-active {
      color: $text-color-3;
      border-bottom: 2px solid $text-color-3;
    }

    &:hover {
      color: $text-color-2;
      border-bottom: 2px solid $text-color-2;
    }
  }

  .controls {
    height: 100%;
    padding: 0 40px;

    display: flex;
    gap: 20px;
    align-items: center;

    &__icon {
      color: $text-color-3;
      font-size: 22px;
    }
  }

  .avatar {
    width: 32px;
    height: 32px;

    border: 2px solid $text-color-3;
    border-radius: 50%;
    overflow: hidden;

    img {
      width: 100%;
    }
  }
}
</style>
