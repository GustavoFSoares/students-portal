export default {
  getActivitiesCount: (state) => {
    return {
      available: state.profileActivities.available.length,
      inProgress: state.profileActivities.inProgress.length,
      completed: state.profileActivities.completed.length,
    };
  },
};
