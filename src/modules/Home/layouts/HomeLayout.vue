<template>
  <div class="home-layout">
    <QToolbar class="home-layout__topbar" v-if="isMobile">
      <QBtn flat round dense icon="menu" @click="openMenu" />
      <QToolbarTitle shrink>{{ userData.name }}</QToolbarTitle>
    </QToolbar>

    <div class="app-container">
      <article
        v-on="userCardListners"
        id="user-navigation"
        :class="[
          'home-layout__user-navigation',
          { 'home-layout__user-navigation--active': showMenu },
        ]"
      >
        <div class="home-layout__user-navigation-container">
          <UserCard @navigating="hideMenu" @closeMenu="hideMenu" />
        </div>
      </article>

      <aside class="home-layout__page-content">
        <router-view />
      </aside>
    </div>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import { useQuasar } from "quasar";
import { useStore } from "vuex";

import UserCard from "../components/UserCard/index.vue";

export default {
  name: "HomeLayout",
  components: {
    UserCard,
  },
  setup() {
    const $q = useQuasar();
    const $store = useStore();

    const showMenu = ref(false);

    const isMobile = computed(() => {
      return $q.screen.sm || $q.screen.xs;
    });

    const userData = computed(() => $store.getters["AuthModule/userData"]);
    const userCardListners = computed(() => {
      const events = {};

      if (isMobile.value) {
        events.click = (ev) => handleCloseMenu(ev);
      }

      return events;
    });

    const openMenu = () => {
      showMenu.value = true;
    };

    const hideMenu = () => {
      showMenu.value = false;
    };

    const handleCloseMenu = ({ currentTarget, target }) => {
      if (currentTarget === target) {
        hideMenu();
      }
    };

    return {
      showMenu,
      isMobile,
      userData,
      userCardListners,
      openMenu,
      hideMenu,
      handleCloseMenu,
    };
  },
};
</script>

<style lang="scss" scoped>
.home-layout {
  &__topbar {
    background: #fff;
    display: flex;
    justify-content: space-between;
  }

  .app-container {
    position: relative;

    max-width: 1430px;
    margin: 0 auto;

    @media (min-width: $breakpoint-laptop) {
      display: flex;
      gap: 15px;
      padding: 20px 0;
    }
  }

  &__user-navigation {
    @media (max-width: $breakpoint-tablet) {
      z-index: 1;
      position: fixed;
      top: 0;
      left: 0;

      width: 100%;
      height: 100vh;
      contain: none;

      transition: all 0.4s cubic-bezier(0.785, 0.135, 0.15, 0.86) 0s;
      transform: translateX(-100%);

      // opacity: 0;
      // visibility: collapse;

      &--active {
        transform: translateX(0);
        opacity: 1;
        visibility: visible;
      }

      &-container {
        width: fit-content;
        height: 100%;
      }
    }
  }

  &__page-content {
    flex-grow: 1;
  }
}
</style>
