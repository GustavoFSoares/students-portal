<template>
  <section class="channels-container-section">
    <div class="channels-container-section__content">
      <slot />
    </div>

    <div class="channels-container-section__channels-list">
      <AvCard class="channel-card">
        <h2 class="channel-card__title">{{ $t(`${I18N_PATH}.channels`) }}</h2>

        <div class="channel-card__channels">
          <div class="channel-card__channels-wrapper">
            <router-link
              :class="[
                'channel-item',
                {
                  'channel-item--active': currentChannel === `#${channel.id}`,
                },
              ]"
              v-for="channel in channels"
              :key="channel.id"
              :to="`#${channel.id}`"
            >
              #{{ channel.label }}
            </router-link>
          </div>
        </div>
      </AvCard>
    </div>
  </section>
</template>

<script>
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";

import AvCard from "atoms/AvCard.vue";

const I18N_PATH = "components.channelsContainerSection";

export default {
  name: "ChannelsContainerSection",
  components: {
    AvCard,
  },
  props: {
    channels: {
      type: Array,
      required: true,
    },
  },
  watch: {
    currentChannel: {
      immediate: true,
      handler(val) {
        if (val) {
          const hash = val.replace("#", "");

          this.$emit("update:channel", hash);
        }
      },
    },
  },
  setup(props) {
    const $route = useRoute();
    const $router = useRouter();

    if (
      !$route.hash ||
      !props.channels.find((channel) => channel.id === $route.hash)
    ) {
      $router.push(`#${props.channels[0].id}`);
    }

    const currentChannel = computed(() => $route.hash);

    return {
      I18N_PATH,
      currentChannel,
    };
  },
};
</script>

<style lang="scss" scoped>
.channels-container-section {
  display: grid;

  grid-template-columns: repeat(3, 1fr);
  grid-template-areas: "content content channels_list";
  gap: 40px;

  &__content {
    grid-area: content;
  }
  &__channels-list {
    grid-area: channels_list;
  }

  .channel-card {
    :deep(.av-card__content) {
      padding: initial;
    }

    &__title {
      color: $primary;
      font-size: 15px;
      font-weight: $font-weight-bold;

      padding: 16px;
    }

    &__channels {
      display: flex;
      flex-direction: column;
      min-height: 200px;
      height: 100%;

      &-wrapper {
        flex-grow: 1;

        display: flex;
        flex-direction: column;
        gap: 1px;
      }

      &::before,
      &::after {
        content: "";

        margin: 0 16px;
        height: 2px;

        background: rgba($secondary, 0.3);
      }

      &::after {
        margin-bottom: 15px;
      }
    }
  }

  .channel-item {
    text-decoration: none;
    padding: 8px 16px;

    transition-property: color, background-color;
    transition-duration: 0.4s;
    transition-timing-function: ease-in;

    color: $secondary;
    font-weight: $font-weight-bold;
    font-style: italic;

    &:hover,
    &--active {
      background-color: rgba($primary, 0.1);
    }

    &--active {
      color: $primary;
      font-style: normal;
    }
  }
}
</style>
