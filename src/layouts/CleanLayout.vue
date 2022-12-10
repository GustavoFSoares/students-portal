<template>
  <MainLayout class="clean-layout">
    <div class="clean-layout__header">
      <div class="header-decoration" />

      <AppToolbar class="header-toolbar" />
    </div>

    <div class="clean-layout__content">
      <aside class="page-content">
        <router-view />
      </aside>
    </div>
  </MainLayout>
</template>

<script>
import AppToolbar from "partials/AppToolbar.vue";

import MainLayout from "./MainLayout.vue";

export default {
  name: "CleanLayout",
  components: {
    AppToolbar,
    MainLayout,
  },
};
</script>

<style lang="scss" scoped>
.clean-layout {
  &__header {
    display: flex;
  }

  .header-decoration {
    flex-basis: 240px;
  }

  .header-toolbar,
  .header-decoration {
    border-bottom: $border-line;
  }

  .header-toolbar,
  .page-content {
    flex-grow: 1;
  }

  &__content {
    height: 100%;
  }
}
</style>
