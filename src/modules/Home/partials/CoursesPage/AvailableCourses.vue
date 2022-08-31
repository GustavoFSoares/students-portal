<template>
  <div class="available-courses">
    <div class="available-courses__header">
      <h2 class="available-courses__title">Cursos disponíveis</h2>

      <QBtn flat icon="add" label="ver mais" color="primary" padding="xs" />
    </div>

    <div class="available-courses__courses">
      <CourseCard
        v-for="(course, courseKey) in courses"
        :key="`course-${courseKey}`"
        :title="course.title"
        :progress="course.progress"
      />
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import CourseCard from "../../components/CoursesPage/CourseCard.vue";

export default {
  name: "available-courses",
  components: {
    CourseCard,
  },
  setup() {
    const courses = ref([
      { title: "Crianças", progress: 0 },
      { title: "Crianças", progress: 10 },
      { title: "Crianças", progress: 10 },
      { title: "Crianças", progress: 10 },
    ]);

    return {
      courses,
    };
  },
};
</script>

<style lang="scss" scoped>
.available-courses {
  display: grid;
  gap: 15px;

  &__header {
    display: flex;
    justify-content: space-between;

    background: $white;
    padding: 10px 15px;
    border-radius: 8px;
  }

  &__title {
    font-size: 16px;
    align-self: center;
  }

  &__courses {
    display: grid;
    gap: 15px;

    grid-template-columns: repeat(3, 1fr);
  }
}
</style>
