<template>
  <div class="stages-list-page">
    <ol class="stages-list-page__list">
      <ul
        class="stages-list-page__line"
        v-for="(stageLine, stageLineIndex) in preparedStagesList"
        :key="stageLineIndex"
      >
        <div class="stages-list-page__line-wrapper">
          <li
            class="stages-list-page__item"
            v-for="(stage, stageIndex) in stageLine"
            :key="stageIndex"
          >
            <StageItem
              :position="stage.position"
              :rank="stage.rank"
              :completed="stage.completed"
            />

            <StageItemSeparation v-if="stageLine.length - 1 !== stageIndex" />
          </li>
        </div>
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
  components: {
    StageItem,
    StageItemSeparation,
  },
  setup() {
    const stagesList = ref([
      { position: "1", rank: 1, completed: true },
      { position: "2", rank: 3, completed: true },
      { position: "3", rank: 2, completed: true },
      { position: "4", rank: 3, completed: true },
      { position: "5", rank: 2, completed: true },
      { position: "6", rank: 2, completed: true },
      { position: "7", rank: 2, completed: true },
      { position: "8", rank: 2, completed: true },
      { position: "9", rank: 2, completed: true },
      { position: "10", rank: 2, completed: true },
      { position: "11", rank: 1, completed: true },
      { position: "12", rank: 3, completed: true },
      { position: "13", rank: 2, completed: true },
      { position: "14", rank: 3, completed: true },
      { position: "15", rank: 2, completed: true },
      { position: "16", rank: 2, completed: true },
      { position: "17", rank: 2, completed: true },
    ]);

    const BREAK_LINE = 5;

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

    return {
      stagesList,
      preparedStagesList,
    };
  },
};
</script>

<style lang="scss" scoped>
.stages-list-page {
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
    // display: flex;
    // flex-direction: row;
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

  &__item {
    display: flex;
    align-items: center;
    width: 100%;
    max-width: 116px;
    flex-grow: 1;
  }
}
</style>
