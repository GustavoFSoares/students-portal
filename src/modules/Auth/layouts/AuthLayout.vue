<template>
  <MainLayout>
    <div class="auth-layout app-container">
      <div class="auth-layout__container">
        <router-view />
      </div>
    </div>
  </MainLayout>
</template>

<script>
import MainLayout from "layouts/MainLayout.vue";

export default {
  name: "AuthLayout",
  components: {
    MainLayout,
  },
};
</script>

<style lang="scss" scoped>
.auth-layout {
  width: 100vw;
  height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;

  &__container {
    max-width: 400px;
    width: 100%;
  }
}
</style>
