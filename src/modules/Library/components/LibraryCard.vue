<template>
  <button class="library-card" @click="handleClickDocumentType">
    <AvCard rounded-header class="library-card__wrapper">
      <template #header>
        <div class="library-card__image-wrapper image-wrapper">
          <img class="library-card__image" :src="image" :alt="title" />

          <QCheckbox
            class="image-wrapper__favorite"
            checked-icon="fa-solid fa-heart"
            unchecked-icon="fa-regular fa-heart"
            v-model="isBookmarked"
            size="xs"
            dark
            color="white"
          />

          <QIcon
            class="image-wrapper__document-type"
            :name="documentTypeIcon"
            color="white"
            :title="type"
          />
        </div>
      </template>

      <template #default>
        <h6 class="library-card__title">
          {{ title }}
        </h6>

        <div class="library-card__completed-date">
          <span class="library-card__completed-date-text">
            {{ preparedDocumentDate }}
          </span>
        </div>
      </template>
    </AvCard>
  </button>
</template>

<script>
import { computed, ref, watch } from "vue";

import AvCard from "atoms/AvCard.vue";

import IconsLibrary from "../data/iconsLibrary.json";

export default {
  name: "CertificatesPageCard",
  emit: ["click", "bookmarked"],
  components: {
    AvCard,
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    type: {
      type: String,
    },
    bookmarked: {
      type: Boolean,
    },
  },
  setup(props, ctx) {
    const isBookmarked = ref(props.bookmarked);

    watch(
      () => isBookmarked.value,
      () => {
        ctx.emit("bookmarked", isBookmarked.value);
      }
    );

    const documentTypeIcon = computed(() => {
      return IconsLibrary[props.type];
    });
    const preparedDocumentDate = computed(() => {
      return new Date(props.date).toLocaleDateString();
    });

    const handleClickDocumentType = () => {
      ctx.emit("click-course");
    };

    return {
      isBookmarked,
      documentTypeIcon,
      preparedDocumentDate,
      handleClickDocumentType,
    };
  },
};
</script>

<style lang="scss" scoped>
.library-card {
  &__wrapper {
    height: 100%;
  }

  &__image {
    width: 80%;
    height: 80%;

    max-width: 181px;

    &-wrapper {
      height: 190px;

      display: flex;
      justify-content: center;
      align-items: center;

      background-color: $primary;
    }
  }

  .image-wrapper {
    position: relative;

    &__favorite,
    &__document-type {
      position: absolute;
      right: 5px;
      background: $blue-grey-9;
      border-radius: 50%;

      :deep(.q-icon) {
        color: $white;
      }
    }

    &__favorite {
      top: 5px;

      &[aria-checked="true"] {
        :deep(.q-icon) {
          color: $red;
        }
      }
    }

    &__document-type {
      bottom: 5px;
      padding: 8px;
      font-size: 14px;
    }
  }

  &__title {
    margin-top: 15px;
    font-size: 12px;
    font-weight: $font-weight-bold;
    color: $secondary;
  }

  &__completed-date {
    margin-top: 10px;

    &-text {
      letter-spacing: 0.5px;
      font-size: 10px;
      color: $secondary;
      font-weight: $font-weight-semibold;
    }
  }
}
</style>
