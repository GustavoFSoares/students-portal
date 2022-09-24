<template>
  <ChannelsContainerSection
    :channels="channels"
    v-model:channel="currentChannel"
  >
    <h1>feed - {{ currentChannel }}</h1>
  </ChannelsContainerSection>
</template>

<script>
import { ref } from "vue";

import ChannelsContainerSection from "organisms/ChannelsContainerSection.vue";

export default {
  name: "feed-page",
  components: {
    ChannelsContainerSection,
  },
  setup() {
    const currentChannel = ref(null);

    const channels = ref([
      { label: "Todas as notícias", id: "all-news" },
      { label: "Notícia!", id: "news" },
    ]);

    return {
      channels,
      currentChannel,
    };
  },
};
</script>
