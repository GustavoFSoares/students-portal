<template>
  <div class="user-profile">
    <article class="profile-points">
      <h2 class="profile-points__title">
        {{ $t(`${I18N_PATH}.points.label`) }}
      </h2>

      <div class="profile-points__content">
        <span class="profile-points__value">{{ rewards?.points }}</span>

        <QIcon class="profile-points__icon" name="fa-solid fa-star" />
      </div>
    </article>

    <article class="profile-level">
      <h2 class="profile-level__title">
        {{ $t(`${I18N_PATH}.level.label`) }}
      </h2>

      <div class="profile-level__content">
        <QIcon class="profile-level__icon" name="fa-solid fa-id-card" />

        <span class="profile-level__value">{{ levelName }}</span>
      </div>
    </article>
  </div>
</template>

<script>
const I18N_PATH = "partials.appCardProfile.section.userProfile";

import { computed } from "vue";
import { useStore } from "vuex";

export default {
  name: "UserProfile",
  setup() {
    const $store = useStore();

    const levelName = computed(
      () => $store.getters["AuthModule/userData"]?.levelName
    );

    const rewards = computed(() => $store.getters["AuthModule/rewardsData"]);

    return {
      I18N_PATH,
      levelName,
      rewards,
    };
  },
};
</script>

<style lang="scss" scoped>
.user-profile {
  display: flex;
  flex-direction: column;
  gap: 7px;

  .profile-points,
  .profile-level {
    &__title {
      color: $white;
      font-size: 15px;
      font-weight: $font-weight-semibold;
    }

    &__content {
      color: $white;
      font-size: 15px;
      line-height: 1;
    }
  }

  .profile-points {
    display: flex;
    justify-content: space-between;

    &__content {
      display: flex;
      align-items: center;
      gap: 5px;
    }
  }

  .profile-level {
    display: flex;
    flex-direction: column;
    gap: 5px;

    &__content {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    &__value {
      font-variant-caps: all-small-caps;
    }
  }
}
</style>
