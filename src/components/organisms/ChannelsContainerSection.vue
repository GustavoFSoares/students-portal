<template>
  <section class="channels-container-section">
    <div class="channels-container-section__content">
      <AvCard v-if="$slots['top-bar']">
        <slot name="top-bar" />
      </AvCard>

      <div>
        <slot />
      </div>
    </div>

    <div class="channels-container-section__channels-list">
      <AvCard class="channel-card">
        <div class="channel-card__title">
          <h2 class="channel-card__title-text">
            {{ $t(`${I18N_PATH}.channels`) }}
          </h2>

          <QBtn
            v-if="isMobile"
            :class="[
              'channel-card__title-button',
              { 'channel-card__title-button--active': showChannels },
            ]"
            round
            flat
            padding="xs"
            icon="expand_more"
            @click="handleOpenAccordion"
          />
        </div>

        <div
          :class="[
            'channel-card__channels',
            { 'channel-card__channels--active': showChannels },
          ]"
          ref="channelsList"
        >
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
import { computed, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useQuasar } from "quasar";

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
    const $q = useQuasar();
    const $route = useRoute();
    const $router = useRouter();
    const showChannels = ref(false);

    const channelsList = ref(null);

    if (
      !$route.hash ||
      !props.channels.find((channel) => channel.id === $route.hash)
    ) {
      $router.push(`#${props.channels[0].id}`);
    }

    const isMobile = computed(() => {
      return $q.screen.xs;
    });

    const currentChannel = computed(() => $route.hash);

    const handleAccordion = () => {
      console.log(channelsList.value);
      if (showChannels.value) {
        channelsList.value.style.maxHeight =
          channelsList.value.scrollHeight + 1 + "px";
      } else {
        channelsList.value.style.maxHeight = null;
      }
    };

    const handleOpenAccordion = () => {
      showChannels.value = !showChannels.value;
    };

    watch(
      () => showChannels.value,
      () => {
        console.log("watch");
        handleAccordion();
      }
    );

    return {
      I18N_PATH,
      showChannels,
      channelsList,
      isMobile,
      currentChannel,
      handleOpenAccordion,
    };
  },
};
</script>

<style lang="scss" scoped>
.channels-container-section {
  display: grid;

  grid-template-columns: 1fr;
  grid-template-areas:
    "channels_list"
    "content";
  gap: 20px;

  @media (min-width: $breakpoint-tablet) {
    grid-template-columns: repeat(3, 1fr);
    grid-template-areas: "content content channels_list";
    gap: 40px;
  }

  &__content {
    grid-area: content;

    display: grid;
    gap: 20px;
  }

  &__channels-list {
    grid-area: channels_list;
  }

  .channel-card {
    $transitionTime: 0.2s;

    :deep(.av-card__content) {
      padding: initial;
    }

    &__title {
      padding: 16px;

      display: flex;
      justify-content: space-between;
      align-items: center;

      &-text {
        color: $primary;
        font-size: 15px;
        font-weight: $font-weight-bold;
      }

      &-button {
        transition: transform $transitionTime ease-in;

        &--active {
          transform: rotate(180deg);
        }
      }
    }

    &__channels {
      display: flex;
      flex-direction: column;
      min-height: 200px;
      height: 100%;

      @media (max-width: $breakpoint-mobile) {
        min-height: initial;

        transition: max-height $transitionTime ease-in;
        max-height: 0;

        overflow-y: hidden;

        &--active {
          max-height: initial;
        }
      }

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
    transition-duration: 0.2s;
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
