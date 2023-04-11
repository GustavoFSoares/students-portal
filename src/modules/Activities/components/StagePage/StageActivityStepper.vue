<template>
  <div class="stage-activity-stepper">
    <h2 class="stage-activity-stepper__subtile">
      <span v-if="isInternalGame">
        {{ $t(`${I18N_PATH}.internalGame.${currentActivityStep.path}`) }}
      </span>

      <span v-else>
        {{ $t(`${I18N_PATH}.${activityType}`) }}
      </span>
    </h2>

    <div class="stepper-content">
      <div class="stepper-content__activity-wrapper">
        <component
          v-if="showStep && stageFileTypeComponent"
          :is="stageFileTypeComponent"
          :path="currentActivityStep.path"
          :parameters="currentActivityStep.parameters || undefined"
          :is-last="currentStep + 1 === preparedActivitySteps.length"
          @finish="handleNextStep"
        />
      </div>

      <div class="stage-activity-stepper__steps-counter">
        <button
          v-for="(activityStep, activityStepIndex) of preparedActivitySteps"
          :key="activityStepIndex"
          @click="handleNextStep(activityStepIndex)"
          :class="[
            'stage-activity-stepper__step-item',
            {
              'stage-activity-stepper__step-item--completed':
                activityStep.completed,
              'stage-activity-stepper__step-item--selected':
                activityStepIndex === currentStep,
            },
          ]"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { computed, nextTick, onMounted, ref, toRef } from "vue";

import StageFileTypeAudio from "./StageFileTypeAudio.vue";
import StageFileTypeImage from "./StageFileTypeImage.vue";
import StageFileTypePdf from "./StageFileTypePdf.vue";
import StageFileTypeVideo from "./StageFileTypeVideo.vue";
import StageFileGameExternal from "./StageFileGameExternal.vue";
import StageFileGameInternal from "./StageFileGameInternal.vue";

const $router = useRouter();

const I18N_PATH = "modules.courses.stagePage.activities";

const props = defineProps({
  activitySteps: {
    type: Array,
    required: true,
  },
  activityType: {
    type: String,
    required: true,
  },
});

const activitiesMap = {
  music: StageFileTypeAudio,
  image: StageFileTypeImage,
  document: StageFileTypePdf,
  video: StageFileTypeVideo,
  "game-external": StageFileGameExternal,
  "game-internal": StageFileGameInternal,
};

const showStep = ref(true);
const currentStep = ref(0);
const preparedActivitySteps = ref(
  [...props.activitySteps].map((step) => ({ ...step, completed: false }))
);

const currentActivityStep = computed(() => {
  return getCurrentStep() || null;
});

const stageFileTypeComponent = computed(() => {
  return activitiesMap[props.activityType] || null;
});

const isInternalGame = computed(() => {
  return props.activityType === "game-internal";
});

const getCurrentStep = () => {
  preparedActivitySteps.value[currentStep.value].completed = true;

  return preparedActivitySteps.value
    ? preparedActivitySteps.value[currentStep.value]
    : null;
};

const handleNextStep = async (nextStep = currentStep.value + 1) => {
  if (nextStep == preparedActivitySteps.value.length) {
    $router.go(-1);
    return;
  }

  showStep.value = false;

  await nextTick();

  showStep.value = true;
  currentStep.value = nextStep;
};
</script>

<style lang="scss" scoped>
.stage-activity-stepper {
  display: flex;
  flex-direction: column;
  gap: 15px;

  &__subtile {
    font-size: 30px;
    color: $text-color;
  }

  .stepper-content {
    &__activity-wrapper {
      min-height: 55vh;
    }
  }

  &__steps-counter {
    display: flex;
    gap: 5px;
    justify-content: center;
  }

  &__step-item {
    width: 80px;
    height: 8px;
    border-radius: $default-border-radius;
    background: $default-background;

    pointer-events: none;

    &--completed {
      pointer-events: initial;
      background: $grey-8;
    }

    &--selected {
      background: $grey-13;
    }
  }
}
</style>
