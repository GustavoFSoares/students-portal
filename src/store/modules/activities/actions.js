import { api } from "boot/axios";
import ActivitiesMap from "maps/activitiesMap.json";
import { iconsMapReplations } from "maps/iconsMaps.json";

export default {
  setLoading: ({ commit }, isLoading) => {
    commit("SET_LOADING", isLoading);
  },
  setProfileActivities: ({ commit }, profileActivities) => {
    const preparedTrailsGroup = Object.entries(ActivitiesMap).reduce(
      (amount, [mapIndex, originIndex]) => {
        amount[mapIndex] = profileActivities[originIndex];

        return amount;
      },
      {
        available: [],
        inProgress: [],
        completed: [],
      }
    );

    commit("SET_PROFILE_ACTIVITIES", preparedTrailsGroup);
  },
  getActivities: async ({ getters, dispatch }) => {
    try {
      const {
        data: { data },
      } = await api.post("alunos/trilhas");

      const trails = data.turma.trilhas.map((trilhas) => ({
        id: trilhas.detail.id,
        cover: {
          path: trilhas.detail.capa.path,
          type: trilhas.detail.capa.tipo,
        },
        name: trilhas.detail.descricao,
      }));

      dispatch("setProfileActivities", data.trilhas);
      const profileActivities = getters.getProfileActivities;

      const preparedActivitiesGroup = Object.entries(profileActivities).reduce(
        (amount, [mapIndex, activitiesList]) => {
          const activitiesGroup = activitiesList.map((activityId) => {
            return trails.find((trail) => trail.id === activityId);
          });

          amount[mapIndex] = activitiesGroup;

          return amount;
        },
        {
          available: [],
          inProgress: [],
          completed: [],
        }
      );

      return preparedActivitiesGroup;
    } catch (err) {
      console.error("Activities Data Error", err);
    }
  },
  getActivityById: async (_, id) => {
    try {
      const {
        data: { data },
      } = await api.post("alunos/trilha", { id });

      return {
        name: data.nome,
        description: data.descricao,
        cover: data.capa,
        stages: data.stage.map((stage) => {
          return {
            id: stage.id,
            trailId: stage.trilha_id,
            name: stage.nome,
            reward: {
              coins: stage.moedas,
              points: stage.pontos,
            },
            type:
              iconsMapReplations[stage.tipo.descricao] || stage.tipo.descricao,
            position: stage.ordem + "",
            rank: 2,
            completed: true,
          };
        }),
      };
    } catch (err) {
      console.error("Courses Data by ID Error", err);
    }
  },
};
