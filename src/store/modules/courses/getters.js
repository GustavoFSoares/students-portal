export default {
  getAvailableTrails: (state) => {
    return state.groupTrails.available;
  },
  getInProgressTrails: (state) => {
    return state.groupTrails.inProgress;
  },
  getCompletedTrails: (state) => {
    return state.groupTrails.completed;
  },
};
