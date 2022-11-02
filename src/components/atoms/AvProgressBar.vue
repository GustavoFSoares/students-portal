<template>
  <div
    :class="['av-progress-bar', { 'av-progress-bar--inline': inline }]"
    :style="{
      '--bar-progress': `${progress}%`,
      '--bar-height': `${height}px`,
    }"
  >
    <div class="av-progress-bar-progress" />

    <div class="av-progress-bar-index">
      <slot>
        <div class="av-progress-bar-index__start">
          {{ levelFormatter(progress) }}%
        </div>
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "AvProgressBar",
  props: {
    progress: {
      type: Number,
      required: true,
    },
    inline: {
      type: Boolean,
      default: false,
    },
    height: {
      type: Number,
      default: 3,
    },
  },
  setup() {
    const levelFormatter = (val) => {
      return val.toLocaleString("pt-BR");
    };

    return {
      levelFormatter,
    };
  },
};
</script>

<style lang="scss" scoped>
.av-progress-bar {
  width: 100%;
  display: flex;
  flex-direction: column;

  &--inline {
    flex-direction: row;
    align-items: center;
    gap: 10px;
  }

  &-progress {
    content: "";
    width: 100%;
    height: var(--bar-height);

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
</style>
