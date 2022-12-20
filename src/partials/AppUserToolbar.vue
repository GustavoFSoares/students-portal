<template>
  <router-link class="app-user-toolbar" :to="{ name: 'user.edit' }">
    <div class="toolbar-avatar">
      <AvatarViewer :option="avatarOptions" :size="30" />
    </div>

    <h1 class="toolbar-user-name" :title="userName">
      {{ userName }}
    </h1>
  </router-link>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";

import AvatarViewer from "organisms/AvatarViewer.vue";

export default {
  name: "AppUserToolbar",
  components: {
    AvatarViewer,
  },
  setup() {
    const $store = useStore();

    const userName = computed(
      () => $store.getters["AuthModule/userData"]?.name
    );

    const avatarOptions = computed(
      () => $store.getters["AuthModule/avatar/presentAvatarOptions"]
    );

    return {
      userName,
      avatarOptions,
    };
  },
};
</script>

<style lang="scss" scoped>
.app-user-toolbar {
  height: 100%;

  display: flex;
  align-items: center;
  gap: 15px;

  padding: 15px 20px;

  text-decoration: none;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: $default-background;
  }

  .toolbar-user-name {
    font-size: 15px;
    color: $text-color-3;

    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
}
</style>
