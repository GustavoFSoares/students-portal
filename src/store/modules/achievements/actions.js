import { api } from "boot/axios";

export default {
  setLoading: ({ commit }, isLoading) => {
    commit("SET_LOADING", isLoading);
  },
  setAchievements: ({ commit, dispatch }, { achievements, obtainedList }) => {
    const mappedAchievement = achievements.map((achievement) => {
      const currentAchievement = {
        id: achievement.id,
        name: achievement.tipo,
        obtained: obtainedList.includes(achievement.id),
        path: null,
        goal: {
          target: achievement.objetivo,
          description: `${
            achievement.objetivo
          } ${achievement.objetivo_descricao.trim()}`,
        },
      };

      const imageReference = currentAchievement.obtained ? "open" : "close";
      currentAchievement.path = achievement[imageReference]
        ? achievement[imageReference].path
        : null;

      return currentAchievement;
    });

    commit("SET_ACHIEVEMENTS", mappedAchievement);
  },
  downloadingContent: async () => {
    try {
      await api.post("alunos/dowload/material-apoio");
    } catch (err) {
      console.error("Error trying set download achievement");
    }
  },
  accessingGames: async () => {
    try {
      await api.post("alunos/conquista/mini-game");
    } catch (err) {
      console.error("Error trying set mini-games");
    }
  },
};
