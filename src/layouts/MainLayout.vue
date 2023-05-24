<template>
  <BaseLayout>
    <div class="app-container">
      <AppToolbar />

      <router-view />
    </div>
  </BaseLayout>
</template>

<script setup>
import BaseLayout from "./BaseLayout.vue";
import AppToolbar from "partials/AppToolbar.vue";
</script>

