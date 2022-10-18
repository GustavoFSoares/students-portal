<template>
  <article class="courses-page">
    <SearchBar v-model="searchText" />

    <AvailableCourses />

    <CompletedCourses />
  </article>
</template>

<script>
import { ref } from "vue";

import SearchBar from "../components/SearchBar.vue";
import AvailableCourses from "../partials/AvailableCourses.vue";
import CompletedCourses from "../partials/CompletedCourses.vue";

export default {
  name: "courses-page",
  components: {
    SearchBar,
    AvailableCourses,
    CompletedCourses,
  },
  setup() {
    const searchText = ref(null);

    return {
      searchText,
    };
  },
};
</script>

<style lang="scss" scoped>
.courses-page {
  display: flex;
  flex-direction: column;
  gap: 30px;
}
</style>
