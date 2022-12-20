<template>
  <AvPage class="edit-user" no-header>
    <template #default>
      <div class="edit-user__wrapper">
        <div class="user-content"></div>

        <div class="avatar-wrapper">
          <AvatarViewer
            class="avatar-wrapper__viewer"
            :option="avatarOptions"
          />

          <AvatarConfigurator class="avatar-wrapper__configurator" />
        </div>
      </div>
    </template>
  </AvPage>
</template>

<script>
// const I18N_PATH = "modules.activities.pages.stageList";
import { computed } from "vue";
import { useStore } from "vuex";

import AvPage from "organisms/AvPage.vue";
import AvatarViewer from "../partials/AvatarViewer.vue";
import AvatarConfigurator from "../partials/AvatarConfigurator.vue";

export default {
  name: "EditUser",
  components: {
    AvPage,
    AvatarViewer,
    AvatarConfigurator,
  },
  setup() {
    const $store = useStore();

    const avatarOptions = computed(
      () => $store.getters["AuthModule/avatar/avatarOptions"]
    );

    return {
      avatarOptions,
    };
  },
};
</script>

<style lang="scss" scoped>
.edit-user {
  &__wrapper {
    display: flex;
  }

  .user-content {
    flex-grow: 1;
  }

  .avatar-wrapper {
    display: flex;
    gap: 20px;

    &__viewer {
      margin-top: 40px;
    }

    &__configurator {
      overflow-x: auto;
      height: 870px;

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
