import { api } from "boot/axios";

export default {
  setLoading: ({ commit }, isLoading) => {
    commit("SET_LOADING", isLoading);
  },
  getRankings: async ({ commit }) => {
    try {
      const {
        data: { data },
      } = await api.post("alunos/ranking");

      console.log(data);
    } catch (err) {
      console.error("Courses Data Error", err);
    }
  },
};
