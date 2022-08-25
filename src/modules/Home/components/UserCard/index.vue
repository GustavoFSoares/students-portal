<template>
  <AvCard class="user-card" header-color="primary">
    <template #header>
      <UserCardHeader />
    </template>

    <template #default>
      <div class="points">points</div>

      <div class="navigation">navigation</div>
    </template>
  </AvCard>
</template>

<script>
import AvCard from "atoms/AvCard.vue";

import UserCardHeader from "./UserCardHeader.vue";

export default {
  name: "UserCard",
  components: {
    AvCard,
    UserCardHeader,
  },
};
</script>

<style lang="scss" scoped>
.user-card {
  min-width: 360px;
}
</style>
