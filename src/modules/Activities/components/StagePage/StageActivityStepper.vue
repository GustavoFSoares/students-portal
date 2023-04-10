<template>
  <div class="stage-activity-stepper">
    <h2 class="stage-activity-stepper__subtile">
      {{ currentActivityStep.path }}
    </h2>

    <div class="stepper-content">
      <div class="stepper-content__activity-wrapper">
        {{ currentActivityStep }}<br />

        <p>fim</p>
        <!-- <component
          v-if="stageFileTypeComponent"
          :is="stageFileTypeComponent"
          :path="selectedFile.target"
          :parameters="selectedFile.parameters || undefined"
        /> -->
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

import StageFileGameInternal from "./StageFileGameInternal.vue";
import StageFileGameExternal from "./StageFileGameExternal.vue";
import StageFileTypeAudio from "./StageFileTypeAudio.vue";
import StageFileTypeImage from "./StageFileTypeImage.vue";
import StageFileTypePdf from "./StageFileTypePdf.vue";
import StageFileTypeVideo from "./StageFileTypeVideo.vue";

const props = defineProps({
  activitySteps: {
    type: Array,
    required: true,
  },
  activityType: {
    type: Array,
    required: true,
  },
});

const activitySteps = ref([
  ...props.activitySteps,
  ...props.activitySteps,
  ...props.activitySteps,
]);

const currentStep = ref(1);

const currentActivityStep = computed(() => {
  return props.activitySteps ? activitySteps.value[currentStep.value] : null;
});

const stageFileTypeComponent = computed(() => {
  return stageFilesMap[activityTypeType] || null;
});
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
