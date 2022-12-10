<template>
  <div class="profile-settings">
    <div>
      <button class="setting-item" @click="handleLogoutUser">
        <QIcon class="setting-item__icon" name="fa-solid fa-power-off" />

        <h4 class="setting-item__text">{{ $t(`${I18N_PATH}.logoff`) }}</h4>
      </button>
    </div>
  </div>
</template>

<script>
const I18N_PATH = "partials.appCardProfile.section.settings";

import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default {
  name: "ActivitiesProfile",
  setup() {
    const $store = useStore();
    const $router = useRouter();

    const handleLogoutUser = async () => {
      $router.push({ name: "auth.login" });

      await $store.dispatch("AuthModule/invalidateUser");
    };

    return {
      I18N_PATH,
      handleLogoutUser,
    };
  },
};
</script>

<style lang="scss" scoped>
.profile-settings {
  .setting-item {
    display: flex;
    align-items: center;
    gap: 10px;

    border-radius: $default-border-radius;

    width: 100%;
    padding: 10px;
    font-size: 14px;

    color: $text-color-3;

    transition: 0.3s color, background-color ease-in;

    &:hover {
      background-color: $default-background;
    }

    &__text {
      font-size: 14px;
      line-height: 18px;
    }
  }
}
</style>
