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
import { ref } from "vue";
import CoursesList from "../components/CoursesList.vue";

const I18N_PATH = "modules.home.coursesPage.availableCourses";

export default {
  name: "available-courses",
  components: {
    CoursesList,
  },
  setup() {
    const courses = ref([
      { title: "Crianças", progress: 0 },
      { title: "Crianças", progress: 10 },
      { title: "Crianças", progress: 99 },
    ]);

    const handleStartCourse = (courseId) => {
      alert("AvailableCourse: " + courseId);
    };

    return {
      I18N_PATH,
      courses,
      handleStartCourse,
    };
  },
};
</script>
