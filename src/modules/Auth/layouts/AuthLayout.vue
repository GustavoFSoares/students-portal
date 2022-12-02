<template>
  <BaseLayout>
    <div class="auth-layout app-container">
      <div class="auth-layout__container">
        <router-view />
      </div>
    </div>
  </BaseLayout>
</template>

<script>
import BaseLayout from "layouts/BaseLayout.vue";

export default {
  name: "AuthLayout",
  components: {
    BaseLayout,
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
