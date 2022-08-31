<template>
  <article class="courses-page">
    <SearchBar v-model="searchText" />

    <AvailableCourses />
  </article>
</template>

<script>
import { ref } from "vue";
import SearchBar from "../components/CoursesPage/SearchBar.vue";
import AvailableCourses from "../partials/CoursesPage/AvailableCourses.vue";

export default {
  name: "courses-page",
  components: {
    SearchBar,
    AvailableCourses,
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
