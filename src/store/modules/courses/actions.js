import { api } from "boot/axios";

export default {
  setLoading: ({ commit }, isLoading) => {
    commit("SET_LOADING", isLoading);
  },
  getData: async () => {
    try {
      const {
        data: { data },
      } = await api.post("alunos/trilhas");

      return data;
    } catch (err) {
      console.error("Courses Data Error", err);
    }
  },
};
