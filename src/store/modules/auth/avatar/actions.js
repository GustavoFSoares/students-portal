import { api } from "boot/axios";

import { BeardShape } from "@vue-color-avatar/enums";
import { AVATAR_LAYER } from "@vue-color-avatar/utils/constant";

export default {
  setWrapperShape: ({ commit, state }, wrapperShape) => {
    commit("SET_AVATAR_OPTIONS", {
      ...state.avatarOptions,
      wrapperShape,
    });
  },
  setBackgroundColor: ({ commit, state }, backgorundColor) => {
    commit("SET_AVATAR_OPTIONS", {
      ...state.avatarOptions,
      background: {
        ...state.avatarOptions?.background,
        color: backgorundColor,
      },
    });
  },
  setWidget: ({ commit, state }, { widgetId, widgetShape }) => {
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
  setWidgetColor: ({ commit, state }, { widgetId, widgetColor }) => {
    commit("SET_AVATAR_OPTIONS", {
      ...state.avatarOptions,
      widgets: {
        ...state.avatarOptions.widgets,
        [widgetId]: {
          ...state.avatarOptions.widgets?.[widgetId],
          fillColor: widgetColor,
        },
      },
    });
  },
  setAvatar: ({ commit }, avatarOptions) => {
    if (typeof avatarOptions === "string") {
      avatarOptions = JSON.parse(avatarOptions);
    }

    commit("SET_AVATAR_OPTIONS", { ...avatarOptions });
    commit("SET_PRESENT_AVATAR_OPTIONS", { ...avatarOptions });
  },
  sendAvatar: async ({ commit, rootGetters, getters }) => {
    const { id: userId } = rootGetters["AuthModule/userData"];

    try {
      commit("SET_LOADING", true);

      await api.put(`/user/${userId}`, {
        avatar: { ...getters.avatarOptions },
      });

      commit("SET_PRESENT_AVATAR_OPTIONS", { ...getters.avatarOptions });
    } catch (err) {
      console.error("Error trying update avatar", err);
    } finally {
      setTimeout(() => {
        commit("SET_LOADING", false);
      }, 1500);
    }
  },
};
