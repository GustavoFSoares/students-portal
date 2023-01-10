import { api } from "boot/axios";

export default {
  setAvatar: ({ commit }, avatarOptions) => {
    if (typeof avatarOptions === "string") {
      avatarOptions = JSON.parse(avatarOptions);
    }

    commit("SET_AVATAR_OPTIONS", { ...avatarOptions });
  },
  sendAvatar: async ({ commit, rootGetters }, avatarOptions) => {
    const { id: userId } = rootGetters["AuthModule/userData"];

    try {
      commit("SET_LOADING", true);

      await api.put(`/user/${userId}`, {
        avatar: { ...avatarOptions },
      });

      commit("SET_AVATAR_OPTIONS", { ...avatarOptions });
    } catch (err) {
      console.error("Error trying update avatar", err);
    } finally {
      setTimeout(() => {
        commit("SET_LOADING", false);
      }, 1500);
    }
  },
};
