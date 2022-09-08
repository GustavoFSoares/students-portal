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
  display: flex;
  max-width: 1290px;
  margin: 0 auto;
  padding: 20px 0;
  gap: 25px;

  &__user-navigation {
    // max-width: 300px;
  }

  &__page-content {
    flex-grow: 1;
  }
}
</style>
