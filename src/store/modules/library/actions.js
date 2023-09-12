import { iconsMapReplations } from "maps/iconsMaps.json";

export default {
  setLoading: ({ commit }, isLoading) => {
    commit("SET_LOADING", isLoading);
  },
  buildLibrary: async ({ commit }, activities) => {
    try {
      const activitiesLibrary = activities.map((activity) => {
        return {
          name: activity.detail.nome,
          description: activity.detail.descricao,
          cover: {
            path: activity.detail.capa?.path,
            type: activity.detail.capa?.tipo,
          },
          stages: activity.atividades
            .filter((stage) => stage.biblioteca)
            .map((stage) => ({
              name: stage.biblioteca.nome,
              description: stage.biblioteca.descricao,
              itens: stage.biblioteca.items.map((libraryItem) => ({
                description: libraryItem.descricao,
                type: iconsMapReplations[libraryItem.type],
                file: libraryItem.file.path,
                updatedAt: libraryItem.updated_at,
              })),
            })),
        };
      });

      commit("SET_ACTIVITIES_LIBRARY", activitiesLibrary);
    } catch (err) {
      console.error("Courses Data Error", err);
    }
  },
};
