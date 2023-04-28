<template>
  <div class="toolbar-settings">
    <div>
      <button class="setting-item" @click="handleLogoutUser" title="logout">
        <QIcon class="setting-item__icon" name="fa-solid fa-power-off" />
      </button>
    </div>
  </div>
</template>

<script setup>
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const $store = useStore();
const $router = useRouter();

const handleLogoutUser = async () => {
  $router.push({ name: "auth.login" });

  await $store.dispatch("AuthModule/invalidateUser");
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

    color: $icon-color;

    transition: 0.3s color ease-in;

    &:hover {
      color: $icon-color-hover;
    }

    &__text {
      font-size: 14px;
      line-height: 18px;
    }
  }
}
</style>
