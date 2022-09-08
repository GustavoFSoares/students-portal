<template>
  <div class="auth-layout app-container">
    <div class="auth-layout__container">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  name: "AuthLayout",
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
