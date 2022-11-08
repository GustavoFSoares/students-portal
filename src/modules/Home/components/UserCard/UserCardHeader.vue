<template>
  <div class="user-card-header">
    <div class="avatar">
      <q-avatar size="90px" color="green" />
    </div>

    <div class="user-card-header__container">
      <div class="user">
        <div class="user-info">
          <h5 class="user-info__name">{{ userData.name }}</h5>
          <h6 class="user-info__level">{{ userData.levelName }}</h6>
        </div>

        <div class="user-edit">
          <QBtn
            flat
            round
            icon="edit"
            color="primary"
            @click="handleEditUser"
          />
        </div>
      </div>

      <div class="level-bar" :style="{ '--bar-progress': `${barProgress}%` }">
        <div class="level-bar-progress" />

        <div class="level-bar-index">
          <div class="level-bar-index__start">
            {{ levelFormatter(indexes.start) }}
          </div>

          <div class="level-bar-index__end">
            {{ levelFormatter(indexes.end) }}
          </div>
        </div>
      </div>

      <AvReward :points="rewardsData.points" :coins="rewardsData.coins" />
    </div>
  </div>
</template>

<script>
import { computed, onMounted, ref } from "vue";
import { useStore } from "vuex";

import AvReward from "molecules/AvReward.vue";

const I18N_PATH = "modules.home.userCard";

export default {
  name: "UserCardHeader",
  components: {
    AvReward,
  },
  setup() {
    const $store = useStore();

    const userData = computed(() => $store.getters["AuthModule/userData"]);
    const rewardsData = ref({ points: 0, coints: 0 });

    const indexes = ref({
      start: 1000,
      end: 2000,
    });

    const barProgress = computed(
      () => (rewardsData.value.points / indexes.value.end) * 100
    );

    const levelFormatter = (val) => {
      return val.toLocaleString("pt-BR");
    };

    const getRewardIcon = (rewardName) => {
      const rewards = {
        coins: "o_paid",
        points: "o_grade",
      };

      return rewards[rewardName] || null;
    };

    const handleEditUser = () => {
      alert("edit user");
    };

    onMounted(async () => {
      rewardsData.value = $store.getters["AuthModule/rewardsData"];
    });

    return {
      userData,
      indexes,
      barProgress,
      rewardsData,
      levelFormatter,
      getRewardIcon,
      handleEditUser,
      I18N_PATH,
    };
  },
};
</script>

<style lang="scss" scoped>
.user-card-header {
  padding: 20px 0;

  &__container {
    padding: 0 20px;
    width: 100%;

    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    margin-top: 10px;
  }

  .avatar {
    z-index: 0;
    position: relative;

    width: 100%;
    height: 100%;

    display: flex;
    justify-content: center;

    &:before {
      content: "";
      background: $primary;

      position: absolute;
      z-index: -1;
      top: -50%;

      width: 100%;
      height: 100%;
    }
  }

  .user {
    width: 100%;

    display: flex;
    align-items: center;

    &-info {
      flex-grow: 1;
      display: grid;
      gap: 5px;

      &__name {
        font-size: 18px;
        color: $primary;
      }

      &__level {
        font-size: 12px;
        color: $secondary;
        font-weight: $font-weight-bold;

        &::first-letter {
          text-transform: uppercase;
        }
      }
    }
  }

  .level-bar {
    width: 100%;

    &-progress {
      content: "";
      width: 100%;
      height: 5px;

      border-radius: 4px;
      overflow: hidden;

      background-color: $grey-transparent;

      position: relative;

      &:before {
        content: "";
        position: absolute;

        background: $primary;
        width: var(--bar-progress);
        height: 100%;
      }
    }

    &-index {
      display: flex;
      justify-content: space-between;
      color: $secondary;
      font-weight: $font-weight-bold;
    }
  }
}
</style>
