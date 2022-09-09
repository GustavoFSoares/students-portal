<template>
  <div class="home-layout app-container">
    <article
      v-on="userCardListners"
      id="user-navigation"
      :class="[
        'home-layout__user-navigation',
        { 'home-layout__user-navigation--active': showMenu },
      ]"
    >
      <div class="home-layout__user-navigation-container">
        <UserCard />
      </div>
    </article>

    <aside class="home-layout__page-content">
      <router-view />
    </aside>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import { useQuasar } from "quasar";

import UserCard from "../components/UserCard/index.vue";

export default {
  name: "HomeLayout",
  components: {
    UserCard,
  },
  setup() {
    const $q = useQuasar();

    const showMenu = ref(true);

    const isMobile = computed(() => {
      return $q.screen.sm || $q.screen.xs;
    });

    const userCardListners = computed(() => {
      const events = {};

      if (isMobile.value) {
        events.click = (ev) => handleCloseMenu(ev);
      }

      return events;
    });

    const handleCloseMenu = ({ currentTarget, target }) => {
      if (currentTarget === target) {
        showMenu.value = false;
      }
    };

    return {
      showMenu,
      isMobile,
      userCardListners,
      handleCloseMenu,
    };
  },
};
</script>

<style lang="scss" scoped>
.home-layout {
  position: relative;

  max-width: 1290px;
  margin: 0 auto;

  @media (min-width: map-get($breakpoints, "tablet")) {
    display: flex;
    gap: 25px;
    padding: 20px 0;
  }

  &__user-navigation {
    @media (max-width: map-get($breakpoints, "mobile")) {
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
