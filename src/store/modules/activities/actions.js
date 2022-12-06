import { api } from "boot/axios";
import { iconsMapReplations } from "maps/iconsMaps.json";
import ActivitiesMap from "maps/activitiesMap.json";

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
};
