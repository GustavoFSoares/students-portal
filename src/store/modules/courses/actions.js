import { api } from "boot/axios";

export default {
  setLoading: ({ commit }, isLoading) => {
    commit("SET_LOADING", isLoading);
  },
  getTrails: async () => {
    try {
      const {
        data: { data },
      } = await api.post("alunos/trilhas");

      return data.turma.trilhas.map((trilhas) => trilhas.detail);
    } catch (err) {
      console.error("Courses Data Error", err);
    }
  },
  getTrailById: async (id) => {
    try {
      const {
        data: { data },
      } = await api.post("alunos/trilha", { id });

      console.log(data);

      return data;
    } catch (err) {
      console.error("Courses Data by ID Error", err);
    }
  },
  getStageData: async (_, { stageId }) => {
    try {
      const {
        data: { data },
      } = await api.post("alunos/estagio", {
        id: stageId,
      });

      console.log(data);

      return {
        files: data.files,
        type: data.tipo.descricao,
        cover: data.tipo.path,
      };
    } catch (err) {
      console.error("Stage Data by ID Error", err);
    }
  },
};
