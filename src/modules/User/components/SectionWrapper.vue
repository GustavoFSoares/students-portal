<template>
  <div class="setting-section">
    <div class="section-title">{{ title }}</div>

    <div>
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: "SettingSection",
  props: {
    title: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.setting-section {
  padding: 1.8rem 1rem;

  .section-title {
    margin-bottom: 1.5rem;
    font-weight: bold;
    line-height: 23px;
  }
}
</style>
