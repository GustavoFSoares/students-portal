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
import { ref } from "vue";
import CoursesList from "../../components/CoursesPage/CoursesList.vue";

const I18N_PATH = "modules.home.coursesPage.completedCourses";

export default {
  name: "completed-courses",
  components: {
    CoursesList,
  },
  setup() {
    const courses = ref([
      { title: "Cidadão", progress: 100 },
      { title: "Profissionais", progress: 100 },
      { title: "Crianças", progress: 100 },
    ]);

    return {
      I18N_PATH,
      courses,
    };
  },
};
</script>
