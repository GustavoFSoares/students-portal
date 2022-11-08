export default {
  getCertificates(state) {
    return state.certificates;
  },
  certificatesPreview(state) {
    const preview = [...new Array(3)]
      .map((_, index) => {
        return state.certificates[index];
      })
      .filter((conquest) => conquest);

    return preview;
  },
};
