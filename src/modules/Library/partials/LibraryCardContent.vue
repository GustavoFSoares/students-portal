<template>
  <div class="library-card-content">
    <div
      class="content-item"
      v-for="(stage, stageIndex) in stages"
      :key="stageIndex"
    >
      <hr v-if="stageIndex !== 0" />

      <h5 class="content-item__title">
        {{ stage.name }}
      </h5>

      <h6 class="content-item__description">
        {{ stage.description }}
      </h6>

      <div class="content-item__itens-wrapper">
        <QBtn
          class="content-item__item"
          v-for="(libraryItem, libraryItemIndex) in stage.itens"
          :key="libraryItemIndex"
          color="primary"
          @click="handleOpenDocument(libraryItem)"
        >
          <QIcon
            class="library-item__icon"
            :name="iconsMap[libraryItem.type]"
            size="14px"
          />

          <span>
            {{ libraryItem.description }}
          </span>

          <QIcon
            class="library-item__download-icon"
            name="fa-solid fa-download"
            size="14px"
          />
        </QBtn>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, getCurrentInstance } from "vue";

import { iconsMap } from "maps/iconsMaps.json";

const { appContext } = getCurrentInstance();

const props = defineProps({
  stages: {
    type: Array,
    required: true,
  },
});

const handleOpenDocument = ({ file }) => {
  window.open(
    `${appContext.config.globalProperties.$appStorage}/${file}`,
    "_blank"
  );
};
</script>

<style lang="scss" scoped>
.library-card-content {
  display: flex;
  flex-direction: column;
  gap: 10px;

  .content-item {
    display: flex;
    flex-direction: column;
    gap: 8px;

    &__title {
      font-size: 20px;
      font-weight: $font-weight-bold;
      color: $text-color-1;
    }

    &__description {
      font-size: 16px;
      font-weight: $font-weight-semibold;
      color: $text-color-1;
    }

    &__itens-wrapper {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 30px;
    }

    &__item {
      width: 100%;

      :deep(.q-btn__content) {
        display: flex;
        gap: 8px;
      }
    }
  }
}
</style>
