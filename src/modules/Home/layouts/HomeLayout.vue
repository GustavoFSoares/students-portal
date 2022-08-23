<template>
  <div class="home-layout">
    <article class="home-layout__user-navigation">
      <UserCard />
    </article>

    <aside class="home-layout__page-content">
      <router-view />
    </aside>
  </div>
</template>

<script>
import UserCard from "../components/UserCard.vue";

export default {
  name: "HomeLayout",
  components: {
    UserCard,
  },
};
</script>

<style lang="scss" scoped>
.home-layout {
  display: flex;
  max-width: 1127px;
  margin: 0 auto;

  &__user-navigation {
    max-width: 300px;
  }

  &__page-content {
    flex-grow: 1;
    background: red;
  }
}
</style>
