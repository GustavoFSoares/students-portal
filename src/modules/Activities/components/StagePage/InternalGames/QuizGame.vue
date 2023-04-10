<template>
  <div :class="['quiz-game', { 'quiz-game--submited': isSubmited }]">
    <div class="quiz-game__questions">
      <div
        class="quiz-game-question"
        v-for="(question, questionIndex) in quizQuestions"
        :key="questionIndex"
      >
        <div class="quiz-game-question__counter-wrapper">
          <h2 class="quiz-game-question__counter">
            Questão {{ questionIndex + 1 }}
          </h2>
        </div>

        <h3 class="quiz-game-question__title">
          {{ question.title }}
        </h3>

        <div class="quiz-game__alternatives">
          <QRadio
            v-for="(alternative, alternativeIndex) in question.alternatives"
            :key="`q${questionIndex}-a${alternativeIndex}`"
            :disable="isSubmited"
            :class="[
              'quiz-game-alternative',
              {
                'quiz-game-alternative--correct': alternative.isCorrect,
                'quiz-game-alternative--wrong':
                  !alternative.isCorrect &&
                  `q${questionIndex}-a${alternativeIndex}` ===
                    questionsResponse[questionIndex],
              },
            ]"
            v-model="questionsResponse[questionIndex]"
            :val="`q${questionIndex}-a${alternativeIndex}`"
            size="xs"
            dense
          >
            <span class="quiz-game-alternative__index">
              {{ ALPHABET[alternativeIndex] }})
            </span>

            <span class="quiz-game-alternative__text">
              {{ alternative.text }}
            </span>
          </QRadio>
        </div>
      </div>
    </div>

    <div class="quiz-game__submit">
      <QBtn
        label="Responder"
        color="secondary"
        :disable="isSubmited"
        @click="handleSubmit"
      />
    </div>
  </div>
</template>

<script setup>
import { defineProps, onMounted, ref } from "vue";

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

const props = defineProps({
  parameters: {
    type: Array,
  },
});

const isSubmited = ref(false);
const questionsResponse = ref({});
const quizQuestions = ref(props.parameters);

const handleSubmit = () => {
  isSubmited.value = true;
};
</script>

<style lang="scss" scoped>
.quiz-game {
  width: 100%;
  height: 100%;
  background: $default-background;
  padding: 20px;
  color: $text-color-3;
  border-radius: 8px;

  overflow: auto;

  &--submited & {
    &-alternative {
      &--correct {
        color: $positive;
      }

      &--wrong {
        color: $negative;
      }
    }
  }

  &::-webkit-scrollbar {
    width: 8px;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background: $text-color-3;
    border-radius: 10px;
  }

  &__questions {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  &__alternatives {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }

  &__submit {
    width: 100%;

    display: flex;
    justify-content: flex-end;
  }

  &-question {
    display: flex;
    flex-direction: column;
    gap: 10px;

    &__counter {
      &-wrapper {
        position: relative;
        display: flex;
        align-items: center;

        &:after {
          content: "";
          width: 100%;
          height: 1px;
          background: $text-color-3;
        }
      }

      white-space: nowrap;
      background: $text-color-3;
      color: $background;
      font-weight: 600;

      font-size: 22px;
      padding: 5px;
      border-radius: 6px;
    }

    &__title {
      font-size: 18px;
      color: $text-color-3;
      margin: 0 5px;
    }
  }

  &-alternative {
    color: $text-color-2;
    margin: 0 5px;

    :deep {
      .q-radio__bg {
        color: $text-color-2;
      }
    }
  }
}
</style>
