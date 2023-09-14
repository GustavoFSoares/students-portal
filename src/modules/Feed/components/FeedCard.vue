<template>
  <div class="feed-card">
    <AvCard rounded-header>
      <template #header>
        <div class="feed-card__image" @click="handleOpenFeedLink">
          <img :src="`${$appStorage}/${image}`" :alt="title" />
        </div>
      </template>

      <template #default>
        <div class="feed-card__completed-date">
          <span class="feed-card__completed-date-text">
            {{ preparedNewsDate }}
          </span>
        </div>

        <h5 class="feed-card__title">
          {{ title }}
        </h5>

        <h6 class="feed-card__subtitle">
          {{ subtitle }}
        </h6>

        <div
          ref="contentElement"
          :class="[
            'feed-card__content',
            { 'feed-card__content--active': isOpen },
            { 'feed-card__content--active': showText },
          ]"
        >
          <p class="feed-card__content-text">
            {{ content }}
          </p>

          <QBtn
            v-if="!showText"
            class="feed-card__content-button"
            color="primary"
            flat
            :label="$t(`${I18N_PATH}.button.${isOpen ? 'close' : 'open'}`)"
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

const I18N_PATH = "modules.feed.card";
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
    subtitle: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    newsDate: {
      type: String,
    },
  },
  setup(props) {
    const isOpen = ref(false);
    const contentElement = ref(null);

    const preparedNewsDate = computed(() => {
      return new Date(props.newsDate).toLocaleDateString();
    });

    const showText = computed(() => {
      return contentElement.value?.clientHeight < 20;
    });

    const handleOpenNews = () => {
      isOpen.value = !isOpen.value;
    };

    const handleOpenFeedLink = () => {
      window.open(props.link, "__blank");
    };

    return {
      I18N_PATH,
      isOpen,
      contentElement,
      showText,
      preparedNewsDate,
      handleOpenNews,
      handleOpenFeedLink,
    };
  },
};
</script>

<style lang="scss" scoped>
.feed-card {
  &__image {
    height: 190px;
    cursor: pointer;

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

  &__subtitle {
    margin-top: 5px;
    font-size: 10px;
    font-weight: $font-weight-bold;
    text-transform: uppercase;
    color: $secondary;
  }

  &__content {
    position: relative;
    margin-top: 10px;

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
