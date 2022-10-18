<template>
  <div class="available-courses">
    <CoursesList
      :title="$t(`${I18N_PATH}.title`)"
      :courses="courses"
      see-more-url="home"
      @startCourse="handleStartCourse"
    />
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

import CoursesList from "../components/CoursesList.vue";

const I18N_PATH = "modules.home.coursesPage.availableCourses";

export default {
  name: "available-courses",
  components: {
    CoursesList,
  },
  setup() {
    const $store = useStore();
    const $router = useRouter();

    const courses = ref([]);

    onMounted(async () => {
      const coursesData = await $store.dispatch("CourseModule/getData");
      courses.value = coursesData;

      console.log(process.env);
    });

    const handleStartCourse = (courseId) => {
      $router.push({
        name: "courses.stages-list",
        params: {
          id: courseId,
        },
      });
    };

    return {
      I18N_PATH,
      courses,
      handleStartCourse,
    };
  },
};
</script>
