<template>
  <AvCard bordered>
    <div :class="['conquest-card', { 'conquest-card--obtained': obtained }]">
      <div class="conquest-card__image">
        <img :src="badge" :alt="title" />
      </div>

      <h5 class="conquest-card__title">{{ title }}</h5>
    </div>
  </AvCard>
</template>

<script>
import AvCard from "atoms/AvCard.vue";

export default {
  name: "ConquestCard",
  components: {
    AvCard,
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    badge: {
      type: String,
      default:
        "https://w7.pngwing.com/pngs/244/211/png-transparent-badge-flag-leader-mountain-sport-top-winner-sport-achievment-badges-icon-thumbnail.png",
      required: true,
    },
    obtained: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
.conquest-card {
  min-height: 115px;
  display: flex;
  gap: 20px;

  &--obtained & {
    &__image img {
      filter: none;
    }
  }

  &__image {
    width: 55px;

    img {
      width: 100%;
      filter: grayscale(100%);
    }
  }

  &__title {
    margin-top: 10px;
    font-size: 10px;
    font-weight: $font-weight-semibold;
  }
}
</style>
