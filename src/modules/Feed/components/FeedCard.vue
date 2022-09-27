<template>
  <div class="feed-card">
    <AvCard rounded-header>
      <template #header>
        <div class="feed-card__image">
          <img :src="image" :alt="title" />
        </div>
      </template>

      <template #default>
        <div class="feed-card__completed-date">
          <span class="feed-card__completed-date-text">
            {{ preparedNewsDate }}
          </span>
        </div>

        <h6 class="feed-card__title">
          {{ title }}
        </h6>

        {{ isOpen }}
        <div
          :class="[
            'feed-card__content',
            { 'feed-card__content--active': isOpen },
          ]"
        >
          <p class="feed-card__content-text">
            {{ content }}
          </p>

          <QBtn
            class="feed-card__content-button"
            color="primary"
            flat
            label="Continuar lendo"
            size="sm"
            padding="2px"
            @click="handleOpenNews"
          />
        </div>
      </template>
    </AvCard>
  </div>
</template>

<script>
import AvCard from "atoms/AvCard.vue";
import { computed, ref } from "vue";

export default {
  name: "CertificatesPageCard",
  components: {
    AvCard,
  },
  props: {
    image: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    newsDate: {
      type: Date,
    },
  },
  setup(props) {
    const isOpen = ref(false);

    const preparedNewsDate = computed(() => {
      return new Date(props.newsDate).toLocaleDateString();
    });

    const handleOpenNews = () => {
      isOpen.value = !isOpen.value;
    };

    return {
      isOpen,
      preparedNewsDate,
      handleOpenNews,
    };
  },
};
</script>

<style lang="scss" scoped>
.feed-card {
  &__image {
    height: 190px;

    img {
      width: 100%;
      height: 100%;
    }
  }

  &__completed-date {
    margin-top: 10px;

    display: flex;
    gap: 5px;
    align-items: center;

    &-text {
      letter-spacing: 0.5px;
      font-size: 12px;
      color: $secondary;
      font-weight: $font-weight-semibold;
    }
  }

  &__title {
    margin-top: 15px;
    font-size: 15px;
    font-weight: $font-weight-bold;
    text-transform: uppercase;
    color: $secondary;
  }

  &__content {
    position: relative;
    margin-top: 20px;

    display: flex;
    flex-direction: column;
    gap: 10px;

    @media (min-width: $breakpoint-laptop) {
      align-items: flex-end;
    }

    &--active & {
      &-text {
        max-height: initial;

        &:after {
          box-shadow: none;
        }
      }

      &-button {
        position: sticky;
      }
    }

    &-text {
      position: relative;

      color: $secondary;
      line-height: 1.2;
      font-size: 13px;

      max-height: 49px;
      overflow: hidden;

      &:after {
        content: "";
        position: absolute;

        left: 0;
        right: 0;
        bottom: 0;

        width: 100%;

        box-shadow: 100px 0 20px 30px white;
      }
    }

    &-button {
      position: absolute;
      margin-right: 10px;
      bottom: 0;
      right: 0;
      z-index: 1;
      text-transform: initial;

      :deep(.q-btn__content) span {
        font-weight: $font-weight-bold !important;
      }
    }
  }
}
</style>
