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
import { useI18n } from "vue-i18n";
import { computed, ref } from "vue";

import ChannelsContainerSection from "organisms/ChannelsContainerSection.vue";

import LibraryCard from "../components/LibraryCard.vue";

import Courses from "../data/courses.json";
import IconsLibrary from "../data/iconsLibrary.json";

const I18N_PATH = "modules.library";
export default {
  name: "library-page",
  components: {
    ChannelsContainerSection,
    LibraryCard,
  },
  setup() {
    const $i18n = useI18n();

    const channels = ref([
      { label: $i18n.t(`${I18N_PATH}.channels.all`), id: "all" },
      { label: $i18n.t(`${I18N_PATH}.channels.bockmarks`), id: "bockmarks" },
      { label: $i18n.t(`${I18N_PATH}.channels.handbooks`), id: "handbooks" },
      { label: $i18n.t(`${I18N_PATH}.channels.videos`), id: "videos" },
    ]);
    const coursesList = ref(Courses);
    const currentChannel = ref(null);
    const filterSelected = ref("all");

    const filtersList = computed(() =>
      Object.entries(IconsLibrary).map(([ItemIndex, itemIcon]) => ({
        value: ItemIndex,
        title: ItemIndex,
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
