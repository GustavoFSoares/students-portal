import { api } from "boot/axios";
import { defaultAvatar } from "vue-color-avatar";

export default {
  setLoading: ({ commit }, isLoading) => {
    commit("SET_LOADING", isLoading);
  },
  loadRankings: async ({ commit }) => {
    try {
      const {
        data: { data },
      } = await api.post("alunos/ranking");

      const preparedData = Object.values(data).map(
        (userRanking, rankingIndex) => ({
          userName: userRanking.aluno,
          score: userRanking.pontos,
          isYou: userRanking.local,
          position: rankingIndex + 1,
          avatar: userRanking.avatar || { ...defaultAvatar },
        })
      );

      commit("SET_RANKING", preparedData);

      return preparedData;
    } catch (err) {
      console.error("Courses Data Error", err);
    }
  },
};
