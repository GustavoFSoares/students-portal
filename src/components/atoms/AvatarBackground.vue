<template>
  <div class="avatar-background" :style="{ background: color }"></div>
</template>

<script>
export default {
  name: "AvatarBackground",
  props: {
    color: {
      type: String,
      default: "#fff",
    },
  },
};
</script>

<style lang="scss" scoped>
.avatar-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transition: background-color 0.1s;
}
</style>
