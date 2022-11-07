export default {
  setLoading: ({ commit }, isLoading) => {
    commit("SET_LOADING", isLoading);
  },
  setConquests: ({ commit, dispatch }, conquests) => {
    console.log(conquests);
    // dispatch("setLoading", true);
  },
};
