<template>
  <div class="no-activies">
    <AvCard>
      <h1 class="no-activies__title">
        <span>{{ $t(`${I18N_PATH}.title.start`) }}</span>
        <strong>{{ $t(`${I18N_PATH}.title.inProgress`) }}</strong>
        <span>{{ $t(`${I18N_PATH}.title.end`) }}</span>
      </h1>
    </AvCard>
  </div>
</template>

<script>
const I18N_PATH = "modules.activities.partials.noActivities";

import AvCard from "atoms/AvCard.vue";

export default {
  name: "NoActivities",
  components: {
    AvCard,
  },
  setup() {
    return {
      I18N_PATH,
    };
  },
};
</script>

<style lang="scss" scoped>
.no-activies {
  display: flex;
  justify-content: center;

  &__title {
    font-size: 20px;
    color: $text-color-2;

    strong {
      color: $text-color-3;
    }
  }
}
</style>
