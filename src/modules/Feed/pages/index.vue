<template>
  <ChannelsContainerSection class="feed-page" hide-channels>
    <template #top-bar></template>

    <template #default>
      <div class="feed-page__list">
        <div
          class="feed-page__list-column"
          v-for="(newsColum, newsColumnIndex) in newsColums"
          :key="`news-column-${newsColumnIndex}`"
        >
          <FeedCard
            class="feed-page__item"
            v-for="(newsData, newsIndex) in newsColum"
            :key="`news-${newsColumnIndex}-${newsIndex}`"
            :title="newsData.title"
            :subtitle="newsData.subtitle"
            :image="newsData.image"
            :news-date="newsData.date"
            :content="newsData.description"
            :link="newsData.link"
          />
        </div>
      </div>
    </template>
  </ChannelsContainerSection>
</template>

<script setup>
import { useQuasar } from "quasar";
import { useStore } from "vuex";
import { computed, ref } from "vue";

import ChannelsContainerSection from "organisms/ChannelsContainerSection.vue";

import FeedCard from "../components/FeedCard.vue";

const I18N_PATH = "modules.feed";
const $q = useQuasar();
const $store = useStore();

const newsList = computed(() => $store.getters["FeedModule/getFeeds"]);

const isMobile = computed(() => {
  return $q.screen.xs;
});

const newsColums = computed(() => {
  if (isMobile.value) {
    return {
      u: newsList.value,
    };
  }

  return newsList.value.reduce(
    (amount, newsItem, newsIndex) => {
      if (newsIndex % 2 !== 0) {
        amount.r.push(newsItem);
      } else {
        amount.l.push(newsItem);
      }

      return amount;
    },
    { l: [], r: [] }
  );
});
</script>

<style lang="scss" scoped>
.feed-page {
  &__list {
    display: grid;
    gap: 30px;
    grid-template-columns: 1fr;

    @media (min-width: $breakpoint-tablet) {
      grid-template-columns: repeat(2, 1fr);
    }

    &-column {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
  }
}
</style>
