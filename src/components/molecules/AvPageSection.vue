<template>
  <section class="av-page-section">
    <AvCard>
      <div class="av-page-section__header">
        <slot name="header">
          <h1 class="av-page-section__title">{{ title }}</h1>

          <div class="av-page-section__custom-header" v-if="haveHeaderContent">
            <slot name="header-content" />
          </div>

          <div class="av-page-section__close" v-if="!hideCloseIcon">
            <QBtn flat round icon="close" @click="handleClose" />
          </div>
        </slot>
      </div>

      <div class="av-page-section__content">
        <slot name="default" />
      </div>
    </AvCard>
  </section>
</template>

<script>
import { computed } from "vue";

import AvCard from "atoms/AvCard.vue";

export default {
  name: "av-page-section",
  emits: ["close"],
  components: {
    AvCard,
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    hideCloseIcon: {
      type: Boolean,
    },
  },
  setup(_, ctx) {
    const handleClose = () => {
      ctx.emit("close");
    };

    const haveHeaderContent = computed(() => {
      return !!ctx.slots["header-content"];
    });

    return {
      haveHeaderContent,
      handleClose,
    };
  },
};
</script>

<style lang="scss" scoped>
.av-page-section {
  &__header {
    width: 100%;

    display: flex;
    gap: 20px;

    justify-content: space-between;
    align-items: center;
  }

  &__title {
    font-size: 16px;
    font-weight: $font-weight-bold;
  }

  &__custom-header {
    flex-grow: 1;
  }

  &__content {
    margin-top: 35px;
  }
}
</style>
