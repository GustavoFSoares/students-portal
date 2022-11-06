export default {
  SET_LOADING(state, isLoading) {
    state.loading = isLoading;
  },
  STORE_TRAILS_GROUP(state, trailsGroups) {
    state.trailsGroup.available = trailsGroups.available;
    state.trailsGroup.inProgress = trailsGroups.inProgress;
    state.trailsGroup.completed = trailsGroups.completed;
  },
};
