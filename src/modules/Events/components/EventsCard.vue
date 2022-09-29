<template>
  <button class="event-card" @click="handleClickEvent">
    <AvCard rounded-header class="event-card__wrapper">
      <template #header>
        <div class="event-card__image-wrapper image-wrapper">
          <img class="event-card__image" :src="image" :alt="title" />

          <QCheckbox
            class="image-wrapper__favorite"
            checked-icon="fa-solid fa-heart"
            unchecked-icon="fa-regular fa-heart"
            v-model="isBookmarked"
            size="xs"
            dark
            color="white"
          />
        </div>
      </template>

      <template #default>
        <div class="event-card__content">
          <div class="event-card__completed-date">
            <span class="event-card__completed-date-text">
              {{ preparedDocumentDate }}
            </span>
          </div>

          <h6 class="event-card__title">
            {{ title }}
          </h6>

          <div class="event-card__footer">
            <div class="footer__participants-count">
              <QIcon
                name="fa-solid fa-user-group"
                color="secondary"
                size="15px"
              />

              <span class="footer__participants-count-text">
                {{ participantsCount }}
              </span>
            </div>

            <QBadge
              v-if="isNew"
              class="footer__is-new"
              rounded
              label="Novo"
              color="primary"
              size="lg"
            />
          </div>
        </div>
      </template>
    </AvCard>
  </button>
</template>

<script>
import { computed, ref, watch } from "vue";

import AvCard from "atoms/AvCard.vue";

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
    participantsCount: {
      type: Number,
      required: true,
    },
    isNew: {
      type: Boolean,
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

    const preparedDocumentDate = computed(() => {
      return new Date(props.date).toLocaleDateString();
    });

    const handleClickEvent = () => {
      ctx.emit("click-event");
    };

    return {
      isBookmarked,
      preparedDocumentDate,
      handleClickEvent,
    };
  },
};
</script>

<style lang="scss" scoped>
.event-card {
  &__wrapper {
    height: 100%;
  }

  &__image {
    width: 100%;
    height: 100%;

    &-wrapper {
      height: 190px;
    }
  }

  .image-wrapper {
    position: relative;

    &__favorite {
      position: absolute;
      top: 5px;
      right: 5px;
      background: $blue-grey-9;
      border-radius: 50%;

      :deep(.q-icon) {
        color: $white;
      }

      &[aria-checked="true"] {
        :deep(.q-icon) {
          color: $red;
        }
      }
    }
  }

  &__content {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  &__title {
    margin-top: 15px;
    font-size: 12px;
    font-weight: $font-weight-bold;
    color: $secondary;

    line-height: 1.2;

    flex-grow: 1;
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

  &__footer {
    margin-top: 20px;

    display: flex;
  }

  .footer {
    &__participants-count {
      flex-grow: 1;

      display: flex;
      gap: 5px;
      align-items: center;

      &-text {
        color: $secondary;
        font-size: 14px;
      }
    }
  }
}
</style>
