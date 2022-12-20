const objectIsEmpty = (obj) => Object.keys(obj).length === 0;

export default {
  SET_LOADING(state, isLoading) {
    state.loading = isLoading;
  },
  SET_AVATAR_OPTIONS(state, avatarOptions) {
    if (avatarOptions && !objectIsEmpty(avatarOptions)) {
      state.avatarOptions = avatarOptions;
    }
  },
  SET_PRESENT_AVATAR_OPTIONS(state, avatarOptions) {
    if (avatarOptions && !objectIsEmpty(avatarOptions)) {
      state.presentAvatarOptions = avatarOptions;
    }
  },
};
