<template>
  <div class="user-card-header">
    <div class="avatar">
      <q-avatar size="90px" color="green" />
    </div>

    <div class="user-card-header__container">
      <div class="user">
        <div class="user-info">
          <h5 class="user-info__name">Selatiel</h5>
          <h6 class="user-info__level">Nível 2 Sábio</h6>
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

      <div class="card-reward">
        <router-link
          v-for="(rewardItem, rewardKey) in rewards"
          :key="rewardKey"
          :class="['card-reward-item', `card-reward-item--${rewardKey}`]"
          :to="{ name: rewardItem.route }"
        >
          <QIcon
            class="card-reward-item__icon"
            :name="getRewardIcon(rewardKey)"
          />

          <h6 class="card-reward-item__value">
            {{ levelFormatter(rewardItem.value) }}
          </h6>

          <h6 class="card-reward-item__label">
            {{ $t(`${I18N_PATH}.rewards.${rewardKey}`) }}
          </h6>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";

const I18N_PATH = "modules.home.userCard";

export default {
  name: "UserCardHeader",
  setup() {
    const indexes = ref({
      start: 1000,
      end: 2000,
    });
    const barProgress = ref(50);
    const rewards = ref({
      points: {
        route: "home",
        value: 1400,
      },
      coins: {
        route: "home",
        value: 0,
      },
    });

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

    return {
      indexes,
      barProgress,
      rewards,
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

  .card-reward {
    display: flex;
    gap: 10px;
    width: 100%;

    &-item {
      width: 100%;
      display: flex;
      gap: 5px;
      align-items: center;
      border: 2px solid $grey-transparent;
      border-radius: 8px;
      text-decoration: none;

      padding: 5px;
      transition: border-color, background-color 0.4s ease-in;

      &__icon {
        font-size: 22px;
      }

      &__value {
        font-size: 14px;
        font-weight: $font-weight-semibold;
      }

      &__label {
        color: $secondary;
        flex-grow: 1;
        text-align: end;
        font-size: 12px;
      }

      $rewards: (
        coins: $yellow-14,
        points: $primary,
      );

      @each $rewardItem, $rewardColor in $rewards {
        &--#{$rewardItem} {
          color: $rewardColor;
          border-color: rgba($rewardColor, 0.4);

          &:hover {
            background-color: rgba($rewardColor, 0.1);
          }
        }
      }
    }
  }
}
</style>
