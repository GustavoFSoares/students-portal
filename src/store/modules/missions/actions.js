export default {
  setLoading: ({ commit }, isLoading) => {
    commit("SET_LOADING", isLoading);
  },
  buildMissions: async ({ commit }, missions) => {
    try {
      const data = missions.disponivel
        .filter((mission) => mission.status === "ativo")
        .map((mission) => ({
          id: mission.detail.id,
          cover: {
            path: mission.detail.file?.path,
            type: mission.detail.file?.tipo,
          },
          name: mission.detail.titulo,
          description: mission.detail.descricao,
          activities: mission.detail.trilhas.map((activitie) => {
            return {
              id: activitie.tr.id,
              cover: {
                path: activitie.tr.capa?.path,
                type: activitie.tr.capa?.tipo,
              },
              name: activitie.tr.nome,
            };
          }),
        }));

      commit("SET_MISSIONS", data);
    } catch (err) {
      console.error("Missions Data Error", err);
    }
  },
};
