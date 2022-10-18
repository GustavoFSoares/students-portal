<template>
  <div class="stages-list">
    <ol class="stages-list__list">
      <ul
        class="stages-list__line"
        v-for="(stageLine, stageLineIndex) in preparedStagesList"
        :key="stageLineIndex"
      >
        <QIcon
          v-if="stageLineIndex === 0"
          class="
            stages-list__decoration stages-list__decoration-half-start-curve
          "
          name="svguse:/icons.svg#course__half-curve"
        />

        <QIcon
          v-if="
            stageLineIndex % 2 !== 0 &&
            stageLineIndex !== preparedStagesList.length - 1
          "
          class="stages-list__decoration stages-list__decoration-start-curve"
          name="svguse:/icons.svg#course__curve"
        />

        <div class="stages-list__line-wrapper">
          <li
            class="stages-list__item"
            v-for="(stage, stageIndex) in stageLine"
            :key="stageIndex"
          >
            <StageItem
              :position="stage.position"
              :rank="stage.rank"
              :completed="stage.completed"
              @click="handleClickStage(stage.position)"
            />

            <StageItemSeparation v-if="stageLine.length - 1 !== stageIndex" />
          </li>
        </div>

        <QIcon
          v-if="stageLineIndex % 2 === 0"
          class="stages-list__decoration stages-list__decoration-end-curve"
          name="svguse:/icons.svg#course__curve"
        />
      </ul>
    </ol>
  </div>
</template>

<script>
import { computed, ref } from "vue";

import StageItem from "../components/StagesList/StageItem.vue";
import StageItemSeparation from "../components/StagesList/StageItemSeparation.vue";

export default {
  name: "StagesListPage",
  emits: ["open-stage"],
  components: {
    StageItem,
    StageItemSeparation,
  },
  props: {
    stages: {
      type: Array,
      required: true,
    },
  },
  setup(props, ctx) {
    const BREAK_LINE = 5;

    const stagesList = computed(() => props.stages);

    const preparedStagesList = computed(() => {
      const result = stagesList.value.reduce(
        (list, stage, stageIndex) => {
          if (!list.amount[list.lineCount]) {
            list.amount[list.lineCount] = new Array();
          }

          list.amount[list.lineCount].push(stage);

          list.itemCount += 1;

          if (list.itemCount >= BREAK_LINE) {
            list.lineCount += 1;
            list.itemCount = 0;
          }

          return list;
        },
        { lineCount: 0, itemCount: 0, amount: [] }
      );

      const data = result.amount.reduce((amount, line, lineIndex) => {
        let data = [...line];

        if (lineIndex % 2 !== 0) {
          data = data.reverse();
        }

        amount.push(data);

        return amount;
      }, []);

      return data;
    });

    const handleClickStage = (position) => {
      ctx.emit("open-stage", position);
    };

    return {
      stagesList,
      preparedStagesList,
      handleClickStage,
    };
  },
};
</script>

<style lang="scss" scoped>
.stages-list {
  display: flex;
  justify-content: center;
  margin-top: 50px;

  ul,
  ol {
    list-style: none;
  }

  &__list {
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 580px;
    gap: 50px;

    align-items: center;

    position: relative;
  }

  &__line {
    position: relative;
    width: 100%;

    &-wrapper {
      display: flex;
      flex-direction: row;
      width: 100%;
    }

    &:nth-of-type(odd) & {
      &-wrapper {
        justify-content: flex-start;
      }
    }

    &:nth-of-type(even) & {
      &-wrapper {
        justify-content: flex-end;
      }
    }
  }

  &__decoration {
    z-index: -1;
    &-half-start-curve {
      position: absolute;
      right: 100%;
      bottom: 40%;
      font-size: 90px;
    }

    &-start-curve {
      position: absolute;
      top: 45%;
      right: calc(95% + -2px);
      font-size: 150px;
      transform: rotate(180deg);
    }

    &-end-curve {
      position: absolute;
      left: 90%;
      top: 45%;
      font-size: 150px;
    }
  }

  &__item {
    display: flex;
    align-items: center;
    width: 100%;
    max-width: 116px;
    flex-grow: 1;
  }
}
</style>
