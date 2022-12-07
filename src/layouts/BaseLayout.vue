<template>
  <main class="base-layout">
    <div class="video__wrapper">
      <video class="video" autoplay muted loop>
        <source src="/background.mp4" type="video/mp4" />
      </video>
    </div>

    <slot />
  </main>
</template>

<script>
export default {
  name: "BaseLayout",
};
</script>

<style lang="scss" scoped>
.base-layout {
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
