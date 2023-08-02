<template>
  <AvPage class="edit-user" no-header>
    <template #default>
      <div class="edit-user__wrapper">
        <div class="edit-user__avatar-preview">
          <AvatarCreatorViewer />

          <QBtn
            class="edit-user__save-avatar-button"
            color="primary"
            :label="$t(`${I18N_PATH}.submit`)"
            @click="handleSubmit"
          />
        </div>

        <div class="edit-user__avatar-options">
          <AvatarCreatorOptions />
        </div>
      </div>
    </template>
  </AvPage>
</template>

<script setup>
const I18N_PATH = "modules.user.pages.edit";

import "vue-avatar-creator/dist/style.css"
import { AvatarCreatorOptions, AvatarCreatorViewer, useAvatarCreatorStore } from "vue-avatar-creator"

import { computed, ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

import AvReward from "molecules/AvReward.vue";

import AvPage from "organisms/AvPage.vue";

const $store = useStore();
const $router = useRouter();
const avatarStore = useAvatarCreatorStore();

const avatarOptions = ref(
  $store.getters["AuthModule/avatar/avatarOptions"]
);

const rewards = computed(() => $store.getters["AuthModule/rewardsData"]);

const userData = computed(() => $store.getters["AuthModule/userData"]);

const avatarIsLoading = computed(
  () => $store.state.AuthModule.avatar.loading
);

const handleSubmit = async () => {
  await $store.dispatch(
    "AuthModule/avatar/sendAvatar",
    avatarOptions.value
  );

  await $store.dispatch("AuthModule/refreshUser");

  $router.push({ name: "home" });
};

</script>

<style lang="scss" scoped>
.edit-user {
  :deep(.av-page-content__container) {
    height: 100%;
  }

  &__wrapper {
    display: flex;
    justify-content: space-between;
    gap: 50px;
  }

  &__avatar-preview {
    position: relative;
    background: $white;
    border-radius: $default-border-radius;
  }

  &__avatar-options {
    width: 100%;
  }

  &__save-avatar-button {
    width: 100%;
    position: absolute;
    margin-top: 10px;
    text-transform: initial;

    :deep(span) {
      font-weight: $font-weight-bold;
    }
  }

  .user-content {
    width: 25%;

    display: flex;
    flex-direction: column;
    gap: 30px;

    &__name {
      legend {
        color: $text-color-2;
      }

      font-size: 25px;
      color: $text-color-3;
    }

    &__level {
      legend {
        color: $text-color-2;
      }

      font-size: 20px;
      color: $text-color-3;
      font-variant-caps: all-small-caps;
    }

    &__reward {
      max-width: 200px;
    }
  }

  .avatar {
    display: flex;
    gap: 20px;

    &-controller {
      margin-top: 40px;

      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    &-configurator {
      overflow-x: auto;

      &::-webkit-scrollbar {
        width: 8px;
        border-radius: 10px;
      }

      &::-webkit-scrollbar-thumb {
        background: rgba(#010203, 60%);
        border-radius: 10px;
      }
    }
  }
}
</style>
