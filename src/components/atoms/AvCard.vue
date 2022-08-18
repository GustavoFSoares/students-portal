<template>
  <div class="av-card">
    <slot />
  </div>
</template>

<script>
export default {
  name: "av-card",
};
</script>

<style lang="scss" scoped>
.av-card {
  background: #fff;
  border-radius: 8px;
  padding: 15px 20px;
}
</style>
