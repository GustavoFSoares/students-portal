<template>
  <AvCard
    :class="['user-card', { 'user-card--is-close': isCardClose }]"
    header-color="primary"
    :no-border-radius="isMobile"
  >
    <template #header>
      <button class="user-card__open-card-button" @click="handleOpenCard">
        <QIcon name="chevron_right" size="22px" />
      </button>

      <UserCardHeader :is-close="isCardClose" />

      <QBtn
        v-if="isMobile"
        class="user-card__close-button"
        flat
        round
        icon="close"
        color="white"
        @click="handleCloseMenu"
      />
    </template>

    <template #default>
      <div class="navigation">
        <router-link
          :class="[
            'navigation-item',
            { 'navigation-item--is-closed': isCardClose },
          ]"
          v-for="(routeItem, routeKey) in routes"
          :key="routeKey"
          :to="{ name: routeItem.route }"
          @click="handleClickNavigationItem"
        >
          <QIcon class="navigation-item__icon" :name="routeItem.icon" />

          <h4 class="navigation-item__text">
            {{ $t(`modules.${routeKey}.seo.title`) }}
          </h4>
        </router-link>
      </div>
    </template>
  </AvCard>
</template>

<script setup>
import { computed, ref } from "vue";
import { useQuasar } from "quasar";

import AvCard from "atoms/AvCard.vue";
import UserCardHeader from "./UserCardHeader.vue";

const $emits = ["navigating", "closeMenu"];

const isCardClose = ref(true);

const $q = useQuasar();

const routes = {
  insights: {
    route: "home.activities",
    icon: "o_widgets",
  },
  courses: {
    route: "home.rankings",
    icon: "o_layers",
  },
  // feed: {
  //   route: "home.feed",
  //   icon: "o_fax",
  // },
  // library: {
  //   route: "home.library",
  //   icon: "collections_bookmark",
  // },
  // events: {
  //   route: "home.events",
  //   icon: "o_confirmation_number",
  // },
  // missions: {
  //   route: "home.missions",
  //   icon: "o_flag",
  // },
};

const isMobile = computed(() => {
  return $q.screen.sm || $q.screen.xs;
});

const handleCloseMenu = () => {
  $emit("closeMenu");
};

const handleClickNavigationItem = () => {
  $emit("navigating");
};

const handleOpenCard = () => {
  isCardClose.value = !isCardClose.value;
};
</script>

<style lang="scss" scoped>
@keyframes closeAnimation {
  from {
    width: 100%;
    opacity: 1;
    display: initial;
    margin-left: 10px;
  }

  to {
    width: 0;
    display: none;
    opacity: 0;
    margin-left: 0;
  }
}

@keyframes openAnimation {
  from {
    width: 0;
    display: none;
    opacity: 0;
    margin-left: 0;
  }

  to {
    width: 100%;
    opacity: 1;
    display: initial;
    margin-left: 10px;
  }
}

$transitionDuration: 0.3s;

.user-card {
  min-width: 302px;
  position: relative;

  transition: ease-in min-width $transitionDuration;

  &--is-close {
    min-width: 80px;

    .navigation-item {
      justify-content: center;
    }

    :deep {
      .av-card__content {
        padding: 10px 8px;
      }
    }

    .user-card__open-card-button {
      transform: rotate(0deg);
    }
  }

  &__open-card-button {
    position: absolute;
    top: 2px;
    right: 2px;
    z-index: 1;
    font-size: 20px;
    color: $white;

    transform: rotate(180deg);
    transition: ease-in transform $transitionDuration;
  }

  &__close-button {
    position: absolute;
    top: 10px;
    right: 10px;
  }

  .navigation {
    display: flex;
    flex-direction: column;
    gap: 5px;

    &-item {
      display: flex;
      align-items: center;
      text-decoration: none;

      color: $text-color-1;
      padding: 10px;

      border-radius: 8px;

      transition: background-color $transitionDuration ease-in-out;

      &__text {
        font-size: 15px;
        font-weight: $font-weight-bold;
        animation: openAnimation $transitionDuration ease-in-out forwards;
      }

      &__icon {
        font-size: 25px;
      }

      &:hover {
        background: rgba($primary, 0.1);
      }

      &.router-link-active {
        background-color: rgba($primary, 0.9);
        color: $white;
      }

      &--is-closed {
        .navigation-item__text {
          animation: closeAnimation $transitionDuration ease-in-out forwards;
        }
      }
    }
  }
}
</style>
