<template>
  <section class="default-layout">
    <aside class="default-layout__user-profile">
      <UserCard />
    </aside>

    <aside class="default-layout__content">
      <router-view />
    </aside>
  </section>
</template>

<script setup>
import UserCard from "modules/Home/components/UserCard/index.vue";
</script>

<style lang="scss" scoped>
.default-layout {
  display: flex;
  gap: 32px;

  max-width: 1366px;
  margin: 0 auto;

  &__user-profile {
  }

  &__content {
    flex-grow: 1;
    width: 100%;
    height: 100%;
  }
}
</style>
