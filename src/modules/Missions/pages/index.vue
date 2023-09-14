<template>
  <article class="missions-page">
    <MissionSection
      class="missions-page__item"
      v-for="(mission, missionIndex) in missions"
      :key="missionIndex"
      :name="mission.name"
      :description="mission.description"
      :cover="mission.cover"
      :activities="mission.activities"
    />
  </article>
</template>

<script setup>
import { useStore } from "vuex";
import { ref, computed } from "vue";

import MissionSection from "../partials/MissionSection.vue";

const $store = useStore();

const missions = computed(() => $store.getters["MissionsModule/getMissions"]);
</script>

<style lang="scss" scoped>
.missions-page {
  display: flex;
  flex-direction: column;
  gap: 15px;
}
</style>
