export default {
  setLoading: ({ commit }, isLoading) => {
    commit("SET_LOADING", isLoading);
  },
  doLogin: async ({ commit, dispatch }, { username, password }) => {
    dispatch("setLoading", true);

    return new Promise((resolve) => {
      if (password !== "123") {
        setTimeout(() => {
          dispatch("setLoading", false);
          resolve(false);
        }, 1000);
        return;
      }

      setTimeout(() => {
        commit("SET_LOGGED_IN", true);

        dispatch("setLoading", false);
        resolve(true);
      }, 3000);
    });
  },
};
