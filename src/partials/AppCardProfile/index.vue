<template>
  <aside class="app-card-profile">
    <section class="profile-section">
      <h1 class="profile-section__title">
        {{ $t(`${I18N_PATH}.userProfile.title`) }}
      </h1>

      <div class="profile-section__content">
        <UserProfile />
      </div>
    </section>

    <section class="profile-section">
      <h1 class="profile-section__title">
        {{ $t(`${I18N_PATH}.activities.title`) }} |
        {{ $t(`${I18N_PATH}.activities.subTitle`) }}
      </h1>

      <div class="profile-section__content">
        <ActivitiesProfile />
      </div>
    </section>

    <section class="profile-section">
      <h1 class="profile-section__title">
        {{ $t(`${I18N_PATH}.settings.title`) }}
      </h1>

      <div class="profile-section__content">
        <ProfileSettings />
      </div>
    </section>
  </aside>
</template>

<script>
const I18N_PATH = "partials.appCardProfile.section";

import UserProfile from "./UserProfile.vue";
import ProfileSettings from "./ProfileSettings.vue";
import ActivitiesProfile from "./ProfileActivities.vue";

export default {
  name: "AppCardProfile",
  components: {
    UserProfile,
    ProfileSettings,
    ActivitiesProfile,
  },
  setup() {
    return {
      I18N_PATH,
    };
  },
};
</script>

<style lang="scss" scoped>
.app-card-profile {
  padding: 26px;
  flex-basis: 240px;
  border-right: $border-line;
  flex-shrink: 0;

  display: grid;
  gap: 20px;

  .profile-section {
    display: grid;
    gap: 14px;

    &__title {
      font-size: 1rem;
      font-weight: $font-weight-normal;
      color: $text-color;
    }
  }
}
</style>
