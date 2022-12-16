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
      background: { ...state.avatarOption?.background, color: backgorundColor },
    });
  },
};
