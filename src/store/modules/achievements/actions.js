export default {
  setLoading: ({ commit }, isLoading) => {
    commit("SET_LOADING", isLoading);
  },
  setAchievements: ({ commit, dispatch }, { achievements, obtainedList }) => {
    const mappedAchievement = achievements.map((achievement) => {
      const currentAchievement = {
        id: achievement.id,
        name: achievement.tipo,
        description: achievement.objetivo_descricao,
        obtained: obtainedList.includes(achievement.id),
        path: null,
      };

      const imageReference = currentAchievement.obtained ? "open" : "close";
      currentAchievement.path = achievement[imageReference]
        ? achievement[imageReference].path
        : null;

      return currentAchievement;
    });

    commit("SET_ACHIEVEMENTS", mappedAchievement);
  },
};
