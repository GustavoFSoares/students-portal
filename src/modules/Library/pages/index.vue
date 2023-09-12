<template>
  <div class="library-page__list"></div>
</template>

<script setup>
import { useI18n } from "vue-i18n";
import { computed, ref } from "vue";

import LibraryCard from "../components/LibraryCard.vue";

import Courses from "../data/courses.json";
import IconsLibrary from "../data/iconsLibrary.json";

const I18N_PATH = "modules.library";
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
        background: rgba(#6e7273, 0.2);
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
