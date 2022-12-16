import { BeardShape } from "@vue-color-avatar/enums";
import { AVATAR_LAYER } from "@vue-color-avatar/utils/constant";

export default {
  setWrapperShape({ commit, dispatch, state }, wrapperShape) {
    commit("SET_AVATAR_OPTIONS", {
      ...state.avatarOptions,
      wrapperShape,
    });
  },
  setBackgroundColor({ commit, dispatch, state }, backgorundColor) {
    commit("SET_AVATAR_OPTIONS", {
      ...state.avatarOptions,
      background: {
        ...state.avatarOptions?.background,
        color: backgorundColor,
      },
    });
  },
  setWidget({ commit, dispatch, state }, { widgetId, widgetShape }) {
    commit("SET_AVATAR_OPTIONS", {
      ...state.avatarOptions,
      widgets: {
        ...state.avatarOptions.widgets,
        [widgetId]: {
          ...state.avatarOptions.widgets?.[widgetId],
          shape: widgetShape,
          ...(widgetShape === BeardShape.Scruff
            ? { zIndex: AVATAR_LAYER["mouth"].zIndex - 1 }
            : undefined),
        },
      },
    });
  },
};
