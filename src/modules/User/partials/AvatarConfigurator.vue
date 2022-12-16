<template>
  <aside class="avatar-configurator">
    <SectionWrapper :title="$t(`${I18N_PATH}.wrapperShape`)">
      <ul class="wrapper-shape">
        <li
          v-for="wrapperShape in SETTINGS.wrapperShape"
          :key="wrapperShape"
          class="wrapper-shape__item"
          :title="$t(`${I18N_PATH}.wrapperShapes.${wrapperShape}`)"
        >
          <!-- @click="switchWrapperShape(wrapperShape)" -->
          <div class="shape" :class="[wrapperShape]" />
          <!-- { active: wrapperShape === avatarOption.wrapperShape }, -->
        </li>
      </ul>
    </SectionWrapper>

    <SectionWrapper :title="$t(`${I18N_PATH}.backgroundColor`)">
      <ul class="color-list">
        <li
          v-for="bgColor in SETTINGS.backgroundColor"
          :key="bgColor"
          class="color-list__item"
        >
          <!-- @click="switchBgColor(bgColor)" -->
          <div
            :style="{ background: bgColor }"
            class="bg-color"
            :class="{
              transparent: bgColor === 'transparent',
            }"
          />
          <!-- active: bgColor === avatarOption.background.color, -->
        </li>
      </ul>
    </SectionWrapper>

    <SectionWrapper
      v-for="s in sections"
      :key="s.widgetType"
      :title="$t(`${I18N_PATH}.${s.widgetType}`)"
    >
      <details
        v-if="
          s.widgetType === WidgetType.Tops ||
          s.widgetType === WidgetType.Clothes
        "
        class="color-picker"
      >
        <summary class="color">{{ $t(`${I18N_PATH}.colors`) }}</summary>
        <ul class="color-list">
          <li
            v-for="fillColor in SETTINGS.commonColors"
            :key="fillColor"
            class="color-list__item"
          >
            <!-- @click="setWidgetColor(s.widgetType, fillColor)" -->
            <div
              :style="{ background: fillColor }"
              class="bg-color"
              :class="{}"
            />
            <!-- active: fillColor === getWidgetColor(s.widgetType), -->
          </li>
        </ul>
      </details>

      <ul class="widget-list">
        <li
          v-for="it in s.widgetList"
          :key="it.widgetShape"
          class="list-item"
          :class="{}"
          v-html="it.svgRaw"
        />
      </ul>
    </SectionWrapper>

    <!-- <div v-for="(setting, settingIndex) in mappedColors" :key="settingIndex">
      --- {{ settingIndex }} - {{ setting }}---<br />
    </div> -->
  </aside>
</template>

<script>
const I18N_PATH = "modules.user.edit.avatar.configuratorBar";

import { computed, onMounted, reactive, ref } from "vue";

import { previewData } from "@vue-color-avatar/utils/dynamic-data";
import { AVATAR_LAYER, SETTINGS } from "@vue-color-avatar/utils/constant";
import { WidgetType } from "@vue-color-avatar/enums";

import SectionWrapper from "../components/SectionWrapper.vue";

export default {
  name: "avatar-configurator",
  components: {
    SectionWrapper,
  },
  setup() {
    const sections = ref([]);
    const sectionList = reactive(Object.values(WidgetType));

    const filterForms = (target) => {
      const filteredKeys = Object.keys(SETTINGS).filter((key) =>
        key.includes(target)
      );

      return filteredKeys.reduce((amount, key) => {
        amount[key.replace(target, "")] = SETTINGS[key];

        return amount;
      }, {});
    };

    const mappedGender = computed(() => filterForms("gender"));
    const mappedShapes = computed(() => filterForms("Shape"));
    const mappedColors = computed(() => filterForms("Color"));

    async function getWidgets(widgetType) {
      const list = SETTINGS[`${widgetType}Shape`];

      const promises = list.map(async (widget) => {
        if (widget !== "none" && previewData?.[widgetType]?.[widget]) {
          return (await previewData[widgetType][widget]()).default;
        }
        return "X";
      });
      const svgRawList = await Promise.all(promises).then((raw) => {
        return raw.map((svgRaw, i) => {
          return {
            widgetType,
            widgetShape: list[i],
            svgRaw,
          };
        });
      });
      return svgRawList;
    }

    onMounted(async () => {
      const a = await Promise.all(
        sectionList.map((section) => {
          return getWidgets(section);
        })
      );
      console.log(a);

      sections.value = sectionList.map((li, i) => {
        return {
          widgetType: li,
          widgetList: a[i],
        };
      });
    });

    return {
      I18N_PATH,
      AVATAR_LAYER,
      SETTINGS,
      sections,
      WidgetType,
      mappedGender,
      mappedShapes,
      mappedColors,
    };
  },
};
</script>

