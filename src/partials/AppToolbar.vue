<template>
  <QToolbar class="app-toolbar">
    <div class="navigation">
      <router-link
        class="navigation-item"
        v-for="(routeItem, routeKey) in routes"
        :key="routeKey"
        :to="{ name: routeItem.route }"
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

      <div class="avatar">
        <img
          src="https://images.unsplash.com/photo-1600353068440-6361ef3a86e8?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
        />
      </div>
    </div>
  </QToolbar>
</template>

<script>
export default {
  name: "AppToolbar",
  setup() {
    const routes = {
      activities: { /*route: "home.activies"*/ route: "auth.login" },
      ranking: { /*route: "home.ranking"*/ route: "auth.login" },
      achievements: { /*route: "home.achievements"*/ route: "auth.login" },
      certificates: { /*route: "home.certificates"*/ route: "auth.login" },
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
