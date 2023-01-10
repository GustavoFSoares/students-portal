<template>
  <AvPage class="edit-user" no-header>
    <template #default>
      <div class="edit-user__wrapper">
        <div class="user-content">
          <h1 class="user-content__name">
            <legend>Nome:</legend>
            {{ userData.name }}
          </h1>

          <h2 class="user-content__level">
            <legend>Nível:</legend>
            {{ userData.levelName }}
          </h2>

          <AvReward
            class="user-content__reward"
            :points="rewards?.points"
            :coins="0"
          />
        </div>

        <div class="avatar-controller">
          <AvatarViewer
            class="avatar-controller__viewer"
            :option="avatarOptions"
          />

          <QBtn
            color="secondary"
            :label="$t(`${I18N_PATH}.submit`)"
            @click="handleSubmit"
            :loading="avatarIsLoading"
          />
        </div>

        <AvatarConfigurator
          class="avatar-configurator"
          v-model="avatarOptions"
        />
      </div>
    </template>
  </AvPage>
</template>

<script>
const I18N_PATH = "modules.user.pages.edit";

import "vue-color-avatar/dist/style.css";

import { computed, ref } from "vue";
import { useStore } from "vuex";
import { AvatarConfigurator } from "vue-color-avatar";

import AvReward from "molecules/AvReward.vue";

import AvPage from "organisms/AvPage.vue";
import AvatarViewer from "organisms/AvatarViewer.vue";

export default {
  name: "EditUser",
  components: {
    AvatarConfigurator,
    AvReward,
    AvPage,
    AvatarViewer,
    AvatarConfigurator,
  },
  setup() {
    const $store = useStore();

    const avatarOptions = ref(
      $store.getters["AuthModule/avatar/avatarOptions"]
    );

    const rewards = computed(() => $store.getters["AuthModule/rewardsData"]);

    const userData = computed(() => $store.getters["AuthModule/userData"]);

    const avatarIsLoading = computed(
      () => $store.state.AuthModule.avatar.loading
    );

    const handleSubmit = () => {
      $store.dispatch("AuthModule/avatar/sendAvatar", avatarOptions.value);
    };

    return {
      I18N_PATH,
      rewards,
      userData,
      avatarIsLoading,
      avatarOptions,
      handleSubmit,
    };
  },
};
</script>

<style lang="scss" scoped>
.edit-user {
  &__wrapper {
    display: flex;
    justify-content: space-between;
    gap: 50px;
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
      height: 780px;

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
