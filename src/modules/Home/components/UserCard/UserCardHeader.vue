<template>
  <div class="user-card-header">
    <q-avatar class="user-card-header__avatar" size="90px" color="green" />

    <div class="user">
      <div class="user-info">
        <h5 class="user-info__name">Selatiel</h5>
        <h6 class="user-info__level">Nível 2 Sábio</h6>
      </div>

      <div class="user-edit">
        <QBtn flat round icon="edit" color="primary" />
      </div>
    </div>

    <div class="level-bar" :style="{ '--bar-progress': `${barProgress}%` }">
      <div class="level-bar-progress" />

      <div class="level-bar-index">
        <div class="level-bar-index__start">
          {{ levelFormatter(indexes.start) }}
        </div>

        <div class="level-bar-index__end">
          {{ levelFormatter(indexes.end) }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  name: "UserCardHeader",
  setup() {
    const indexes = ref({
      start: 1000,
      end: 2000,
    });
    const barProgress = ref(50);

    const levelFormatter = (val) => {
      return val.toLocaleString("pt-BR");
    };

    return {
      indexes,
      barProgress,
      levelFormatter,
    };
  },
};
</script>

<style lang="scss" scoped>
.user-card-header {
  // background-color: $primary;
  padding: 20px;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;

  .user {
    width: 100%;

    display: flex;
    align-items: center;

    &-info {
      flex-grow: 1;
      display: grid;
      gap: 5px;

      &__name {
        font-size: 18px;
        color: $primary;
      }

      &__level {
        font-size: 12px;
        color: $secondary;
        font-weight: bold;
      }
    }

    &-edit {
    }
  }

  .level-bar {
    width: 100%;

    &-progress {
      content: "";
      width: 100%;
      height: 5px;

      border-radius: 4px;
      overflow: hidden;

      background-color: #e8e8e8;

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
      font-weight: bold;
    }
  }

  &__background {
  }
}
</style>
