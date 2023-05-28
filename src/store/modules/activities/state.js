export default {
  loading: false,
  profileActivities: {
    available: [],
    inProgress: [],
    completed: [],
  },
  watchedList:
    localStorage.getItem("activities-watched-list")?.split(",") || [],
};
