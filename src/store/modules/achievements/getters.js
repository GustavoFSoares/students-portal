export default {
  achievementsPreview(state) {
    const obtainedAchievements = state.achievements.filter(
      (achievement) => achievement.obtained
    );

    const preview = [...new Array(3)]
      .map((_, index) => {
        return obtainedAchievements[index];
      })
      .filter((achievement) => achievement);

    return preview;
  },
  achievements(state) {
    return state.achievements;
  },
};
