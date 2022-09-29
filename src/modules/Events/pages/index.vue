<template>
  <ChannelsContainerSection
    class="events-page"
    :channels="channels"
    v-model:channel="currentChannel"
  >
    <template #top-bar>
      <h1 class="events-page__title">{{ $t(`${I18N_PATH}.title`) }}</h1>
    </template>

    <template #default>
      <div class="events-page__list">
        <EventsCard
          v-for="(event, eventIndex) in eventsList"
          :key="`event-${eventIndex}`"
          :title="event.title"
          :image="event.image"
          :date="event.date"
          :participants-count="event.participantsCount"
          :is-new="event.new"
          :bookbarked="event.bookbarked"
          @click-event="handleClickItem(eventIndex)"
          @bookmarked="handleBookmarkItem(eventIndex, $event)"
        />
      </div>
    </template>
  </ChannelsContainerSection>
</template>

<script>
import { ref } from "vue";
import { useI18n } from "vue-i18n";

import ChannelsContainerSection from "organisms/ChannelsContainerSection.vue";

import EventsCard from "../components/EventsCard.vue";

import Events from "../data/events.json";

const I18N_PATH = "modules.events";
export default {
  name: "events-page",
  components: {
    ChannelsContainerSection,
    EventsCard,
  },
  setup() {
    const $i18n = useI18n();

    const channels = ref([
      { label: $i18n.t(`${I18N_PATH}.channels.all`), id: "all" },
      { label: $i18n.t(`${I18N_PATH}.channels.bockmarks`), id: "bockmarks" },
    ]);
    const eventsList = ref(Events);
    const currentChannel = ref(null);

    const handleClickItem = (eventIndex) => {
      alert("ClickItem: " + eventIndex);
    };

    const handleBookmarkItem = (eventIndex, value) => {
      alert(`BookmarkItem: ${eventIndex} -> ${value}`);
    };

    return {
      I18N_PATH,
      channels,
      eventsList,
      currentChannel,
      handleClickItem,
      handleBookmarkItem,
    };
  },
};
</script>

<style lang="scss" scoped>
.events-page {
  &__title {
    font-size: 18px;
    font-weight: $font-weight-bold;
    color: $secondary;
  }

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
