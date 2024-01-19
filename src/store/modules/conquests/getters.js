export default {
  conquestsPreview(state) {
    if (!state.conquests || state.conquests.length === 0) {
      return null;
    }

    const obtainedConquests = state.conquests.filter(
      (conquest) => conquest.obtained
    );

    const preview = [...new Array(3)]
      .map((_, index) => {
        return obtainedConquests[index];
      })
      .filter((conquest) => conquest);

    return preview;
  },
  conquests(state) {
    return state.conquests;
  },
};
