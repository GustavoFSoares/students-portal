<template>
  <div class="certificates-page-card">
    <AvCard shadows>
      <template #header>
        <div class="certificates-page-card__image">
          <img :src="image" :alt="title" />
        </div>
      </template>

      <template #default>
        <h6 class="certificates-page-card__title">
          {{ title }}
        </h6>

        <div class="certificates-page-card__completed-date">
          <QIcon name="event" size="20px" />

          <span class="certificates-page-card__completed-date-text">
            {{ preparedDate }}
          </span>
        </div>
      </template>
    </AvCard>
  </div>
</template>

<script>
import AvCard from "atoms/AvCard.vue";
import { computed } from "vue";

export default {
  name: "CertificatesPageCard",
  components: {
    AvCard,
  },
  props: {
    image: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    completedDate: {
      type: Date,
    },
  },
  setup(props) {
    const preparedDate = computed(() => {
      if (!props.completedDate) {
        return "--/--/--";
      }

      return new Date(props.completedDate).toLocaleDateString();
    });

    return {
      preparedDate,
    };
  },
};
</script>

<style lang="scss" scoped>
.certificates-page-card {
  &__image {
    height: 145px;
    border-radius: 0 0 $defaultBorderRadius $defaultBorderRadius;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
    }
  }

  &__title {
    font-size: 12px;
    font-weight: $font-weight-semibold;
  }

  &__completed-date {
    margin-top: 10px;

    display: flex;
    gap: 5px;
    align-items: center;

    &-text {
      letter-spacing: 0.5px;
      font-size: 12px;
      font-weight: $font-weight-light;
    }
  }
}
</style>
