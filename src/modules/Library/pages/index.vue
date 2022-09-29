<template>
  <ChannelsContainerSection
    class="library-page"
    :channels="channels"
    v-model:channel="currentChannel"
  >
    <template #top-bar>
      <QBtnToggle
        class="library-page__filter-buttons"
        color="secondary"
        toggle-text-color="secondary"
        size="sm"
        flat
        :options="filtersList"
        v-model="filterSelected"
      />
    </template>

    <template #default>
      <div class="library-page__list">
        <LibraryCard
          v-for="(course, courseIndex) in coursesList"
          :key="`course-${courseIndex}`"
          :title="course.title"
          :image="course.image"
          :date="course.date"
          :type="course.type"
          :bookbarked="course.bookbarked"
          @click-course="handleClickItem(courseIndex)"
          @bookmarked="handleBookmarkItem(courseIndex, $event)"
        />
      </div>
    </template>
  </ChannelsContainerSection>
</template>

<script>
import { computed, ref } from "vue";

import ChannelsContainerSection from "organisms/ChannelsContainerSection.vue";

import LibraryCard from "../components/LibraryCard.vue";

import Courses from "../data/courses.json";
import IconsLibrary from "../data/iconsLibrary.json";

export default {
  name: "library-page",
  components: {
    ChannelsContainerSection,
    LibraryCard,
  },
  setup() {
    const channels = ref([
      { label: "Todas as sessões", id: "all-sections" },
      { label: "Favoritos", id: "bockmarks" },
      { label: "Apostilas", id: "handbooks" },
      { label: "Vídeos", id: "videos" },
    ]);
    const coursesList = ref(Courses);
    const currentChannel = ref(null);
    const filterSelected = ref("all");

    const filtersList = computed(() =>
      Object.entries(IconsLibrary).map(([ItemIndex, itemIcon]) => ({
        value: ItemIndex,
        icon: itemIcon,
      }))
    );

    const handleClickItem = (courseIndex) => {
      alert("ClickItem: " + courseIndex);
    };

    const handleBookmarkItem = (courseIndex, value) => {
      alert(`BookmarkItem: ${courseIndex} -> ${value}`);
    };

    return {
      channels,
      coursesList,
      currentChannel,
      filterSelected,
      filtersList,
      handleClickItem,
      handleBookmarkItem,
    };
  },
};
</script>

<style lang="scss" scoped>
.library-page {
  &__filter-buttons {
    justify-content: space-between;

    :deep(.q-btn) {
      padding: 4px 10px;

      .q-icon {
        font-size: 17px;
      }

      &[aria-pressed="true"] {
        .q-focus-helper {
          background: currentColor;
          opacity: 0.15;
        }
      }
    }
  }

  &__list {
    display: grid;
    gap: 20px;
    grid-template-columns: 1fr;

    @media (min-width: $breakpoint-tablet) {
      grid-template-columns: repeat(3, 1fr);
    }

    &-column {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
  }
}
</style>
