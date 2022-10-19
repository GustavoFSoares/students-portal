<template>
  <div class="courses-list">
    <div class="courses-list__header">
      <h2 class="courses-list__title">{{ title }}</h2>

      <QBtn
        flat
        icon="add"
        :label="$t(`${I18N_PATH}.seeMore`)"
        color="primary"
        padding="xs"
        :to="{ name: seeMoreUrl }"
      />
    </div>

    <div class="courses-list__courses">
      <CourseCard
        v-for="(course, courseKey) in courses"
        :key="`course-${courseKey}`"
        :title="course.nome"
        :cover="course.capa"
        :progress="course.progress"
        @startNow="handleStartCourse(course.id)"
      />
    </div>
  </div>
</template>

<script>
import CourseCard from "./CourseCard.vue";

const I18N_PATH = "modules.home.coursesPage.coursesList";

export default {
  name: "courses-list",
  emits: ["start-course"],
  components: {
    CourseCard,
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    seeMoreUrl: {
      type: String,
      required: true,
    },
    courses: {
      type: Array,
      required: true,
    },
  },
  setup(_, ctx) {
    const handleStartCourse = (courseId) => {
      ctx.emit("start-course", courseId);
    };

    return {
      I18N_PATH,
      handleStartCourse,
    };
  },
};
</script>

<style lang="scss" scoped>
.courses-list {
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

    grid-template-columns: 1fr;

    @media (min-width: $breakpoint-tablet) {
      grid-template-columns: repeat(3, 1fr);
    }
  }
}
</style>
