<template>
  <aside class="app-card-profile">
    <section class="profile-section">
      <h1 class="profile-section__title">
        {{ $t("partials.appCardProfile.section.userProfile.title") }}
      </h1>

      <div class="profile-section__content">
        <UserProfile />
      </div>
    </section>

    <section class="profile-section">
      <h1 class="profile-section__title">
        {{ $t("partials.appCardProfile.section.activities.title") }} |
        {{ $t("partials.appCardProfile.section.activities.subTitle") }}
      </h1>

      <div class="profile-section__content"></div>
    </section>
  </aside>
</template>

<script>
import UserProfile from "./UserProfile.vue";

export default {
  name: "AppCardProfile",
  components: {
    UserProfile,
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
