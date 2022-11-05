<template>
  <div class="completed-courses">
    <CoursesList
      :title="$t(`${I18N_PATH}.title`)"
      :courses="courses"
      see-more-url="home"
    />
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { useStore } from "vuex";

import CoursesList from "../components/CoursesList.vue";

const I18N_PATH = "modules.home.coursesPage.completedCourses";

export default {
  name: "completed-courses",
  components: {
    CoursesList,
  },
  setup() {
    const $store = useStore();

    const courses = ref([]);

    onMounted(async () => {
      const coursesData = await $store.dispatch("CourseModule/getTrails");
      courses.value = coursesData;
    });

    return {
      I18N_PATH,
      courses,
    };
  },
};
</script>
