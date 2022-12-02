<template>
  <main class="main-layout">
    <div class="video__wrapper">
      <video class="video" autoplay muted loop>
        <source src="background.mp4" type="video/mp4" />
      </video>
    </div>

    <div class="app-container">
      <div class="app-container__wrapper">
        <slot />
      </div>
    </div>
  </main>
</template>

<script>
export default {
  name: "MainLayout",
};
</script>

<style lang="scss" scoped>
.main-layout {
  position: relative;

  .video {
    &__wrapper {
      position: absolute;
      right: 0;
      top: 0;
      width: 100%;
      height: 100%;
      z-index: -1;
      overflow: hidden;
    }

    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
</style>
