export default {
  getCertificates(state) {
    return state.certificates;
  },
  certificatesPreview(state) {
    if (!state.certificates || state.certificates.length === 0) {
      return null;
    }

    const preview = [...new Array(3)]
      .map((_, index) => {
        return state.certificates[index];
      })
      .filter((conquest) => conquest);

    return preview;
  },
};
