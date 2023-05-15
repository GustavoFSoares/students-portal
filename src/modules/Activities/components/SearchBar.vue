<template>
  <div class="search-bar" :class="{ 'search-bar--active': isActiveShowBar }">
    <div class="search-bar__input-wrapper">
      <transition name="search-bar__input">
        <QInput
          v-show="isActiveShowBar"
          class="search-bar__input"
          dense
          color="white"
          filled
          ref="inputElement"
          :model-value="modelValue"
          @update:modelValue="handleInput"
        />
      </transition>
    </div>

    <div class="search-bar__button-wrapper">
      <QBtn
        class="search-bar__button"
        padding="sm"
        icon="search"
        color="white"
        :disable="!!modelValue"
        @click="toggleSearchBar"
      />
    </div>
  </div>
</template>

<script>
import { ref, computed } from "vue";

export default {
  name: "search-bar",
  props: {
    modelValue: {
      type: String,
      default: null,
    },
  },
  emits: ["update:modelValue"],
  setup(props, ctx) {
    const showActiveBar = ref(!!props.modelValue);
    const inputElement = ref(null);

    const isActiveShowBar = computed(() => {
      return showActiveBar.value || !!props.modelValue;
    });

    const handleInput = (value) => {
      ctx.emit("update:modelValue", value);
    };

    const toggleSearchBar = async () => {
      showActiveBar.value = !showActiveBar.value;

      if (showActiveBar.value) {
        await inputElement.value;
        inputElement.value.focus();
      }
    };

    return {
      inputElement,
      isActiveShowBar,
      handleInput,
      toggleSearchBar,
    };
  },
};
</script>

<style lang="scss" scoped>
.search-bar {
  display: flex;
  justify-content: space-between;
  gap: 20px;

  &__input {
    &-enter-active {
      animation: bounce-in 0.8s;
    }
    &-leave-active {
      animation: bounce-in 0.8s reverse;
    }

    @keyframes bounce-in {
      0% {
        width: 0px;
        opacity: 0;
      }
      1% {
        width: 1%;
        opacity: 0;
      }
      10% {
        opacity: 1;
      }
      100% {
        opacity: 1;
        width: 100%;
      }
    }

    &-wrapper {
      flex-grow: 1;
    }
  }

  &__button {
    color: $primary !important;
  }

  &--active & {
    &__input {
      visibility: initial;
      width: 100%;
    }
  }
}
</style>
