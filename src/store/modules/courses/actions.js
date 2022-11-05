import { api } from "boot/axios";

export default {
  setLoading: ({ commit }, isLoading) => {
    commit("SET_LOADING", isLoading);
  },
  getTrails: async ({ commit }) => {
    try {
      const {
        data: { data },
      } = await api.post("alunos/trilhas");

      const trailsMap = {
        available: "disponivel",
        inProgress: "em_andamento",
        completed: "finalizados",
      };

      const trails = data.turma.trilhas.map((trilhas) => trilhas.detail);
      const trailsGroups = data.trilhas;

      const preparedTrailsGroup = Object.entries(trailsMap).reduce(
        (amount, [mapIndex, originIndex]) => {
          const groupTrails = trailsGroups[originIndex].map((trailId) => {
            return trails.find((trail) => trail.id === trailId);
          });

          amount[mapIndex] = groupTrails;
          return amount;
        },
        {
          available: [],
          inProgress: [],
          completed: [],
        }
      );

      commit("STORE_TRAILS_GROUP", preparedTrailsGroup);

      return preparedTrailsGroup;
    } catch (err) {
      console.error("Courses Data Error", err);
    }
  },
  getTrailById: async (_, id) => {
    try {
      const {
        data: { data },
      } = await api.post("alunos/trilha", { id });

      // console.log(data);

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

      // console.log(data);

      return {
        name: data.nome,
        files: data.files,
        type: data.tipo.descricao,
        cover: data.tipo.path,
        coins: data.moedas,
        points: data.pontos,
      };
    } catch (err) {
      console.error("Stage Data by ID Error", err);
    }
  },
  getPdfData: async (_, path) => {
    try {
      const data = await api.post(
        path,
        {},
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods":
              "GET, POST, PATCH, PUT, DELETE, OPTIONS",
            "Access-Control-Allow-Headers":
              "Origin, Content-Type, X-Auth-Token",
            "Content-Type": "application/pdf",
            mode: "no-cors",
          },
        }
      );

      // console.log(data);

      // return {
      //   files: data.files,
      //   type: data.tipo.descricao,
      //   cover: data.tipo.path,
      // };
    } catch (err) {
      console.error("Stage PDF Error", err);
    }
  },
};
