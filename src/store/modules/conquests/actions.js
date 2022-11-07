export default {
  setLoading: ({ commit }, isLoading) => {
    commit("SET_LOADING", isLoading);
  },
  setConquests: ({ commit, dispatch }, { conquests, obtainedList }) => {
    const mappedConquest = conquests.map((conquest) => {
      const currentConquest = {
        id: conquest.id,
        name: conquest.tipo,
        description: conquest.objetivo_descricao,
        obtained: obtainedList.includes(conquest.id),
        path: null,
      };

      const imageReference = currentConquest.obtained ? "open" : "close";
      currentConquest.path = conquest[imageReference]
        ? conquest[imageReference].path
        : null;

      return currentConquest;
    });

    commit("SET_CONQUESTS", mappedConquest);
  },
};
