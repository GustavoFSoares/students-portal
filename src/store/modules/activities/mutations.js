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
};
