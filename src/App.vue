<template>
  <router-view />
</template>

<script>
import { useAvatarCreatorStore } from "vue-avatar-creator"
import { defineComponent, onMounted } from 'vue'

import { useStore } from "vuex";


export default defineComponent({
  name: 'App',
  setup() {
    const $store = useStore();

    const avatarStore = useAvatarCreatorStore();

    onMounted(() => {
      setTimeout(() => {
        const avatarData = $store.getters['AuthModule/avatar/avatarOptions']
        avatarStore.setAvatar(avatarData);
      }, 100)
    })
  }
});
</script>
