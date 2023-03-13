<template>
  <AvCard class="certificate-card">
    <router-link
      :to="{ name: 'home.certificate-item', params: { id } }"
      class="certificate-card__wrapper"
    >
      <h4 class="certificate-title" :title="name">
        {{ name }}
      </h4>

      <h5 class="certificate-card__description" :title="description">
        {{ description }}
      </h5>

      <p class="certificate-card__conclusion-date">
        conclusão: {{ $filters.dateFormat(conclusionDate) }}
      </p>
    </router-link>
  </AvCard>
</template>

<script setup>
import AvCard from "atoms/AvCard.vue";

const props = defineProps({
  id: {
    type: [String, Number],
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  conclusionDate: {
    type: Date,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
.certificate-card {
  &__wrapper {
    display: flex;
    flex-direction: column;
    gap: 8px;

    position: relative;
  }

  .certificate-title {
    display: flex;
    flex-direction: column;
    gap: 2px;

    color: $text-color-3;
    font-size: 18px;

    text-overflow: ellipsis;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  }

  &__description {
    color: $text-color;
    font-size: 15px;

    text-overflow: ellipsis;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  &__conclusion-date {
    color: $text-color;
    font-size: 12px;
    text-align: end;
  }
}
</style>
