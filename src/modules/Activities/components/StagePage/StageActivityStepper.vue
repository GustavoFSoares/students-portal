<template>
  <div class="stage-activity-stepper">
    <h2 class="stage-activity-stepper__subtile">
      <span v-if="isInternalGame">
        {{ $t(`${I18N_PATH}.internalGame.${currentActivityStep.path}`) }}
      </span>

      <span v-else>
        {{ $t(`${I18N_PATH}.internalGame.${activityType}`) }}
      </span>
    </h2>

    <div class="stepper-content">
      <div class="stepper-content__activity-wrapper">
        <component
          v-if="stageFileTypeComponent"
          :is="stageFileTypeComponent"
          :path="currentActivityStep.path"
          :parameters="currentActivityStep.parameters || undefined"
          @finish="handleNextStep"
        />
      </div>

      <div class="stage-activity-stepper__steps-counter">
        <div
          v-for="(_activityStep, activityStepIndex) of activitySteps"
          :key="activityStepIndex"
          :class="[
            'stage-activity-stepper__step-item',
            {
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
import { computed, onMounted, ref, toRef } from "vue";

import StageFileTypeAudio from "./StageFileTypeAudio.vue";
import StageFileTypeImage from "./StageFileTypeImage.vue";
import StageFileTypePdf from "./StageFileTypePdf.vue";
import StageFileTypeVideo from "./StageFileTypeVideo.vue";
import StageFileGameExternal from "./StageFileGameExternal.vue";
import StageFileGameInternal from "./StageFileGameInternal.vue";

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

const currentStep = ref(0);
const activitySteps = ref([...props.activitySteps]);

const currentActivityStep = computed(() => {
  return props.activitySteps ? activitySteps.value[currentStep.value] : null;
});

const stageFileTypeComponent = computed(() => {
  return activitiesMap[props.activityType] || null;
});

const isInternalGame = computed(() => {
  return props.activityType === "game-internal";
});

const handleNextStep = () => {
  const currentPosition = currentStep.value + 1;

  if (currentPosition == activitySteps.value.length) {
    alert("acabou");
    return;
  }

  currentStep.value += 1;
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

    &--selected {
      background: $grey-8;
    }
  }
}
</style>
