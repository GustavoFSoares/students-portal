export default {
  SET_LOADING(state, isLoading) {
    state.loading = isLoading;
  },
  SET_PROFILE_ACTIVITIES(state, profileActivities) {
    state.profileActivities = {
      available: profileActivities.available,
      inProgress: profileActivities.inProgress,
      completed: profileActivities.completed,
    };
  },
  AD_TO_WATCHED_LIST(state, activityId) {
    state.watchedList.push(activityId);

    localStorage.setItem(
      "activities-watched-list",
      state.watchedList.toString()
    );
  },
};
