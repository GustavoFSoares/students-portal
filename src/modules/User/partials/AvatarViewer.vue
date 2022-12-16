<template>
  <div
    ref="avatarRef"
    class="avatar-viewer"
    :style="{
      width: `${size}px`,
      height: `${size}px`,
    }"
    :class="getWrapperShapeClassName"
  >
    <AvatarBackground :color="option.background.color" />

    <div class="avatar-payload" v-html="svgContent" />
  </div>
</template>

<script>
import { computed, ref, toRefs, watchEffect } from "vue";

import { AVATAR_LAYER } from "@vue-color-avatar/utils/constant";
import { WrapperShape } from "@vue-color-avatar/enums";

import AvatarBackground from "./AvatarBackground.vue";

export default {
  name: "AvatarViewer",
  components: {
    AvatarBackground,
  },
  props: {
    option: {
      type: Object,
      default: () => ({}),
    },
    size: {
      default: 280,
      type: Number,
    },
  },
  setup(props) {
    const avatarRef = ref();
    const { option: avatarOption, size: avatarSize } = toRefs(props);

    const svgContent = ref("");

    const getWrapperShapeClassName = computed(() => {
      console.log("here");
      const wrapperShapes = {
        [WrapperShape.Circle]: WrapperShape.Circle,
        [WrapperShape.Square]: WrapperShape.Square,
        [WrapperShape.Squircle]: WrapperShape.Squircle,
      };

      return (
        wrapperShapes[avatarOption.value.wrapperShape] || WrapperShape.Squircle
      );
    });

    watchEffect(async () => {
      const sortedList = Object.entries(avatarOption.value.widgets).sort(
        ([prevShape, prev], [nextShape, next]) => {
          const ix = prev.zIndex ?? AVATAR_LAYER[prevShape]?.zIndex ?? 0;
          const iix = next.zIndex ?? AVATAR_LAYER[nextShape]?.zIndex ?? 0;
          return ix - iix;
        }
      );

      const promises = sortedList.map(async ([widgetType, opt]) => {
        return (
          await import(
            `../../../../libs/vue-color-avatar/src/assets/widgets/${widgetType}/${opt.shape}.svg?raw`
          )
        ).default;
      });

      const svgRawList = await Promise.all(promises).then((raw) => {
        return raw.map((svgRaw, i) => {
          const widgetFillColor = sortedList[i][1].fillColor;

          const content = svgRaw
            .slice(svgRaw.indexOf(">", svgRaw.indexOf("<svg")) + 1)
            .replace("</svg>", "")
            .replaceAll("$fillColor", widgetFillColor || "transparent");

          return `
            <g id="vue-color-avatar-${sortedList[i][0]}">
              ${content}
            </g>
          `;
        });
      });

      svgContent.value = `
        <svg
          width="${avatarSize.value}"
          height="${avatarSize.value}"
          viewBox="0 0 ${avatarSize.value / 0.7} ${avatarSize.value / 0.7}"
          preserveAspectRatio="xMidYMax meet"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g transform="translate(100, 65)">
            ${svgRawList.join("")}
          </g>
        </svg>
      `;
    });

    return {
      svgContent,
      getWrapperShapeClassName,
    };
  },
};
</script>

<style lang="scss" scoped>
.avatar-viewer {
  position: relative;
  overflow: hidden;

  &.circle {
    border-radius: 50%;
  }

  &.squircle {
    // TODO: Radius should adapt to the avatar size
    border-radius: 25px;
  }

  .avatar-payload {
    position: relative;
    z-index: 2;
    width: 100%;
    height: 100%;
  }
}
</style>
