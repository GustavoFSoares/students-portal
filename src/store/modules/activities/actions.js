import { api } from "boot/axios";
import ActivitiesStatusMap from "maps/activitiesStatusMap.json";
import { iconsMapReplations } from "maps/iconsMaps.json";

export default {
  setLoading: ({ commit }, isLoading) => {
    commit("SET_LOADING", isLoading);
  },
  setProfileActivities: ({ commit }, profileActivities) => {
    const preparedTrailsGroup = Object.entries(ActivitiesStatusMap).reduce(
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

      const activities = data.turma.trilhas
        .filter((trilha) => trilha.status === "ativo")
        .map((trilhas) => ({
          id: trilhas.detail.id,
          cover: {
            path: trilhas.detail.capa?.path,
            type: trilhas.detail.capa?.tipo,
          },
          name: trilhas.detail.nome,
          description: trilhas.detail.descricao,
        }));

      dispatch("setProfileActivities", data.trilhas);
      const profileActivities = getters.getProfileActivities;

      activities.forEach((activity) => {
        let exists = false;

        Object.entries(profileActivities)
          .reverse()
          .forEach(([activityStatusItem, activityStatusItemActivities]) => {
            if (exists) {
              return;
            }

            exists = activityStatusItemActivities.includes(activity.id);

            if (exists) {
              activity.status = activityStatusItem;
              return;
            }
          });
      });

      const preparedActivitiesGroup = Object.entries(profileActivities).reduce(
        (amount, [mapIndex, activitiesList]) => {
          const activitiesGroup = activitiesList.map((activityId) => {
            return activities.find((trail) => trail.id === activityId);
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

      const completeds = [...data.concluidos];

      return {
        name: data.nome,
        description: data.descricao,
        cover: data.capa,
        stages: data.stage
          .filter((stage) => stage.status === "ativo")
          .map((stage) => {
            return {
              id: stage.id,
              trailId: stage.trilha_id,
              name: stage.nome,
              reward: {
                coins: stage.moedas,
                points: stage.pontos,
              },
              type:
                iconsMapReplations[stage.tipo.descricao] ||
                stage.tipo.descricao,
              position: stage.ordem + "",
              rank: 2,
              completed: !!completeds.find((completedId, completedIndex) => {
                if (completedId === stage.id) {
                  completeds.splice(completedIndex, 1);

                  return true;
                }
              }),
            };
          }),
      };
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

      return {
        name: data.nome,
        files: data.files.map((file) => ({
          path: file.path,
          name: file.name,
          id: file.id,
          parameters: file.parameters ? JSON.parse(file.parameters) : null,
        })),
        type: data.tipo.descricao,
        type: iconsMapReplations[data.tipo.descricao] || data.tipo.descricao,
        cover: data.tipo.path,
        coins: data.moedas,
        points: data.pontos,
      };
    } catch (err) {
      console.error("Stage Data by ID Error", err);
    }
  },
  startActivity: async (_, activityId) => {
    try {
      await api.post("alunos/trilha-aluno-atividade", {
        trilha_id: activityId,
      });
    } catch (err) {
      console.error("Start activity Error", err);
    }
  },
  completeStage: async ({ dispatch }, { activityId, stageId }) => {
    try {
      await api.post("alunos/trilha-aluno-estagio", {
        trilha_id: activityId,
        estagio_id: stageId,
      });
    } catch (err) {
      console.error("", err);
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

      console.log(data);

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
