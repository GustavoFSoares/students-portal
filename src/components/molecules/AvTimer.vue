<template>
  <div class="av-timer">
    <QCircularProgress
      class="av-timer__progress text-white"
      show-value
      font-size="16px"
      :value="currentPercentage"
      size="60px"
      :thickness="0.15"
      color="white"
      track-color="transparent"
    >
      <div class="av-timer__value">
        {{ currentTime }}
      </div>
    </QCircularProgress>
  </div>
</template>

<script setup>
import { computed, onMounted, onUpdated, ref, toRef } from "vue";

const $emits = defineEmits(["end-time"]);
const props = defineProps({
  startTime: {
    type: Number,
    required: true,
  },
  autoStart: {
    type: Boolean,
    default: false,
  },
});

let interval = null;
const currentTime = ref(props.startTime);

const currentPercentage = computed(
  () => (currentTime.value / props.startTime) * 100
);

const handleStart = () => {
  interval = setInterval(() => {
    currentTime.value -= 1;

    if (currentTime.value <= 0) {
      handleEndTimer();
    }
    // console.log("HERE", new Date().toLocaleTimeString());
  }, 1000);
};

const handleEndTimer = () => {
  restartTimer();
  $emits("end-time");
};

const restartTimer = () => {
  clearInterval(interval);
  currentTime.value = props.startTime;
};

onMounted(() => {
  if (props.autoStart) {
    handleStart();
  }
});

onUpdated(() => {
  restartTimer();

  if (props.autoStart) {
    handleStart();
  }
});
</script>

<style lang="scss" scoped>
.av-timer {
  background: hsla(201, 10%, 29%, 0.5);
  border-radius: 1000px;
  overflow: hidden;
  padding: 2px;

  &__progress {
  }

  &__value {
    font-weight: $font-weight-bold;
  }
}
</style>
