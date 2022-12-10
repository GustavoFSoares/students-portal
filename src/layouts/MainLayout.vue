<template>
  <BaseLayout>
    <div class="app-container">
      <div class="app-container__wrapper">
        <slot />
      </div>
    </div>
  </BaseLayout>
</template>

<script>
import BaseLayout from "./BaseLayout.vue";
export default {
  name: "MainLayout",
  components: {
    BaseLayout,
  },
};
</script>

