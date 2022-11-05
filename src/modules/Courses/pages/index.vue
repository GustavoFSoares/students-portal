<template>
  <article class="courses-page">
    <SearchBar v-model="searchText" />

    <CoursesList
      v-for="trailIndex in trailsIndexes"
      :key="trailIndex"
      :title="$t(`${I18N_PATH}.${trailIndex}Trails.title`)"
      :courses="trails[trailIndex]"
      see-more-url="home"
      @startCourse="handleStartCourse"
    />
  </article>
</template>

<script>
import { computed, onMounted, ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

import SearchBar from "../components/SearchBar.vue";
import CoursesList from "../components/CoursesList.vue";

const I18N_PATH = "modules.home.coursesPage";

export default {
  name: "courses-page",
  components: {
    SearchBar,
    CoursesList,
  },
  setup() {
    const $store = useStore();
    const $router = useRouter();

    const trailsIndexes = ["available", "inProgress", "completed"];
    const searchText = ref(null);

    const trails = computed(() => {
      return $store.state.CourseModule.trailsGroup;
    });

    const handleStartCourse = (courseId) => {
      $router.push({
        name: "courses.stages-list",
        params: {
          id: courseId,
        },
      });
    };

    onMounted(async () => {
      await $store.dispatch("CourseModule/getTrails");
    });

    return {
      I18N_PATH,
      trailsIndexes,
      searchText,
      trails,
      handleStartCourse,
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
