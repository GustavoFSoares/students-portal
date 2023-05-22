<template>
  <BaseLayout>
    <div class="app-container">
      <AppToolbar />

      <div class="app-container__wrapper">
        <div class="app-container__content">
          <router-view />
        </div>
      </div>
    </div>
  </BaseLayout>
</template>

<script setup>
import BaseLayout from "./BaseLayout.vue";
import AppToolbar from "partials/AppToolbar.vue";
</script>