<style lang="scss" scoped>
.avatar-configurator {
  width: 20rem;

  color: $text-color-3;

  $color-accent: hsl(241, 99%, 70%);
  $color-dark: hsl(216, 14%, 14%);
  $color-text: hsl(211, 19%, 70%);
  $color-stroke: $color-text;
  $color-configurator: $color-dark;

  .wrapper-shape {
    display: flex;
    align-items: center;

    .wrapper-shape__item {
      padding: 0.4rem 0.5rem;
      cursor: pointer;

      .shape {
        display: inline-block;
        width: 1.5rem;
        height: 1.5rem;
        background-color: $color-text;
        transition: background-color 0.2s;

        &.circle {
          border-radius: 50%;
        }

        &.squircle {
          border-radius: 20%;
        }

        &.active {
          background-color: $color-accent;
        }
      }
    }
  }

  .color-picker {
    margin: 1rem 0 0.5rem 0;

    summary {
      display: list-item;
      color: darken($color-text, 20);
      font-size: small;
      cursor: pointer;
      user-select: none;
    }
  }

  .color-list {
    display: flex;
    flex-wrap: wrap;
    align-items: center;

    &__item {
      position: relative;
      z-index: 1;
      width: calc(100% / 7);
      padding: 0.6rem 0;
      cursor: pointer;
      transition: transform 0.2s;

      .bg-color {
        position: relative;
        box-sizing: content-box;
        width: 1.3em;
        height: 1.3em;
        margin: 0 auto;
        font-size: 16px;
        border-radius: 50%;
        box-shadow: 0 0 0.05em 0.2em $color-configurator;

        &.transparent {
          background: #fff !important;

          &::after {
            position: absolute;
            top: 50%;
            left: 50%;
            z-index: 1;
            color: #ff4757;
            font-weight: bold;
            font-size: 1.8rem;
            transform: translate(-50%, -50%) scale(0.5);
            opacity: 1;
            content: "\\";
          }
        }

        &::before {
          position: absolute;
          top: 50%;
          left: 50%;
          z-index: -1;
          width: 100%;
          height: 100%;
          background: inherit;
          border-radius: 50%;
          transform: translate(-50%, -50%);
          opacity: 0.5;
          transition: width 0.15s, height 0.15s;
          content: "";
        }

        &::after {
          position: absolute;
          top: 50%;
          left: 50%;
          z-index: 1;
          color: $color-configurator;
          font-size: 1.5rem;
          transform: translate(-50%, -50%) scale(0.5);
          opacity: 0;
          transition: opacity 0.15s;
          content: "\2714";
        }

        &.active::before {
          width: 160%;
          height: 160%;
        }

        &.active::after {
          opacity: 1;
        }
      }
    }
  }

  .widget-list {
    display: flex;
    flex-wrap: wrap;

    .list-item {
      display: flex;
      align-items: center;
      justify-content: center;
      width: calc(100% / 4);
      height: 5rem;
      padding: 1rem;
      border-radius: 0.8rem;
      cursor: pointer;
      transition: background-color 0.2s;

      &.selected.selected {
        background-color: lighten($color-configurator, 6);
      }

      &:hover {
        background-color: lighten($color-configurator, 0);
      }

      & > :deep(svg) {
        width: 100% !important;
        height: 100% !important;
      }

      & :deep(path) {
        stroke: $color-stroke !important;
      }
    }
  }
}
</style>
