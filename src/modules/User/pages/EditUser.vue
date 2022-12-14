<template>
  <AvPage class="edit-user" no-header>
    <template #default>
      <AvatarConfigurator />
    </template>
  </AvPage>
</template>

<script>
// const I18N_PATH = "modules.activities.pages.stageList";

import AvPage from "organisms/AvPage.vue";
// import ColorAvatarActionBar from "libs/vue-color-avatar/src/components/ActionBar.vue";
import AvatarConfigurator from "../partials/AvatarConfigurator.vue";
// import ColorAvatarAvagar from "libs/vue-color-avatar/src/components/VueColorAvatar.vue";

export default {
  name: "EditUser",
  components: {
    AvPage,
    AvatarConfigurator,
    // ColorAvatarActionBar,
    // ColorAvatarConfigurator,
    // ColorAvatarAvagar,
  },
  setup() {},
};
</script>

<style lang="scss" scoped>
.edit-user {
  .stage-list-header {
    padding: 0 15px;
    display: flex;
    gap: 15px;
    align-items: center;

    height: 100%;

    &__cover {
      width: 35px;
      height: 35px;
      border-radius: 50%;
      overflow: hidden;
      background: #ff00008f;

      &-image {
        width: 100%;
        height: 100%;
      }
    }

    &__texts {
      flex-grow: 1;
    }

    &__title {
      font-size: 15px;
      font-weight: $font-weight-semibold;
      color: $text-color-3;
    }

    &__description {
      font-size: 13px;
      font-weight: $font-weight-normal;
      color: $text-color-2;
    }

    &__activities {
      font-size: 12px;
      color: $text-color-3;
      font-weight: $font-weight-bold;
    }
  }
}
</style>
