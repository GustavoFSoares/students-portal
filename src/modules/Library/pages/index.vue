<template>
  <div class="library-page">
    <q-expansion-item
      class="activity-library"
      v-for="(activity, activityIndex) in activitiesOfLibrary"
      :key="activityIndex"
      group="somegroup"
    >
      <template #header>
        <LibraryCardHeader
          :name="activity.name"
          :description="activity.description"
          :cover="activity.cover"
        />
      </template>

      <template #default>
        <q-card>
          <q-card-section>
            <p
              class="library-page__no-data"
              v-if="activity.stages.length === 0"
            >
              sem documentos para baixar
            </p>

            <div v-else>
              <LibraryCardContent :stages="activity.stages" />
            </div>
          </q-card-section>
        </q-card>
      </template>
    </q-expansion-item>
  </div>
</template>

<script setup>
import { useStore } from "vuex";
import { useI18n } from "vue-i18n";
import { computed, ref } from "vue";

import LibraryCardHeader from "../partials/LibraryCardHeader.vue";
import LibraryCardContent from "../partials/LibraryCardContent.vue";

const I18N_PATH = "modules.library";

const $store = useStore();

const activitiesOfLibrary = computed(
  () => $store.getters["LibraryModule/getActivitiesOfLibrary"]
);
</script>

<style lang="scss" scoped>
.library-page {
  display: flex;
  flex-direction: column;
  gap: 15px;

  .activity-library {
    background: $white;
    border-radius: $default-border-radius;
    overflow: hidden;
  }

  &__no-data {
    font-size: 18px;
    font-weight: $font-weight-semibold;
    color: $text-color-1;
    text-align: center;
  }
}
</style>
