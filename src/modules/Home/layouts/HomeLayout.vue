<template>
  <MainLayout>
    <div class="home-layout">
      <div class="header-decoration" />

      <AppToolbar class="header-toolbar" />

      <AppCardProfile class="aside-profile" />

      <aside class="page-content">
        <router-view />
      </aside>

      <!--
      <div class="home-container">
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
      </div> -->
    </div>
  </MainLayout>
</template>

<script>
import MainLayout from "layouts/MainLayout.vue";

import AppToolbar from "partials/AppToolbar.vue";
import AppCardProfile from "partials/AppCardProfile/index.vue";
// import UserCard from "../components/UserCard/index.vue";

export default {
  name: "HomeLayout",
  components: {
    MainLayout,
    AppToolbar,
    AppCardProfile,
    // UserCard,
  },
  setup() {
    // const $q = useQuasar();
    // const $store = useStore();
    // const showMenu = ref(false);
    // const isMobile = computed(() => {
    //   return $q.screen.sm || $q.screen.xs;
    // });
    // const userData = computed(() => $store.getters["AuthModule/userData"]);
    // const userCardListners = computed(() => {
    //   const events = {};
    //   if (isMobile.value) {
    //     events.click = (ev) => handleCloseMenu(ev);
    //   }
    //   return events;
    // });
    // const openMenu = () => {
    //   showMenu.value = true;
    // };
    // const hideMenu = () => {
    //   showMenu.value = false;
    // };
    // const handleCloseMenu = ({ currentTarget, target }) => {
    //   if (currentTarget === target) {
    //     hideMenu();
    //   }
    // };
    // return {
    //   showMenu,
    //   isMobile,
    //   userData,
    //   userCardListners,
    //   openMenu,
    //   hideMenu,
    //   handleCloseMenu,
    // };
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

  .header-decoration {
    grid-area: headerdecoration;
  }
  .header-toolbar {
    grid-area: headertoolbar;
  }
  .aside-profile {
    grid-area: asideprofile;
  }
  .page-content {
    grid-area: pagecontent;
  }

  display: grid;

  grid-template-areas:
    "headerdecoration headertoolbar"
    "asideprofile pagecontent";

  .header-toolbar,
  .header-decoration {
    border-bottom: $border-line;
  }

  // .home-container {
  //   position: relative;

  //   // max-width: 1430px;
  //   // margin: 0 auto;

  //   @media (min-width: $breakpoint-laptop) {
  //     display: flex;
  //     gap: 15px;
  //     padding: 20px 0;
  //   }
  // }

  // &__user-navigation {
  //   @media (max-width: $breakpoint-tablet) {
  //     z-index: 1;
  //     position: fixed;
  //     top: 0;
  //     left: 0;

  //     width: 100%;
  //     height: 100vh;
  //     contain: none;

  //     transition: all 0.4s cubic-bezier(0.785, 0.135, 0.15, 0.86) 0s;
  //     transform: translateX(-100%);

  //     // opacity: 0;
  //     // visibility: collapse;

  //     &--active {
  //       transform: translateX(0);
  //       opacity: 1;
  //       visibility: visible;
  //     }

  //     &-container {
  //       width: fit-content;
  //       height: 100%;
  //     }
  //   }
  // }

  // &__page-content {
  //   flex-grow: 1;
  // }
}
</style>
