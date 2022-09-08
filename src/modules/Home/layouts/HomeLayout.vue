<template>
  <div class="home-layout app-container">
    <article class="home-layout__user-navigation">
      <UserCard />
    </article>

    <aside class="home-layout__page-content">
      <router-view />
    </aside>
  </div>
</template>

<script>
import UserCard from "../components/UserCard/index.vue";

export default {
  name: "HomeLayout",
  components: {
    UserCard,
  },
};
</script>

<style lang="scss" scoped>
.home-layout {
  max-width: 1290px;
  margin: 0 auto;

  @media (min-width: map-get($breakpoints, "tablet")) {
    display: flex;
    gap: 25px;
    padding: 20px 0;
  }

  &__page-content {
    flex-grow: 1;
  }
}
</style>
