<template>
  <div class="toolbar-settings">
    <div>
      <button class="setting-item" @click="handleLogoutUser" title="logout">
        <QIcon class="setting-item__icon" name="fa-solid fa-power-off" />
      </button>
    </div>
  </div>
</template>

<script>
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
      handleLogoutUser,
    };
  },
};
</script>

<style lang="scss" scoped>
.toolbar-settings {
  .setting-item {
    display: flex;
    align-items: center;
    gap: 10px;

    border-radius: $default-border-radius;

    width: 100%;
    font-size: 22px;

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
